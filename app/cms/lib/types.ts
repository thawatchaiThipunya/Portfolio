// lib/types.ts

import { UserStatus } from "@prisma/client";
import { HobbyStatus } from "@prisma/client";
import { ProjectStatus } from "@prisma/client"; 

export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null
}

export interface User extends Omit<BaseEntity, 'id'> {
  id: string; // User ใช้ cuid
  uID: number;
  email: string;
  password?: string;
  status: UserStatus;
  loginToken?: string | null;
  resetToken?: string | null;
  loginExpire?: Date | null;
  resetExpire?: Date | null;
}

export interface Category extends BaseEntity {
  name: string;
  technicals?: Technical[];
}

export interface Technical extends BaseEntity {
  name: string;
  logo: string;
  categoryId: number;
  category?: Category;
}

export interface Project extends BaseEntity {
  title: string;
  content: string;
  position: string;
  tasks: string;
  problems?: string | null;
  solutions?: string | null;
  company: string;
  employmentType: string;
  image_url: string;
  status: ProjectStatus;
}

export interface SoftSkill extends BaseEntity {
  name: string;
}

export interface Hobby extends BaseEntity {
  name: string;
  image_url?: string | null;
  description?: string | null;
  status: HobbyStatus;
}

export interface Contract extends BaseEntity {
  gmail?: string | null;
  facebook?: string | null;
  line?: string | null;
  instagram?: string | null;
  x?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  address?: string | null;
  phone?: string | null;
}

export interface MainProfile extends BaseEntity {
  firstname: string;
  lastname: string;
  image_url?: string | null;
  role: string;
  description: string;
}

export interface Education extends BaseEntity {
  name: string;
  GPAX?: string | null;
  faculty?: string | null;
  starttime: Date | string;
  endtime?: Date | string | null;
  logo_url?: string | null;
}