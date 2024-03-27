// Fonction pour charger le contenu d'une page dans la balise <main>
function loadContent(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Erreur lors du chargement de la page');
            }
        })
        .then(data => {
            document.querySelector('main').innerHTML = data;
        })
        .catch(error => {
            console.log('Erreur lors du chargement du contenu :', error);
        });
}

// Fonction pour gérer les clics sur les liens du menu
function handleMenuClick(event) {
    event.preventDefault();
    const url = event.target.getAttribute('href');
    loadContent(url);
}

// Fonction pour gérer les clics sur les liens du sous-menu
function handleSubmenuClick(event) {
    event.preventDefault();
    const url = event.target.getAttribute('href');
    const anchor = url.split('#')[1];
    loadContent(url.split('#')[0]).then(() => {
        const element = document.querySelector(`#${anchor}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Vérifier si nous sommes en HTTP/HTTPS
if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    // Ajout des écouteurs d'événements sur les liens du menu
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });

    // Ajout des écouteurs d'événements sur les liens du sous-menu
    document.querySelectorAll('.submenu li a').forEach(link => {
        link.addEventListener('click', handleSubmenuClick);
    });

    // Chargement initial du contenu de la page d'accueil
    loadContent('index.html');
}

// Gestion du clic sur le menu hamburger
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});