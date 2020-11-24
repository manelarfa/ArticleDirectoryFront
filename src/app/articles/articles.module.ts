import { NgModule } from '@angular/core';
import { ArticlesComponent } from './articles.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleContentComponent } from './article-list/article-content/article-content.component';
import { MyarticlesComponent } from './myarticles/myarticles.component';
import { MyarticleEditComponent } from './myarticles/myarticle-edit/myarticle-edit.component';
import { MycontentComponent } from './myarticles/mycontent/mycontent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
    ArticlesComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleContentComponent,
    MyarticlesComponent,
    MyarticleEditComponent,
    MycontentComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ArticlesRoutingModule
    ]
})
export class ArticlesModule {

}