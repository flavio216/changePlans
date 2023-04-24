import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlanService } from './service/plan.service';
import config from './config';
import { Plan } from './models/Plans';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  form: FormGroup;

  title = 'changePlans';
  codigoHTMLEditable: string;
  codigoHTML: string = null;
  environment: string;
  country: string;
  codePlan: string;
  type: string;
  procedure: string;
  response: any;
  id : string;
  flows: string[] = ["sds", "ppc", "seg", "cater"];
  environments = [{ label: "DESA", value: "desa-" }, { label: "TEST", value: "test-" }, { label: "PRO", value: "" }]

  constructor(private planS: PlanService, private fb: FormBuilder, private renderer : Renderer2) {
    this.codigoHTMLEditable = this.response;
  }

  onDiv2InputChange(value: string) {
    // Función que se ejecuta cuando se cambia el valor del segundo div editable
    this.codigoHTMLEditable = value; // Actualiza la propiedad con el valor del segundo div editable
  }
  ngOnInit(): void {
 
    this.form = this.fb.group({
      environment: ["DESA", Validators.required],
      country: ["AR", Validators.required],
      codePlan: [null, Validators.required],
      type: [null, Validators.required],
      procedure: [null, Validators.required]
    })
  }

  setCountry() {
    config.country = this.form.value.country;
  }
  setEnvironment() {
    config.enviroment = this.form.value.environment;
  }

  getPlan() {
    this.planS.login();
    this.setEnvironment() ;
    this.setCountry();
    let code = this.form.value.codePlan;
    let type = this.form.value.type;
    let flow = this.form.value.procedure;
  
    this.planS.getPlan(code, type, flow).subscribe((res: any) => {
      this.id = res.id;
      this.response = res.html;
    }, (error) => {
      console.log(error)
    })
  }
 
  async savePlan() {
    this.planS.login();

    let data : Plan = {
      html: this.codigoHTMLEditable,
      to: new Date(),
      from: new Date(),
      code: this.form.value.codePlan,
      procedure:this.form.value.procedure,
      type:this.form.value.type,
    }
    console.log('data',data)
   
    this.planS.savePlan(data, this.id).subscribe((res)=>{
      alert("El plan se generó correctamente")
      this.getPlan();
      this.response = null;
    })
  }
}
