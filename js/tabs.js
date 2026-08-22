// @ts-nocheck
const btnProfissional = document.getElementById('btn-profissional');
const btnAcademica = document.getElementById('btn-academica');
const contentProfissional = document.getElementById('content-profissional');
const contentAcademica = document.getElementById('content-academica');

// Classes para os estados ativo e inativo dos botões
const activeClass = "flex-1 bg-first text-white p-2 transiton-all px-4 rounded-md text-[24px] transition-all cursor-default hide-cursor-ball";
const inactiveClass = "flex-1 bg-fg/10 transiton-all scale-98 text-fg hover:bg-first/40 p-2 px-4 rounded-md text-[24px] transition-all cursor-pointer hide-cursor-ball";

function switchTab(showProfissional) {
    if (showProfissional) {
        // Atualiza botões
        btnProfissional.className = activeClass;
        btnAcademica.className = inactiveClass;

        // Oculta Acadêmica e exibe Profissional
        contentAcademica.classList.add('hidden');
        contentAcademica.classList.remove('opacity-100');

        contentProfissional.classList.remove('hidden');
        // Timeout pequeno garante que a animação de opacidade rode após remover o "hidden"
        setTimeout(() => contentProfissional.classList.add('opacity-100'), 20);
    } else {
        // Atualiza botões
        btnAcademica.className = activeClass;
        btnProfissional.className = inactiveClass;

        // Oculta Profissional e exibe Acadêmica
        contentProfissional.classList.add('hidden');
        contentProfissional.classList.remove('opacity-100');

        contentAcademica.classList.remove('hidden');
        setTimeout(() => contentAcademica.classList.add('opacity-100'), 20);
    }
}

// Event Listeners para os cliques
btnProfissional.addEventListener('click', () => switchTab(true));
btnAcademica.addEventListener('click', () => switchTab(false));