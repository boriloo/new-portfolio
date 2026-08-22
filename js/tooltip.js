// @ts-nocheck
const tooltip = document.getElementById('tech-tooltip');
const tooltipText = document.getElementById('tech-tooltip-text');
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach(card => {

    card.addEventListener('mouseenter', () => {
        const description = card.getAttribute('data-desc');
        tooltipText.textContent = description;
        tooltip.style.opacity = '1';
    });



    card.addEventListener('mousemove', (e) => {

        const x = e.clientX - (tooltip.offsetWidth / 2);

        const y = e.clientY - tooltip.offsetHeight - 20;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    });

    card.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
});