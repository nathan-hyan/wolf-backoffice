export interface Product {
  price: number;
  stock: number;
  category?: number;
  _id?: string;
  name: string;
  image?: string[];
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  _id: string;
  body: string;
  timestamp?: string;
}
