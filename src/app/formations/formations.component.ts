import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formation } from '../incident.model';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {
  formations: Formation[] = [];
  formationForm: FormGroup;
  selectedFormationId: number | undefined;
  Isvisible: boolean = false; // Contrôle la visibilité du modal
  searchText: string = ''; // Variable pour le texte de recherche
  today: string = ''; // Stocker la date du jour
  minDateFin: string = ''; // Stocker la date minimum pour la date de fin


     // Pagination properties
     currentPage: number = 1;
     formationPerPage: number = 2; // Nombre d'articles par page
   
  constructor(private formationService: FormationService, private fb: FormBuilder) { 
    this.formationForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      organisateur: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getFormations();
    this.today = new Date().toISOString().split('T')[0]; // Définit la date du jour (au format yyyy-MM-dd)
  }

  onSearchTextChange(event: Event) {
    const input = event.target as HTMLInputElement; // Spécifiez que l'élément cible est un HTMLInputElement
    this.searchText = input.value; // Mettez à jour searchText avec la valeur d'entrée
  }

    // Calculer les articles paginés
    get paginatedFormation() {
      const startIndex = (this.currentPage - 1) * this.formationPerPage;
      return this.formations.slice(startIndex, startIndex + this.formationPerPage);
    }

    // Méthodes de pagination
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Calculer le nombre total de pages
  get totalPages() {
    return Math.ceil(this.formations.length / this.formationPerPage);
  }

  

  getFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
    });
  }

  createFormation(): void {
    if (this.formationForm.valid) {
      const newFormation: Formation = this.formationForm.value;
      this.formationService.createFormation(newFormation).subscribe((formation) => {
        this.formations.push(formation);
        this.formationForm.reset();
        this.Ferme(); // Ferme le modal après l'ajout
      });
    }
  }

  updateFormation(): void {
    if (this.selectedFormationId !== undefined && this.formationForm.valid) {
      const updatedFormation: Formation = { ...this.formationForm.value, id: this.selectedFormationId };
      this.formationService.updateFormation(this.selectedFormationId, updatedFormation).subscribe(() => {
        const index = this.formations.findIndex(f => f.id === this.selectedFormationId);
        if (index !== -1) {
          this.formations[index] = updatedFormation;
        }
        this.formationForm.reset();
        this.selectedFormationId = undefined;
        this.Ferme(); // Ferme le modal après la mise à jour
      });
    }
  }

  selectFormation(formation: Formation): void {
    this.selectedFormationId = formation.id;
    this.formationForm.patchValue(formation);
    this.Ouvrir(); // Ouvre le modal pour modifier la formation
  }

  deleteFormation(id: number | undefined): void {
    if (id !== undefined) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.formations = this.formations.filter(f => f.id !== id);
      });
    }
  }

  Ouvrir(): void {
    this.Isvisible = true; // Affiche le modal
  }

  Ferme(): void {
    this.Isvisible = false; // Masque le modal
    this.resetForm(); // Réinitialise le formulaire
  }

  resetForm(): void {
    this.selectedFormationId = undefined;
    this.formationForm.reset();
  }

  // Méthode pour mettre à jour la date minimale de fin lorsque la date de début change
 // Méthode pour mettre à jour la date minimale de fin lorsque la date de début change
 onDateDebutChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.minDateFin = input.value; // Met à jour minDateFin en fonction de dateDebut
  this.formationForm.get('dateFin')?.setValue(''); // Réinitialise la date de fin si la date de début est modifiée
}
}
