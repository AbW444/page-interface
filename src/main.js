// Point d'entrée principal de l'application Mondes Immergés
// Version JavaScript classique pour GitHub Pages

/**
 * Fonction principale d'initialisation
 * Gère le chargement des ressources et le démarrage de l'application
 */
function initialize() {
    console.log('Application Mondes Immergés en cours de chargement...');
    
    // Vérifier que les dépendances sont chargées
    if (typeof THREE === 'undefined') {
        console.error('Three.js non chargé');
        return;
    }
    
    if (typeof gsap === 'undefined') {
        console.error('GSAP non chargé');
        return;
    }
    
    // Désactiver complètement toutes les interactions de glissement
	const style = document.createElement('style');
	style.textContent = `
		#main-container, #globe-container, canvas {
			user-select: none !important;
			-webkit-user-select: none !important;
			-moz-user-select: none !important;
			-ms-user-select: none !important;
			touch-action: none !important;
			-webkit-user-drag: none !important;
			-khtml-user-drag: none !important;
			-moz-user-drag: none !important;
			-o-user-drag: none !important;
			user-drag: none !important;
			-webkit-touch-callout: none !important;
			pointer-events: auto !important;
			cursor: crosshair !important;
		}
	`;
	document.head.appendChild(style);
	
	// Masquer l'écran d'accueil dès le début
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
        welcomeScreen.classList.add('hidden');
    }
    
    // S'assurer que le conteneur principal est caché jusqu'à la fin de l'initialisation fictive
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
        mainContainer.classList.add('hidden');
        mainContainer.style.opacity = '0';
    }
    
    // Variables pour suivre le chargement des ressources
    let resourcesLoaded = 0;
    const totalResources = 8; // Nombre total de ressources à charger
    
    // Fonction de mise à jour de la progression
    const updateProgress = () => {
        resourcesLoaded++;
        const progress = Math.round((resourcesLoaded / totalResources) * 100);
        
        // Récupérer les éléments à chaque fois (ils sont créés par enhanceLoadingScreen)
        const currentProgressBar = document.querySelector('.progress-bar');
        const currentProgressText = document.querySelector('.progress-text');
        
        if (currentProgressBar) {
            currentProgressBar.style.width = `${progress}%`;
        }
        
        if (currentProgressText) {
            currentProgressText.textContent = `${progress}%`;
        }
        
        // Si toutes les ressources sont chargées, démarrer l'application
        if (resourcesLoaded >= totalResources) {
            startApplication();
        }
    };
    
    // Simuler le chargement des ressources avec des temps plus courts
    const resourceTypes = [
        'Configuration système',
        'Textures globe',
        'Vidéos des zones',
        'Données géographiques',
        'Interfaces utilisateur',
        'Modèles 3D',
        'Données scientifiques',
        'Effets visuels'
    ];
    
    // Simuler le chargement progressif plus rapidement
    resourceTypes.forEach((resource, index) => {
        const delay = 100 + Math.random() * 200; // Durées plus courtes
        setTimeout(() => {
            console.log(`Ressource chargée: ${resource}`);
            updateProgress();
        }, delay * (index + 1));
    });
    
    // Créer un arrière-plan étoilé pour le conteneur principal
    createStarfieldAnimation();
}

/**
 * Crée une animation d'étoiles en arrière-plan
 */
