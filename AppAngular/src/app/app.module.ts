import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FuncionariosService } from './funcionarios.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent,
    DepartamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, FuncionariosService, DepartamentosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
