import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Funcionario } from 'src/app/Funcionario';
import { FuncionariosService } from 'src/app/funcionarios.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  formulario: any;
  tituloFormulario = '';

  constructor(private funcionariosService: FuncionariosService) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Funcionário';

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      rg: new FormControl(null),
      departamentoId: new FormControl(null)
    });
  }

  EnviarFormulario(): void {
    const funcionario: Funcionario = this.formulario.value;

    this.funcionariosService.SalvarFuncionario(funcionario).subscribe(resultado => {
      alert('Funcionário inserido com sucesso.');
    });
  }

}
