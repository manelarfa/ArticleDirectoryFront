import { Component, OnInit} from '@angular/core';
import { ArticleService } from '../articles/article.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface NewsletterData {
  email:string;
  existing:boolean;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  error:string=null;
  success:string=null;

  constructor(private articleService:ArticleService,private http:HttpClient) { }

  ngOnInit() {
  }
  
  onReset() {
    this.articleService.resetList.emit();
    window.scrollTo(0,0);
  }

  onClose() {
    this.error=null;
    this.success=null;
}

  onSubmit(form:NgForm) {
    const email=form.value.email;
    this.http.post<NewsletterData>('http://localhost:8080/subscribe',
    {
        "email": email,
        "existing" :false
    }).subscribe(resData=>{
      if(resData.existing) {
        this.success=null;
        this.error="You have already subscribed to our newsletter";
      }
      else {
        this.error=null;
        this.success="You have successfully subscribed to our newsletter";
      }
    })
    form.reset();
  }
}