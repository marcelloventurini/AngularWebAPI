import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from './Funcionario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  url = 'http://localhost:5142/api/funcionarios';

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.url);
  }

  PegarPeloId(funcionarioId: number): Observable<Funcionario> {
    const apiUrl = `${this.url} / ${funcionarioId}`;
    return this.http.get<Funcionario>(apiUrl);
  }

  SalvarFuncionario(funcionario: Funcionario): Observable<any> {
    return this.http.post<Funcionario>(this.url, funcionario, httpOptions);
  }

  AtualizarFuncionario(funcionario: Funcionario): Observable<any> {
    return this.http.put<Funcionario>(this.url, funcionario, httpOptions);
  }

  ExcluirFuncionario(funcionarioId: number): Observable<any> {
    const apiUrl = `${this.url} / ${funcionarioId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
