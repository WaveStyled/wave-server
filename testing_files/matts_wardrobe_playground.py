import requests
from random import randint
import pandas as pd 
import itertools
from PIL import Image
data = pd.read_csv('../good_matts_wardrobe.csv') 
url = "http://localhost:5000/add"


def post_csv():

	for row in data.itertuples(index=False):
		myobj = {'COLOR': row.color,
				'TYPE': row.type,
				'PIECEID': row.pieceid,
				'OC_SEMI_FORMAL': row._4,
				'OC_FORMAL': row.formal,
				'OC_CASUAL': row.casual,
				'OC_WORKOUT': row.workout,
				'OC_OUTDOORS': row.outdoors,
				'OC_COMFY': row.comfy,
				'WE_HOT': row.hot,
				'WE_COLD': row.cold,
				'WE_RAINY': row.rainy,
				'WE_SNOWY': row.snowy,
				'WE_AVERAGE': row.typical
								}
		r = requests.post(url,json=myobj)


def gen(occasion,weather,ends):
	x = data.loc[(data["type"].str.endswith(ends)) & (data[occasion] == 1) & (data[weather] == 1) ]
	if(len(x.index)==0):
		return -1
	chosen = x.sample()
	
	return int(chosen["pieceid"])





def gen_random(occasion,weather):
	top = ""
	shorts = ""
	shoes = ""
	under =""
	bot = ""
	hat = ""
	fit = [0,0,0,0,0,0,0]
	if (weather == "hot"):
		hat_chance = randint(1,3)
		
		if(hat_chance == 1):
			hat = gen(occasion,weather,"A")
			fit[0] = hat
		top = gen(occasion,weather,"S")
		fit[1] = top
		bot = gen(occasion,weather,"H")
		fit[4] = bot
		shoes = gen(occasion,weather,"O")
		fit[5] = shoes
		return fit
	if (weather == "cold"):
		hat_chance = randint(1,3)
		if(hat_chance == 1):
			hat = gen(occasion,weather,"A")
			fit[0] = hat
		undershirt_chance = randint(1,4)
		if(undershirt_chance == 1):
			under =	gen(occasion,weather,"S")
			fit[1] = under
		top =  gen(occasion,weather,"T")
		fit[2] = top
		bot = gen(occasion,weather,"P")
		fit[4] = bot
		shoes = gen(occasion,weather,"O")
		fit[5] = shoes
		return fit
	if (weather == "rainy"):
		
		hat_chance = randint(1,2)
		if(hat_chance == 1):
			hat = gen(occasion,weather,"A")
			fit[0] = hat
		shirt_or_sweat = randint(1,4)
		if(shirt_or_sweat == 1):
			# shirt
			top = gen(occasion,weather,"S")
			fit[1] = top
		else:
			top =  gen(occasion,weather,"T")
			fit[2] = top
		
		bot = gen(occasion,weather,"P")
		fit[4] = bot
		shoes = gen(occasion,weather,"O")
		fit[5] = shoes
		jacket = gen(occasion, weather,"C")
		fit[3] = jacket
		return fit
	if (weather == "typical"):
		shirt_or_sweat = randint(1,2)
		if(shirt_or_sweat == 1):
			# shirt
			top = gen(occasion,weather,"S")
			fit[1] = top
		else:
			top =  gen(occasion,weather,"T")
			fit[2] = top
		
		shorts_or_pants =randint(1,2)

		if(shorts_or_pants == 1):
			bot = gen(occasion,weather,"H")
			fit[4] = bot
		else:
			bot = gen(occasion,weather,"P")
			fit[4] = bot
		
		hat_chance = randint(1,4)
		if(hat_chance == 1):
			hat = gen(occasion,weather,"A")
			fit[0] = hat
		shoes = gen(occasion,weather,"O")
		fit[5] = shoes
		return fit
	if (weather == "snowy"):
		hat_chance = randint(1,2)
		if(hat_chance == 1):
			hat = gen(occasion,weather,"A")
			fit[0] = hat
		
		top =  gen(occasion,weather,"T")
		fit[1] = top
		bot = gen(occasion,weather,"P")
		fit[4] = bot
		shoes = gen(occasion,weather,"O")
		fit[5] = shoes
		jacket = gen(occasion, weather,"C")
		fit[3] = jacket
		return fit

def generate_permutations(num_fits):
	occasions = ["formal","semi-formal","casual","workout","outdoors","comfy"]
	weather = ["hot","cold","rainy","snowy","typical"]
	fits = []
	oc_we = []
	for x in range(0,num_fits,1):
		oc = occasions[randint(0,len(occasions)-1)]
		we = weather[randint(0,len(weather)-1)]
		fit = w.gen_random(oc,we)
		
		if -1 not in fit:
			fits.append(fit)
			oc_we.append([oc,we])
	
	#fits.sort()
	#list(fits for fits,_ in itertools.groupby(fits))
	return [fits,oc_we]


def display_fit(fit,oc_we):
	print(fit)
	print(oc_we[0],oc_we[1])
	for x in fit:
		if x!= 0:
			im = Image.open("../../my_wardrobe_pics/wardrobe/jpgs/"+str(x)+".jpeg")
			im.show() 



random_fits = generate_permutations(100)
#print(len(random_fits[0]))
#print(len(random_fits[1]))
display_fit(random_fits[0][20],random_fits[1][20])
#print(len(generate_permutations(10000)))