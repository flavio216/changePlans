import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlanService } from './service/plan.service';
import config from './config';
import { Plan } from './models/Plans';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
  dateFrom: Date;
  response: any;
  enabledDate: boolean;
  id: string;
  flows: string[] = ['sds', 'ppc', 'seg', 'cater'];
  environments = [
    { label: 'DESA', value: 'desa-' },
    { label: 'TEST', value: 'test-' },
    { label: 'PRO', value: '' },
  ];

  constructor(private planS: PlanService, private fb: FormBuilder) {
    this.codigoHTMLEditable = this.response;
  }

  onDiv2InputChange(value: string) {
    this.codigoHTMLEditable = value;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      environment: [null],
      country: [null, Validators.required],
      codePlan: [null, Validators.required],
      type: [null, Validators.required],
      procedure: [null, Validators.required],
      dateFrom: [null,null],
      dateTo: [null, null]
    });
  }

  setCountry() {
    config.country = this.form.value.country;
  }
  setEnvironment() {
    config.enviroment = this.form.value.environment;
  }

   getPlan() {
    this.setEnvironment();
    this.setCountry();
    this.planS.login();
    
    let code = this.form.value.codePlan;
    let type = this.form.value.type;
    let flow = this.form.value.procedure;

    this.planS.getPlan(code, type, flow).subscribe(
      (res: any) => {
        this.id = res.id;
        this.response = res.html;
      },
      (error) => {
        this.id = null;
        this.response = null;
        console.log("error",error);
      }
    );
  }

  async savePlan() {
    this.planS.login();

    if(this.codigoHTMLEditable != null && this.codigoHTMLEditable != this.response ){
    let data: Plan = {
      html: this.codigoHTMLEditable,
      to: this.form.value.dateTo,
     // from: this.form.get('dateFrom').value,
      from: this.form.value.dateFrom,
      code: this.form.value.codePlan,
      procedure: this.form.value.procedure,
      type: this.form.value.type,
    };
    console.log(data)
    this.planS.savePlan(data, this.id).subscribe(() => {
      this.getPlan();
      this.response = null;
      this.id = null;
    });
  }
  else{
    alert("Los html son identicos")
  }
  }
  editDate(){
    this.enabledDate = true;
    document.getElementById("mi-elemento").style.display = "block";

    document.getElementById("mi-elemento2").style.display = "block";
  }

}
