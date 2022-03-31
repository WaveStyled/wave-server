CREATE SCHEMA WaveStyled;

CREATE TABLE Wardrobe {

 pieceID INT PRIMARY KEY,
 --COLOR INT??
 type VARCHAR(2),
 recentDateWorn DATE,
 timesWorn INT,
 rating FLOAT(3,2)
}

CREATE TABLE Outfits {

}
