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

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
//------------------Added-------------

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {

  constructor(private http: HttpClient,//httpclient added
    private dataService: DataService) {

  } 

  ngOnInit() {

     this.dataService.getData();
    //this.dataService.getData();
    //Highcharts.chart('container', this.dataService.options);//actualizamos chart


  }
}
