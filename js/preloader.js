// @ts-nocheck

/**
 * ==========================================
 * GLOBAL ASSET PRELOADER
 * ==========================================
 * Pré-carrega todas as imagens do site (HTML, CSS embutido e Modal)
 * para garantir transições instantâneas e sem cortes.
 */

function preloadAllAssets() {
    const imagesToPreload = new Set(); // Usamos Set para evitar carregar a mesma imagem duas vezes

    // 1. Pega todas as imagens que já estão no HTML (ícones, fotos, brazil.png, etc)
    const htmlImages = document.querySelectorAll('img');
    htmlImages.forEach(img => {
        if (img.src) {
            imagesToPreload.add(img.src);
        }
    });

    // 2. Extrai imagens de elementos que usam background-image inline (ex: o botão de download, sun/moon)
    // Procuramos por qualquer elemento que tenha um 'style' definido.
    const elementsWithStyle = document.querySelectorAll('[style]');
    elementsWithStyle.forEach(el => {
        const bgImage = el.style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
            // Extrai a URL de dentro do 'url("caminho/da/imagem.png")'
            const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
                imagesToPreload.add(urlMatch[1]);
            }
        }
    });

    // Adiciona caminhos CSS manuais se houver (já que não conseguimos ler o CSS compilado direto)
    // No seu HTML, os ícones de download e do modo claro/escuro usam classes CSS, vamos garantir:
    imagesToPreload.add('./public/icons/downloads.png');
    imagesToPreload.add('./public/icons/white-sun.png');
    imagesToPreload.add('./public/icons/white-moon.png');

    // 3. Pega todas as imagens do projectsData (do arquivo modal.js)
    if (typeof projectsData !== 'undefined') {
        const projectKeys = Object.keys(projectsData);
        projectKeys.forEach(key => {
            if (projectsData[key].images) {
                projectsData[key].images.forEach(imgSrc => {
                    imagesToPreload.add(imgSrc);
                });
            }
        });
    }

    // 4. Executa o Preload em memória
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        // console.log("Preloading:", src); // Descomente para ver no console se está funcionando
    });
}

// Otimização de Performance: 
// Esperamos a janela carregar e damos um pequeno delay de 500ms 
// para garantir que a renderização visual do HTML não seja atrasada pelo preloader.
window.addEventListener('load', () => {
    setTimeout(preloadAllAssets, 500);
});