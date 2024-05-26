import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements AfterViewInit {

    tabs = [
        {
            name: 'Informatii Generale',
            target: 'knowledge',
            content: 'Informatii generale privind cursul...',
            active: true
        },
        {
            name: 'Notare',
            target: 'grading',
            content: 'Informatii referitoare la metoda de notare (% si din ce)...',
            active: false
        }
    ];

    selectTab(tab: any) {
        this.tabs.forEach(t => t.active = false);
        tab.active = true;
        if (tab.name === 'Notare') {
            setTimeout(() => this.createChart(), 0); // Ensure the chart is created after the DOM update
        }
    }

    ngAfterViewInit() {
        Chart.register(...registerables);
        if (this.tabs.find(tab => tab.name === 'Notare')?.active) {
            this.createChart();
        }
    }

    createChart() {
        const canvas = document.getElementById('gradeChart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Tests', 'Homeworks', 'Final Project'],
                datasets: [{
                    data: [30, 30, 40],
                    backgroundColor: ['#3498db', '#1abc9c', '#e74c3c'],
                    hoverBackgroundColor: ['#2980b9', '#16a085', '#c0392b']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}
