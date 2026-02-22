import nodemailer from "nodemailer";

export const sendResetEmail = async (email: string, token: string) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  
  const mailOptions = {
    from: `"My Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "รีเซ็ตรหัสผ่านของคุณ (มีอายุ 15 นาที)",
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>คุณได้ทำการขอรีเซ็ตรหัสผ่าน</h2>
        <p>กรุณาคลิกลิงก์ด้านล่างเพื่อตั้งรหัสผ่านใหม่ ลิงก์นี้จะหมดอายุใน 15 นาที:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">รีเซ็ตรหัสผ่าน</a>
        <p>หากคุณไม่ได้เป็นคนส่งคำขอนี้ โปรดเพิกเฉยต่ออีเมลฉบับนี้</p>
        <hr />
        <p style="font-size: 12px; color: gray;">ส่งจากระบบ My Portfolio API</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};