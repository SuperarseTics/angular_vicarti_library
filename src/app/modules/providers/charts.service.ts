import { Injectable } from '@angular/core';
import moment from 'moment';
import { dataChart } from '../general/models/general.type';

@Injectable({
  providedIn: 'root'
})
export class ChartsOptionsService {

  constructor() { }

  buildClassicBarChart(data: dataChart[], legendName: string, colorBar: string): any {
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal', // Posiciona la leyenda horizontalmente
        top: 'top', // La coloca en la parte superior
        left: 'center', // Centra la leyenda horizontalmente
      },
      xAxis: {
        type: 'category',
        data: data.map(item => { return item.name}),
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [
        {
          name: legendName, // Nombre de la serie que aparece en la leyenda
          data: data.map(item => { return item.value}),
          type: 'bar',
          itemStyle: {
            color: colorBar
          }
        }
      ]
    }
    return option;
  }

  buildClassicPieChart(data: dataChart[]): any {
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal', // Corregido a 'horizontal'
        top: '10%', // Ubicación en la parte superior
        left: 'center', // Centrado horizontalmente
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: data,
        }
      ]
    }
    return option;
  }
}
