# Might have to install requests: pip install requests
import requests
import json

def get_wardrobe_json():
    url = "http://localhost:5000/wardrobe"
    r = requests.get(url),json()


import os
from http.server import HTTPServer, CGIHTTPRequestHandler# Make sure the server is created at current directory
os.chdir('.')
# Create server object listening the port 80
server_object = HTTPServer(server_address=('', 5001), RequestHandlerClass=CGIHTTPRequestHandler)
# Start the web server
server_object.serve_forever()
