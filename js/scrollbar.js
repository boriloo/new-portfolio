// @ts-nocheck
const track = document.getElementById('scroll-track');
const thumb = document.getElementById('scroll-thumb');

function updateScrollbar() {
    // 1. Calcula a porcentagem do scroll da página
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = window.scrollY / scrollTotal;

    // 2. Calcula o limite de espaço que a div interna pode percorrer na div externa
    const maxThumbTravel = track.clientHeight - thumb.clientHeight;

    // 3. Move a div interna baseada na porcentagem
    const thumbPosition = scrollProgress * maxThumbTravel;
    thumb.style.transform = `translateY(${thumbPosition}px)`;
}

// Atualiza no scroll, no redimensionamento da tela e ao carregar
window.addEventListener('scroll', updateScrollbar);
window.addEventListener('resize', updateScrollbar);
updateScrollbar();