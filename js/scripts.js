document.addEventListener('DOMContentLoaded', () => {
    // ---- Script dos Gráficos ----
    Chart.register(ChartDataLabels);

    const colors = {
        pinkAccent: 'rgba(255, 128, 171, 0.8)',
        pinkSecondary: 'rgba(194, 24, 91, 0.8)',
        pinkPrimary: 'rgba(233, 30, 99, 0.8)',
        teal: 'rgba(75, 192, 192, 0.8)',
        lightPink: 'rgba(255, 235, 238, 0.8)',
        gray: 'rgba(209, 213, 219, 0.8)'
    };

    const incidenciaCtx = document.getElementById('incidenciaChart');
    if (incidenciaCtx) {
        new Chart(incidenciaCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Sudeste', 'Sul', 'Centro-Oeste', 'Nordeste', 'Norte'],
                datasets: [{
                    label: 'Casos por 100 mil mulheres',
                    data: [80.11, 79.27, 60.65, 45.29, 24.08],
                    backgroundColor: [colors.pinkPrimary, colors.pinkSecondary, colors.pinkAccent, colors.teal, colors.lightPink],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label = `Região ${label}: `; }
                                if (context.parsed !== null) { label += `${context.parsed.toFixed(2)} casos por 100 mil`; }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value) => value.toFixed(1),
                        color: '#fff',
                        font: { weight: 'bold' }
                    }
                }
            }
        });
    }

    const sobrevidaCtx = document.getElementById('sobrevidaChart');
    if (sobrevidaCtx) {
        new Chart(sobrevidaCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Estágio 0', 'Estágio I', 'Estágio II', 'Estágio III', 'Estágio IV'],
                datasets: [{
                    label: 'Sobrevida em 5 anos (%)',
                    data: [99, 95, 90, 77.5, 35],
                    backgroundColor: [colors.teal, 'rgba(75, 192, 192, 0.7)', colors.pinkAccent, colors.pinkSecondary, 'rgba(255, 99, 132, 0.8)'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) { label += `Chance de sobrevida de ${context.parsed}%`; }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value) => value + '%',
                        color: '#fff',
                        font: { weight: 'bold' }
                    }
                }
            }
        });
    }

    const mamografiaCtx = document.getElementById('mamografiaChart');
    if (mamografiaCtx) {
        new Chart(mamografiaCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['População com Cobertura (Estimativa)', 'População sem Cobertura'],
                datasets: [{
                    label: 'Cobertura de Mamografia (%)',
                    data: [55, 45],
                    backgroundColor: [colors.pinkAccent, colors.gray],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) { label += `${context.parsed}%`; }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value) => value + '%',
                        color: '#fff',
                        font: { weight: 'bold' }
                    }
                }
            }
        });
    }

    // ---- Script para scroll suave ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Script do Chatbot e funcionalidades Gemini ----
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
    const typingIndicator = document.getElementById("typing-indicator");
    const suggestBtn = document.getElementById("suggest-btn");
    const suggestionsBox = document.getElementById("suggestions-box");
    const suggestionsList = document.getElementById("suggestions-list");
    const generateMythsBtn = document.getElementById("generate-myths-btn");
    const mythsContent = document.getElementById("myths-content");
    const generateSupportBtn = document.getElementById("generate-support-btn");
    const supportMessageContent = document.getElementById("support-message-content");

    const apiKey = 'AIzaSyASVr7mk6vlW9HAVuf3RwBn2COySBMJuKU';

    const addChatMessage = (text, sender) => {
        const messageWrapper = document.createElement("div");
        const messageBubble = document.createElement("div");
        
        messageWrapper.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} mb-4`;
        messageBubble.className = `p-3 rounded-2xl max-w-sm md:max-w-md shadow-sm ${
            sender === 'user' 
            ? 'bg-pink-primary text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`;

        text = text.replace(/\n/g, '<br>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageBubble.innerHTML = text;

        messageWrapper.appendChild(messageBubble);
        chatWindow.appendChild(messageWrapper);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const setChatTyping = (show) => {
        typingIndicator.classList.toggle('hidden', !show);
        if (show) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    };

    const callGeminiAPI = async (prompt) => {
        setChatTyping(true);
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const systemPrompt = `Você é uma assistente virtual amigável e informativa, especialista na campanha Outubro Rosa e na prevenção do câncer de mama. Responda às perguntas de forma clara, empática e direta. Se não souber a resposta, diga que não tem essa informação e recomende procurar fontes oficiais como o INCA ou um médico. Para o prompt específico de gerar sugestões, retorne 5 perguntas curtas separadas por '|'. Para o prompt de mitos e verdades, retorne uma lista de 3 mitos e 3 verdades, cada um começando com "Mito:" ou "Verdade:", separados por quebras de linha. Para o prompt de mensagem de apoio, gere uma mensagem curta e encorajadora.`;

        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nTAREFA: ${prompt}` }]
            }]
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const error = await response.json();
                console.error("API Error:", error);
                throw new Error(`Erro na comunicação com a IA: ${error.error.message}`);
            }
            
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                return result.candidates[0].content.parts[0].text;
            }
            return "Não consegui processar a resposta. Tente novamente.";
        } catch (error) {
            console.error("Erro ao chamar a API Gemini:", error);
            return `Desculpe, estou com problemas para me conectar. Detalhes: ${error.message}`;
        } finally {
            setChatTyping(false);
        }
    };

    const generateMythsAndFacts = async () => {
        mythsContent.innerHTML = '<p class="text-center">A gerar conteúdo...</p>';
        const prompt = "Gere uma lista com 3 mitos e 3 verdades sobre o cancro da mama. Cada item deve começar com 'Mito:' ou 'Verdade:'.";
        const content = await callGeminiAPI(prompt);
        
        const items = content.split('\n').filter(item => item.trim() !== '');
        
        let htmlContent = '<div class="grid md:grid-cols-2 gap-6">';
        items.forEach(item => {
            const isMyth = item.toLowerCase().startsWith('mito:');
            htmlContent += `
                <div class="p-6 rounded-2xl shadow-lg ${isMyth ? 'bg-red-100' : 'bg-green-100'}">
                    <h4 class="font-bold text-lg ${isMyth ? 'text-red-800' : 'text-green-800'}">${isMyth ? '<i class="fas fa-times-circle mr-2"></i>Mito' : '<i class="fas fa-check-circle mr-2"></i>Verdade'}</h4>
                    <p class="mt-2 ${isMyth ? 'text-red-700' : 'text-green-700'}">${item.substring(item.indexOf(':') + 1).trim()}</p>
                </div>
            `;
        });
        htmlContent += '</div>';
        mythsContent.innerHTML = htmlContent;
    };

    const generateSupportMessage = async () => {
        supportMessageContent.innerHTML = '<p>A gerar mensagem...</p>';
        supportMessageContent.classList.remove('hidden');
        const prompt = "Gere uma mensagem de apoio curta, calorosa e encorajadora para alguém que está a passar pelo tratamento do cancro da mama.";
        const message = await callGeminiAPI(prompt);
        
        supportMessageContent.innerHTML = `
            <p class="italic">"${message}"</p>
            <button onclick="navigator.clipboard.writeText('${message.replace(/'/g, "\\'")}')" class="mt-3 bg-blue-500 text-white px-3 py-1 text-xs rounded-full hover:bg-blue-600 transition">Copiar Mensagem</button>
        `;
    };

    if(generateMythsBtn) generateMythsBtn.addEventListener("click", generateMythsAndFacts);
    if(generateSupportBtn) generateSupportBtn.addEventListener("click", generateSupportMessage);

    const handleSuggestQuestions = async () => {
        suggestionsList.innerHTML = ''; 
        setChatTyping(true);

        const promptForSuggestions = "Gere 5 perguntas curtas e diretas sobre Outubro Rosa e câncer de mama. Exemplos: 'Quais os sintomas?', 'Como prevenir?', 'O que é mamografia?', 'Fatores de risco?', 'Onde buscar ajuda?'. Separe cada pergunta por um pipeline '|'. Não use formatação como negrito ou itálico.";
        
        const suggestionsText = await callGeminiAPI(promptForSuggestions);
        setChatTyping(false);

        const questions = suggestionsText.split('|')
            .map(q => q.trim().replace(/\*|~|_/g, ''))
            .filter(q => q.length > 0 && q.includes('?'));

        questions.forEach(q => {
            const btn = document.createElement('button');
            btn.textContent = q;
            btn.className = 'suggestion-btn text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200';
            btn.onclick = () => {
                userInput.value = q;
                chatForm.dispatchEvent(new Event('submit'));
                suggestionsBox.classList.add('hidden');
            };
            suggestionsList.appendChild(btn);
        });

        suggestionsBox.classList.remove('hidden');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const handleChatSubmit = async (event) => {
        event.preventDefault();
        const userQuestion = userInput.value.trim();
        if (!userQuestion) return;

        suggestionsBox.classList.add('hidden');
        addChatMessage(userQuestion, 'user');
        userInput.value = "";

        const botResponse = await callGeminiAPI(userQuestion);
        addChatMessage(botResponse, 'bot');
    };

    if(chatForm) chatForm.addEventListener("submit", handleChatSubmit);
    if(suggestBtn) suggestBtn.addEventListener("click", handleSuggestQuestions);

    if(chatWindow){
        setChatTyping(true);
        setTimeout(() => {
            setChatTyping(false);
            addChatMessage("Olá! Sou sua assistente virtual para a campanha Outubro Rosa. Como posso ajudar? Você pode perguntar sobre sintomas, prevenção, dados estatísticos e muito mais.", 'bot');
        }, 1000);
    }
});