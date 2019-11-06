import { Component, OnInit } from '@angular/core';

//------------------Added-------------
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

import { DataService } from '../../services/data.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let Cylinder = require('highcharts/modules/cylinder')

import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);
//require('cylinder');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
Cylinder(Highcharts);
//------------------Added-------------

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  constructor(private http: HttpClient,//httpclient added
    private dataService: DataService) {

  } 

  ngOnInit() {
    this.dataService.getData();
  }
  

}
