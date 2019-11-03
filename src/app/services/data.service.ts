import { Injectable } from '@angular/core';
import { DataI } from '../models/DataI';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URI = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { } //agregar http:HttpClient

  getGames() {
    return this.http.get(`${this.API_URI}/games`);
  }
  getGame(id: string) {
    return this.http.get(`${this.API_URI}/games/${id}`);
  }
  saveGame(game: DataI) { //necesita un objeto game de tipo Game(interface)
    return this.http.post(`${this.API_URI}/games`, game);
  }  
  updateGame(id: string|number, updatedGame: DataI): Observable<DataI> { //va a retornar un observable tipo juego
    return this.http.put(`${this.API_URI}/games/${id}`, updatedGame);
  }
  deleteGame(id: string) { //necesita un objeto de tipo Game
    return this.http.delete(`${this.API_URI}/games/${id}`);
  }
}
