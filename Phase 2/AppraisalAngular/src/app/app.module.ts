import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { DisplaycardComponent } from './Layout/displaycard/displaycard.component';

import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSlideToggleModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppraisallogComponent } from './appraisallog/appraisallog.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpHandler, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoallistComponent } from './goallist/goallist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './user-routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptors';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ViewComponent } from './view/view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ErrorComponent } from './error/error.component';
import { MatSortModule } from '@angular/material';
import { FieldErrorDisplayModule } from './field-error-display/field-error-display.module';
import { ForgotpasswordModule } from './forgotpassword/forgotpassword.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { SetpasswordModule } from './setpassword/setpassword.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'ng4-social-login';


const config = new AuthServiceConfig([
{
  id : GoogleLoginProvider.PROVIDER_ID,
  provider : new GoogleLoginProvider('25463844187-o4j10q8ad6pt79edk7jgp9h69ii3vqbt.apps.googleusercontent.com')
},
{
  id : FacebookLoginProvider.PROVIDER_ID,
  provider : new FacebookLoginProvider('616206889210154'),
}
], false);

export function provideConfig()
{
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
  HeaderComponent,
  GoallistComponent,
  AppraisallogComponent,
    DisplaycardComponent,
   FooterComponent,
   
   
    DialogBoxComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    ViewComponent,
    ErrorComponent,
    ForgotpasswordComponent,
    SetpasswordComponent,
    NotFoundComponent


    
   
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
    MatDialogModule,
    DragDropModule,
    NgbModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    PdfJsViewerModule,
    MatSortModule,
    MatTooltipModule,
    ForgotpasswordModule,
    FieldErrorDisplayModule,
    SetpasswordModule,
    SocialLoginModule,


  ],
  providers: [AuthGuard,
    { provide : AuthServiceConfig, useFactory: provideConfig}
    ],
    
  bootstrap: [AppComponent],
  entryComponents: [
   DialogBoxComponent,
   ViewComponent,
   ErrorComponent,
   ForgotpasswordComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
