const tiltContainer = document.getElementById('tilt-container');
const tiltWrapper = document.getElementById('tilt-wrapper');

tiltContainer.addEventListener('mousemove', (e) => {
    // Pega as dimensões e a posição do container na tela
    const rect = tiltContainer.getBoundingClientRect();

    // Descobre a posição do mouse em relação ao centro do elemento
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calcula a inclinação (multiplique por um número maior para mais inclinação)
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    // Aplica a rotação removendo a transição para ficar instantâneo acompanhando o mouse
    tiltWrapper.style.transition = 'none';
    tiltWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tiltContainer.addEventListener('mouseleave', () => {
    // Devolve a transição suave e zera a inclinação quando o mouse sai
    tiltWrapper.style.transition = 'transform 0.4s ease-out';
    tiltWrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
});