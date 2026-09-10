// ---------- Fecha del torneo ----------
const FECHA_TORNEO = new Date('2026-11-14T08:00:00');

const elDias = document.getElementById('dias');
const elHoras = document.getElementById('horas');
const elMinutos = document.getElementById('minutos');
const elSegundos = document.getElementById('segundos');

function actualizarCuenta() {
  const ahora = new Date();
  let diferencia = FECHA_TORNEO - ahora;

  if (diferencia <= 0) {
    elDias.textContent = '00';
    elHoras.textContent = '00';
    elMinutos.textContent = '00';
    elSegundos.textContent = '¡Hoy!';
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  elDias.textContent = String(dias).padStart(2, '0');
  elHoras.textContent = String(horas).padStart(2, '0');
  elMinutos.textContent = String(minutos).padStart(2, '0');
  elSegundos.textContent = String(segundos).padStart(2, '0');
}

actualizarCuenta();
setInterval(actualizarCuenta, 1000);

// ---------- Menú móvil ----------
const btnMenu = document.getElementById('btn-menu');
const navEnlaces = document.getElementById('nav-enlaces');

btnMenu.addEventListener('click', () => {
  navEnlaces.classList.toggle('abierto');
});

navEnlaces.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', () => {
    navEnlaces.classList.remove('abierto');
  });
});

// ---------- Formulario de inscripción ----------
const form = document.getElementById('form-registro');
const mensajeForm = document.getElementById('mensaje-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombreEquipo = document.getElementById('nombre-equipo').value.trim();
  const categoria = document.getElementById('categoria').value;

  if (!nombreEquipo || !categoria) {
    mensajeForm.textContent = 'Por favor completa todos los campos antes de enviar.';
    mensajeForm.style.color = '#FF5A3C';
    return;
  }

  // Nota: este formulario no envía datos a ningún servidor todavía.
  // Aquí es donde conectarías tu backend o servicio de correo (por ejemplo,
  // un fetch a tu API o a un endpoint como Formspree).
  mensajeForm.textContent = `¡Listo, ${nombreEquipo}! Registramos su solicitud en la categoría seleccionada. Les confirmaremos por el contacto que dejaron.`;
  mensajeForm.style.color = '#1F8A85';
  form.reset();
});