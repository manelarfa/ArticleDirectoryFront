import { Component, OnInit, AfterContentChecked, DoCheck } from '@angular/core';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
  featuredArticle:Article;
  featuredArticleid:number;
  constructor(private articleService:ArticleService) { 
  }

  
  ngOnInit() {
    this.featuredArticleid=this.articleService.getRandomArticle();
    this.featuredArticle=this.articleService.articles[this.featuredArticleid];
    
  }
}
