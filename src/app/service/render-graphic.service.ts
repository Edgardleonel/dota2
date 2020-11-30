import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class RenderGraphicService {
  public chart: Chart;

  constructor() {}

  renderGraphic(dataApi) {
    if (this.chart) {
      this.chart.destroy();
    }
    const background1 = new Array(dataApi.length).fill('rgba(75, 192, 192, 0.2)');
    const border1 = new Array(dataApi.length).fill('rgba(75, 192, 192, 1)');
    const background2 = new Array(dataApi.length).fill('rgba(255, 99, 132, 0.2)');
    const border2 = new Array(dataApi.length).fill('rgba(255, 99, 132, 1)');


    const dataWin = {
      label: `Vitórias no Dota2`,
      data: dataApi.map(item => item.wins),
      backgroundColor: background1,
      borderColor: border1,
      borderWidth: 1
    };

    const dataLosses = {
      label: `Derrotas no Dota2`,
      data: dataApi.map(item => item.losses),
      backgroundColor: background2,
      borderColor: border2,
      borderWidth: 1
    };

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
          labels: dataApi.map(item => item.name),
          datasets: [dataWin, dataLosses]
      },
      options: {
        responsive: true,
          scales: {
              yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          },
      }
    });
  }

}
