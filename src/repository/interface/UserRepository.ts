import UserType from "types/UserType";

export default interface UserRepository {
    create(userData: Omit<
        UserType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<UserType>;

    findByEmail(email: string): Promise<UserType | null>;
}