import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formation } from '../incident.model';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'] // Correction ici : 'styleUrl' devrait être 'styleUrls'
})
export class FormationsComponent implements OnInit {
  formations: Formation[] = [];
  formationForm: FormGroup; // Formulaire pour créer ou mettre à jour une formation
  selectedFormationId: number | undefined; // ID de la formation sélectionnée pour la mise à jour

  constructor(private formationService: FormationService, private fb: FormBuilder) { 
    this.formationForm = this.fb.group({ // Initialisation du formulaire
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required], // Champ date de début
      dateFin: ['', Validators.required], // Champ date de fin
      organisateur: ['', Validators.required], // Champ organisateur
      // Ajoutez d'autres champs selon votre modèle Formation
    });
  }

  ngOnInit(): void {
    this.getFormations();
  }

  // Récupérer toutes les formations
  getFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
    });
  }

  // Créer une nouvelle formation
  createFormation(): void {
    if (this.formationForm.valid) {
      const newFormation: Formation = this.formationForm.value; // Récupérer les valeurs du formulaire
      this.formationService.createFormation(newFormation).subscribe((formation) => {
        this.formations.push(formation); // Ajouter la nouvelle formation à la liste
        this.formationForm.reset(); // Réinitialiser le formulaire
      });
    }
  }

  // Mettre à jour une formation existante
  updateFormation(): void {
    if (this.selectedFormationId !== undefined && this.formationForm.valid) {
      const updatedFormation: Formation = { ...this.formationForm.value, id: this.selectedFormationId };
      this.formationService.updateFormation(this.selectedFormationId, updatedFormation).subscribe(() => {
        const index = this.formations.findIndex(f => f.id === this.selectedFormationId);
        if (index !== -1) {
          this.formations[index] = updatedFormation; // Mettre à jour la formation dans la liste
        }
        this.formationForm.reset(); // Réinitialiser le formulaire
        this.selectedFormationId = undefined; // Réinitialiser l'ID de sélection
      });
    }
  }

  // Sélectionner une formation pour la mise à jour
  selectFormation(formation: Formation): void {
    this.selectedFormationId = formation.id; // Enregistrer l'ID de la formation sélectionnée
    this.formationForm.patchValue(formation); // Remplir le formulaire avec les données de la formation
  }

  // Supprimer une formation
  deleteFormation(id: number | undefined): void {
    if (id !== undefined) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.formations = this.formations.filter(f => f.id !== id);
      });
    } else {
      console.error("Erreur : L'ID de la formation est undefined, impossible de supprimer.");
    }
  }

  resetForm(): void {
    this.selectedFormationId = undefined; // Réinitialiser l'ID de sélection
    this.formationForm.reset(); // Réinitialiser les champs du formulaire
  }
  
}
