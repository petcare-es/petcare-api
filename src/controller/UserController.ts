import { Request, Response } from "express";
import { authSchema, registerSchema } from "lib/zod";
import UserPrismaRepository from "repository/prisma/UserPrismaRepository";
import UserService from "service/UserService";

export default class UserController {
    public async auth(req: Request, res: Response): Promise<void> {
        const {
            email,
            password
        } = authSchema.parse(req.body);

        const userService = new UserService(
            new UserPrismaRepository()
        );

        const token = await userService.auth({email, password});

        res.status(200).json(token);
    }

    public async register(req: Request, res: Response): Promise<void>{
        const{
            name, 
            email, 
            password
        } = registerSchema.parse(req.body);

        const userService = new UserService(
            new UserPrismaRepository()
        );

        const newUser = await userService.create({name, email, password});

        res.status(201).json({
            id: newUser.user.id,
            name: newUser.user.name,
            email: newUser.user.email,
            createdAt: newUser.user.createdAt,
            updatedAt: newUser.user.updatedAt,
        });
    }
}