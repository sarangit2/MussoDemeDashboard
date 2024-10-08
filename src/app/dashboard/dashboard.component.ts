import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Article, Formation, OffreEmploi } from '../incident.model';
import { ArticleService } from '../service/article.service';
import { OffreEmploiService } from '../service/offre-emploi.service';
import { UserService } from '../service/user.service';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  articles: Article[] = [];
  users: any[] = [];
  offres: OffreEmploi[] = [];
  formations: Formation[] = [];
  recentFormations: Formation[] = []; // Variable pour stocker les 3 dernières formations
  formationsData: any;
  incidentsData: any;
  formationsOptions: any;
  incidentsOptions: any;

  constructor(
    private articleService: ArticleService,
    private offreEmploiService: OffreEmploiService,
    private userService: UserService,
    private formationService: FormationService
  ) {}

  ngOnInit() {
    this.getArticles();
    this.loadOffres();
    this.loadUsers();
    this.getRecentFormations(); // Récupérer les formations récentes au chargement du composant

    // Données pour les graphiques
    this.loadFormationsByMonth();
  }

  // Charger les formations par mois et configurer le graphique
  loadFormationsByMonth(): void {
    this.formationService.getFormationsByMonth().subscribe(data => {
      const months = data.map((item: any) => item.month);
      const counts = data.map((item: any) => item.count);

      this.formationsData = {
        labels: months,
        datasets: [
          {
            label: 'Nombre de formations',
            backgroundColor: '#FE5C73',
            data: counts
          }
        ]
      };

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
    });
  

    // Pie chart data for Rapport Incidents
    this.incidentsData = {
      labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
      datasets: [
        {
          data: [30, 15, 20, 35],
          backgroundColor: ['#FF6384', '#FFCD56', '#36A2EB', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#FFCD56', '#36A2EB', '#4BC0C0'],
          hoverOffset: 4,
        }
      ]
    };

    // Options for charts
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
      cutout: '30%',
      radius: "20%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };
  }

  getArticles(): void {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
    });
  }

  loadOffres(): void {
    this.offreEmploiService.getAllOffres().subscribe((data: OffreEmploi[]) => {
      this.offres = data;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }

  // Nouvelle méthode pour récupérer les 3 dernières formations
  getRecentFormations(): void {
    this.formationService.getUpcomingFormations().subscribe(data => {
      this.recentFormations = data; // Stocker les formations récentes
    });
  }

  // Total count
  getTotalArticles(): number {
    return this.articles.length;
  }

  getTotalUsers(): number {
    return this.users.length;
  }

  getTotalOffres(): number {
    return this.offres.length;
  }
}
