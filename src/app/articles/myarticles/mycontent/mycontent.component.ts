import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from '../../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-mycontent',
  templateUrl: './mycontent.component.html',
  styleUrls: ['./mycontent.component.css']
})
export class MycontentComponent implements OnInit {

  articles:Article[]=[];
  authorname:String;
  count:number=0;
  constructor(private articleService:ArticleService,private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.articles=this.articleService.articles;
    const user:User= JSON.parse(sessionStorage.getItem('userData'));
    this.authorname=user.username.split(" ").join("").toLowerCase();
    this.checkUserExists();
  }

  private checkUserExists() {
    for(let i of this.articleService.articles) {
      var temp=i.author.split(" ").join("").toLowerCase();
      if(temp==this.authorname) {
        this.count++;
      }
    }
  }

  onDelete(index:number) {
    if(confirm("Are you sure you want to delete this item?")) {
    this.articleService.deleteArticle(index);
    this.dataStorageService.storeArticles();
    this.count--;
    window.scrollTo(0,0);
    }
  }

  onSelectAuthor(author:String) {
    var temp=author.split(" ").join("").toLowerCase();;
    if (temp==this.authorname) return true;
    else return false;
  }

  onAddPost() {
    window.scrollTo(0,0);
  }

}
