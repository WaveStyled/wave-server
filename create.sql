
CREATE TABLE Wardrobe (

 	pieceID INT PRIMARY KEY,
 	R_COLOR INT,
 	G_COLOR INT,
 	B_COLOR INT,
 	TYPE VARCHAR(3),
 	RECENT_DATE_WORN DATE,
 	TIMES_WORN INT,
 	RATING NUMERIC(3,2) DEFAULT 0.50,
 	OC_FORMAL INT,
 	OC_SEMI_FORMAL INT,
 	OC_CASUAL INT,
 	OC_WORKOUT INT,
 	OC_OUTDOORS INT,
 	OC_COMFY INT,
 	WE_COLD INT,
 	WE_HOT INT,
 	WE_RAINY INT,
 	WE_SNOWY INT,
 	WE_AVG_TMP INT
);
-- INSERT INTO Wardrobe (pieceID,R_COLOR,G_COLOR,B_COLOR,TYPE) VALUES (999,1,1,1,'oo');


CREATE TABLE Outfits (
	OUTFIT_ID INT PRIMARY KEY,
	HAT INT,
	SHIRT INT,
	SWEATER INT,
	JAKCET INT,
	BOTTOM_LAYER INT,
	SHOES INT,
	MISC INT,
	TIMES_WORN INT,
	RECENT_DATE_WORN DATE,
	FIT_SCORE NUMERIC(3,2),
	OC_FORMAL BIT,
 	OC_SEMI_FORMAL BIT,
 	OC_CASUAL BIT,
 	OC_WORKOUT BIT,
 	OC_OUTDOORS BIT,
 	OC_COMFY BIT,
 	WE_COLD BIT,
 	WE_HOT BIT,
 	WE_RAINY BIT,
 	WE_SNOWY BIT,
 	WE_AVG_TMP BIT

);
