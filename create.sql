DROP TABLE Wardrobe;
DROP TABLE Outfits;


CREATE TABLE Wardrobe (

 	pieceID INT PRIMARY KEY,
 	COLOR VARCHAR(12),
	R_COLOR INT,
 	G_COLOR INT,
 	B_COLOR INT,
 	TYPE VARCHAR(4),
 	RECENT_DATE_WORN DATE,
 	TIMES_WORN INT,
 	RATING NUMERIC(3,2) DEFAULT 0.50,
 	OC_FORMAL BOOLEAN,
 	OC_SEMI_FORMAL BOOLEAN,
 	OC_CASUAL BOOLEAN,
 	OC_WORKOUT BOOLEAN,
 	OC_OUTDOORS BOOLEAN,
 	OC_COMFY BOOLEAN,
 	WE_COLD BOOLEAN,
 	WE_HOT BOOLEAN,
 	WE_RAINY BOOLEAN,
 	WE_SNOWY BOOLEAN,
 	WE_TYPICAL BOOLEAN,
	DIRTY BOOLEAN
);
-- INSERT INTO Wardrobe (pieceID,R_COLOR,G_COLOR,B_COLOR,TYPE) VALUES (999,1,1,1,'oo');

"""
Occasion:
  1 = Formal
  2 = Semi_Formal 
  3 = Casual
  4 = Workout
  5 = Outdoors
  6 = Comfy
Weather:
  1 = Cold
  2 = Hot
  3 = Rainy
  4 = Snowy
  5 = Avg
 - There may be duplicate outfits for different weathers/occaions that can be adjusted for later
"""

-- \copy outfits TO 'C:\Users\mdaxn\OneDrive\Documents\WaveStyled\outfits.csv' HEADER CSV;
CREATE TABLE Outfits (
	OUTFIT_ID INT PRIMARY KEY,
	HAT INT,
	SHIRT INT,
	SWEATER INT,
	JACKET INT,
	BOTTOM_LAYER INT,
	SHOES INT,
	MISC INT,
	TIMES_WORN INT DEFAULT 0,
	RECENT_DATE_WORN DATE,
	FIT_SCORE NUMERIC(3,2) DEFAULT 0.5,
	OCCASION INT,
	WEATHER INT,
	LIKED BOOLEAN
);
