import { Injectable } from '@angular/core';
type AOA = any[][];
@Injectable()
export class DataService {
  data: AOA = null;
  isLogged: Boolean = false;
  headers: any = [
    { "id": "comments", "value": "Comments Programa MBA" },
    { "id": "status", "value": "Status" },
    { "id": "last_name", "value": "Last name" },
    { "id": "name", "value": "Name" },
    { "id": "email", "value": "ESADE-mail" },
    { "id": "citizenship", "value": "Citizenship" },
    { "id": "comments", "value": "Comments" },
    { "id": "ft_status", "value": "FT Status" },
    { "id": "last_position_pre_MBA", "value": "Last position pre MBA" },
    { "id": "last_sector_pre_MBA", "value": "Last sector pre MBA" },
    { "id": "company_area_pre_MBA", "value": "Company Area pre MBA" },
    { "id": "experience_pre_MBA", "value": "Experience pre MBA" },
    { "id": "trackMBA", "value": "Month track MBA" },
    { "id": "companiesPromote", "value": "Companies to promote" },
    { "id": "planAFA", "value": "Plan A Functional Area" },
    { "id": "planAS", "value": "Plan A Sector" },
    { "id": "location", "value": "Location" },
    { "id": "search_area", "value": "Seach in a geo. Area" },
  ];
  constructor() { }

  setData(data){
    this.data = data
  }

  getData(){return this.data;}
  setLogged(isLogged){
    this.isLogged = isLogged
  }

  getLogged(){return this.isLogged;}
  getHeaders(){ return this.headers}
}
