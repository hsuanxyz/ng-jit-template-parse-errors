import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RUNTIME_COMPILER_PROVIDERS } from './runtime-compiler.providers';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [RUNTIME_COMPILER_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
