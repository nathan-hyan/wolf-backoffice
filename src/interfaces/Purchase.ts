export interface CartItem{
    id: string;
    name: string;
    price: number;
    stock: number;
    quantity: number;
  }

export interface Info {
    name: string;
    whatsApp: number;
  }
export interface Purchase {
    products: CartItem[];
    userInfo: Info;
    amount: number;
    finished: boolean;
    _id:string;
  }
