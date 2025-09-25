import { z } from "zod";


export const signupSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email"),
  nickname: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profileimg: z.string().optional(),
  coverimg:z.string().optional(),
  bio:z.string().optional() ,
  friends: z.array(z.string()).optional(),
});


export const loginSchema = z.object({   
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});