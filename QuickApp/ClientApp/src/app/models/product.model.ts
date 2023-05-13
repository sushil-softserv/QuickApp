export class Product {
    constructor(id?: number, name?: string, description?: string, buyingPrice?: number, sellingPrice?: number, unitsInStock?: number, isActive?: boolean){
        this.id = id;
        this.name = name;
        this.description = description;
        this.buyingPrice = buyingPrice;
        this.sellingPrice = sellingPrice;
        this.unitsInStock = unitsInStock;
        this.isActive = isActive;
    }

    public id: number;
    public name: string;
    public description: string;
    public buyingPrice: number;
    public sellingPrice: number;
    public unitsInStock: number;
    public isActive: boolean;
}