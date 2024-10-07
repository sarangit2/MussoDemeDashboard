import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreEmploi } from '../incident.model';
import { OffreEmploiService } from '../service/offre-emploi.service';

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.scss']
})
export class OffreEmploiComponent implements OnInit {
  offres: OffreEmploi[] = [];
  newOffre: OffreEmploi = new OffreEmploi();
  editMode: boolean = false;
  isModalVisible: boolean = false;
  offreForm: FormGroup;
  searchText: string = ''; // Variable pour le texte de recherche
  minExpirationDate: string = ''; // Minimum date for expiration
  today: string = ''; // Stocker la date du jour


  constructor(private offreEmploiService: OffreEmploiService, private fb: FormBuilder) {
    this.offreForm = this.fb.group({
      id: [''],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      entreprise: ['', Validators.required],
      localisation: ['', Validators.required],
      datePublication: ['', Validators.required],
      dateExpiration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOffres();
    this.today = new Date().toISOString().split('T')[0]; // Définit la date du jour (au format yyyy-MM-dd)
  }

  loadOffres(): void {
    this.offreEmploiService.getAllOffres().subscribe((data: OffreEmploi[]) => {
      this.offres = data;
    });
  }

  onSearchTextChange(event: Event) {
    const input = event.target as HTMLInputElement; // Spécifiez que l'élément cible est un HTMLInputElement
    this.searchText = input.value; // Mettez à jour searchText avec la valeur d'entrée
  }

  openModal(): void {
    this.isModalVisible = true;
    this.resetForm();
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.resetForm();
  }

  createOffre(): void {
    this.offreEmploiService.createOffre(this.offreForm.value).subscribe(() => {
      this.loadOffres();
      this.closeModal();
    });
  }

  editOffre(offre: OffreEmploi): void {
    this.newOffre = { ...offre };
    this.editMode = true;
    this.isModalVisible = true;
    this.offreForm.patchValue(offre); // Remplir le formulaire avec les données de l'offre
  }

  updateOffre(): void {
    if (this.offreForm.value.id) {
      this.offreEmploiService.updateOffre(this.offreForm.value.id, this.offreForm.value).subscribe(() => {
        this.loadOffres();
        this.closeModal();
        this.editMode = false;
      });
    }
  }

  deleteOffre(id: number): void {
    this.offreEmploiService.deleteOffre(id).subscribe(() => {
      this.loadOffres();
    });
  }

  resetForm(): void {
    this.offreForm.reset();
    this.editMode = false; // Réinitialiser le mode d'édition
  }

  // Function to handle the change in datePublication and set minExpirationDate
  onDatePublicationChange(): void {
    const publicationDate = this.offreForm.get('datePublication')?.value;
    if (publicationDate) {
      // Set the minimum expiration date as the day after the publication date
      this.minExpirationDate = publicationDate;
    }
  }
}
