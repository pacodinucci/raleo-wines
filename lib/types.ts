export interface Product {
  id?: string;
  title: string;
  winery: string;
  category: string;
  type: string;
  year: string;
  size: string;
  harvest: string;
  fermentation: string;
  aging: string;
  notes: string;
  composition: string;
  cellar: string;
  alcohol: string;
  ph: string;
  src: string;
  discount?: string;
  price: string;
  stock: number;
  available: boolean;
  boxSize: string;
  weight: string;
  user?: any;
  updatedAt: Date;
  createdAt: Date;
}
