const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('nueva-tarea');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value;

  // Validar campo vacío
  if (taskText.trim() === '') {
    alert('Por favor, añade una tarea nueva');
    return;
  }

  // Crear nuevo elemento de lista
  const taskItem = document.createElement('li');
  taskItem.innerText = taskText;

  // Botón de eliminar
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Eliminar';
  deleteButton.classList.add('delete');

  // Eliminar tarea
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
  });

  // Marcar como completada
  taskItem.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
  });

  // Agregar botón al item
  taskItem.appendChild(deleteButton);

  // Agregar item a la lista
  taskList.appendChild(taskItem);

  // Limpiar campo de texto
  taskInput.value = '';
});
