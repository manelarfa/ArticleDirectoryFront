import { Thing } from './thing.model';
import { Step } from './step.model';

export class Article {
    public name:string;
    public description:string;
    public category:string;
    public imagePath:string;
    public author:string;
    public aboutauthor:string;
    public date:string;
    public tip:string;
    public things:Thing[];
    public steps:Step[];

    constructor(name:string,desc:string,category:string,imagePath:string,author:string,aboutauthor:string,
        date:string,tip:string,things:Thing[],steps:Step[]) {
        this.name=name;
        this.description=desc;
        this.category=category;
        this.imagePath=imagePath;
        this.author=author;
        this.aboutauthor=aboutauthor;
        this.date=date;
        this.tip=tip;
        this.things=things;
        this.steps=steps;
    }
}