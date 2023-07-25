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
  enabledDate: boolean = true;
  id: string;
  flows: string[] = ['sds', 'psr', 'ppc', 'sdst', 'spn', 'spna', 'spnca'];
  environments = [
    { label: 'DESA', value: 'desa-'  },
    { label: 'TEST', value: 'test-' },
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

    let test = this.planS.getPlan(code, type, flow).subscribe(
      (res: any) => {
        if(res != null){
          this.id = res.id;
          this.response = res.html;
        }
        else{
          this.response = "";
        }
      },
      (error) => {
        this.id = null;
        this.response = null;
        console.log("errorS",error);
      }
    );
  }

  async savePlan() {
    this.setEnvironment();
    this.setCountry();
    this.planS.login();

    if(this.codigoHTMLEditable != null && this.codigoHTMLEditable != this.response ){
      console.log( ' this.codigoHTMLEditable',this.codigoHTMLEditable)
    let data: Plan = {
      html: this.codigoHTMLEditable.replace('class=\"d-none\"', 'id=\"dataContent\" class="d-none"'),
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
    // this.enabledDate = true;
    console.log('ENABLED',this.enabledDate)
  if(this.enabledDate)  {
    document.getElementById("mi-elemento").style.display = "block";
    document.getElementById("mi-elemento").className= "d-inline-block";
    document.getElementById("mi-elemento2").style.display = "block";
    document.getElementById("mi-elemento2").className= "d-inline-block";
    this.enabledDate = false;
  }
    else{
     
      document.getElementById("mi-elemento").style.display = "none";
      document.getElementById("mi-elemento").className= "d-inline-none";
      document.getElementById("mi-elemento2").style.display = "none";
      document.getElementById("mi-elemento2").className= "d-inline-none";
      this.enabledDate = true;
    }
  }
  test(){
    var personas = ["Gaido","Marce","Facu","Leo","Fran","Fer","la belu","la gabi", "al tucu"]
    var mensajes = ["Mono manco: Porque pela la banana cn el cul*.",
    "Colectivo sin freno: Porque se come todas las paradas.",
    "Licuado de banana: le meten 5 bananas y un litro de leche",
    "Carnicero Mimoso: porque le gusta mucho acariciar los chorizos.",
    "Piojo: porque le gusta mucho la 'Cabeza'.",
    "Gato feliz: Porqué le gusta jugar con el pajaro muerto",
    "Vaso de agua: porque no se le niega a nadie.",
    "Estufa a leña: porque le ponen un tronco cada 10 minutos.",
    "Capa de Ozono: cada día tiene el agüjero mas grande.",
    "yankee: porque la clavaron hasta en la Luna.",
    "Motosierra: porque nunca deja ningún tronco parado.",
    "Caño de colectivo: la manosean todos.",
    "Caracol: porque es cornudo, arrastrado y baboso.",
    "Almanaque: la clavan en cualquier pared.",
    "Media: todos se la ponen.",
    "Bicicleta sin cadena: si no se la ponen, no anda.",
    "Lapiz Hueco: porque no tiene ninguna mina.",
    "Caja de quinta: se la pone solo en la ruta.",
    "Botella: porque siempre termina tirada en un baldio, con el culo roto.",
    "Corbata de muerto: se la ponen de lástima.",
    "ENFERMERA Todas las noches va de cama en cama.",
    "ESCALERA AL CIELO Porque tiene una baranda infinita.",
    "ESCALERA MECÁNICA La baranda lo sigue a todas partes.",
    "ESCOBA La apoyan en cualquier pared.",
    "ESTACA DE CIRCO La clavan en cualquier campito.",
    "ESTACION DE SERVICIO Está abierta las 24 hs.",
    "ESTUFA A LEÑA Porque le ponen un tronco cada 10 minutos.",
    "FARMACIA FUNDIDA No tiene remedio.",
    "FERRETERIA EN QUIEBRA No tiene ni un tornillo.",
    "FIESTA DE FIN DE AÑO: Chancho y pavo.",
    "FILO DE SARTÉN Porque sirve únicamente para romper los huevos.",
    "FOTOGRAFO DESCUIDADO Porque tiene rollos por todos lados.",
    "FOTOGRAFO DISTRAIDO Se le caen los rollos.",
    "FRAZADA PRESTADA Va de cama en cama.",
    "GATO FELIZ O GORDO Le gusta jugar con el pajarito muerto.",
    "GOLPE DE QUENA Quenaso.",
    "GRANIZO Le cae mal a todo el mundo.",
    "GRILLO DE BIDET Canta para el culo.",
    "GUARDA DE TREN Se pasa todo el día con el pito en la boca.",
    "GUISO DE POROTOS Es candidato al pedo.",
    "HINODORO DE VIDRIERA: No ve un sorete.",
    "HORMIGA Le tapas el agujero y se vuelve loca.",
    "HORMIGA ATÓMICA Porque no hay polvo que la mate.",
    "HORNO DE PANADERO Porque siempre anda caliente.",
    "INODORO Está hecho para el culo.",
    "INODORO DE CUARTEL No ve una concha ni de casualidad.",
    "INODORO DE REGIMIENTO No sabe lo que es la concha.",
    "INODORO DE REGIMIENTO No sabe lo que es la concha.", 
    "INODORO DE VIDRIERA No ve un sorete.", 
    "INTESTINO La máquina de hacer cagadas.",
    "Vikingo: no se saca los cuernos ni para dormir",
    "Mujer maravilla: unas vueltas y se queda en bombacha",
    "Power Ranger: se revuelca con cada monstruo",
    "Tortuga: duerme con la cabeza adentro",
    "Licuado de banana: le meten 5 bananas y un litro de leche",
    "Carnicero Mimoso: porque le gusta mucho acariciar los chorizos",
    "Saturno: esta rodeado por mil argollas y no toca ninguna",
    "Sol de invierno: no calienta ni a la señora",
    "Bugs Bunny: todo el día con la zanahoria en la boca",
    "Estufa a leña: porque le ponen un tronco cada 10 minutos",
    "Vaso de agua: porque no se le niega a nadie",
    "Colectivo sin frenos: se come todas las paradas",
    "Piojo: porque le gusta mucho la 'Cabeza'",
    "Capa de Ozono: cada día tiene el agüjero mas grande",
    "Motosierra: porque nunca deja ningún tronco parado",
    "Bandera yankee: porque la clavaron hasta en la Luna",
    "Baño clausurado: no ve una mierda",
    "Caño de colectivo: la manosean todos",
    "Parrilla: primero se calienta, luego se pone en cuatro patas y le pone el chorizo",
    "Delivery de Pizza: si no se te entrega en 30 minutos es gratis",
    "Luna: porque anda de cuarto en cuarto hasta que queda llena",
    "Gallina gorda: si no fuera por la paja, revienta los huevos",
    "Mono manco: pela la banana con la cola",
    "Caracol: porque es cornudo, arrastrado y baboso",
    "Almanaque: la clavan en cualquier pared",
    "Gaseosa de lata: se consume con la pajita",
    "Media:todos se la ponen",
    "Bicicleta sin cadena: si no se la ponen, no anda",
    "Lapiz Hueco: porque no tiene ninguna mina",
    "Saco de harina: a la primer sacudida, un polvo.",
    "Caja de quinta: tenes que salir a la ruta para ponerla.",
    "Camisa celeste: Se la ponen todos los colectiveros.",
    "Foto carnet: se entrega en 5 minutos.",
    "Gorro de Lana: porque a todos le calienta la cabeza.",
    "Factura: se entrega a quien paga.",
    "Gripe: todos la han pasado.",
    "Botella: porque siempre termina tirada en un baldío, con el culo roto.",
    "Aro de básquet: se la ponen todos los negros.",
    "Solicitud de trabajo: se le entrega a cualquiera.",
    "Loro sordo: le pedís la pata y te da el culo.",
    "Llave francesa: la frotas un poquito y se abre.",
    "Farmacia de turno: porque la buscan de noche.",
    "Cesárea: no vió una concha ni cuando nació.",
    "Cebra: yegua, rayada hasta el culo y andá a montarla.",
    "Caracol muerto: porque termino con el bicho adentro."
   ];
    var indiceAleatorio = Math.floor(Math.random() * mensajes.length);
    var indiceAleatorioNombres = Math.floor(Math.random() * personas.length);
    var mensajeAleatorioNombres = personas[indiceAleatorioNombres];
    var mensajeAleatorio = mensajes[indiceAleatorio];
    alert("Sabes como le dicen a " + mensajeAleatorioNombres+ ": "+ mensajeAleatorio);
  }

}
