"""

 - open json file, get all the codes
 - posting to the web server
 - 

"""
from random import randint
import json
import requests
f = open("wardrobe_dicts.json","r")

data= json.load(f)
codes = []
for x in data:
	codes.append(data[x]['codes'])
url = "http://localhost:5000/add"
def post_add(piece_id,code,color,occasions,weather):
	
	myobj = {'R_COLOR': color[0],
			 'G_COLOR' : color[1],
			 'B_COLOR': color[2],
			 'TYPE': code,
			 'PIECE_ID': piece_id,
			 'OC_SEMI_FORMAL': occasions[0],
			 'OC_FORMAL': occasions[1],
			 'OC_CASUAL':occasions[2],
			 'OC_WORKOUT':occasions[3],
			 'OC_OUTDOORS':occasions[4],
			 'OC_COMFY':occasions[5],
			 'WE_HOT': weather[0],
			 'WE_COLD': weather[1],
			 'WE_RAINY': weather[2],
			 'WE_SNOWY': weather[3],
			 'WE_AVERAGE': weather[4]
							}
	r = requests.post(url,data=myobj)

def gen_wardrobe(num_pieces):


	for i in range(0,num_pieces,1):
		piece_id = i
		piece_type = randint(0,6)
		code = codes[piece_type][randint(0,len(codes[piece_type])-1)]
		color = [randint(0,255),randint(0,255),randint(0,255)]
		occasions = [randint(0,1),randint(0,1),randint(0,1),randint(0,1),randint(0,1),randint(0,1)]
		weather = [randint(0,1),randint(0,1),randint(0,1),randint(0,1),randint(0,1)]
		post_add(piece_id,code,color,occasions,weather)
gen_wardrobe(100)