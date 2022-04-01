import requests
import json
url = "http://localhost:5000/wardrobe"
r = requests.get(url)
print(r.json())
