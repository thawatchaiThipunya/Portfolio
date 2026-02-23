import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User as PrismaUser } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const authService = {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },

  async verifyPassword(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  },

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  generateSessionToken(user: PrismaUser) {
    return jwt.sign(
      { userId: user.id, email: user.email, status: user.status },
      JWT_SECRET,
      { expiresIn: '6h' }
    );
  },

  async updateLoginSession(userId: string, token: string) {
    const expiry = new Date(Date.now() + 6 * 60 * 60 * 1000);
    return await prisma.user.update({
      where: { id: userId },
      data: {
        loginToken: token,
        loginExpire: expiry,
        status: "ACTIVATED"
      }
    });
  },

  async createResetToken(email: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    return await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetExpire: expiry
      }
    });
  },

  async findUserByResetToken(token: string) {
    return await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetExpire: { gt: new Date() }
      }
    });
  }
};