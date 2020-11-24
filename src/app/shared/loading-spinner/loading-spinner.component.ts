import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template:`<div class="spinner">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>`,
    styleUrls:['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}