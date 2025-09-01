import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService, TarefaDTO, PageResponse } from 'src/app/services/tarefa.service';


@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {

  ELEMENT_DATA: TarefaDTO[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<TarefaDTO>(this.ELEMENT_DATA);
  
  tarefas: TarefaDTO[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void { 
    this.carregarTarefas();
    // this.findAll();
   }

   carregarTarefas(): void {
      this.tarefaService.listar(undefined, this.currentPage, this.pageSize).subscribe((res: PageResponse<TarefaDTO>) => {
      this.tarefas = res.content;
      this.totalItems = res.totalElements;
      //this.findAll();
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarTarefas();
  }

  findAll(){
    this.tarefaService.listar(undefined, this.currentPage, this.pageSize).subscribe((res: PageResponse<TarefaDTO>) => {
    this.ELEMENT_DATA = res.content;
    this.dataSource = new MatTableDataSource<TarefaDTO>(res.content);
    this.dataSource.paginator = this.paginator;
    })
  }

  delete(id:number){
    this.tarefaService.delete(id).subscribe({
      next: () => {
        console.log(`Tarefa ${id} excluída com sucesso`);
        this.carregarTarefas();
      },
      error: err => {
        console.error('Erro ao excluir tarefa:', err);
      }
    });
  

  }

}