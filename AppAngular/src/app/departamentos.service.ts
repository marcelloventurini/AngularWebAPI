import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from './Departamento';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  url = 'http://localhost:5142/api/departamentos';

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url);
  }

  PegarPeloId(departamentoId: number): Observable<Departamento> {
    const apiUrl = `${this.url}/${departamentoId}`;
    return this.http.get<Departamento>(apiUrl);
  }

  SalvarDepartamento(departamento: Departamento): Observable<any> {
    return this.http.post<Departamento>(this.url, departamento, httpOptions);
  }

  AtualizarDepartamento(departamento: Departamento): Observable<any> {
    return this.http.put<Departamento>(this.url, departamento, httpOptions);
  }

  ExcluirDepartamento(departamentoId: number): Observable<any> {
    const apiUrl = `${this.url}/${departamentoId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
