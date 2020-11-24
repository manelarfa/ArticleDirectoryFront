import { Injectable } from '@angular/core';
import { Article } from '../shared/article.model';
import { Resolve } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
    providedIn:'root'
})
export class ArticleResolverService implements Resolve<Article[]> {

    constructor(private dataStorageService:DataStorageService) {
    }

    resolve() {
        return this.dataStorageService.fetchArticles();
    }
}