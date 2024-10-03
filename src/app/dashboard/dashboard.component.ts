import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formationsData: any;
  incidentsData: any;

  formationsOptions: any;
  incidentsOptions: any;

  ngOnInit() {
    // Bar chart data for Rapport Formations
    this.formationsData = {
      labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Deposit',
          backgroundColor: '#00c0ef',
          data: [400, 200, 300, 500, 300, 200, 100]
        },
        {
          label: 'Withdraw',
          backgroundColor: '#ff6384',
          data: [200, 100, 400, 300, 200, 500, 400]
        }
      ]
    };

    // Pie chart data for Rapport Incidents
    this.incidentsData = {
      labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
      datasets: [
        {
          data: [30, 15, 20, 35],
          backgroundColor: ['#FF6384', '#FFCD56', '#36A2EB', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#FFCD56', '#36A2EB', '#4BC0C0']
        }
      ]
    };

    // Chart options for customizing appearance
    this.formationsOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {},
        y: {
          beginAtZero: true
        }
      }
    };

    this.incidentsOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };
  }
}