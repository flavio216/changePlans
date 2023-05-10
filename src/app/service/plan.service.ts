import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../config';
import { Plan } from '../models/Plans';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) {}

  token:string;

  
  
   login() {
    return new Promise<any>((resolve, reject) => {
      let credentials = `grant_type=password&username=usrtest&password=usrtest`;
      this.http.post(`https://${config.enviroment}doc.claro.com.${config.country}/api/token`, credentials).subscribe(
        (resp: any) => {
          this.token = resp.access_token
          localStorage.setItem("token", this.token)
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

  getPlan(code: string, type: string, procedure:string){
    
    const qs = new URLSearchParams();
        qs.set("code", code);
        qs.set("type", type);
        qs.set("procedure", procedure);
    let url =`https://${config.enviroment}doc.claro.com.${config.country}/api/claroplans/v2?${qs}`;
    // let url =`http://localhost:10011/claroplans/v2?${qs}`;

    return this.http.get(url);
  }

  savePlan(plan : Plan, id: string){
    let url =`https://${config.enviroment}doc.claro.com.${config.country}/api/claroplans/create/${id}/`;
    // let url =`http://localhost:10011/claroplans/create/${id}/`;
    return this.http.post(url,plan);
  }
}
