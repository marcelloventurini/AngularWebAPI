import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Departamento } from 'src/app/Departamento';
import { DepartamentosService } from 'src/app/departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  formulario: any;
  tituloFormulario = '';
  departamentos: Departamento[] = [];
  nomeDepartamento = '';
  departamentoId = 0;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef!: BsModalRef;

  constructor(private departamentosService: DepartamentosService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.departamentosService.PegarTodos().subscribe(resultado => {
      this.departamentos = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tituloFormulario = 'Novo Departamento';

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sigla: new FormControl(null)
    });
  }

  ExibirFormularioAtt(departamentoId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.departamentosService.PegarPeloId(departamentoId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`;

      this.formulario =  new FormGroup ({
        departamentoId: new FormControl(resultado.departamentoId),
        nome: new FormControl(resultado.nome),
        sigla: new FormControl(resultado.sigla)
      });
    });
  }

  EnviarFormulario(): void {
    const departamento: Departamento = this.formulario.value;

    if (departamento.departamentoId > 0) {
      this.departamentosService.AtualizarDepartamento(departamento).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
  
        alert('Departamento atualizado com sucesso.');
  
        this.departamentosService.PegarTodos().subscribe(registros => {
          this.departamentos = registros;
        });
      });
    } else {
      this.departamentosService.SalvarDepartamento(departamento).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
  
        alert('Departamento inserido com sucesso.');
  
        this.departamentosService.PegarTodos().subscribe(registros => {
          this.departamentos = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(departamentoId: number, nomeDepartamento: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.departamentoId = departamentoId;
    this.nomeDepartamento = nomeDepartamento;
  }

  ExcluirDepartamento(departamentoId: number) {
    this.departamentosService.ExcluirDepartamento(departamentoId).subscribe(resultado => {
      this.modalRef.hide();

      alert('Departamento excluído com sucesso.');

      this.departamentosService.PegarTodos().subscribe(registros => {
        this.departamentos = registros;
      });
    });
  }
}
