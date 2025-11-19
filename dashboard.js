document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL CHAT ---
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatPopup = document.getElementById('chat-popup');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatWindow = document.getElementById('chat-messages-window'); 
    const chatMessageInput = document.getElementById('chat-message-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    
    // --- ELEMENTOS DEL DASHBOARD ---
    const subscriberCountElement = document.getElementById('subscriber-count');
    const chartTop = document.getElementById('chart-top'); 
    const chartBottom = document.getElementById('chart-bottom'); 

    // --- FUNCIONALIDAD DEL CHAT (Mantenida) ---
    
    function getRandomColor() {
        const colors = ['#5fcf1c', '#f2aa4c', '#53b6c4', '#ff8585', '#9e53b6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function addChatMessage(username, message, color) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<span class="username" style="color:${color}; font-weight: bold;">${username}:</span> ${message}`;
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

    chatToggleBtn.addEventListener('click', () => {
        chatPopup.style.display = 'flex';
        chatWindow.scrollTop = chatWindow.scrollHeight; 
    });

    closeChatBtn.addEventListener('click', () => {
        chatPopup.style.display = 'none';
    });

    const fakeUsers = ['EspectadorPro', 'Fanatica', 'UsuarioRandom', 'Amigo1'];
    const fakeMessages = [
        '¡Increíble jugada!', 'Sigan así.', 'Me encanta este contenido.', '🤩 Esto es épico.', 
        'Pulgar arriba si te gusta!', 'El mejor video de la semana.', '¿A qué hora termina el directo?', 
        '¡Saludos desde Latam!'
    ];
    
    setInterval(() => {
        if (chatPopup.style.display === 'flex') {
            const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
            const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
            const randomColor = getRandomColor();
            
            addChatMessage(randomUser, randomMessage, randomColor);
            
            if (chatWindow.children.length > 50) { 
                chatWindow.removeChild(chatWindow.firstElementChild);
            }
        }
    }, 3000);


    // --- FUNCIONALIDAD DEL DASHBOARD ---
    
    // 1. Contador de Suscriptores (Subida 10 en 10 o 50 en 50)
    let currentSubscribers = 1000000; 

    function updateSubscribers() {
        const increase = Math.random() < 0.5 ? 10 : 50; 
        currentSubscribers += increase;

        let displayValue;
        if (currentSubscribers >= 1000) {
            displayValue = (currentSubscribers / 1000).toFixed(1).replace('.0', '') + 'k';
        } else {
            displayValue = currentSubscribers.toString();
        }
        
        subscriberCountElement.textContent = displayValue;
    }

    setInterval(updateSubscribers, 2000);


    // 2. Gráficos Interactivos con Chart.js (AJUSTE: MOSTRAR EJES Y LÍNEAS)
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];

    function generateRandomData(min, max, count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return data;
    }

    // Opciones Comunes para mostrar los ejes y la cuadrícula
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
            y: { 
                beginAtZero: true, 
                display: true, // MOSTRAR EJE Y
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)' // Líneas de cuadrícula visibles
                }
            }, 
            x: { 
                display: true, // MOSTRAR EJE X
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)' // Líneas de cuadrícula visibles
                }
            } 
        },
        plugins: { 
            legend: { display: false } 
        }
    };

    // Inicialización del Gráfico de Visitas
    const visitsCtx = document.getElementById('visitsChart').getContext('2d');
    const visitsChart = new Chart(visitsCtx, {
        type: 'line', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Visitas',
                data: generateRandomData(50, 200, labels.length), 
                borderColor: '#483d8b', 
                backgroundColor: 'rgba(72, 61, 139, 0.2)', 
                tension: 0.4, 
                fill: true
            }]
        },
        options: chartOptions
    });

    // Inicialización del Gráfico de Recursos Ganados
    const resourcesCtx = document.getElementById('resourcesChart').getContext('2d');
    const resourcesChart = new Chart(resourcesCtx, {
        type: 'line', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Recursos',
                data: generateRandomData(10, 80, labels.length), 
                borderColor: '#ff0000', 
                backgroundColor: 'rgba(255, 0, 0, 0.2)', 
                tension: 0.4,
                fill: true
            }]
        },
        options: chartOptions
    });

    // Función para actualizar los datos de los gráficos y simular el movimiento interno
    function updateChartData() {
        visitsChart.data.datasets[0].data = generateRandomData(50, 200, labels.length);
        visitsChart.update(); 

        resourcesChart.data.datasets[0].data = generateRandomData(10, 80, labels.length);
        resourcesChart.update(); 
    }

    setInterval(updateChartData, 3000);


    // 3. Movimiento Vertical de las Cajas de Gráficos (Animación CSS)
    setTimeout(() => {
        chartTop.classList.add('moving-chart');
    }, 500);

    setTimeout(() => {
        chartBottom.classList.add('moving-chart');
        chartBottom.style.animationDuration = '3s'; 
    }, 1500);
});