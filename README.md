# Projeto "Vozes das Cores" - Site Informativo Outubro Rosa

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blueviolet)
![Python](https://img.shields.io/badge/Python-3.x-blue.svg)

Este projeto é um site informativo e interativo sobre a campanha **Outubro Rosa**, desenvolvido como parte da iniciativa acadêmica "Vozes das Cores". O objetivo principal é utilizar a tecnologia para disseminar informações de qualidade sobre a importância da prevenção e do diagnóstico precoce do câncer de mama.

---

## 👨‍💻 Autores

Este projeto foi desenvolvido com dedicação por:

- **André Luan** - [GitHub](https://github.com/andorelol)
- **Pedro Augusto** - [GitHub](https://github.com/pedroasampa)
- **Raphael Guthyer** - [GitHub](https://github.com/guthyer)

---

## ✒️ Índice

- [Descrição do Projeto](#-descrição-do-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📂 Estrutura de Pastas](#-estrutura-de-pastas)
- [🖥️ Como Visualizar o Projeto](#️-como-visualizar-o-projeto)

## 📖 Descrição do Projeto

O projeto "Vozes das Cores" propõe a criação de um site sobre uma das campanhas mensais de conscientização. Nossa equipe escolheu o **Outubro Rosa** devido à sua imensa relevância para a saúde pública.

O escopo inicial do projeto, conforme as diretrizes, previa a utilização de um script **Python** para gerar uma página HTML estática. Buscando aprimorar a experiência do usuário e aplicar conhecimentos de desenvolvimento web moderno, expandimos a proposta inicial. O resultado é uma *Single Page Application (SPA)* dinâmica e interativa, construído com HTML5, CSS3 e JavaScript, e enriquecido com ferramentas como Tailwind CSS e a API generativa do Google (Gemini).

## ✨ Funcionalidades

O site conta com as seguintes seções e funcionalidades interativas:

- **Conteúdo Informativo:** Seções detalhadas sobre o que é o Outubro Rosa, a importância da causa, dicas de prevenção e como ajudar.
- **Estatísticas com Gráficos:** Visualização de dados relevantes sobre a incidência do câncer de mama no Brasil, utilizando gráficos interativos gerados com a biblioteca Chart.js.
- **Mitos e Verdades (com IA):** Uma seção que consome a API do Google Gemini para gerar e desmistificar mitos e verdades comuns sobre o câncer de mama.
- **Gerador de Mensagem de Apoio (com IA):** Uma ferramenta que cria mensagens de apoio e encorajamento para pacientes e familiares.
- **Chatbot Assistente (com IA):** Um assistente virtual inteligente para tirar dúvidas sobre a campanha, sintomas e prevenção.
- **Design Responsivo:** A interface se adapta perfeitamente a diferentes tamanhos de tela.

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estruturação semântica da página. |
| **CSS3 & Tailwind CSS**| Estilização, design responsivo e componentização visual. |
| **JavaScript** | Interatividade, manipulação do DOM, lógica dos gráficos e chamadas de API. |
| **Python** | Utilizado para criar um **servidor web local** (`servidor.py`) para desenvolvimento. |
| **Chart.js** | Criação dos gráficos e visualização de dados estatísticos. |
| **Google Gemini API** | Inteligência Artificial para as funcionalidades interativas. |
| **GitHub & GitHub Pages**| Controle de versão e serviço de hospedagem para publicação do site. |

## 📂 Estrutura de Pastas

O projeto está organizado da seguinte forma:


```text
/site_out_rosa/
├── 📂 css/
│   └── estilos.css
├── 📂 js/
│   └── scripts.js
├── 📂 imagens/
│   └── outubro.jpg
├── 📜 index.html
├── 🐍 servidor.py
└── 📄 README.md
```

## 🖥️ Como Visualizar o Projeto

### Opção 1: Acessar o Site Publicado (Recomendado)

O site está publicado e pode ser acessado através do seguinte link:

➡️ **[https://andorelol.github.io/site_out_rosa/](https://andorelol.github.io/site_out_rosa/)**

### Opção 2: Executar Localmente com o Servidor Python

Para rodar o projeto em sua máquina e garantir que **todas as funcionalidades (incluindo o chatbot) operem corretamente**, utilize o servidor local.

1.  **Pré-requisito:** Certifique-se de ter o [Python](https://www.python.org/downloads/) instalado em seu computador.
2.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/andorelol/site_out_rosa.git](https://github.com/andorelol/site_out_rosa.git)
    ```
3.  **Navegue até a pasta do projeto:**
    ```bash
    cd site_out_rosa
    ```
4.  **Execute o servidor:**
    ```bash
    python servidor.py
    ```
    *(Se não funcionar, tente `python3 servidor.py`)*
5.  **Acesse no navegador:** O script abrirá o site automaticamente no seu navegador no endereço **http://localhost:8000**.

> **Nota de Segurança:** A chave da API do Google está visível no arquivo `js/scripts.js` para fins de demonstração acadêmica. Em um projeto de produção, essa chave nunca deve ser exposta no código do front-end. Lembre-se de desativar ou restringir a chave após a avaliação do projeto para evitar uso indevido.

