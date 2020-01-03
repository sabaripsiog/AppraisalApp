import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { DisplaycardComponent } from './Layout/displaycard/displaycard.component';
import { LayoutModule } from './Layout/layout.module';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSlideToggleModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppraisallogComponent } from './appraisallog/appraisallog.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { GoallistComponent } from './goallist/goallist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './user-routes';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DisplaycardComponent,
    AppraisallogComponent,
    GoallistComponent,
    DialogBoxComponent,
    UserComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
    FlexLayoutModule,
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
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
   DialogBoxComponent
  ],
})
export class AppModule { }
