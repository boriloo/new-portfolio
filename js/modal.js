// @ts-nocheck
const projectsData = {
    'contoru': {
        title: 'Contoru',
        desc: 'Um Desktop Online focado em produtividade. Permite simular um ambiente de sistema operacional diretamente pelo navegador, integrando múltiplas funcionalidades em uma interface fluida, escalável e com alta performance.',
        techs: [
            { name: 'REACT', icon: 'devicon-react-original' },
            { name: 'TYPESCRIPT', icon: 'devicon-typescript-plain' },
            { name: 'CLOUDFLARE', icon: 'devicon-cloudflare-plain' },
            { name: 'SUPABASE', icon: 'devicon-supabase-plain' },
            { name: 'TAILWIND', icon: 'devicon-tailwindcss-original' },
            { name: 'POSTGRESQL', icon: 'devicon-postgresql-plain' }
        ],
        images: [
            './public/projects/contoru/contoru.png',
            './public/projects/contoru/contoru2.png',
            './public/projects/contoru/contoru3.png'
        ],
        link: 'https://contoru.vercel.app/'
    },
    'huemaster': {
        title: 'HueMaster',
        desc: 'Jogo de adivinhação de cores interativo. Testa a percepção visual do usuário exigindo que ele descubra a cor exata gerada aleatoriamente em formato hexadecimal. Interface imersiva com feedback dinâmico.',
        techs: [
            { name: 'REACT', icon: 'devicon-react-original' },
            { name: 'VITE', icon: 'devicon-vite-original' },
            { name: 'TYPESCRIPT', icon: 'devicon-typescript-plain' },
            { name: 'NODE.JS', icon: 'devicon-nodejs-plain' },
            { name: 'VERCEL', icon: 'devicon-vercel-original' }
        ],
        images: [
            './public/assets/huemaster.png',
            './public/assets/huemaster2.png',
            './public/assets/huemaster3.png'
        ],
        link: 'https://huemaster.vercel.app/'
    },
    'novabalanca': {
        title: 'NovaBalança',
        desc: 'Landing Page institucional construída para um escritório fictício de contabilidade. Totalmente responsiva e focada em SEO e performance (carregamento rápido), aplicando conceitos limpos de UI/UX para máxima conversão.',
        techs: [
            { name: 'HTML', icon: 'devicon-html5-plain' },
            { name: 'SCSS', icon: 'devicon-sass-original' },
            { name: 'JAVASCRIPT', icon: 'devicon-javascript-plain' },
            { name: 'UI/UX', icon: 'devicon-figma-plain' }
        ],
        images: [
            './public/projects/nova/nova.png',
            './public/projects/nova/nova2.png',
            './public/projects/nova/nova3.png'
        ],
        link: 'https://boriloo.github.io/NovaBalanca-Contabilidade/'
    }
};

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const carouselTrack = document.getElementById('carousel-track');
const carouselDots = document.getElementById('carousel-dots');
const modalTitle = document.getElementById('modal-title');
const modalTechs = document.getElementById('modal-techs');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');

let currentImages = [];
let currentImageIndex = 0;
let isAnimating = false;
let domSlides = []; // Array que vai guardar nossas 5 DIVs físicas do DOM

// Classes base de estilização (comuns a todos os cards)
const baseClass = "absolute top-1/2 left-1/2 w-[85%] md:w-[50%] aspect-video -translate-y-1/2 rounded-xl overflow-hidden shadow-xl hide-cursor-ball border-2 border-fg/10 bg-black/5";

// As 5 posições lógicas do nosso carrossel (Escondida Esquerda -> Visível -> Escondida Direita)
const posClasses = [
    "-translate-x-[150%] md:-translate-x-[180%] scale-50 opacity-0 z-10 pointer-events-none", // 0: Escondida bem na esquerda
    "-translate-x-[105%] md:-translate-x-[120%] scale-75 opacity-40 z-20 cursor-pointer hover:opacity-80", // 1: Preview da Esquerda
    "-translate-x-1/2 scale-100 opacity-100 z-30 pointer-events-auto", // 2: Imagem Central
    "translate-x-[5%] md:translate-x-[20%] scale-75 opacity-40 z-20 cursor-pointer hover:opacity-80", // 3: Preview da Direita
    "translate-x-[50%] md:translate-x-[80%] scale-50 opacity-0 z-10 pointer-events-none" // 4: Escondida bem na direita
];

// Retorna o index correto considerando o loop do array
const getIndex = (offset) => (currentImageIndex + offset + currentImages.length) % currentImages.length;

