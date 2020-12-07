import { Injectable } from '@angular/core';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

import {map, catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";

import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    console.log(this.http.get)
    const dishesURL = `${baseURL}dishes`;
    return this.http.get<Dish[]>(dishesURL)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getDish(id: string): Observable<Dish> {
    const dishIDURL = `${baseURL}dishes/${id}`;
    return this.http.get<Dish>(dishIDURL)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedDish(): Observable<string[] | any> {
    const featuredURL = `${baseURL}dishes?featured=true`;
    return this.http.get<Dish[]>(featuredURL).pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error
    ));
  }
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const dishURL = `${baseURL}/dishes/${dish.id}`
    return this.http.put<Dish>(dishURL, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
