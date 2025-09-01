import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Tarefa } from '../models/tarefa';

export interface ProjetoDTO {
  id: number;
  nome: string;
}

export interface TarefaDTO {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao: string;
  projeto: ProjetoDTO;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  listar(tarefaId?: number, page = 0, size = 10, sortBy = 'dataCriacao', direction = 'desc'): Observable<PageResponse<TarefaDTO>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (tarefaId) {
      params = params.set('tarefaId', tarefaId);
    }

    return this.http.get<PageResponse<TarefaDTO>>(`${API_CONFIG.baseUrl}/tarefas`, { params });
  }

  findById(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }

  findAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${API_CONFIG.baseUrl}/tarefas`);
  }

  create(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${API_CONFIG.baseUrl}/tarefas`, tarefa);
  }

  update(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${tarefa.id}`, tarefa);
  }

  delete(id: any): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }
}
