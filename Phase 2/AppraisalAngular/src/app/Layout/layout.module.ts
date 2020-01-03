import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatCardModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSlideToggleModule,
        FormsModule, 
        ReactiveFormsModule,
        BrowserModule
  
    ],
    exports: [ 
      HeaderComponent,
      FooterComponent
    ],
    declarations: [
   
      HeaderComponent
 
    ]
  })
  export class LayoutModule { }
