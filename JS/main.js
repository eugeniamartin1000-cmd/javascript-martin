let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtroActual = "todas";

// Elementos del DOM
const form = document.getElementById("formTarea");
const input = document.getElementById("nueva-tarea");
const selectPrioridad = document.getElementById("prioridad-tarea");
const lista = document.getElementById("taskList");
const tabs = document.querySelectorAll(".tab");

// Validación personalizada del input
input.addEventListener("invalid", e => {
  e.target.setCustomValidity("Por favor, escribí una tarea");
});
input.addEventListener("input", e => {
  e.target.setCustomValidity("");
});

// Renderizar tareas
function renderTareas(filtro = "todas") {
  filtroActual = filtro;

  // Actualizar contadores
  const total = tareas.length;
  const completadas = tareas.filter(t => t.estado === "completada").length;
  const acompletar = tareas.filter(t => t.estado === "acompletar").length;

  document.getElementById("contador-todas").textContent = total;
  document.getElementById("contador-completadas").textContent = completadas;
  document.getElementById("contador-acompletar").textContent = acompletar;

  // Limpiar lista
  lista.innerHTML = "";

  // Mostrar tareas filtradas
  tareas.forEach((tarea, index) => {
    if (filtro === "todas" || tarea.estado === filtro) {
      const li = document.createElement("li");
      li.className = `task ${tarea.estado}`;

      // Botón completar (toggle sin texto)
      const btnCompletar = document.createElement("button");
      btnCompletar.className = "completar-btn";
      btnCompletar.textContent = "";
      btnCompletar.addEventListener("click", () => {
        tareas[index].estado = tareas[index].estado === "completada" ? "acompletar" : "completada";
        guardarTareas();
        renderTareas(filtroActual);
      });

      // Texto
      const textoSpan = document.createElement("span");
      textoSpan.textContent = tarea.texto;
      textoSpan.className = "texto-tarea";

      // Prioridad
      const prioridadSpan = document.createElement("span");
      prioridadSpan.textContent = `(${tarea.prioridad})`;
      prioridadSpan.className = `prioridad ${tarea.prioridad}`;

      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.className = "eliminar-btn";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        tareas.splice(index, 1);
        guardarTareas();
        renderTareas(filtroActual);
      });

      // Orden: completar + texto + prioridad + eliminar
      li.appendChild(btnCompletar);
      li.appendChild(textoSpan);
      li.appendChild(prioridadSpan);
      li.appendChild(btnEliminar);
      lista.appendChild(li);
    }
  });
}

// Guardar tareas en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Añadir nueva tarea
form.addEventListener("submit", e => {
  e.preventDefault();
  const texto = input.value.trim();
  const prioridad = selectPrioridad.value;
  if (texto !== "") {
    tareas.push({ texto, estado: "acompletar", prioridad });
    guardarTareas();
    renderTareas(filtroActual);
    input.value = "";
  }
});

// Cambiar filtro
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filtro = tab.dataset.filter;
    renderTareas(filtro);
  });
});

// Render inicial
renderTareas();

// Añadir nueva tarea
form.addEventListener("submit", e => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== "") {
    tareas.push({ texto, estado: "acompletar", prioridad });
    guardarTareas();
    renderTareas(filtroActual);
    input.value = "";
  }
});

// Cambiar filtro
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filtro = tab.dataset.filter;
    renderTareas(filtro);
  });
});

// Render inicial
renderTareas();
