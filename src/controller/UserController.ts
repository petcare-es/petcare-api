import { Request, Response } from "express";
import { authSchema } from "lib/zod";
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
}