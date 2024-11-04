export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
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



// formation.model.ts
export interface Formation {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  organisateur: string;
  dateAjout?: string; // date ajoutée automatiquement
  categorie: string; // Enum en tant que string
  utilisateur?: any; // Remplacez par l'interface Utilisateur si elle est définie
  videoPath?: string;
  imageUrl?: string;
  pdfPath?: string;
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
