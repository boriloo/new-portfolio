// @ts-nocheck
const tiltContainer = document.getElementById('tilt-container');
const tiltWrapper = document.getElementById('tilt-wrapper');
const coinSpin = document.querySelector('.coin-spin');
const imgFront = document.getElementById('img-front');
const imgBack = document.getElementById('img-back');

//
const textElements = document.querySelectorAll('.foto-texto');
const balaoElements = document.querySelectorAll('.foto-balao');

const photos = [
    './public/assets/photo.png',
    './public/assets/photo2.png',
    './public/assets/flor.jpg'
];

let currentRotation = 0;
let clickCount = 0;
let isFlipping = false;

tiltContainer.addEventListener('click', () => {
    if (isFlipping) return;
    isFlipping = true;

    currentRotation += 180;
    clickCount++;

    coinSpin.style.transform = `rotateY(${currentRotation}deg)`;


    balaoElements.forEach(balao => {
        balao.style.opacity = '0';
    });

    const currentClick = clickCount;
    const nextPhotoIndex = (currentClick + 1) % photos.length;
    const currentVisibleIndex = currentClick % photos.length;

    setTimeout(() => {
        const currentLang = localStorage.getItem('language') || 'pt';

        const texts = {
            pt: [
                'Esse sou eu!',
                'Eu denovo...',
                'Esse é meu cachorro!'
            ],
            en: [
                'That\'s me!',
                'Me again...',
                'That\'s my dog!'
            ]
        };

        const novoTexto = texts[currentLang][currentVisibleIndex];


        textElements.forEach(el => {
            el.textContent = novoTexto;
        });


        balaoElements.forEach(balao => {
            balao.style.opacity = '';
        });


        if (currentClick % 2 !== 0) {
            imgFront.src = photos[nextPhotoIndex];
        } else {
            imgBack.src = photos[nextPhotoIndex];
        }

        isFlipping = false;
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