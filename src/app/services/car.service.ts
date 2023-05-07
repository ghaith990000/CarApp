import { Injectable } from '@angular/core';

export interface Car {
  type: string;
  manufacturer: string;
  model: string;
  color: string;
  mileage: number;
  engineSpecifications: string;
  numberOfSeats: number;
  carSpecificationAndFeatures: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }
}
