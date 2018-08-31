export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  avaible: boolean;
  image: string;
  constructor(id , name , description, price , avaible, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.avaible = avaible;
    this.image = image;
  }
}
