import { Injectable } from '@angular/core';
import { DataI } from '../models/DataI';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';
import { GLOBAL } from './global';
import * as Highcharts from 'highcharts';

//import { Chart } from 'angular-highcharts';
//require('highcharts/highcharts-more')


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //API_URI = 'http://localhost:3000/api';
  url;
  subscription: Subscription;


  data: any[];
  //------------------Added-------------



  public chartOptions: any = {
    chart: {
      renderTo: 'container',
      type: 'cylinder',
      margin: 75,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'Chart rotation demo'
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    series: [{
      /*data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
              194.1, 95.6, 54.4]*/




      //serie 0

      name: 'AEG',
      //turboThreshold: 500000,
      data: [22.3, 29.9, 63.2, 146.4, 129.2]
    },
    {//serie 1
      name: 'PEG',
      //turboThreshold: 500000,
      data: [12.7, 98.2, 71.3, 86.4, 13.2]
    }, {//serie 2
      name: 'GEG',
      //turboThreshold: 500000,
      data: [42.5, 25.1, 55.5, 106.4, 43.2]
    },
    ]
  };


  public options: any = {
    chart: {
      type: 'spline',
      height: 700
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + ' y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {//serie 0
        name: 'Normal',
        turboThreshold: 500000,
        data: []
      },
      {//serie 1
        name: 'Abnormal',
        turboThreshold: 500000,
        data: []
      }
    ]
  }
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url
    //console.log("servicio data funcionando");
  }
  getApiResponse(url) {
    return this._http.get(url, {})
      .toPromise().then(res => {
        return res;
      });
  }




  getData() {

    const source = interval(10000);
    //const obs = new Observable<number>();
    
    this.subscription = source.subscribe(val => this.getApiResponse(GLOBAL.url)
      .then((data: any[]) => { //definir que es un arreglo de forma explicita
        console.log('suscrito');
        //definidos los arreglos donde se almacenara la informacion que viene
        const updated_normal_data = [];
        const updated_abnormal_data = [];

        data.forEach(row => {
          const temp_row = [
            new Date(row.timestamp).getTime(),
            row.value
          ];
          row.Normal === 1 ? updated_normal_data.push(temp_row) : updated_abnormal_data.push(temp_row);
        });

        //pasamos los datos al chart
        this.options.series[0]['data'] = updated_normal_data;
        this.options.series[1]['data'] = updated_abnormal_data;


        Highcharts.chart('container', this.chartOptions);
        if(this.subscription)
        this.subscription.unsubscribe();




      },
        error => { //si llega un error
          console.log('Something went wrong.');
        })
    );
  }

  /*
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
    }*/
}
