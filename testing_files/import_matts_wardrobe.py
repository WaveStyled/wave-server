import requests

import pandas as pd 
from datetime import date


today = date.today()
# mm/dd/y
d3 = today.strftime("%m/%d/%y")

data = pd.read_csv('manual_wardrobe_matt.csv') 
url = "http://localhost:5000/add"

for row in data.itertuples(index=False):
    myobj = {'COLOR': row.color,
			 'TYPE': row.type,
			 'PIECEID': row.pieceid,
			 'OC_SEMI_FORMAL': row.semi_formal,
			 'OC_FORMAL': row.formal,
			 'OC_CASUAL': row.casual,
			 'OC_WORKOUT': row.workout,
			 'OC_OUTDOORS': row.outdoors,
			 'OC_COMFY': row.comfy,
			 'WE_HOT': row.hot,
			 'WE_COLD': row.cold,
			 'WE_RAINY': row.rainy,
			 'WE_SNOWY': row.snowy,
			 'WE_TYPICAL': row.typical,
			 'RECENT_DATE_WORN' : d3,
			 'TIMES_WORN': 0,
			 'RATING':     0.5,
			 'DIRTY': 0  
							}
    r = requests.post(url,json=myobj)


