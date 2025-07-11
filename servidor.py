# servidor.py
# Este script inicia um servidor web local simples para rodar seu site
# e abre o navegador automaticamente.

import http.server
import socketserver
import webbrowser
import os

# --- CONFIGURAÇÕES ---
# Define a porta em que o servidor irá rodar. 8000 é uma porta comum para desenvolvimento.
PORT = 8000
# Define o nome do arquivo principal que o servidor deve procurar.
# Por padrão, os servidores web já procuram por 'index.html'.
ARQUIVO_INICIAL = 'index.html'

# --- LÓGICA DO SERVIDOR ---

# 1. Define o diretório de trabalho
#    Esta linha garante que o servidor rode a partir da pasta onde o script está.
#    Isso é crucial para que ele encontre os arquivos: index.html, css/, js/, etc.
diretorio_do_projeto = os.path.dirname(__file__)
os.chdir(diretorio_do_projeto)

# 2. Configura o manipulador de requisições
#    O 'SimpleHTTPRequestHandler' é uma classe que já sabe como encontrar
#    e servir os arquivos do diretório de trabalho. Quando o navegador pede
#    a página principal ('/'), ele automaticamente serve o ARQUIVO_INICIAL.
Handler = http.server.SimpleHTTPRequestHandler

# 3. Tenta criar e iniciar o servidor
try:
    # Cria uma instância do servidor, associando a porta e o manipulador
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=====================================================================")
        print(f"  Servidor local iniciado com sucesso na porta {PORT}")
        print(f"  O arquivo principal a ser servido é: '{ARQUIVO_INICIAL}'")
        print(f"  Acesse o site em: http://localhost:{PORT}")
        print("=====================================================================")
        print("Pressione Ctrl+C para parar o servidor.")
        
        # 4. Abre o navegador automaticamente no endereço do site
        webbrowser.open_new_tab(f"http://localhost:{PORT}")

        # 5. Mantém o servidor rodando até ser interrompido
        httpd.serve_forever()

except FileNotFoundError:
    print(f"\nERRO: Não foi possível encontrar o arquivo '{ARQUIVO_INICIAL}'.")
    print("Verifique se o nome do arquivo está correto e se ele está na mesma pasta que este script.")
except OSError:
    print(f"\nERRO: A porta {PORT} já está em uso.")
    print("Por favor, feche o outro programa que está usando a porta ou altere o valor da variável PORT neste script.")
except KeyboardInterrupt:
    print("\nServidor interrompido pelo usuário. Até logo!")

