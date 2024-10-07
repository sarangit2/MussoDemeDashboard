// src/app/components/article/article.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../incident.model';
import { ArticleService } from '../service/article.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Article[] = [];
  articleForm: FormGroup;
  selectedArticleId: number | undefined;
  Isvisible: boolean = false; // Contrôle la visibilité du modal

  searchText: string = ''; // Variable pour le texte de recherche

  constructor(private articleService: ArticleService, private fb: FormBuilder) { 
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      datePublication: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
    });
  }

  getTotalArticles(): number {
    return this.articles.length;
  }
  

  onSearchTextChange(event: Event) {
    const input = event.target as HTMLInputElement; // Spécifiez que l'élément cible est un HTMLInputElement
    this.searchText = input.value; // Mettez à jour searchText avec la valeur d'entrée
  }
  

  createArticle(): void {
    if (this.articleForm.valid) {
      const newArticle: Article = this.articleForm.value;
      this.articleService.createArticle(newArticle).subscribe((article) => {
        this.articles.push(article);
        this.articleForm.reset();
        this.Ferme(); // Ferme le modal après l'ajout
      });
    }
  }

  updateArticle(): void {
    if (this.selectedArticleId !== undefined && this.articleForm.valid) {
      const updatedArticle: Article = { ...this.articleForm.value, id: this.selectedArticleId };
      this.articleService.updateArticle(this.selectedArticleId, updatedArticle).subscribe(() => {
        const index = this.articles.findIndex(a => a.id === this.selectedArticleId);
        if (index !== -1) {
          this.articles[index] = updatedArticle;
        }
        this.articleForm.reset();
        this.selectedArticleId = undefined;
        this.Ferme(); // Ferme le modal après la mise à jour
      });
    }
  }

  selectArticle(article: Article): void {
    this.selectedArticleId = article.id;
    this.articleForm.patchValue(article);
    this.Ouvrir(); // Ouvre le modal pour modifier l'article
  }

  deleteArticle(id: number | undefined): void {
    if (id !== undefined) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(a => a.id !== id);
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
    this.selectedArticleId = undefined;
    this.articleForm.reset();
  }
}
