import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './pop-up/pop-up.component';
import { UploadDirective } from './directives/upload.directive';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppService } from './app.service';
import { AppEffects, appReducer } from './features/app.slice';
import { dialogReducer } from './features/dialog.slice';
import { environment } from 'src/environments/environment';
import { ApplicationState } from './features/store';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent,
    UploadDirective
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot<ApplicationState>({ app: appReducer, dialog: dialogReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
