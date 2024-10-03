export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  role?: Role; // Propriété pour le rôle
  // Assurez-vous de gérer le mot de passe correctement
  // Ajoutez d'autres champs si nécessaire
}
export class Role {
  id!: number;
  nom!: string;
}
// src/app/models/article.model.ts
export interface Article {
  id?: number;
  titre: string;
  description: string;
  type: string;
  datePublication: string; // format "YYYY-MM-DD"
}

export class Formation {
  id?: number;
  titre!: string;
  description!: string;
  dateDebut!: string; // format 'yyyy-MM-dd'
  dateFin!: string;   // format 'yyyy-MM-dd'
  organisateur!: string;
  utilisateurId?: number; // Relation avec l'utilisateur
}

export class OffreEmploi {
  id!: number;
  titre!: string;
  description!: string;
  entreprise!: string;
  localisation!: string;
  datePublication!: string;
  dateExpiration!: string;
  utilisateurId!: number; // ID de l'utilisateur qui a posté l'offre
}
