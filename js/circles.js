// @ts-nocheck
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
let isHidden = false; // Controle de visibilidade

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.transition = "opacity 0.2s ease"; // Transição suave para sumir/aparecer
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
    
    // Verifica se o mouse está sobre o elemento ou seus filhos
    isHidden = e.target.closest('.hide-cursor-ball') !== null;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        
        // Aplica a opacidade dependendo do hover
        circle.style.opacity = isHidden ? "0" : "1";
        
        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();