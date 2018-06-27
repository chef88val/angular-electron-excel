import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ElectronService } from './providers/electron.service';
import { DataService } from './dataservice.service';

import { WebviewDirective } from './directives/webview.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {SheetjsComponent } from './components/sheetjs/sheetjs.component';
import { LoginComponent } from './components/login/login.component';

import {MatButtonModule, MatCheckboxModule,MatGridListModule,MatInputModule,MatIconModule} from '@angular/material';
import { CardComponent } from './components/card/card.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ValueHeadersPipe } from './pipes/value-headers.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SheetjsComponent,
    LoginComponent,
    CardComponent,
    KeysPipe,
    ValueHeadersPipe,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MatButtonModule, 
    	MatCheckboxModule,
    	MatGridListModule,
    	MatInputModule,
    	MatIconModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