window.openModal = function (projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalLink.onclick = () => window.open(data.link, '_blank');

    modalTechs.innerHTML = '';
    data.techs.forEach(tech => {
        modalTechs.innerHTML += `
            <div class="border-2 border-fg/20 bg-bg p-1 px-2 flex flex-row items-center justify-start gap-2 rounded-md">
                <i class="text-fg/70 ${tech.icon} text-[16px]"></i>
                <h1 class="text-[12px] text-fg/80">${tech.name}</h1>
            </div>
        `;
    });

    currentImages = data.images;
    currentImageIndex = 0;
    isAnimating = false;

    // Constrói os 5 blocos do DOM do zero
    carouselTrack.innerHTML = '';
    domSlides = [];

    for (let i = 0; i < 5; i++) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.className = "w-full h-full object-cover";
        div.appendChild(img);
        carouselTrack.appendChild(div);
        domSlides.push(div);
    }

    // Aplica as imagens iniciais e as coloca em suas posições, sem animação ainda (para evitar que voem pela tela ao abrir)
    domSlides[0].querySelector('img').src = currentImages[getIndex(-2)];
    domSlides[1].querySelector('img').src = currentImages[getIndex(-1)];
    domSlides[2].querySelector('img').src = currentImages[getIndex(0)];
    domSlides[3].querySelector('img').src = currentImages[getIndex(1)];
    domSlides[4].querySelector('img').src = currentImages[getIndex(2)];

    domSlides.forEach((slide, i) => {
        slide.className = baseClass + " transition-none " + posClasses[i];
    });

    setClickEvents();
    updateDots();

    // Ativa as animações de todos os slides após a montagem do layout
    setTimeout(() => {
        domSlides.forEach(slide => slide.classList.replace('transition-none', 'transition-all'));
        domSlides.forEach(slide => slide.classList.add('duration-500', 'ease-in-out'));
    }, 50);

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
};

window.closeModal = function () {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
};

function setClickEvents() {
    domSlides.forEach((slide, i) => {
        if (i === 1) slide.onclick = () => prevImage();
        else if (i === 3) slide.onclick = () => nextImage();
        else slide.onclick = null;
    });
}

function updateDots() {
    carouselDots.innerHTML = '';
    currentImages.forEach((_, index) => {
        const isActive = index === currentImageIndex ? 'bg-first w-10' : 'bg-fg/20 w-3 hover:bg-first/50';
        carouselDots.innerHTML += `<div onclick="goToImage(${index})" class="h-3 rounded-full transition-all duration-500 ease-in-out cursor-pointer hide-cursor-ball ${isActive}"></div>`;
    });
}

window.nextImage = function () {
    if (isAnimating) return;
    isAnimating = true;
    currentImageIndex = getIndex(1);

    // Arranca a div que estava escondida na ESQUERDA e taca lá pra DIREITA instantaneamente (invisível)
    let el = domSlides.shift();
    el.classList.remove('transition-all', 'duration-500', 'ease-in-out');
    el.className = baseClass + " transition-none " + posClasses[4];
    el.querySelector('img').src = currentImages[getIndex(2)]; // Prepara a próxima imagem
    domSlides.push(el);

    void el.offsetWidth; // Força o navegador a reconhecer a troca instantânea antes de animar

    // Reativa as animações e manda todo mundo deslizar uma casa pra esquerda
    domSlides.forEach((slide, i) => {
        slide.classList.remove('transition-none');
        slide.className = baseClass + " transition-all duration-500 ease-in-out " + posClasses[i];
    });

    setClickEvents();
    updateDots();
    setTimeout(() => isAnimating = false, 500);
};

window.prevImage = function () {
    if (isAnimating) return;
    isAnimating = true;
    currentImageIndex = getIndex(-1);

    // Arranca a div que estava escondida na DIREITA e taca lá pra ESQUERDA instantaneamente (invisível)
    let el = domSlides.pop();
    el.classList.remove('transition-all', 'duration-500', 'ease-in-out');
    el.className = baseClass + " transition-none " + posClasses[0];
    el.querySelector('img').src = currentImages[getIndex(-2)]; // Prepara a imagem anterior
    domSlides.unshift(el);

    void el.offsetWidth; // Força o navegador a reconhecer a troca instantânea

    // Reativa as animações e manda todo mundo deslizar uma casa pra direita
    domSlides.forEach((slide, i) => {
        slide.classList.remove('transition-none');
        slide.className = baseClass + " transition-all duration-500 ease-in-out " + posClasses[i];
    });

    setClickEvents();
    updateDots();
    setTimeout(() => isAnimating = false, 500);
};

window.goToImage = function (targetIndex) {
    if (isAnimating || targetIndex === currentImageIndex) return;

    // Simplificação: se for o próximo direto, chama next. Senão prev.
    // Isso evita pular muitas casas e bugar as trocas de DOM nas extremidades
    if (targetIndex > currentImageIndex) {
        nextImage();
    } else {
        prevImage();
    }
};

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});