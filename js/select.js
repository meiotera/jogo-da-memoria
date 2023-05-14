document.addEventListener('click', (btn) => {
    const el = btn.target;
    if (el.classList.contains('btn-theme')) window.location = 'pages/game.html';   

    localStorage.setItem('theme', el.value)
});