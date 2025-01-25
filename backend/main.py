from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai

from scripts import face_to_emotion

genai.configure(api_key=os.environ["AIzaSyAVudME3VBZw-IEKo_HGyWypE6GqGd3oJs"])

# Create the model
generation_config = {
  "temperature": 0.15,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)

response = chat_session.send_message("INSERT_INPUT_HERE")

print(response.text)

# Initialize FastAPI application
app = FastAPI(
    title="Emotion-Based Playlist Generator",
    description="Generate Spotify playlists based on facial emotion detection",
    version="0.1.0"
)

# Configure CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze-emotion/")
async def upload_image(file: UploadFile = File(...)):
    """
    Endpoint to upload an image, analyze facial emotion, 
    and generate a Spotify playlist.
    
    Args:
        file (UploadFile): User's uploaded image file
    
    Returns:
        dict: Playlist details and emotion analysis
    """
    # Read the uploaded image file
    image_bytes = await file.read()
    
    try:
        # Analyze emotion using facial recognition utility
        emotion = analyze_emotion(image_bytes)
        
        # Process emotion and generate appropriate playlist
        playlist_details = process_emotion(emotion)
        
        # Create Spotify playlist based on emotion
        spotify_playlist = create_spotify_playlist(
            emotion=emotion, 
            playlist_details=playlist_details
        )
        
        return {
            "emotion": emotion,
            "playlist": spotify_playlist
        }
    
    except Exception as e:
        # Handle potential errors in emotion or playlist generation
        return {
            "error": str(e),
            "message": "Could not generate playlist"
        }

# Optional: Health check endpoint
@app.get("/health")
async def health_check():
    """
    Simple health check endpoint to verify backend is running.
    """
    return {"status": "healthy"}

# Startup event for initializing any global resources
@app.on_event("startup")
async def startup_event():
    """
    Perform startup initialization like 
    loading models or establishing connections.
    """
    # Example: Initialize Spotify and emotion detection resources
    print("Backend services initializing...")