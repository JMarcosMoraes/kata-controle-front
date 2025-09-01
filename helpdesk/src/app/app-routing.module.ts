import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

import { TarefaCreateComponent } from './components/tarefa/tarefa-create/tarefa-create.component';
import { TarefaListComponent } from './components/tarefa/tarefa-list/tarefa-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
       {path: 'home', component: HomeComponent},
       {path: 'tarefas', component: TarefaListComponent},
       {path: 'tarefas/create', component: TarefaCreateComponent}
    ] 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
