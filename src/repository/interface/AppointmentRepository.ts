import AppointmentType from "types/AppointmentType";

export default interface VaccineRepository {
    create(userData: Omit<
        AppointmentType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<AppointmentType>;

    findByOwner(petId: string): Promise<AppointmentType[]>;
}