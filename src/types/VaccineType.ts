import BaseType from "./BaseType";

type VaccineType = {
    name: string;
    petId: string;
    location: string;        
} & BaseType;

export default VaccineType;