# Might have to install requests: pip install requests
import requests
import json

def get_wardrobe_json():
    url = "http://localhost:5000/wardrobe"
    r = requests.get(url),json()
