import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-myarticle-edit',
  templateUrl: './myarticle-edit.component.html',
  styleUrls: ['./myarticle-edit.component.css']
})
export class MyarticleEditComponent implements OnInit {
  id:number;
  editMode=false;
  articleForm:FormGroup;
  currentDate:String;
  authorname:String;

  constructor(private route:ActivatedRoute,private articleService:ArticleService ,private router:Router,
    private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.currentDate = new Date().toISOString().slice(0,10);

    const user:User= JSON.parse(sessionStorage.getItem('userData'));
    this.authorname=user.username.toUpperCase();
    
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
      window.scrollTo(0,0);
  }

  onSubmit() {
    console.log(this.articleForm);
    if(this.editMode) {
      this.articleService.updateArticle(this.id,this.articleForm.value);
    }else {
      this.articleService.addArticle(this.articleForm.value);
    }
    this.dataStorageService.storeArticles()
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['.'],{relativeTo:this.route.parent});
    window.scrollTo(0,0);
  }

  onAddThings() {
    (<FormArray>this.articleForm.get('things')).push(
      new FormGroup({
        'desc': new FormControl(null,Validators.required)
      })
    )}

    onAddSteps() {
      (<FormArray>this.articleForm.get('steps')).push(
        new FormGroup({
          'desc': new FormControl(null,Validators.required),
          'imagePath': new FormControl(null,Validators.required)
        })
      )}

    onDeleteThing(index:number) {
      (<FormArray>this.articleForm.get('things')).removeAt(index);
    }

    onDeleteStep(index:number) {
      (<FormArray>this.articleForm.get('steps')).removeAt(index);
    }

  getControlsOfThings() {
    return (this.articleForm.get('things') as FormArray).controls;
  }

  getControlsOfSteps() {
    return (this.articleForm.get('steps') as FormArray).controls;
  }

  private initForm() {
    let articleName='';
    let articleDescription='';
    let articleCategory='';
    let articleImagePath='';
    let articleAuthor=this.authorname;
    let articleAboutAuthor='';
    let articleDate=this.currentDate;
    let articleTip='';
    let articleThings=new FormArray([]);
    let articleSteps=new FormArray([]);
    
    if(this.editMode) {
      const article=this.articleService.getArticle(this.id);
      articleName = article.name;
      articleDescription = article.description;
      articleCategory = article.category;
      articleImagePath = article.imagePath;
      articleAuthor = article.author;
      articleAboutAuthor = article.aboutauthor;
      articleDate = article.date;
      articleTip = article.tip;

      if(article['things']) {
        for(let thing of article.things) {
          articleThings.push(
            new FormGroup({
              'desc': new FormControl(thing.desc,Validators.required)
            })
          )
        }
      }

      if(article['steps']) {
        for(let step of article.steps) {
          articleSteps.push(
            new FormGroup({
              'desc': new FormControl(step.desc,Validators.required),
              'imagePath':new FormControl(step.imagePath,Validators.required)
            })
          )
        }
      }
    }

    this.articleForm= new FormGroup({
      'name':new FormControl(articleName,Validators.required),
      'description':new FormControl(articleDescription,Validators.required),
      'category':new FormControl(articleCategory,Validators.required),
      'imagePath':new FormControl(articleImagePath,Validators.required),
      'author':new FormControl(articleAuthor,Validators.required),
      'aboutauthor':new FormControl(articleAboutAuthor,Validators.required),
      'date':new FormControl(articleDate,Validators.required),
      'tip':new FormControl(articleTip,Validators.required),
      'things':articleThings,
      'steps':articleSteps
    })
  }

}
