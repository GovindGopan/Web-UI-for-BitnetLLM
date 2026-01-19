// ===== State Management =====
const state = {
    computeMode: 'cpu',
    messages: [],
    isProcessing: false
};

// ===== DOM Elements =====
const elements = {
    chatMessages: document.getElementById('chatMessages'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    cpuBtn: document.getElementById('cpuBtn'),
    gpuBtn: document.getElementById('gpuBtn'),
    clearBtn: document.getElementById('clearBtn'),
    currentMode: document.getElementById('currentMode'),
    statusBar: document.getElementById('statusBar')
};

// ===== Utility Functions =====
function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function autoResizeTextarea() {
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// ===== Message Functions =====
function createMessageElement(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';

    if (isUser) {
        avatar.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        `;
    } else {
        avatar.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
            </svg>
        `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = formatTime();

    contentDiv.appendChild(bubble);
    contentDiv.appendChild(time);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

function createTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
        </svg>
    `;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;

    bubble.appendChild(typingDiv);
    contentDiv.appendChild(bubble);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

function removeWelcomeMessage() {
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => welcomeMsg.remove(), 300);
    }
}

function addMessage(content, isUser = false) {
    removeWelcomeMessage();

    const messageElement = createMessageElement(content, isUser);
    elements.chatMessages.appendChild(messageElement);

    state.messages.push({
        content,
        isUser,
        timestamp: new Date()
    });

    setTimeout(scrollToBottom, 100);
}

function showTypingIndicator() {
    removeWelcomeMessage();
    const indicator = createTypingIndicator();
    elements.chatMessages.appendChild(indicator);
    setTimeout(scrollToBottom, 100);
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// ===== Mock LLM Response (Backend Integration Point) =====
async function getLLMResponse(userMessage) {
    // This is where you'll integrate your backend
    // For now, it's a mock response

    return new Promise((resolve) => {
        setTimeout(() => {
            const responses = [
                "I'm a placeholder response. Connect me to your LLM backend!",
                "This is where your quantised model will generate responses.",
                `You said: "${userMessage}". I'm ready to be connected to your LLM!`,
                "Backend integration coming soon. I'm currently running in demo mode.",
                "Your message has been received. Awaiting backend connection..."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            resolve(randomResponse);
        }, 1500 + Math.random() * 1000);
    });
}

// ===== Send Message =====
async function sendMessage() {
    const message = elements.messageInput.value.trim();

    if (!message || state.isProcessing) return;

    state.isProcessing = true;
    elements.sendBtn.disabled = true;

    // Add user message
    addMessage(message, true);

    // Clear input
    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Get LLM response (this will be replaced with actual backend call)
        const response = await getLLMResponse(message);

        // Hide typing indicator
        hideTypingIndicator();

        // Add assistant message
        addMessage(response, false);
    } catch (error) {
        hideTypingIndicator();
        addMessage('Sorry, something went wrong. Please try again.', false);
        console.error('Error:', error);
    } finally {
        state.isProcessing = false;
        elements.sendBtn.disabled = false;
        elements.messageInput.focus();
    }
}

// ===== Compute Mode Toggle =====
function setComputeMode(mode) {
    state.computeMode = mode;

    // Update button states
    elements.cpuBtn.classList.toggle('active', mode === 'cpu');
    elements.gpuBtn.classList.toggle('active', mode === 'gpu');

    // Update status display
    elements.currentMode.textContent = mode.toUpperCase();

    // This is where you'll send the mode to your backend
    console.log(`Compute mode changed to: ${mode.toUpperCase()}`);

    // Show brief notification (optional)
    showNotification(`Switched to ${mode.toUpperCase()} mode`);
}

function showNotification(message) {
    const statusText = document.querySelector('.status-text');
    const originalText = statusText.textContent;

    statusText.textContent = message;

    setTimeout(() => {
        statusText.textContent = originalText;
    }, 2000);
}

// ===== Clear Chat =====
function clearChat() {
    if (state.messages.length === 0) return;

    if (confirm('Are you sure you want to clear the chat history?')) {
        state.messages = [];
        elements.chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                </div>
                <h2>Welcome to LLM Chat</h2>
                <p>Start a conversation with your quantised LLM model</p>
                <div class="welcome-features">
                    <div class="feature">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                        <span>High Performance</span>
                    </div>
                    <div class="feature">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>Secure & Private</span>
                    </div>
                    <div class="feature">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>Real-time Response</span>
                    </div>
                </div>
            </div>
        `;

        showNotification('Chat cleared');
    }
}

// ===== Event Listeners =====
elements.sendBtn.addEventListener('click', sendMessage);

elements.messageInput.addEventListener('input', () => {
    autoResizeTextarea();
    elements.sendBtn.disabled = !elements.messageInput.value.trim();
});

elements.messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

elements.cpuBtn.addEventListener('click', () => setComputeMode('cpu'));
elements.gpuBtn.addEventListener('click', () => setComputeMode('gpu'));
elements.clearBtn.addEventListener('click', clearChat);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    elements.messageInput.focus();
    console.log('LLM Chat Interface initialized');
    console.log('Current compute mode:', state.computeMode.toUpperCase());
});

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
