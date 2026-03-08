import { UserStatus, HobbyStatus, ProjectStatus } from "@prisma/client";

// ─── Base ────────────────────────────────────────────────────────────────────

export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User extends Omit<BaseEntity, "id"> {
  id: string; // cuid
  uID: number;
  email: string;
  password?: string;
  status: UserStatus;
  loginToken?: string | null;
  resetToken?: string | null;
  loginExpire?: Date | null;
  resetExpire?: Date | null;
}

// ─── Portfolio ───────────────────────────────────────────────────────────────

export interface MainProfile extends BaseEntity {
  firstname: string;
  lastname: string;
  image_url?: string | null;
  role: string;
  description: string;
}

export interface Contract extends BaseEntity {
  gmail?: string | null;
  phone?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  x?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  line?: string | null;
}

export interface Education extends BaseEntity {
  name: string;
  faculty?: string | null;
  GPAX?: string | null;
  starttime: Date | string;
  endtime?: Date | string | null;
  logo_url?: string | null;
}

export interface Hobby extends BaseEntity {
  name: string;
  description?: string | null;
  image_url?: string | null;
  status: HobbyStatus;
}

// ─── Skills ──────────────────────────────────────────────────────────────────

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

export interface SoftSkill extends BaseEntity {
  name: string;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project extends BaseEntity {
  title: string;
  company: string;
  position: string;
  employmentType: string;
  content: string;
  tasks: string;
  problems?: string | null;
  solutions?: string | null;
  image_url: string;
  status: ProjectStatus;
}
