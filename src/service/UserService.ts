import UserRepository from "repository/interface/UserRepository";
import UserType from "types/UserType";

type UserServiceRequest = {
    name: string;
    email: string;
    password: string;
} 

type UserServiceResponse = {
    user: UserType;
}

export default class UserService {

    private repository: UserRepository

    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async create(req: UserServiceRequest): Promise<UserServiceResponse> {
        throw new Error("Not Implemented");
    }
}
