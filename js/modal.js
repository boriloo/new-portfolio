// @ts-nocheck
const modalRepos = document.getElementById('modal-repos');

const projectsData = {
    'contoru': {
        title: 'Contoru',
        desc: {
            pt: 'Uma ferramenta para organizar e compartilhar links dentro de um ambiente visual inspirado em um sistema operacional. Desenvolvido para resolver o acúmulo desordenado de referências e projetos, o Contoru permite criar desktops personalizados, agrupar itens em pastas, pesquisar, e convidar outras pessoas para colaboração em tempo real.',
            en: 'A tool for organizing and sharing links within a visual environment inspired by an operating system. Built to solve the clutter of scattered references and projects, Contoru allows users to create custom desktops, group items into folders, search, and invite others for real-time collaboration.'
        },
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
        link: 'https://contoru.vercel.app/',
        repos: [
            { label: { pt: 'Repositorio Web', en: 'Web Repository' }, url: 'https://github.com/boriloo/contoru-web' },
            { label: { pt: 'Repositorio API', en: 'API Repository' }, url: 'https://github.com/boriloo/contoru-api' }
        ]
    },
    'huemaster': {
        title: 'HueMaster',
        desc: {
            pt: 'Jogo de adivinhação de cores interativo. Testa a percepção visual do usuário exigindo que ele descubra a cor exata gerada aleatoriamente em formato hexadecimal. Interface imersiva com feedback dinâmico.',
            en: 'Interactive color guessing game. It tests the user\'s visual perception by requiring them to guess the exact randomly generated color in hexadecimal format. Immersive interface with dynamic feedback.'
        },
        techs: [
            { name: 'REACT', icon: 'devicon-react-original' },
            { name: 'VITE', icon: 'devicon-vite-original' },
            { name: 'TYPESCRIPT', icon: 'devicon-typescript-plain' },
            { name: 'NODE.JS', icon: 'devicon-nodejs-plain' },
            { name: 'VERCEL', icon: 'devicon-vercel-original' }
        ],
        images: [
            './public/projects/huemaster/huemaster.png',
            './public/projects/huemaster/huemaster2.jpg',
            './public/projects/huemaster/huemaster3.jpg'
        ],
        link: 'https://huemaster.vercel.app/',
        repos: [
            { label: { pt: 'Repositorio Web', en: 'Web Repository' }, url: 'https://github.com/boriloo/huemaster-client' },
            { label: { pt: 'Repositorio API', en: 'API Repository' }, url: 'https://github.com/boriloo/huemaster-server' }
        ]
    },
    'novabalanca': {
        title: 'NovaBalança',
        desc: {
            pt: 'Landing Page institucional construída para um escritório fictício de contabilidade. Totalmente responsiva e focada em SEO e performance (carregamento rápido), aplicando conceitos limpos de UI/UX para máxima conversão.',
            en: 'Institutional Landing Page built for a fictional accounting firm. Fully responsive and focused on SEO and performance (fast loading), applying clean UI/UX concepts for maximum conversion.'
        },
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
        link: 'https://boriloo.github.io/NovaBalanca-Contabilidade/',
        repos: [
            { label: { pt: 'Repositorio GitHub', en: 'GitHub Repository' }, url: 'https://github.com/boriloo/NovaBalanca-Contabilidade' }
        ]
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
let domSlides = [];


const baseClass = "absolute top-1/2 left-1/2 w-[85%] md:w-[50%] aspect-video -translate-y-1/2 rounded-xl overflow-hidden shadow-xl hide-cursor-ball border-2 border-fg/10 bg-black/5";


const posClasses = [
    "-translate-x-[150%] md:-translate-x-[180%] scale-50 opacity-0 z-10 pointer-events-none",
    "-translate-x-[105%] md:-translate-x-[120%] scale-75 opacity-40 z-20 cursor-pointer hover:opacity-80",
    "-translate-x-1/2 scale-100 opacity-100 z-30 pointer-events-auto",
    "translate-x-[5%] md:translate-x-[20%] scale-75 opacity-40 z-20 cursor-pointer hover:opacity-80",
    "translate-x-[50%] md:translate-x-[80%] scale-50 opacity-0 z-10 pointer-events-none"
];


const getIndex = (offset) => (currentImageIndex + offset + currentImages.length) % currentImages.length;

window.openModal = function (projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    // Busca qual é o idioma atual selecionado pelo usuário
    const currentLang = localStorage.getItem('language') || 'pt';

    modalTitle.textContent = data.title;
    // Puxa a descrição no idioma correto
    modalDesc.textContent = data.desc[currentLang];

    // Atualiza o botão principal de acesso
    modalLink.textContent = currentLang === 'pt' ? 'Acessar Projeto' : 'Access Project';
    modalLink.onclick = () => window.open(data.link, '_blank');

    modalTechs.innerHTML = '';

    modalRepos.innerHTML = '';
    if (data.repos && data.repos.length > 0) {
        modalRepos.classList.remove('hidden');
        data.repos.forEach(repo => {
            modalRepos.innerHTML += `
                <button onclick="window.open('${repo.url}', '_blank')" 
                    class="flex-1 bg-transparent border-2 border-fg/20 hover:border-first text-fg/80 hover:text-first p-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hide-cursor-ball text-[16px]">
                    <i class="devicon-github-plain text-[20px]"></i>
                    ${repo.label[currentLang]}
                </button>
            `;
        });
    } else {
        modalRepos.classList.add('hidden');
    }

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

    setTimeout(() => {
        domSlides.forEach(slide => slide.classList.replace('transition-none', 'transition-all'));
        domSlides.forEach(slide => slide.classList.add('duration-500', 'ease-in-out'));
    }, 50);

    modal.classList.remove('hidden');

    setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
};

window.closeModal = function () {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
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

    let el = domSlides.shift();
    el.classList.remove('transition-all', 'duration-500', 'ease-in-out');
    el.className = baseClass + " transition-none " + posClasses[4];
    el.querySelector('img').src = currentImages[getIndex(2)];
    domSlides.push(el);

    void el.offsetWidth;

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

    let el = domSlides.pop();
    el.classList.remove('transition-all', 'duration-500', 'ease-in-out');
    el.className = baseClass + " transition-none " + posClasses[0];
    el.querySelector('img').src = currentImages[getIndex(-2)];
    domSlides.unshift(el);

    void el.offsetWidth;

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