// ---------- Estado ----------
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
let filtroActual = 'todas';

// ---------- Elementos ----------
const form = document.getElementById('form-tarea');
const input = document.getElementById('input-tarea');
const selectPrioridad = document.getElementById('select-prioridad');
const lista = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');
const btnLimpiar = document.getElementById('btn-limpiar');
const botonesFiltro = document.querySelectorAll('.filtro-btn');
const fechaEl = document.getElementById('fecha');

// ---------- Fecha actual ----------
const hoy = new Date();
fechaEl.textContent = hoy.toLocaleDateString('es-ES', {
  weekday: 'long', day: 'numeric', month: 'long'
});

// ---------- Guardar en localStorage ----------
function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// ---------- Renderizar lista ----------
function render() {
  lista.innerHTML = '';

  let tareasFiltradas = tareas;
  if (filtroActual === 'pendientes') {
    tareasFiltradas = tareas.filter(t => !t.completada);
  } else if (filtroActual === 'completadas') {
    tareasFiltradas = tareas.filter(t => t.completada);
  }

  if (tareasFiltradas.length === 0) {
    lista.innerHTML = '<li class="vacio">No hay tareas aquí 🎉</li>';
  }

  tareasFiltradas.forEach(tarea => {
    const li = document.createElement('li');
    li.className = `tarea prioridad-${tarea.prioridad} ${tarea.completada ? 'completada' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${tarea.completada ? 'checked' : ''} data-id="${tarea.id}">
      <span class="texto-tarea">${escaparHTML(tarea.texto)}</span>
      <button class="btn-borrar" data-id="${tarea.id}">✕</button>
    `;
    lista.appendChild(li);
  });

  const pendientes = tareas.filter(t => !t.completada).length;
  contador.textContent = `${pendientes} tarea${pendientes === 1 ? '' : 's'} pendiente${pendientes === 1 ? '' : 's'}`;
}

// ---------- Evitar inyección HTML ----------
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ---------- Agregar tarea ----------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  tareas.unshift({
    id: Date.now(),
    texto,
    prioridad: selectPrioridad.value,
    completada: false
  });

  input.value = '';
  guardar();
  render();
});

// ---------- Marcar / borrar tarea (delegación de eventos) ----------
lista.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.matches('input[type="checkbox"]')) {
    const tarea = tareas.find(t => t.id === id);
    tarea.completada = !tarea.completada;
    guardar();
    render();
  }

  if (e.target.matches('.btn-borrar')) {
    tareas = tareas.filter(t => t.id !== id);
    guardar();
    render();
  }
});

// ---------- Filtros ----------
botonesFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    botonesFiltro.forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
    filtroActual = btn.dataset.filtro;
    render();
  });
});

// ---------- Limpiar completadas ----------
btnLimpiar.addEventListener('click', () => {
  tareas = tareas.filter(t => !t.completada);
  guardar();
  render();
});

// ---------- Primera carga ----------
render();
