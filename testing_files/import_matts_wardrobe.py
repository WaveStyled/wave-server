import requests

import pandas as pd 
from datetime import date


today = date.today()
# mm/dd/y
d3 = today.strftime("%m/%d/%y")

data = pd.read_csv('../../wave-recommender/csv_files/good_matts_wardrobe.csv') 
images = pd.read_csv("./images.csv")
url = "http://localhost:5000/add/123"

i = 0
for row in data.itertuples(index=False):
	myobj = {'COLOR': row.color, 
	'TYPE': row.type,
	'PIECEID': row.pieceid,
	'OC_SEMI_FORMAL': row.oc_semi_formal,
	'OC_FORMAL': row.oc_formal,
	'OC_CASUAL': row.oc_casual,
	'OC_WORKOUT': row.oc_workout,
	'OC_OUTDOORS': row.oc_outdoors,
	'OC_COMFY': row.oc_comfy,
	'WE_HOT': row.we_hot,
	'WE_COLD': row.we_cold,
	'WE_RAINY': row.we_rainy,
	'WE_SNOWY': row.we_snowy,
	'WE_TYPICAL': row.we_typical,
	'DATE_ADDED' : d3,
	'TIMES_WORN': 0,
	'IMAGE' : images.iloc[i].image_encode,
	'RATING':     0.5,
	'DIRTY': 0}
	i+=1
	r = requests.post(url,json=myobj)
