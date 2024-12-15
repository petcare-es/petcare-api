import UserRepository from "repository/interface/UserRepository";
import UserType from "types/UserType";
import ArgumentNotValidError from "./error/ArgumentNotValidError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../env";

type UserServiceRequest = {
    name: string;
    email: string;
    password: string;
} 

type UserServiceResponse = {
    user: UserType;
}


type UserAuthServiceRequest = {
    email: string;
    password: string;
} 

type UserAuthServiceResponse = {
    token: string;
}

export default class UserService {

    private repository: UserRepository

    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async create(req: UserServiceRequest): Promise<UserServiceResponse> {
        throw new Error("Not Implemented");
    }

    public async auth(req: UserAuthServiceRequest): Promise<UserAuthServiceResponse> {
        const { email, password } = req;

        const userFound = await this.repository.findByEmail(email);

        if (!userFound) {
            throw new ArgumentNotValidError(
                `O e-mail ${email} não está cadastrado`
            );
        }

        const isSamePassword = await bcrypt.compare(
            password, 
            userFound.password
        ); 

        if (!isSamePassword) {
            throw new ArgumentNotValidError(
                "Senha inválida"
            );
        }

        const token = jwt.sign(
            { userId: userFound.id }, 
            env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        return { 
            token 
        };
    }

}
