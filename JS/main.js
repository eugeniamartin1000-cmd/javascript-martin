const tareas = [];
let filtroActual = "todas";

// Elementos del DOM
const form = document.getElementById("formTarea");
const input = document.getElementById("nueva-tarea");
const lista = document.getElementById("taskList");
const tabs = document.querySelectorAll(".tab");

// Renderizar tareas según filtro
function renderTareas(filtro = "todas") {
  filtroActual = filtro;
  lista.innerHTML = "";

  tareas.forEach((tarea, index) => {
    if (filtro === "todas" || tarea.estado === filtro) {
      const li = document.createElement("li");
      li.className = `task ${tarea.estado}`;
      li.textContent = tarea.texto;

      // Botón para marcar como completada
      if (tarea.estado === "acompletar") {
        const btn = document.createElement("button");
        btn.textContent = "✓";
        btn.className = "completar-btn";
        btn.addEventListener("click", () => {
          tareas[index].estado = "completada";
          renderTareas(filtroActual);
        });
        li.appendChild(btn);
      }

      lista.appendChild(li);
    }
  });
}

// Añadir nueva tarea
form.addEventListener("submit", e => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== "") {
    tareas.push({ texto, estado: "acompletar" });
    renderTareas(filtroActual);
    input.value = "";
  }
});

// Cambiar filtro al hacer clic en las pestañas
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filtro = tab.dataset.filter;
    renderTareas(filtro);
  });
});

// Inicializar
renderTareas();
