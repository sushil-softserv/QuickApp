export class Customer {
    constructor(id?: number, name?: string, email?: string, phone?: string, address?: string, city?: string, gender?: string){
        this.id=id;
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.address=address;
        this.city=city;
        this.gender=gender;
    }

    public id: number;
    public name: string;
    public email: string;
    public phone: string;
    public address: string;
    public city: string;
    public gender: string;
}