import { Component, OnInit } from '@angular/core';
import { Article } from '../incident.model';
import { ArticleService } from '../service/article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importation du module pour gérer le modal Bootstrap

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle: Article = {} as Article;
  isEditMode = false;

  constructor(private articleService: ArticleService, private modalService: NgbModal) {} // Injecter le modalService

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  onSelect(article: Article): void {
    this.selectedArticle = { ...article };
    this.isEditMode = true;
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.articleService.updateArticle(this.selectedArticle.id!, this.selectedArticle).subscribe(() => {
        this.loadArticles();
        this.resetForm();
      });
    } else {
      this.articleService.createArticle(this.selectedArticle).subscribe(() => {
        this.loadArticles();
        this.resetForm();
      });
    }
    // Fermer le modal après la soumission
    const modal = document.getElementById('articleModal') as HTMLElement;
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.removeAttribute('aria-modal');
  }

  onDelete(id: number): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.loadArticles();
    });
  }

  resetForm(): void {
    this.selectedArticle = {} as Article;
    this.isEditMode = false;
  }
}
