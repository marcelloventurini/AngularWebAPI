import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  nomeFuncionario = '';
  funcionarioId = 0;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef!: BsModalRef;

  constructor(private funcionariosService: FuncionariosService, private modalService: BsModalService) {}

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

  ExibirConfirmacaoExclusao(funcionarioId: number, nomeFuncionario: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.funcionarioId = funcionarioId;
    this.nomeFuncionario = nomeFuncionario;
  }

  ExcluirFuncionario(funcionarioId: number) {
    this.funcionariosService.ExcluirFuncionario(funcionarioId).subscribe(resultado => {
      this.modalRef.hide();
      
      alert('Funcionário excluído com sucesso');

      this.funcionariosService.PegarTodos().subscribe(registros => {
        this.funcionarios = registros;
      });
    });
  }
}
