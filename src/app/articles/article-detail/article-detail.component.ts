import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/shared/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit, AfterViewChecked {
  article:Article;
  articles:Article[]=[];
  id:number;
  constructor(private articleService:ArticleService,private route:ActivatedRoute,
    private router:Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(
      (params:Params) => {
        this.id=+params['id'];
        this.article=this.articleService.getArticle(this.id);
      })
  this.articles=this.articleService.articles;
  }

  onSelection(idx :number) {
    this.router.navigate(['articles',idx])
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);
  }
  
}
