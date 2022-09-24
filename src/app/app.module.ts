import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './service/firebase.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    AddTodoComponent,
    TodoCardComponent,
    AuthComponent,
    LoginFormComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  providers: [FirebaseService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
