// ===== Modal de formulario =====
const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('[data-open-form]');
const closeButtons = document.querySelectorAll('[data-close-form]');

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const firstInput = modal.querySelector('input');
  if (firstInput) firstInput.focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openButtons.forEach((btn) => btn.addEventListener('click', openModal));
closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

// ===== Envío del formulario =====
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Aquí conectarías con tu backend o servicio (Formspree, etc.)
  const data = Object.fromEntries(new FormData(form).entries());
  console.log('Formulario enviado:', data);

  success.classList.add('is-visible');
  form.querySelector('button[type="submit"]').textContent = 'Enviado ✓';

  setTimeout(() => {
    closeModal();
    form.reset();
    success.classList.remove('is-visible');
    form.querySelector('button[type="submit"]').textContent = 'Enviar';
  }, 1800);
});
