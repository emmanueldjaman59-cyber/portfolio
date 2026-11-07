// ==========================================
// 1. MENU HAMBURGER
// ==========================================

// Récupération du menu de navigation
const navigation = document.querySelector("nav");

// Création du bouton hamburger
const boutonMenu = document.createElement("button");

boutonMenu.classList.add("menu-hamburger");

boutonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
boutonMenu.setAttribute("aria-expanded", "false");

// Ajout du bouton dans le header
document.querySelector("header").appendChild(boutonMenu);


// Ajout du style du bouton et du menu mobile
const styleMenu = document.createElement("style");

styleMenu.textContent = `

.menu-hamburger {
    display: none;
    background: none;
    border: none;
    color: #00aaff;
    font-size: 26px;
    cursor: pointer;
}

@media screen and (max-width: 768px) {

    header {
        position: sticky;
    }

    .menu-hamburger {
        display: block;
    }

    header nav {
        display: none;
        width: 100%;
    }

    header nav.menu-ouvert {
        display: block;
    }

    header nav ul {
        flex-direction: column;
        align-items: center;
        padding: 15px;
    }

}

`;

document.head.appendChild(styleMenu);


// Ouverture et fermeture du menu
boutonMenu.addEventListener("click", function() {

    navigation.classList.toggle("menu-ouvert");

    const menuOuvert = navigation.classList.contains("menu-ouvert");

    boutonMenu.setAttribute("aria-expanded", menuOuvert);

    if (menuOuvert) {

        boutonMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        boutonMenu.setAttribute("aria-label", "Fermer le menu");

    } else {

        boutonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

    }

});


// Fermeture automatique après un clic sur un lien
const liensMenu = document.querySelectorAll("nav ul li a");

liensMenu.forEach(function(lien) {

    lien.addEventListener("click", function() {

        navigation.classList.remove("menu-ouvert");

        boutonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        boutonMenu.setAttribute("aria-expanded", "false");

        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

    });

});


// ==========================================
// 2. ANIMATIONS AU DÉFILEMENT
// ==========================================

// Sélection des éléments à animer
const elements = document.querySelectorAll(
    ".titre-section, .apropos-contenu, .competence-carte, " +
    ".projet-carte, .parcours-carte, .contact-conteneur"
);


// Création du style des animations
const styleAnimation = document.createElement("style");

styleAnimation.textContent = `

.animation-entree {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.animation-entree.visible {
    opacity: 1;
    transform: translateY(0);
}

`;

document.head.appendChild(styleAnimation);


// Application de la classe d'animation
elements.forEach(function(element) {

    element.classList.add("animation-entree");

});


// Observer les éléments pendant le défilement
const observateur = new IntersectionObserver(function(entrees) {

    entrees.forEach(function(entree) {

        if (entree.isIntersecting) {

            entree.target.classList.add("visible");

            observateur.unobserve(entree.target);

        }

    });

}, {

    threshold: 0.15

});


// Observer chaque élément
elements.forEach(function(element) {

    observateur.observe(element);

});


// ==========================================
// 3. MISE À JOUR AUTOMATIQUE DE L'ANNÉE
// ==========================================

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML = copyright.innerHTML.replace(
        /\d{4}/,
        new Date().getFullYear()
    );

}


// ==========================================
// 4. FERMETURE DU MENU LORS D'UN CLIC
//    À L'EXTÉRIEUR
// ==========================================

document.addEventListener("click", function(e) {

    if (
        !navigation.contains(e.target) &&
        !boutonMenu.contains(e.target)
    ) {

        navigation.classList.remove("menu-ouvert");

        boutonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        boutonMenu.setAttribute("aria-expanded", "false");

        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

    }

});
