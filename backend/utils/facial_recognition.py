import google.generativeai as genai
from IPython.display import Markdown
from google.colab import userdata
import httpx
import base64

GOOGLE_API_KEY=userdata.get('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)

# Retrieve an image
image_path = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"
image = httpx.get(image_path)

# Choose a Gemini model
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Create a prompt
prompt = "What are the emotions of this image"

response = model.generate_content(
    [
        {
            "mime_type": "image/jpeg",
            "data": base64.b64encode(image.content).decode("utf-8"),
        },
        prompt,
    ]
)

Markdown(">" + response.text)