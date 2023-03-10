import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        userId: string
    }
    query: {
        code?: string
    }
}

export interface LoginResponse {
    token: string
}