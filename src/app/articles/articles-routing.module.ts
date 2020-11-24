import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticleResolverService } from './article-resolver.service';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-list/article-content/article-content.component';
import { MyarticlesComponent } from './myarticles/myarticles.component';
import { AuthGuard } from '../auth/auth.guard';
import { MycontentComponent } from './myarticles/mycontent/mycontent.component';
import { MyarticleEditComponent } from './myarticles/myarticle-edit/myarticle-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
{path: '', component: ArticlesComponent,resolve:[ArticleResolverService],children:[
    {path:'',component:ArticleListComponent,children:[
    {path:'',component:ArticleContentComponent},
    ]},
    {path:'mypost',component:MyarticlesComponent,canActivate:[AuthGuard],children:[
        {path:'',component:MycontentComponent},
        {path:'new',component:MyarticleEditComponent},
        {path:':id/edit',component:MyarticleEditComponent},
    ]},
    {path:':id',component:ArticleDetailComponent},
    ]},
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule]
})
export class ArticlesRoutingModule {}