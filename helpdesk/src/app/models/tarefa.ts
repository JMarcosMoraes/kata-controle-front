import { Projeto } from "./projeto";

export interface Tarefa {      
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    dataCriacao: string;
    projeto: Projeto
}