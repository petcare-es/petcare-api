import { prisma } from "lib/prisma";
import UserRepository from "repository/interface/UserRepository";
import UserType from "types/UserType";
import bcrypt from "bcryptjs";

export default class UserPrismaRepository implements UserRepository {
    public async create({email, name, password}: Omit<
        UserType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<UserType> {
    
        const passwordHash = await bcrypt.hash(password, 3);

        const user = await prisma.user.create({
            data: {
                email, 
                name, 
                password: passwordHash
            }
        });

        return user;
    }

    public async findByEmail(email: string): Promise<UserType | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    public async findById(id: string): Promise<UserType | null> {
        return await prisma.user.findUnique({
            where: { id }
        });
    }

}