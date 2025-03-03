export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  image: string;
  description: string;
  currency: string;
}

export enum VehicleBrand {
  BMW = "BMW",
  Tesla = "Tesla",
  Porsche = "Porsche",
  Lamborghini = "Lamborghini",
  MercedesBenz = "Mercedes-Benz",
  Toyota = "Toyota",
  Honda = "Honda",
}

export const VehicleBrandsArray = Object.values(VehicleBrand);
