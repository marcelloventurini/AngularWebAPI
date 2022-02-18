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
  funcionarios: Funcionario[] = [];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private funcionariosService: FuncionariosService) {}

  ngOnInit(): void {
    this.funcionariosService.PegarTodos().subscribe(resultado => {
      this.funcionarios = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tituloFormulario = 'Novo Funcionário';

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      rg: new FormControl(null),
      departamentoId: new FormControl(null)
    });
  }

  ExibirFormularioAtt(funcionarioId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.funcionariosService.PegarPeloId(funcionarioId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`;

      this.formulario = new FormGroup({
        funcionarioId: new FormControl(resultado.funcionarioId),
        nome: new FormControl(resultado.nome),
        rg: new FormControl(resultado.rg),
        departamentoId: new FormControl(resultado.departamentoId)
      });
    });
  } 

  EnviarFormulario(): void {
    const funcionario: Funcionario = this.formulario.value;

    if (funcionario.funcionarioId > 0) {
      this.funcionariosService.AtualizarFuncionario(funcionario).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
  
        alert('Funcionário atualizado com sucesso.');
  
        this.funcionariosService.PegarTodos().subscribe(registros => {
          this.funcionarios = registros;
        }); 
      });
    } else {
      this.funcionariosService.SalvarFuncionario(funcionario).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
  
        alert('Funcionário inserido com sucesso.');
  
        this.funcionariosService.PegarTodos().subscribe(registros => {
          this.funcionarios = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

}
