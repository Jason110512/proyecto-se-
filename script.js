document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del Header ---
    const searchToggle = document.getElementById('search-toggle');
    const searchInput = document.getElementById('search-input');
    const profileOpenBtn = document.getElementById('profile-open');
    const profileModal = document.getElementById('profile-modal');
    const profileCloseBtn = document.getElementById('profile-close');
    
    // --- Elementos del Contenido ---
    const subscribeBtn = document.getElementById('subscribe-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatMessageInput = document.getElementById('chat-message-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const warningTextBox = document.getElementById('warning-text'); 
    
    // --- Funcionalidad del Header ---
    
    // 1. Alternar campo de búsqueda
    searchToggle.addEventListener('click', () => {
        // Usa la propiedad display para ocultar/mostrar
        if (searchInput.style.display === 'none' || searchInput.style.display === '') {
            searchInput.style.display = 'block';
            searchInput.focus(); // Pone el foco en el input
        } else {
            searchInput.style.display = 'none';
            searchInput.value = ''; // Limpia el contenido al ocultar
        }
    });

    // 2. Abrir Modal de Perfil
    profileOpenBtn.addEventListener('click', () => {
        profileModal.style.display = 'block';
    });

    // 3. Cerrar Modal de Perfil con la 'X'
    profileCloseBtn.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });
    
    // 4. Cerrar Modal de Perfil haciendo clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // --- Funcionalidad del Chat y Suscripción (Sin Cambios) ---

    // Array de mensajes de advertencia
    const warningMessages = [
        { text: 'Alerta: Información falsa', color: '#ffcc00' },
        { text: 'Alerta: Fraude potencial', color: '#ff8585' },
        { text: 'Alerta: Solo para adultos', color: '#ffcc00' },
        { text: 'Alerta: Solo mayores de 13 años', color: '#53b6c4' },
        { text: 'Alerta: Video desinformativo', color: '#ff8585' },
        { text: 'Alerta: Video confiable', color: '#5fcf1c' }
    ];
    let currentWarningIndex = 0;
    
    function getRandomColor() {
        const colors = ['#5fcf1c', '#f2aa4c', '#53b6c4', '#ff8585', '#9e53b6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    subscribeBtn.addEventListener('click', () => {
        if (subscribeBtn.classList.contains('subscribed')) {
            subscribeBtn.classList.remove('subscribed');
            subscribeBtn.style.backgroundColor = '#cc0000';
            subscribeBtn.innerHTML = '<i class="fas fa-play-circle"></i> Suscribirse';
        } else {
            subscribeBtn.classList.add('subscribed');
            subscribeBtn.style.backgroundColor = '#555'; 
            subscribeBtn.innerHTML = 'Suscrito <i class="fas fa-check"></i>';
        }
    });

    function addChatMessage(username, message, color) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<span class="username" style="color:${color};">${username}:</span> ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function sendChatMessage() {
        const message = chatMessageInput.value.trim();
        if (message !== '') {
            addChatMessage('Tú', message, '#9e53b6'); 
            chatMessageInput.value = '';
        }
    }

    sendChatBtn.addEventListener('click', sendChatMessage);

    chatMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Funcionalidad de Advertencia Dinámica
    function updateWarning() {
        const currentWarning = warningMessages[currentWarningIndex];
        warningTextBox.textContent = currentWarning.text;
        currentWarningIndex = (currentWarningIndex + 1) % warningMessages.length;
    }

    updateWarning(); 
    setInterval(updateWarning, 5000); 

    // Simulación de mensajes de otros usuarios
    const fakeUsers = ['EspectadorPro', 'Fanatica', 'UsuarioRandom', 'Amigo1'];
    const fakeMessages = [
        '¡Increíble jugada!', 'Sigan así.', 'Me encanta este contenido.', '🤩 Esto es épico.', 
        'Pulgar arriba si te gusta!', 'El mejor video de la semana.', '¿A qué hora termina el directo?', 
        '¡Saludos desde Latam!'
    ];
    
    setInterval(() => {
        const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
        const randomColor = getRandomColor();
        
        addChatMessage(randomUser, randomMessage, randomColor);
        
        if (chatWindow.children.length > 30) { 
            chatWindow.removeChild(chatWindow.firstElementChild);
        }
    }, 3000);
});