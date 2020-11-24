import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from '../../article.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit {

  articles:Article[]=[];
  selectionCategory:string='';
  searchedKeyword:string='';
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
    this.articles=this.articleService.articles;
    this.articleService.categorySelection.subscribe(
      (category:string) => {
        this.searchedKeyword='';
        this.selectionCategory=category;
      });

    this.articleService.searchkeyword.subscribe(
      (keyword:string)=>{
        this.selectionCategory='';
        this.searchedKeyword=keyword;
      });
    this.resetList();
  }

  private resetList() {
    this.articleService.resetList.subscribe(
      ()=> {
        this.selectionCategory='';
        this.searchedKeyword='';
      }
    )
  }

  onSearchKeyword(name:string) {
    if(this.searchedKeyword=='') {
      return false;
    }
    return name.toLowerCase().includes(this.searchedKeyword.toLowerCase());
  }

  onSelectCategory(category:string) {
    if(this.selectionCategory=='') {
       return false;
      }
    return this.selectionCategory==category;
  }
  
}
