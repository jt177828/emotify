<<<<<<< Updated upstream
=======
from fastapi import FastAPI

app = FastAPI()


@app.get("/HelloWorld")
def root():
    return {"Hello": "World"}
>>>>>>> Stashed changes
