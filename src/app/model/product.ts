export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
  constructor(id , name , description, price , available, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.available = available;
    this.image = image;
  }
}
