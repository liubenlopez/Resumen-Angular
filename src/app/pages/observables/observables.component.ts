import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, Subscription, catchError, concat, concatWith, delay, filter, fromEvent, interval, map, merge, of, share, single, startWith, switchMap, take, takeUntil, tap, timer, timestamp, withLatestFrom } from 'rxjs';
import { Character } from 'src/app/interfaces/character';
import { Info } from 'src/app/interfaces/info';
import { Response } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { customOperador } from './custom-operador';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent {

  //------------- obs1 ------------
  obs1Activo: boolean = false;
  subscipcionObs1!: Subscription;
  respuesta1!: string;
  observable1 = interval(1000);
  subscribeObservable1(): void {
    this.obs1Activo = true;
    this.respuesta1 = "Pendiente...";
    this.subscipcionObs1 = this.observable1.subscribe(result => {
      this.respuesta1 = String(result);
      console.log('Observable 1: ' + String(result));
    });
  }
  unsubscribeObservable1(): void {
    this.obs1Activo = false;
    if (this.subscipcionObs1)
      this.subscipcionObs1.unsubscribe();
  }
  //------------- obs1 fin ------------

  //------------- obs2 ------------
  obs2Activo: boolean = false;
  subscipcionObs2!: Subscription;
  respuesta2!: string;
  observable2 = new Observable<string>(subs => {
    setTimeout(function () {
      console.log('Observable 2: 1');
      subs.next('1');
    }, 1000);
    setTimeout(function () {
      console.log('Observable 2: 2');
      subs.next('2');
    }, 2000);
    setTimeout(function () {
      console.log('Observable 2: 3');
      subs.next('3');
      subs.complete();
    }, 3000);
  });
  subscribeObservable2(): void {
    this.obs2Activo = true;
    this.respuesta2 = "Pendiente...";
    this.subscipcionObs2 = this.observable2.subscribe({
      next: result => { this.respuesta2 = result; },
      complete: () => { this.unsubscribeObservable2(); }
    });
  }
  unsubscribeObservable2(): void {
    this.obs2Activo = false;
    if (this.subscipcionObs2)
      this.subscipcionObs2.unsubscribe();
  }
  //------------- obs2 fin ------------

  //------------- obs3 ------------
  obs3Activo!: boolean;
  respuesta3!: string;
  stop$ = new Subject<number>();
  timer$ = timer(6000);
  start(): void {
    this.obs3Activo = true;
    interval(1000).pipe(
      //Hasta que se cumpla el tiempo o se emita el stop
      takeUntil(this.stop$),
      takeUntil(this.timer$),
    ).subscribe({
      next: value => { this.respuesta3 = String(value); },
      complete: () => { this.stop(); }
    });
  }
  stop(): void {
    this.obs3Activo = false;
    this.stop$.next(0);
  }
  //------------- obs3 fin ------------


  //*** Operadores de NgRx ***

  //------------- op1 ------------
  obs4Activo!: boolean;
  respuesta4!: string;
  stop4$ = new Subject<number>();
  start4(): void {
    this.obs4Activo = true;
    interval(1000).pipe(
      //Hasta que se se emita el stop
      takeUntil(this.stop4$),
      take(5)//El take tambien detiene la subscripcion tras x emiciones
    ).subscribe({
      next: value => { this.respuesta4 = String(value); },
      complete: () => { this.stop4(); }
    });
  }
  stop4(): void {
    this.obs4Activo = false;
    this.stop4$.next(0);
  }
  //------------- op1 fin ------------

  //------------- op2 ------------
  numbers = of(1, 2, 3, 4, 5, 6, 7);//of es un operador creacional como el from, interval
  squaredNumbers = this.numbers.pipe(
    map(x => x * x),//map es un operador de transformacion se le pasa una operacion
  );
  squaredNumbersResp: number[] = [];
  getSquaredNumbers(): void {
    this.squaredNumbersResp = [];
    this.squaredNumbers.subscribe(resp => { this.squaredNumbersResp.push(resp) });
  }
  //------------- op2 fin ------------

  //------------- op3 ------------
  paresNumbers = this.numbers.pipe(
    filter(x => x % 2 == 0)//filter operador de filtrado, se le pasa una condicion de filtrado
  );
  paresNumbersResp: number[] = [];
  getParesNumbers(): void {
    this.paresNumbersResp = [];
    this.paresNumbers.subscribe(resp => { this.paresNumbersResp.push(resp) });
  }
  //------------- op3 fin ------------

  //------------- op34 ------------
  numbers2 = of(8, 9, 10);//of es un operador creacional
  mergedNumbers = merge(this.numbers, this.numbers2);  //Operadores de combinacion, Emite cualquier Observable en cuanto esta disponible
  mergedNumbersArray: number[] = []
  mergedNumbersFunct() {
    this.mergedNumbers.subscribe(resp => this.mergedNumbersArray.push(resp));
    console.log('merge: ', this.mergedNumbersArray);
  }
  //------------- op4 fin ------------

  //------------- op5 ------------
  concatNumbers = concat(this.numbers, this.numbers2); //Operadores de combinacion, Espera que el primer observable se ejecute antes de seguir con la ejecucion del siguiente 
  concatNumbersArray: number[] = [];
  concatNumbersFunct() {
    this.concatNumbers.subscribe(resp => this.concatNumbersArray.push(resp));
    console.log('concat: ', this.concatNumbersArray);
  }
  //------------- op5 fin ------------

  //------------- op6 ------------
  mapTapArray: number[] = []
  mapTap() {
    this.numbers2.pipe(
      map(numb => { const n = numb * 2; return n }), //En el map se pueden hacer cambios de la data (como agregar una propiedad a un objeto) y despues retornar el valor modificado                                      
      tap(resp => { resp = resp * 3; console.log('tap: ', resp); }), //El operador tap() es un eperador utility que permite ejecutar una accion cada vez q desde un operador se emite un valor, util para debuguear o asignar el valor a viene a alguna var
      tap(resp => { console.log('tap: ', resp); }) //El tap no cambia nada en la fuente que es el map, solo le hace de espejo
    ).subscribe(resp => { this.mapTapArray.push(resp); console.log('subs :', resp) });
  }
  //------------- op6 fin ------------

  //------------- op7 ------------
  delayed: string = "";
  delayOp() {
    this.delayed = "";
    this.numbers2.pipe(
      delay(1000),//retraza la emision de los datos se puede usar en buscadores
    ).subscribe(resp => { this.delayed = "Delay respuesta"; console.log('resp delayed:', resp) });
  }
  //------------- op7 fin ------------

  //------------- op8 ------------
  timestamp: string[] = [];
  timestampOp() {
    this.numbers2.pipe(
      timestamp(),//Nos permite agregar marcas temporales cuando se emite cada valor, util para saber cuando se emitio un valor o medir tiempo entre emisiones
    ).subscribe(resp => { this.timestamp.push("{value: " + resp.value + ", timestamp: " + resp.timestamp + "}"); console.log('resp :', resp) });
  }
  //------------- op8 fin ------------

  //------------- op9 ------------
  //operador single completa el observable cuando encuentra el valor que espera o emite un error si no lo encuentra
  valorDevueltoPorSingle: number = 0;
  operadorSingle() {
    this.numbers.pipe(
      single(valor => valor === 6),//Si pongo en vez de 6 el 33 como no esta generá un error [numbers = of(1, 2, 3, 4, 5, 6, 7)]
      tap(result => { console.log(result) }),
      catchError(() => of(3333))//con catchError capturo el error y puedo emitir un Obs por defaul si hay un error, en el error del subscribe no se va a reflejar
    ).subscribe({
      next: res => { this.valorDevueltoPorSingle = res },
      error: err => { console.log('error: ', err) },
      complete: () => console.log('complete')
    });
  }
  //------------- op9 fin ------------

  //------------- op10 ------------
  //operador startWith permite emitir un valor o un conjunto de valores antes de que el observable emita lo de el
  valoresOperadorStartWith: any[] = []
  operadorStartWith() {
    this.numbers.pipe(
      startWith(1000, "valor de emitido", "con StartWith")
    ).subscribe(
      res => this.valoresOperadorStartWith.push(res)
    );
  }
  //------------- op10 fin ------------

  //------------- op11 ------------
  //operador fromEvent permite crear un Obs a partir de un evento de un elemento del DOM
  @ViewChild('idFromEvent') buttonFromEvent!: ElementRef;
  document$!: Observable<any>;
  fromEventArray: any = [];
  ngAfterViewInit() {
    this.document$ = fromEvent(this.buttonFromEvent.nativeElement, "click");
    this.document$.subscribe(res => { this.fromEventArray.push({ x: res.x, y: res.y }), console.log(res) });
  }
  //------------- op11 fin ------------

  //------------- op12 ------------
  //operador withLatestFrom combina los valores mas recientes emitido por un obs principal con el de uno o mas obs secundarios (emite solo cuando el pricipal emite)
  withLatestFromValues: number[][] = [];
  operadorWithLatestFrom() {
    this.numbers.pipe(
      withLatestFrom(this.numbers2),
    ).subscribe(
      res => this.withLatestFromValues.push(res)
    )
  }
  //------------- op12 fin ------------

  //------------- op13 ------------
  //operador concatWith
  private readonly baseAPI = "https://jsonplaceholder.typicode.com/todos";
  resultConcatWith: User[] = [];
  operadorConcatWith() {
    this.getData().subscribe(res => { this.resultConcatWith.push(res), console.log(res) })
  }
  getData(): Observable<User> {
    const obs1 = this.http.get<User>(`${this.baseAPI}/1`);
    const obs2 = this.http.get<User>(`${this.baseAPI}/2`);
    const obs3 = this.http.get<User>(`${this.baseAPI}/3`);
    return obs1.pipe(
      concatWith(obs2),
      concatWith(obs3)
    );
  }
  //------------- op13 fin ------------

  //------------- op14 ------------
  //subject es un tipo especial de obs que permite tanto subcribirse a él como emitir valores desde él con el metodo next()
  mySubject = new Subject<string>();
  contMySubject: number = 0;
  ejecutarSubject() {
    this.contMySubject++;
    this.mySubject.next('Hello ' + this.contMySubject);
  }
  //------------- op14 fin ------------

  //------------- op15 ------------
  //BehaviorSubject es similar al subject pero siempre tiene un valor inicial y cuando algun suscriptor se suscribe obtiene el valor mas reciente emitido por el BehaviorSubjec
  myBehaviorSubject = new BehaviorSubject<string>('Hello 0');
  contMyBehaviorSubject: number = 0;
  ejecutarBehaviorSubject() {
    this.contMyBehaviorSubject++;
    this.myBehaviorSubject.next('Hello ' + this.contMyBehaviorSubject);
  }
  //------------- op15 fin ------------

  //*** Operadores de NgRx Fin ***

  private readonly http = inject(HttpClient);

  constructor() {

    this.searchTerm$.pipe(
      switchMap((value: string) => this.search$(value)) //switchMap cancela la operacion en curso y comienza una nueva 
    ).subscribe(resp => { console.log('>>> ', resp), this.resultOfTheSearch.push(resp) });

    this.searchTermAPIRickAndMorty$.pipe(
      tap(val => console.log(val)), //Para ver el criterio de busqueda
      // filter(value => value.length >= 3), //Buscar solo si el valor es mayor o igal a 3 caracteres
      // debounceTime(400), //Agrega una demora para que no ataque a la api constantemente
      customOperador((value: string) => value.length >= 3, 400), //Operador custom que agrupa el filter y el debounceTime
      // distinctUntilChanged(), Lo quite para paginar //Si el value que viene es igual no se ejecuta la peticion
      switchMap((value: string) => this.filterCharacter(value)), //switchMap cancela la operacion en curso y comienza una nueva llamada a la funcion de busqueda
      // map((response: Response) => response.results), //Para mapear a otro objeto (a Character[] directo)
    ).subscribe({
      next: res => {
        console.log(res);
        this.resultadosDePersonajes = res.results;
        this.errorEnLaBusquedaDePersonajes = false;
        this.infoDeLaBusqueda = res.info;
      },
      error: res => {
        console.log('error: ', res)
      }
    });

  }

  //------------- buscador ------------
  valores = ["casa", "cosa", "cerca", "amor", "parque", "vida", "desarrollo"];
  valuesToSearch = of("casa", "cosa", "cerca", "amor", "parque", "vida", "desarrollo");
  resultOfTheSearch: string[] = [];
  searchTerm$ = new Subject<string>();
  buscando: boolean = false;

  search$(value: string): Observable<string> {
    this.buscando = true;
    const found = this.valuesToSearch.pipe(
      delay(2000),
      filter(item => {
        this.buscando = false;
        return item.indexOf(value) > -1
      })
    );
    return found;
  }

  searchMethod(value: string) {
    this.resultOfTheSearch = [];
    // this.search$(value).subscribe(resp => console.log('>>> ', resp))
    if (value) {
      //Se busca a través de un Subject y no directo como arriba para poder usar un switchMap q cancela la operacion en curso y comienza una nueva cada vez que se inicia una busqueda
      this.searchTerm$.next(value);
    }
  }
  //------------- buscador fin ------------

  //------------- Operadores sobre la api de rickandmorty ------------
  tabVisible: number = 0;
  spinnerShow: boolean = false;
  characters$!: Observable<Response>;
  character$!: Observable<Character>;
  readonly API = "https://rickandmortyapi.com/api/character?page=1";
  paginaActual!: string;
  paginaUltima!: number;
  paginaNumberToGet!: number;
  formularioPageNumberHidde: boolean = true;
  formularioBuscarPersonajeHidde: boolean = true;
  nombrePersonaje!: string;

  getCharacters(url: string): void {
    this.spinnerShow = true;
    this.tabVisible = 1;
    this.characters$ = this.http.get<Response>(url).pipe(
      share(),//Con este operador se cachea la peticion (hay dos suscripciones con async a este Obs y en network del browser se ve una sola llamada)
      map((response: Response) => {
        this.paginaUltima = response.info.pages;
        this.paginaActual = "Página" + url.substring((url.indexOf("=") + 1), url.length) + " de " + this.paginaUltima;
        console.log(response);
        return response;
      })
    );
  }

  getCharactersPageNumber() {
    this.spinnerShow = true;
    this.tabVisible = 1;
    if (this.paginaNumberToGet > 0 && this.paginaNumberToGet <= this.paginaUltima)
      this.getCharacters("https://rickandmortyapi.com/api/character?page=" + this.paginaNumberToGet);
  }

  getCharacter() {
    this.spinnerShow = true;
    this.tabVisible = 2;
    const valorRandomPage = Math.floor(Math.random() * 42) + 1; //de 1 a 42 (las paginas que tiene)
    console.log(">>>>>>");
    console.log("Page: " + valorRandomPage);
    this.character$ = this.http.get<Response>(`https://rickandmortyapi.com/api/character?page=${valorRandomPage}`).pipe(
      map((resp) => {
        const valorRandomCharacter = Math.floor(Math.random() * resp.results.length); //de 0 a la longitud de la lista (sirve 20 por pagina)
        console.log("Posición: " + valorRandomCharacter);
        console.log(resp.results[valorRandomCharacter]);
        return resp.results[valorRandomCharacter].id;
      }),
      switchMap((id: number) => {
        return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`)
      })
    );
  }

  toggleformularioPageNumberHidde() {
    this.formularioPageNumberHidde = !this.formularioPageNumberHidde;
  }

  toggleformularioBuscarPersonaje() {
    this.formularioBuscarPersonajeHidde = !this.formularioBuscarPersonajeHidde;
  }

  //*** Buscador de personajes de Rick and Morty ***
  resultadosDePersonajes: Character[] = [];
  errorEnLaBusquedaDePersonajes: boolean = false;
  infoDeLaBusqueda!: Info;
  filterAPIbyPage!: string;
  paginaActualSearch: string = "1";
  searchTermAPIRickAndMorty$ = new Subject<string>();
  filterCharacter(name: string): Observable<Response> {
    let filterAPI: string = `https://rickandmortyapi.com/api/character/?name=${name}`;
    if (name === 'paginar') {
      filterAPI = this.filterAPIbyPage;
    }
    return this.http.get<Response>(filterAPI).pipe(
      tap(response => {
        const url = new URL(filterAPI);
        const page = url.searchParams.get('page');
        if (page) {
          this.paginaActualSearch = "Página " + page + " de " + response.info.pages;
        } else {
          this.paginaActualSearch = "Página 1 de " + response.info.pages;
        }
      }),
      catchError((error) => {
        console.log('error:>> ', error);
        this.resultadosDePersonajes = [];
        this.errorEnLaBusquedaDePersonajes = true;
        this.infoDeLaBusqueda = { count: 0, pages: 0, next: "", prev: "" };
        return EMPTY;
      })
    );
  }
  buscarPersonajeByName(name: string) {
    if (name && name.length >= 3) {
      this.spinnerShow = true;
      this.tabVisible = 3;
      this.searchTermAPIRickAndMorty$.next(name);
    }
  }
  buscarPersonajeByNameAndPage(url: string) {
    if (url) {
      this.spinnerShow = true;
      this.tabVisible = 3;
      this.filterAPIbyPage = url;
      this.searchTermAPIRickAndMorty$.next('paginar');
    }
  }
  //*** Buscador de personajes de Rick and Morty fin ***

  //------------- Operadores sobre la api de rickandmorty fin ------------

}
