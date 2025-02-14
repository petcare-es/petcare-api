import BaseType from "./BaseType";

type UserType = {
    name: string;
    email: string;
    password: string;      
} & BaseType;

export default UserType;