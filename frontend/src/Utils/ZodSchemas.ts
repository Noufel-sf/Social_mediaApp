import { z } from "zod";


export const signupSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email"),
  nickname: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ProfileImg: z.string().optional(),
  CoverImg: z.string().optional(),
  bio: z.string().optional(),
  Posts: z.array(z.string()).optional(),
  friends: z.array(z.string()).optional(),
});


export const loginSchema = z.object({   
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
