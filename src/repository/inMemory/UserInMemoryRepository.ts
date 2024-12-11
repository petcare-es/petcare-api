import UserRepository from "repository/interface/UserRepository";
import UserType from "types/UserType";
import { randomBytes } from "crypto";

export default class UserInMemoryRepository implements UserRepository {
    
    private users: UserType[];
    
    public constructor() {
        this.users = [];
    }

    public async create({email, name, password}: Omit<
        UserType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<UserType> {
        const user: UserType = {
            id: randomBytes(10).toString("hex"),
            email,
            name,
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.users.push(user);

        return user;
    }

}