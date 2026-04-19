declare module "cities.json" {
  export interface City {
    country: string;
    name: string;
    lat: string;
    lng: string;
  }
  
  const cities: City[];
  export default cities;
}