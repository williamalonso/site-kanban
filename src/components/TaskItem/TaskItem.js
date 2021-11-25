import React, { useState } from "react";
import "./task-item.css";
import PropTypes from "prop-types";

// Essa função/componente é para editar as tarefas que inserimos
export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  deletaTarefa
}) {
  /* 
    precisamos de um useState pois esse componente precisa saber se ele vai renderizar o nome/descrição dessa tarefa ou se em alguns momentos ele vai renderizar o input field para podermos editar essa tarefa
  */
  const [isEditing, setIsEditing] = useState(false);

  /*
    Precisamos alterar o título da tarefa, para isso usamos outro State
  */
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = (event) => {
    const NewTitle = event.target.value;
    setEditableTitle(NewTitle);
    onTaskUpdate(id, NewTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        deletaTarefa(id);
      }
    }
  };

  const mudaTarefa = (evento) => {
    onTaskUpdate(id, title, evento.target.value);
  };

  // esse if controla a tarefa. Quando eu clicar em cima da tarefa, ele transforma num input para eu editar o título
  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div
          onClick={(e) => {
            setIsEditing(true);
          }}
        >
          {editableTitle}
        </div>
        <select onChange={mudaTarefa} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

//propTypes é uma variável do componente TaskItem
TaskItem.propTypes = {
  //aqui declaramos o tipo das props
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
