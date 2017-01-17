export class Book {
    id:string;
    name:string;
    price:number;
    date:string;
    img:string;

    constructor(id, name, price:number, date, img) {
        this.id = id;
        this.name = name;
        this.price =price;
        this.date =date;
        this.img=img;
    }
}