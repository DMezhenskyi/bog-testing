export interface Item {
  id: number;
  name: string;
  price: number;
}
export interface Course extends Item {
  image: string;
  description: string;
  link: string;
}
