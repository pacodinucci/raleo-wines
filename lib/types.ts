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

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  identification: string;
  address: string;
  apart?: string;
  city: string;
  zipCode: string;
  observations?: string;
  region: string;
  deliveryAddress: boolean;
  deliveryAddressLine: string;
  deliveryPhone: string;
  deliveryApart: string;
  deliveryCity: string;
  deliveryRegion: string;
  deliveryZipCode: string;
  deliveryFullName: string;
  deliveryDays: string[];
  deliveryTime: string[];
}
