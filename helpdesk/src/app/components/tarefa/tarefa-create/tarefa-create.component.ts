import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { ProjetoService } from 'src/app/services/projeto.service';
import { TarefaService } from 'src/app/services/tarefa.service';



@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrls: ['./tarefa-create.component.css']
})
export class TarefaCreateComponent implements OnInit {
  form!: FormGroup;
  projetos: any[] = [];

  constructor(private fb: FormBuilder, private projetoService: ProjetoService, private tarefaService: TarefaService,  private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      status: ['normal', Validators.required],
      projetoId: [null, Validators.required]
    });

    this.carregarProjetos();
  }

  carregarProjetos(): void {
    this.projetoService.findAll().subscribe({
      next: (dados) => this.projetos = dados,
      error: (erro) => console.error('Erro ao carregar projetos', erro)
    });

  }

  salvar(): void {
    if (this.form.valid) {
      this.tarefaService.create(this.form.value).subscribe(() => {
        console.log('Projeto criada com sucesso');
        this.form.reset();
        this.router.navigate(['/tarefas']);
      });
    }
  }

  
  voltar(): void {
    this.router.navigate(['/tarefas']); // ajuste a rota conforme sua aplicação
  }


}