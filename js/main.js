const EMAIL = 'alexbr5450@gmail.com';

document.getElementById('ano').textContent = new Date().getFullYear();

// Preencha aqui quando tiver os links (vazio = escondido / "Demo em breve")
const LINKEDIN = 'https://www.linkedin.com/in/alexsandro-santos-da-silva-1850ab312';
document.querySelectorAll('[data-linkedin]').forEach(a => {
  if (LINKEDIN) a.href = LINKEDIN; else (a.closest('li') || a).remove();
});
document.querySelectorAll('a[data-demo]').forEach(a => {
  const span = document.createElement('span');
  span.textContent = 'Demo em breve';
  span.className = 'text-mist/70 text-sm self-center';
  a.replaceWith(span);
});

// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const toggleMenu = (open) => {
  menu.classList.toggle('hidden', !open);
  menu.classList.toggle('flex', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
menuBtn.addEventListener('click', () => toggleMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth < 640) toggleMenu(false);
}));

// Brilho da borda seguindo o ponteiro
document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
});

// Copiar e-mail
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.textContent = 'Copiado';
  } catch {
    copyBtn.textContent = 'Selecione e copie';
  }
  setTimeout(() => (copyBtn.textContent = 'Copiar'), 2000);
});

// Formulário: monta um mailto (funciona sem backend no GitHub Pages)
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const assunto = form.assunto.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !assunto || !mensagem) {
    msg.textContent = 'Preencha nome, assunto e mensagem para enviar.';
    msg.className = 'text-sm min-h-[1.25rem] text-amber';
    return;
  }

  const body = `${mensagem}\n\n— ${nome}`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
  msg.textContent = 'Seu app de e-mail foi aberto com a mensagem pronta.';
  msg.className = 'text-sm min-h-[1.25rem] text-mist';
  form.reset();
});
