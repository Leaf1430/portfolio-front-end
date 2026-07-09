const imagens = [
    'img/FotoCurso1.jpeg',
    'img/FotoCurso2.jpeg',
    'img/FotoCurso3.jpeg',
    'img/FotoCurso4.jpeg'
];

const fotoPrincipal = document.getElementById('fotoPrincipal');
const legendaFoto = document.getElementById('legendaFoto');
const botaoTrocar = document.getElementById('trocarFoto');
const progressBarFill = document.getElementById('progressBarFill');
const themeToggle = document.getElementById('themeToggle');

let indiceAtual = 0;

function aplicarTema(tema) {
    document.body.setAttribute('data-theme', tema);

    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(tema === 'light'));
        themeToggle.innerHTML = tema === 'light'
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';
        themeToggle.title = tema === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro';
    }

    localStorage.setItem('theme', tema);
}

const temaSalvo = localStorage.getItem('theme');
const temaInicial = temaSalvo || 'dark';
aplicarTema(temaInicial);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const temaAtual = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        aplicarTema(temaAtual);
    });
}

if (fotoPrincipal && legendaFoto && botaoTrocar) {
    botaoTrocar.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % imagens.length;
        fotoPrincipal.src = imagens[indiceAtual];
        fotoPrincipal.alt = `Foto do curso ${indiceAtual + 1}`;
        legendaFoto.textContent = `Foto ${indiceAtual + 1} de ${imagens.length}`;
    });
}

function atualizarBarraDeProgresso() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    const maxScroll = Math.max(1, scrollHeight - window.innerHeight);
    const progresso = (scrollTop / maxScroll) * 100;

    if (progressBarFill) {
        progressBarFill.style.width = `${Math.min(100, Math.max(0, progresso))}%`;
    }
}

window.addEventListener('scroll', atualizarBarraDeProgresso);
window.addEventListener('load', atualizarBarraDeProgresso);
window.addEventListener('resize', atualizarBarraDeProgresso);
document.addEventListener('DOMContentLoaded', atualizarBarraDeProgresso);

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
