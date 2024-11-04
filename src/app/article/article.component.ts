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
  selectedAudioFile: File | null = null; // Variable for selected audio file
  Isvisible: boolean = false;

  searchText: string = '';

  // Pagination properties
  currentPage: number = 1;
  articlesPerPage: number = 2;

  constructor(private articleService: ArticleService, private fb: FormBuilder) { 
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
     // datePublication: ['', Validators.required],
      audioUrl: [''] // Add audioUrl as a FormControl
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }

  get paginatedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    return this.articles.slice(startIndex, startIndex + this.articlesPerPage);
  }

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

  get totalPages() {
    return Math.ceil(this.articles.length / this.articlesPerPage);
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
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }

  createArticle(): void {
    if (this.articleForm.valid && this.selectedAudioFile) {
        const newArticle: Article = this.articleForm.value;
        console.log('Création de l\'article avec les données :', newArticle);
        console.log('Fichier audio sélectionné :', this.selectedAudioFile);

        this.articleService.createArticle(newArticle, this.selectedAudioFile).subscribe({
            next: (response) => {
                console.log('Article créé avec succès :', response);
                this.articles.push(newArticle);
                this.articleForm.reset();
                this.Ferme();
            },
            error: (error) => {
                console.error('Erreur lors de la création de l\'article :', error);
                if (error.error) {
                    console.error('Réponse du backend :', error.error); // Afficher la réponse du backend
                }
            }
        });
    } else {
        console.warn('Le formulaire est invalide ou le fichier audio n\'est pas sélectionné');
    }
}


  onAudioFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedAudioFile = input.files[0]; // Get selected audio file
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
        this.Ferme();
      });
    }
  }

  selectArticle(article: Article): void {
    this.selectedArticleId = article.id;
    this.articleForm.patchValue(article);
    this.Ouvrir();
  }

  deleteArticle(id: number | undefined): void {
    if (id !== undefined) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(a => a.id !== id);
      });
    }
  }

  Ouvrir(): void {
    this.Isvisible = true;
  }

  Ferme(): void {
    this.Isvisible = false;
    this.resetForm();
  }

  resetForm(): void {
    this.selectedArticleId = undefined;
    this.articleForm.reset();
    this.selectedAudioFile = null;
  }
}
