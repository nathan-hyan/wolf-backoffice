export interface Product {
  price: number;
  stock: number;
  category?: number;
  _id?: string;
  name: string;
  image: string[];
  comments?: Comment[];
  description?: string;
  discount?: number;
  rating?: Rating;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rating {
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  usersRating: number;
  total: number;
}

export interface Comment {
  _id: string;
  body: string;
  timestamp: string;
}
