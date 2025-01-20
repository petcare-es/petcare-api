import BaseType from "./BaseType";

type PetType = {
    name: string;
    ownerId: string;        
} & BaseType;

export default PetType;