// Point d'entrée principal de l'application Mondes Immergés
import './styles/main.css';
import { initApp, getAppInstance } from './app.js';
import { jelly } from 'ldrs';

/**
 * Fonction principale d'initialisation
 * Gère le chargement des ressources et le démarrage de l'application
 */
function initialize() {
    console.log('Application Mondes Immergés en cours de chargement...');
    
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
    
    // Element de progression - seront créés par enhanceLoadingScreen()
	let progressBar = null;
	let progressText = null;
    
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
    
    // Initialiser l'application mais ne pas encore la rendre visible
    initApp();
    
    // Récupérer l'instance de l'application
    const app = getAppInstance();
    
    // Simuler un court délai avant de commencer la séquence d'initialisation fictive
    setTimeout(() => {
        // Simuler le chargement fictif avec la séquence d'initialisation
        if (app) {
            // Cette fonction va démarrer la séquence d'initialisation et,
            // une fois terminée, va automatiquement démarrer l'exploration
            triggerStartupSequence(app);
        } else {
            console.error("Impossible de récupérer l'instance de l'application");
        }
    }, 300);
}

/**
 * Déclenche la séquence d'initialisation fictive, puis démarre l'exploration
 * @param {Object} app - Instance de l'application
 */
function triggerStartupSequence(app) {
    // Masquer l'écran de chargement initial
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // S'assurer que le conteneur principal est visible pour les animations
            // mais sans montrer l'interface complète encore
            const mainContainer = document.getElementById('main-container');
            mainContainer.classList.remove('hidden');
            mainContainer.style.opacity = '1';
            
            // Démarrer la séquence d'initialisation fictive
            if (app.startupSequence) {
                // Exécuter la séquence de démarrage fictive
                app.startupSequence();
                
                // Après la séquence de démarrage, lancer l'exploration SANS nouvelle séquence
                setTimeout(() => {
                    app.startExploration(true); // true = skip la seconde séquence d'initialisation
                }, 5000); // Ajustez ce délai si nécessaire pour correspondre à la durée des animations
            } else {
                // Fallback si la fonction startupSequence n'existe pas
                app.startExploration(true);
            }
        }, 500);
    } else {
        // Si l'écran de chargement n'existe pas, initialiser directement
        app.startExploration(true);
    }
}

	// L'import est déjà fait en haut du fichier, donc supprimer ces lignes

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
    
    // Enregistrer l'icône Jelly (une seule fois)
    jelly.register();

    // Créer l'icône Jelly
    const customSpinner = document.createElement('l-jelly');
    customSpinner.setAttribute('size', '60');
    customSpinner.setAttribute('speed', '0.9');
    customSpinner.setAttribute('color', '#ffcc00');
    customSpinner.style.cssText = `
        margin-bottom: 30px;
        display: block;
    `;

    // Insérer le spinner avant le texte de chargement
    const loadingText = loadingScreen.querySelector('p');
    if (loadingText) {
        loadingScreen.insertBefore(customSpinner, loadingText);
    } else {
        loadingScreen.appendChild(customSpinner);
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

// S'assurer que le DOM est complètement chargé avant d'initialiser
document.addEventListener('DOMContentLoaded', () => {
    // D'abord améliorer l'écran de chargement pour créer les éléments
    enhanceLoadingScreen();
    
    // Puis démarrer l'initialisation après un court délai
    setTimeout(() => {
        initialize();
    }, 100);
});

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

// Appeler juste après le chargement
window.addEventListener("load", function () {
    initCustomCursor();
});
