import React from "react";
import "./tasklist.css";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";
// svg no react precisa importar
import plusIcon from "../../image/plus-icon.svg";

/*
  Aqui o "onAddTask" é a props vinda do App.js
*/
export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  deletaTarefa
}) {
  /*
  A função addTask no App.js tem 2 parâmetros, então temos que passar 2 parâmetros para essa função.

  Então criamos a função abaixo para chamar a função addTask do App.js
*/

  const addTask = () => {
    onAddTask("Nova Tarefa", taskState);
  };

  return (
    <div className="tasklist">
      <div className="title">{title}</div>
      <div className="content">
        {/* Exibe a tarefa na página 
          
            A função map transforma um elemento em outro elemento.
            Ex: transforma lista de números em string

            Sempre que usar o map, precisamos passar um id / key: key={task.id}
          */}
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              deletaTarefa={deletaTarefa}
            />
          );
        })}
        {/* 
          se a lista estiver vazia, ele executa a linha abaixo, ou seja, se "tasks.length === 0" for verdadeiro, ele executa a div 'empty-list'
        */}
        {tasks.length === 0 && <div className="empty-list">Lista Vazia</div>}
        <button onClick={addTask} className="btn">
          <img src={plusIcon} alt="Plus Icon" />
          Adicionar tarefa
        </button>
      </div>
    </div>
  );
}

//propTypes é uma variável do componente TaskList
TaskList.propTypes = {
  //aqui declaramos o tipo das props
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};
