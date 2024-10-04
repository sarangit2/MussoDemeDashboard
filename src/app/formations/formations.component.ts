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
  Isvisible: boolean = false; // Propriété pour contrôler la visibilité du modal

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
        this.Ferme(); // Fermer le modal après l'ajout
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
        this.Ferme(); // Fermer le modal après la mise à jour
      });
    }
  }

  selectFormation(formation: Formation): void {
    this.selectedFormationId = formation.id;
    this.formationForm.patchValue(formation);
    this.Ouvrir(); // Ouvrir le modal avec les données de la formation sélectionnée
  }

  deleteFormation(id: number | undefined): void {
    if (id !== undefined) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.formations = this.formations.filter(f => f.id !== id);
      });
    }
  }

  resetForm(): void {
    this.selectedFormationId = undefined;
    this.formationForm.reset();
    this.Ouvrir(); // Ouvrir le modal pour ajouter une nouvelle formation
  }

  Ouvrir(): void {
    this.Isvisible = true; // Ouvrir le modal
  }

  Ferme(): void {
    this.Isvisible = false; // Fermer le modal
  }
}
