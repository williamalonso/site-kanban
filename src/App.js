// importando o useState
import React, { useState } from "react";
// esse é o css global do projeto
import "./index.css";
// importando a Navbar
import Navbar from "./components/Navbar/Navbar";
// importando o TaskList
import TaskList from "./components/TaskList/TaskList";

// Arrow Function para gerar/incrementar Id
let cont = 0;
const generateId = () => {
  cont = cont + 1;
  return cont;
};

// esse App() é um componente
export default function App() {
  // declaração do useState, ele será nosso "container" com todas as tarefas
  const [tasks, setTasks] = useState([]);

  // Função para adicionar tarefa quando clicar no botão
  const addTask = (title, state) => {
    //Cria um objeto chamado 'newTask'
    const newTask = {
      id: generateId(),
      title,
      state
    };

    /* 
      o 'setTasks' recebe uma função, e essa função também tem um parâmetro que são as tarefas existentes.
      Ela retorna para nós o novo estado, uma nova lista
    */
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  // função update que recebe 3 parâmetros: id da tarefa, titulo e estado. Ela recebe esses parâmetros e vai tentar achar essa tarefa numa lista, e se encontrar, vai atualizar essa tarefa em nossa lista
  const onTaskUpdate = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  //Função para deletar tarefa
  const deletaTarefa = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  // dentro de um return em React só pode ter 1 div. mas dentro de 1 div, pode ter várias divs filhas
  return (
    /* Em React não usamos o class="" usamos o className="" */
    <div className="App">
      <Navbar />
      <div className="container">
        {/* 
          Vamos usar as props para passar a função "const addTask" para o componente "<TaskList />"

          Nesse caso a props se chama "onAddTask" e ela recebe uma função, chamada "addtask".

          Dessa forma, estamos passando uma props para nosso componente TaskList

          Também passamos a props chamada "tasks" que está enviando a variável chamada "tasks" que vem da declaração do useState lá em cima
        */}
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((x) => x.state === "Pendente")}
          onTaskUpdate={onTaskUpdate}
          deletaTarefa={deletaTarefa}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((x) => x.state === "Fazendo")}
          onTaskUpdate={onTaskUpdate}
          deletaTarefa={deletaTarefa}
        />
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((x) => x.state === "Completa")}
          onTaskUpdate={onTaskUpdate}
          deletaTarefa={deletaTarefa}
        />
      </div>
    </div>
  );
}
