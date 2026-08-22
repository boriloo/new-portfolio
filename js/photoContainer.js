// @ts-nocheck
const tiltContainer = document.getElementById('tilt-container');
const tiltWrapper = document.getElementById('tilt-wrapper');
const coinSpin = document.querySelector('.coin-spin');
const imgFront = document.getElementById('img-front');
const imgBack = document.getElementById('img-back');
const textElement = document.getElementById('foto-texto');
const balaoElement = document.getElementById('foto-balao'); // Seleciona o balão todo

const photos = [
    './public/assets/photo.png',
    './public/assets/photo2.png',
    './public/assets/flor.jpg'
];

const texts = [
    'Esse sou eu!',
    'Eu denovo...',
    'Esse é meu cachorro!'
];

let currentRotation = 0;
let clickCount = 0;

tiltContainer.addEventListener('click', () => {
    currentRotation += 180;
    clickCount++;

    coinSpin.style.transform = `rotateY(${currentRotation}deg)`;

    // 1. Apaga o balão inteiro forçando opacidade 0 na mesma hora do clique
    balaoElement.style.opacity = '0';

    const nextPhotoIndex = (clickCount + 1) % photos.length;
    const currentVisibleIndex = clickCount % photos.length;

    setTimeout(() => {
        // 2. Troca o texto enquanto está invisível
        textElement.textContent = texts[currentVisibleIndex];
        
        // 3. Remove a opacidade forçada, deixando o hover do CSS agir de novo
        balaoElement.style.opacity = '';

        // Prepara a imagem da face escondida para o próximo clique
        if (clickCount % 2 !== 0) {
            imgFront.src = photos[nextPhotoIndex];
        } else {
            imgBack.src = photos[nextPhotoIndex];
        }
    }, 300);
});

tiltContainer.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -30;
    const rotateY = ((x - centerX) / centerX) * 30;

    tiltWrapper.style.transition = 'none';
    tiltWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tiltContainer.addEventListener('mouseleave', () => {
    tiltWrapper.style.transition = 'transform 0.4s ease-out';
    tiltWrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
});