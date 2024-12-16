from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

# Initialize the AI model
model = OllamaLLM(model="llama3.2:3b")

def analyze_mood(entry_text):
    """Function to analyze mood using the AI model."""
    mood_prompt = f"""
    You are an expert therapist. Your task is to provide a safe and non-judgmental place to users as they talk to you. You are tasked with reading a journal entry, and providing users with a safe opinion, that is not judgemental, and won't make them feel bad. But, it should support them and provide insights into their feelings. Stay positive, and make users feel safe and cared about.

    Do not start by thanking them for sharing feelings. Go straight to the point.
    Note that your task is to analyze what they write in the entry, not prompt them to talk more. Avoid sentences like "Would you like to talk more about it?" or "Can you tell me....", or other inquisitive. Listen to what they share, and provide feedback.
    Offer some advice as well, on what they should do to feel better.
    Keep feedback average length, maximum 250 words.

    Talk on the given journal entry:

    Journal Entry: {entry_text}
    """
    mood_prompt_template = ChatPromptTemplate.from_template(mood_prompt)
    moodChain = mood_prompt_template | model
    response_string = moodChain.invoke({"entry_text": entry_text})
    return response_string

@app.route('/')
def index():
    return "Welcome to the Mood Analysis API!"

@app.route('/analyze_mood', methods=['POST'])
def analyze_mood_route():
    print("Started Analysis")
    data = request.json  # Access the JSON data
    entry_text = data.get('entry_text', '')  # Get the journal entry text
    
    if not entry_text:
        return jsonify({"error": "No journal entry provided"}), 400

    # Analyze mood using the model
    analysis_result = analyze_mood(entry_text)
    
    return jsonify({'mood_analysis': analysis_result})

if __name__ == '__main__':
    print("Microservice for feedback running on port 5000.")
    app.run(host='0.0.0.0', port=5000, debug=True)
    
