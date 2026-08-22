// @ts-nocheck
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    // Adiciona e remove as classes do Tailwind para esconder/mostrar a barra no mobile
    sidebar.classList.toggle('-translate-x-full');
}

// Pega apenas as divs de navegação (que possuem o h1 dentro), ignorando os botões (como o X)
const navItems = document.querySelectorAll('#sidebar > div[onclick]');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Se a tela for menor que 768px e a barra estiver aberta (sem -translate-x-full), nós fechamos
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth < 768 && !sidebar.classList.contains('-translate-x-full')) {
            toggleMobileMenu();
        }
    });
});