function createStarfieldAnimation() {
    const mainContainer = document.getElementById('main-container');
    
    // Vérifier si l'élément étoilé existe déjà
    if (mainContainer.querySelector('.starry-background')) {
        return;
    }
    
    // Créer un élément pour l'arrière-plan étoilé
    const starryBg = document.createElement('div');
    starryBg.className = 'starry-background';
    mainContainer.appendChild(starryBg);
    
    // Ajouter des étoiles animées
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Positionnement aléatoire
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 2 + 1;
        
        // Luminosité aléatoire
        const opacity = Math.random() * 0.7 + 0.3;
        
        // Animation aléatoire
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 3;
        
        star.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        starryBg.appendChild(star);
    }
    
    // Ajouter le style d'animation
    if (!document.getElementById('star-animation-style')) {
        const style = document.createElement('style');
        style.id = 'star-animation-style';
        style.textContent = `
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Démarre l'application principale et masque l'écran de chargement
 */
function startApplication() {
    console.log('Démarrage de l\'application...');
    
    // Pour cette version simplifiée, juste afficher l'interface
    const loadingScreen = document.getElementById('loading-screen');
    const mainContainer = document.getElementById('main-container');
    
    if (loadingScreen) {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    }
    
    if (mainContainer) {
        mainContainer.classList.remove('hidden');
        gsap.to(mainContainer, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });
    }
    
    // Initialiser les interactions de base
    initBasicInteractions();
}

/**
 * Initialise les interactions de base
 */
function initBasicInteractions() {
    // Gestion des boutons
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetViewBtn = document.getElementById('reset-view');
    const infoBtn = document.getElementById('info-button');
    const closeInfoBtn = document.getElementById('close-info');
    const infoOverlay = document.getElementById('info-overlay');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            console.log('Zoom in cliqué');
            animateButtonClick(zoomInBtn);
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            console.log('Zoom out cliqué');
            animateButtonClick(zoomOutBtn);
        });
    }
    
    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', () => {
            console.log('Reset view cliqué');
            animateButtonClick(resetViewBtn);
        });
    }
    
    if (infoBtn && infoOverlay) {
        infoBtn.addEventListener('click', () => {
            animateButtonClick(infoBtn);
            gsap.to(infoOverlay, {
                opacity: 1,
                duration: 0.3,
                onStart: () => {
                    infoOverlay.classList.remove('hidden');
                    infoOverlay.style.pointerEvents = 'all';
                }
            });
        });
    }
    
    if (closeInfoBtn && infoOverlay) {
        closeInfoBtn.addEventListener('click', () => {
            gsap.to(infoOverlay, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    infoOverlay.classList.add('hidden');
                    infoOverlay.style.pointerEvents = 'none';
                }
            });
        });
    }
}

/**
 * Anime un clic de bouton
 */
function animateButtonClick(button) {
    gsap.timeline()
        .to(button, {
            scale: 0.9,
            duration: 0.1
        })
        .to(button, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)"
        });
}

function enhanceLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) return;
    
    // Vérifier si déjà amélioré
    if (loadingScreen.querySelector('.progress-container')) return;
    
    // Supprimer l'ancien spinner CSS s'il existe
    const existingSpinner = loadingScreen.querySelector('.spinner');
    if (existingSpinner) {
        existingSpinner.remove();
    }
    
    // Créer un spinner simple
    const simpleSpinner = document.createElement('div');
    simpleSpinner.className = 'simple-spinner';
    simpleSpinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 3px solid rgba(255, 204, 0, 0.3);
        border-top: 3px solid #ffcc00;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 30px;
    `;
    
    // Ajouter l'animation CSS si elle n'existe pas
    if (!document.getElementById('spinner-animation')) {
        const style = document.createElement('style');
        style.id = 'spinner-animation';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const loadingText = loadingScreen.querySelector('p');
    if (loadingText) {
        loadingScreen.insertBefore(simpleSpinner, loadingText);
    } else {
        loadingScreen.appendChild(simpleSpinner);
    }
    
    // Créer le conteneur de la barre de progression
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.cssText = `
        width: 300px;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        margin-top: 20px;
        overflow: hidden;
        position: relative;
    `;
    
    // Créer la barre de progression
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        height: 100%;
        background-color: #ffcc00;
        width: 0%;
        transition: width 0.3s ease;
        position: absolute;
        top: 0;
        left: 0;
    `;
    
    // Créer le texte de pourcentage
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.style.cssText = `
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #ffcc00;
        font-family: 'Roboto Mono', monospace;
    `;
    progressText.textContent = '0%';
    
    // Assembler les éléments
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    loadingScreen.appendChild(progressContainer);
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    document.addEventListener('mousemove', e => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
    });
}

// S'assurer que le DOM est complètement chargé avant d'initialiser
document.addEventListener('DOMContentLoaded', () => {
    // D'abord améliorer l'écran de chargement pour créer les éléments
    enhanceLoadingScreen();
    
    // Puis démarrer l'initialisation après un court délai
    setTimeout(() => {
        initialize();
    }, 100);
    
    // Initialiser le curseur
    initCustomCursor();
});