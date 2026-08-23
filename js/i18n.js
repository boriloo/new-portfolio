// @ts-nocheck
const activeClasses = ['border-first', 'text-first', 'font-semibold', 'pointer-events-none'];
const inactiveClasses = ['border-fg/20', 'bg-bg', 'text-fg/70', 'hover:border-fg', 'hover:text-fg', 'cursor-pointer'];

// Dicionário de traduções
const translations = {
    pt: {
        nav_about: "Sobre mim",
        nav_stack: "Stack",
        nav_exp: "Experiência",
        nav_proj: "Projetos",
        nav_contact: "Contato",
        nav_langs: "Idiomas",

        hero_hi: "Opa! me chamo",
        hero_desc: `Sou um desenvolvedor <span class="text-first font-semibold">full-stack</span> brasileiro <img src="./public/assets/brazil.png" class="w-6 h-8 inline-block align-middle mx-1 pb-1"> com 19 anos de idade, especializado em React/Next.js e Node.js, com experiência em desenvolvimento de aplicações de nível comercial.`,
        hero_cv: "Baixar Currículo",
        hero_tooltip: "Esse sou eu!",

        about_title: "Quem sou eu",
        about_p1: "Sou um Desenvolvedor Full-Stack e estudante de Engenharia de Software focado na criação de aplicações web escaláveis, APIs REST e interfaces dinâmicas. Domino o ecossistema JavaScript/TypeScript, com tecnologias como React, Next.js, Node.js e bancos SQL/NoSQL, atuando diariamente com práticas modernas de engenharia, fluxos Git e metodologias ágeis.",
        about_p2: "Minha principal característica é a resolução de problemas: consigo traduzir protótipos complexos e regras de negócio em soluções de ponta a ponta, sempre priorizando a performance e a experiência do usuário final.",
        about_p3: "Atualmente, atuo desenvolvendo plataformas web e arquitetando automações avançadas de integração de sistemas via n8n. Além disso, desenvolvo meus próprios projetos!",
        about_btn: "Ver meus projetos",

        stack_title: "Quais tecnologias uso",
        stack_others: "Outras",

        // Tooltips da Stack
        desc_ts: "Tipagem estática que traz segurança e previsibilidade para o JavaScript.",
        desc_react: "Criação de interfaces de usuário dinâmicas e baseadas em componentes.",
        desc_next: "Framework React focado em performance, SSR e SEO.",
        desc_tw: "Estilização rápida e responsiva com classes utilitárias no HTML.",
        desc_node: "Execução de JavaScript no servidor para criar APIs escaláveis.",
        desc_prisma: "ORM moderno que facilita a interação com bancos de dados.",
        desc_pg: "Banco de dados relacional robusto e focado em integridade de dados.",
        desc_docker: "Containerização para garantir que a aplicação rode em qualquer ambiente.",
        desc_html: "Estruturação semântica e acessível para páginas web.",
        desc_vite: "Ferramenta de build moderna e ultrarrápida para desenvolvimento front-end.",
        desc_express: "Framework minimalista para rotas e middlewares no Node.js.",
        desc_py: "Automação, scripts de dados e desenvolvimento back-end versátil.",
        desc_mysql: "Sistema de gerenciamento de banco de dados relacional clássico e confiável.",
        desc_supa: "Plataforma de back-end open-source, alternativa completa ao Firebase.",
        desc_redis: "Armazenamento em memória de altíssima velocidade para cache e sessões.",
        desc_git: "Controle de versionamento de código e colaboração segura.",
        desc_fb: "Plataforma do Google com serviços de autenticação, banco de dados e hosting.",
        desc_figma: "Ferramenta de design colaborativo para prototipagem de interfaces UI/UX.",
        desc_jira: "Planejamento de sprints e rastreamento de issues em metodologias ágeis.",
        desc_wp: "Criação e manutenção de sites focados em gestão de conteúdo (CMS).",

        exp_prof: "Profissional",
        exp_acad: "Acadêmica",
        exp_room_role: "- Desenvolvedor Front-End Júnior",
        exp_room_p1: "Desenvolvi e mantive uma biblioteca de componentes reutilizáveis utilizando React e TypeScript, garantindo a consistência visual e escalabilidade.",
        exp_room_p2: "Colaborei em ciclos ágeis com o time de UX/UI, convertendo protótipos complexos do Figma em interfaces funcionais de alta fidelidade, priorizando a performance e a experiência do usuário.",
        exp_room_p3: "Arquitetura e implementação de integrações com APIs REST para o gerenciamento de dados dinâmicos, otimizando o consumo de recursos e a renderização de informações em tempo real na aplicação.",
        exp_now: "Atualmente",
        exp_bivox_role: "- Desenvolvedor Web/N8N",
        exp_bivox_p1: "Desenvolvimento e manutenção de plataformas web e sites institucionais (WordPress, HTML, CSS, JS), com foco em performance e experiência do usuário.",
        exp_bivox_p2: "Arquitetura e desenvolvimento de integrações via APIs REST utilizando n8n, conectando sistemas operacionais e ferramentas de marketing (como RD Station) para otimização de processos.",
        exp_bivox_p3: "Modelagem e administração de bancos de dados SQL para dar suporte escalável às soluções e fluxos de automação.",
        exp_senac_role: "Técnico em Informática para Internet",
        exp_senac_p1: "Formação focada na base do desenvolvimento web, englobando a construção de interfaces responsivas (HTML, CSS, JS) e estruturação de bancos de dados.",
        exp_senac_p2: "Desenvolvimento de habilidades em lógica de programação, versionamento de código com Git e trabalho em equipe através de projetos práticos escolares.",
        exp_studying: "Cursando",
        exp_lasalle_role: "Bacharelado em Engenharia de Software",
        exp_lasalle_p1: "Aprofundamento em arquitetura de software, padrões de projeto, clean code e construção de sistemas modernos e escaláveis.",
        exp_lasalle_p2: "Estudo de metodologias de engenharia de requisitos e modelagem de dados avançada, unindo a teoria acadêmica com a minha vivência diária no mercado de tecnologia.",

        proj_contoru: "- Um Desktop Online",
        proj_hue: "- Jogo de adivinhação",
        proj_nova: "- Landing Page de Contabilidade",

        contact_title: "Vamos construir algo!"
    },
    en: {
        nav_about: "About me",
        nav_stack: "Stack",
        nav_exp: "Experience",
        nav_proj: "Projects",
        nav_contact: "Contact",
        nav_langs: "Languages",

        hero_hi: "Hi! I'm",
        hero_desc: `I'm a 19 year old <img src="./public/assets/brazil.png" class="w-6 h-8 inline-block align-middle mx-1 pb-1"> Brazilian <span class="text-first font-semibold">full-stack</span> developer  specialized in React/Next.js and Node.js, with experience building commercial-grade applications.`,
        hero_cv: "Download Resume",
        hero_tooltip: "That's me!",

        about_title: "Who am I",
        about_p1: "I am a Full-Stack Developer and Software Engineering student focused on building scalable web applications, REST APIs, and dynamic interfaces. I master the JavaScript/TypeScript ecosystem, using technologies like React, Next.js, Node.js, and SQL/NoSQL databases, working daily with modern engineering practices, Git workflows, and agile methodologies.",
        about_p2: "My main trait is problem-solving: I can translate complex prototypes and business rules into end-to-end solutions, always prioritizing performance and the end-user experience.",
        about_p3: "Currently, I develop web platforms and architect advanced system integrations via n8n. In addition, I build my own personal projects!",
        about_btn: "See my projects",

        stack_title: "Technologies I use",
        stack_others: "Others",

        desc_ts: "Static typing that brings safety and predictability to JavaScript.",
        desc_react: "Creation of dynamic, component-based user interfaces.",
        desc_next: "React framework focused on performance, SSR, and SEO.",
        desc_tw: "Fast and responsive styling using utility classes in HTML.",
        desc_node: "Server-side JavaScript execution to build scalable APIs.",
        desc_prisma: "Modern ORM that makes database interactions seamless.",
        desc_pg: "Robust relational database focused on data integrity.",
        desc_docker: "Containerization to ensure applications run uniformly anywhere.",
        desc_html: "Semantic and accessible structuring for web pages.",
        desc_vite: "Modern and ultra-fast build tool for front-end development.",
        desc_express: "Minimalist framework for routing and middleware in Node.js.",
        desc_py: "Automation, data scripts, and versatile back-end development.",
        desc_mysql: "Classic and reliable relational database management system.",
        desc_supa: "Open-source back-end platform, a complete alternative to Firebase.",
        desc_redis: "High-speed in-memory data store for caching and sessions.",
        desc_git: "Source code version control and secure collaboration.",
        desc_fb: "Google's platform providing auth, database, and hosting services.",
        desc_figma: "Collaborative design tool for UI/UX prototyping.",
        desc_jira: "Sprint planning and issue tracking in agile methodologies.",
        desc_wp: "Creation and maintenance of Content Management System (CMS) websites.",

        exp_prof: "Professional",
        exp_acad: "Academic",
        exp_room_role: "- Junior Front-End Developer",
        exp_room_p1: "Developed and maintained a reusable component library using React and TypeScript, ensuring visual consistency and scalability.",
        exp_room_p2: "Collaborated in agile cycles with the UX/UI team, translating complex Figma prototypes into functional, high-fidelity interfaces.",
        exp_room_p3: "Architected and implemented REST API integrations for dynamic data management, optimizing resource consumption and real-time rendering.",
        exp_now: "Present",
        exp_bivox_role: "- Web/N8N Developer",
        exp_bivox_p1: "Developed and maintained web platforms and institutional sites (WordPress, HTML, CSS, JS), focusing on performance and user experience.",
        exp_bivox_p2: "Architected system integrations via REST APIs using n8n, connecting operational systems and marketing tools (like RD Station).",
        exp_bivox_p3: "Modeled and administered SQL databases to provide scalable support for automated workflows and internal solutions.",
        exp_senac_role: "Internet IT Technician",
        exp_senac_p1: "Education focused on web development fundamentals, including responsive interfaces (HTML, CSS, JS) and database structuring.",
        exp_senac_p2: "Developed logic programming skills, code versioning with Git, and teamwork through practical school projects.",
        exp_studying: "Studying",
        exp_lasalle_role: "Bachelor of Software Engineering",
        exp_lasalle_p1: "Deepening knowledge in software architecture, design patterns, clean code, and building modern, scalable systems.",
        exp_lasalle_p2: "Studying advanced data modeling and requirements engineering, bridging academic theory with daily tech market experience.",

        proj_contoru: "- An Online Desktop",
        proj_hue: "- Color Guessing Game",
        proj_nova: "- Accounting Landing Page",

        contact_title: "Let's build something!"
    }
};

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updateButtonsVisual(lang);
    updateTexts(lang);
}

function updateButtonsVisual(lang) {
    const btnPt = document.getElementById('btn-pt');
    const btnEn = document.getElementById('btn-en');

    if (!btnPt || !btnEn) return;

    if (lang === 'pt') {
        btnPt.classList.remove(...inactiveClasses);
        btnPt.classList.add(...activeClasses);
        btnEn.classList.remove(...activeClasses);
        btnEn.classList.add(...inactiveClasses);
    } else {
        btnEn.classList.remove(...inactiveClasses);
        btnEn.classList.add(...activeClasses);
        btnPt.classList.remove(...activeClasses);
        btnPt.classList.add(...inactiveClasses);
    }
}

function updateTexts(lang) {
    // 1. Atualiza elementos de texto padrão
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // 2. Atualiza tooltips da section Stack (data-desc)
    document.querySelectorAll('[data-i18n-desc]').forEach(el => {
        const key = el.getAttribute('data-i18n-desc');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('data-desc', translations[lang][key]);
        }
    });
}

// Carrega o idioma ao iniciar a página
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('language') || 'pt';
    updateButtonsVisual(savedLang);
    updateTexts(savedLang);
});