import os

from flask import Flask


app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

client_id = "f88b8627c3584affaeb338e85edb0d9d"

client_secret = "3712e1cbbcb84522a796a49bbd6ee97f"

redirect_uri = "http://localhost:5000/callback"

scope = "playlist-modify-private, playlist-modify-public"


if __name__ == '__main__':
    app.run(debug=True)