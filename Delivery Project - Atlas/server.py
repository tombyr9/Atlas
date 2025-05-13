from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)

@app.route('/recherche', methods=['POST'])
def recevoir_recherche():
    data = request.get_json()
    mot = data.get('recherche', '')
    print(f"Mot recherché : {mot}")

    # Traduire vers l'anglais (ou une autre langue)
    traduction = GoogleTranslator(source='fr', target='en').translate(mot)
    print(f"Traduction : {traduction}")

    return jsonify({
        "mot_original": mot,
        "traduction": traduction
    })

if __name__ == '__main__':
    app.run(debug=True)
