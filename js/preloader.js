// @ts-nocheck

// 
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function preloadAllAssets() {
    const imagesToPreload = new Set();

    const htmlImages = document.querySelectorAll('img');
    htmlImages.forEach(img => {
        if (img.src) {
            imagesToPreload.add(img.src);
        }
    });

    const elementsWithStyle = document.querySelectorAll('[style]');
    elementsWithStyle.forEach(el => {
        const bgImage = el.style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
            const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
                imagesToPreload.add(urlMatch[1]);
            }
        }
    });

    imagesToPreload.add('./public/icons/downloads.png');
    imagesToPreload.add('./public/icons/white-sun.png');
    imagesToPreload.add('./public/icons/white-moon.png');

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

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', () => {

    window.scrollTo(0, 0);

    const loader = document.querySelector('.loading-container');

    if (loader) {
        loader.classList.add('start-anim');

        setTimeout(() => {
            loader.style.display = 'none';
        }, 2600);
    }

    setTimeout(preloadAllAssets, 500);
});