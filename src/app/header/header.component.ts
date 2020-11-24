import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../articles/article.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated=false;

  constructor(private articleService:ArticleService,private router:Router,
    private authService:AuthService) {
       
  }

  ngOnInit() {
    this.authService.user.subscribe((user: User)=>{        
      this.isAuthenticated=user? true:false;
    });
  }

  onSelection(select:string) {
    this.router.navigate(['/articles']);
    this.articleService.categorySelection.emit(select);
    window.scrollBy(0,520);
  }
  onReset() {
    this.articleService.resetList.emit();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/articles']);
  }

  onRegister() {
    this.router.navigate(['/auth','signup']);
  }

  onLogin() {
    this.router.navigate(['/auth']);
  }

  onSubmit(form:NgForm) {
    const keyword=form.value.keyword;
    this.router.navigate(['/articles']);
    this.articleService.searchkeyword.emit(keyword);
    window.scrollBy(0,520);
    form.reset();
  }

}
