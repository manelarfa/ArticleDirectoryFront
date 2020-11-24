import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from '../articles/article.service';
import { Article } from './article.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class DataStorageService {

    constructor(private http:HttpClient,private articleService:ArticleService) {
    }

    storeArticles() {
        const articles=this.articleService.articles;
        this.http.put('http://localhost:8084/save',articles).subscribe();
    }

    fetchArticles() {
        return this.http.get<Article[]>('http://localhost:8084/fetch').pipe(tap(articles => {
            this.articleService.setArticles(articles);
        }));
    }
 
}