// Point d'entrée principal temporaire - Version de débogage
// Imports CSS et modules commentés temporairement pour isoler le problème

console.log('🔍 DÉBOGAGE: Application Mondes Immergés en cours de chargement...');

/**
 * Fonction principale d'initialisation temporaire
 */
function initialize() {
    console.log('🔍 DÉBOGAGE: Initialisation temporaire...');
    
    // Test basique - juste afficher le contenu
    const mainContainer = document.getElementById('main-container');
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    if (mainContainer) {
        mainContainer.style.display = 'block';
        mainContainer.style.opacity = '1';
        mainContainer.classList.remove('hidden');
    }
    
    // Ajouter un message de débogage
    const debugMessage = document.createElement('div');
    debugMessage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    color: white; font-family: 'Roboto Mono', monospace; text-align: center;
                    background: rgba(0,0,0,0.8); padding: 20px; border-radius: 10px;">
            <h2>🔍 MODE DÉBOGAGE</h2>
            <p>Application chargée sans modules</p>
            <p>CSS et JS modules désactivés temporairement</p>
            <p>Si vous voyez ce message, le problème vient d'un des modules importés</p>
        </div>
    `;
    
    if (mainContainer) {
        mainContainer.appendChild(debugMessage);
    }
    
    console.log('🔍 DÉBOGAGE: Initialisation terminée - application basique fonctionnelle');
}

// S'assurer que le DOM est complètement chargé avant d'initialiser
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 DÉBOGAGE: DOM chargé, démarrage de l\'initialisation...');
    initialize();
});

// Test du curseur personnalisé basique
function initCustomCursor() {
    console.log('🔍 DÉBOGAGE: Initialisation curseur...');
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) {
        console.log('🔍 DÉBOGAGE: Éléments de curseur non trouvés');
        return;
    }

    document.addEventListener('mousemove', e => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
    });
    
    console.log('🔍 DÉBOGAGE: Curseur initialisé');
}

// Appeler après le chargement
window.addEventListener("load", function () {
    initCustomCursor();
});
