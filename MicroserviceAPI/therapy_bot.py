from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

# Initialize the AI model
model = OllamaLLM(model="llama3.2:3b")

# In-memory store for conversation history (keyed by user ID or session)
conversation_memory = {}

@app.route('/clear-history/<user_id>', methods=['POST'])
def clear_history(user_id):
    """Endpoint to clear conversation history for a specific user."""
    if user_id in conversation_memory:
        conversation_memory[user_id] = []
    return jsonify({"message": f"Conversation history for user {user_id} has been cleared."})


# Helper function to maintain conversation context
def build_conversation_context(user_id, user_message):
    """Build conversation context based on memory and new input."""
    if user_id not in conversation_memory:
        conversation_memory[user_id] = []

    # Add the new user message to the conversation
    conversation_memory[user_id].append({"role": "user", "content": user_message})

    # Prepare the context as a string
    context = "\n".join(
        f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation_memory[user_id]
    )
    return context

def get_chatbot_response(user_id, user_message):
    """Generate a response from the chatbot based on context and new input."""
    # Build context
    context = build_conversation_context(user_id, user_message)

    # Define the prompt
    chatbot_prompt = f"""
    You are an engaging and supportive therapist chatbot. You remember previous conversations and refer back to them to provide meaningful responses. Always maintain a positive and helpful tone, making users feel cared for and safe. Be inquisitive, and interested. Make users feel like you are interested in talking to them. Give them positive opinions as well. Keep your responses short, unless needed. Act normal, like a human therapist. That includes not speaking too much, unless needed. 

    All your responses should be between 50-100 words STRICTLY. 

    Do not say things like that refer to past. Like 'Wonderful to see you again.' , 'How have you been since last conversation'.
    
    Conversation so far:
    {context}

    Now respond to the latest user message in a supportive and helpful manner.
    """

    # Generate response
    prompt_template = ChatPromptTemplate.from_template(chatbot_prompt)
    chatbot_chain = prompt_template | model
    chatbot_response = chatbot_chain.invoke({"user_message": user_message})

    # Store the AI's response in memory
    conversation_memory[user_id].append({"role": "assistant", "content": chatbot_response})

    return chatbot_response

@app.route('/chat', methods=['POST'])
def chat():
    """Endpoint to handle real-time user messages."""
    data = request.json
    user_id = data.get('user_id', 'default_user')  # Default user ID for simplicity
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Get chatbot response
    chatbot_response = get_chatbot_response(user_id, user_message)

    return jsonify({"response": chatbot_response})

@app.route('/conversation/<user_id>', methods=['GET'])
def get_conversation(user_id):
    """Endpoint to retrieve the conversation history for a user."""
    history = conversation_memory.get(user_id, [])
    return jsonify({"conversation_history": history})

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=5005, debug=True)
