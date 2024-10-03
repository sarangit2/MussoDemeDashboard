import { Component, OnInit } from '@angular/core';
import { OffreEmploi } from '../incident.model';
import { OffreEmploiService } from '../service/offre-emploi.service';

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrl: './offre-emploi.component.scss'
})
export class OffreEmploiComponent implements OnInit {
  offres: OffreEmploi[] = [];
  newOffre: OffreEmploi = new OffreEmploi();
  editMode: boolean = false;

  constructor(private offreEmploiService: OffreEmploiService) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.offreEmploiService.getAllOffres().subscribe((data: OffreEmploi[]) => {
      this.offres = data;
    });
  }

  createOffre(): void {
    this.offreEmploiService.createOffre(this.newOffre).subscribe(() => {
      this.loadOffres();
      this.newOffre = new OffreEmploi(); // Réinitialiser le formulaire
    });
  }

  editOffre(offre: OffreEmploi): void {
    this.newOffre = { ...offre };
    this.editMode = true;
  }

  updateOffre(): void {
    if (this.newOffre.id) {
      this.offreEmploiService
        .updateOffre(this.newOffre.id, this.newOffre)
        .subscribe(() => {
          this.loadOffres();
          this.newOffre = new OffreEmploi();
          this.editMode = false;
        });
    }
  }

  deleteOffre(id: number): void {
    this.offreEmploiService.deleteOffre(id).subscribe(() => {
      this.loadOffres();
    });
  }


   // Méthode pour réinitialiser le formulaire
   resetForm(): void {
    this.newOffre = new OffreEmploi(); // Réinitialiser les champs du formulaire
    this.editMode = false; // Réinitialiser le mode d'édition
  }
}