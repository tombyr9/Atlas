import subprocess
import webbrowser
import time
import os

# Lancer le serveur Flask
flask_process = subprocess.Popen(['python', 'server.py'])

# Lancer un serveur HTTP simple sur le dossier courant (pour servir index.html)
web_dir = os.path.abspath('.')
http_process = subprocess.Popen(['python', '-m', 'http.server', '5500'], cwd=web_dir)

# Attendre un peu et ouvrir le navigateur
time.sleep(1)
webbrowser.open('http://localhost:5500/index.html')

try:
    flask_process.wait()
    http_process.wait()
except KeyboardInterrupt:
    flask_process.terminate()
    http_process.terminate()
