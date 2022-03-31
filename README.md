# wave-server

## Initial Node Thoughts

  - Running the js file:
    - Command Line: `node file.js`
    - Command Line: `nodemon file.js`
      - can make changes without restarting possibly?
## Initial Database Thoughts

  - How do we want to encode the occasions and weather in the database?
      - Possible binary value for each thing?
      - Encode type of clothing with 1 - 2 chars?
        - Need to make a dictionary when casting it back in python
      - Color encoding?
          - If we ever want to consider the color in rec algo it might be hard to just base it off the RGB number (unless we using it in ML then its a different story).

Clothing types:

Shirts --> "%S"
- Tank Top                        : `TATS`
- Button Up                      : `SBUS`
- Tee                                 : `STES`
- Polo Shirt                       : `SPOS`
- Graphic                          : `SGRS`
- Athletic                           : `SATS`
- Long Sleeve Button Up : `LBUS`
- Long Sleeve Polo           : `LPOS`
- Long Sleeve Tee            : `LTES`
- Long Sleeve Graphic.    : `LGRS`
- Long Sleeve Athletics   : `LATS`

Overtops --> "%T"
- Sweatshirt                     : `SWST`
- Hoodie                           : `HOOT`
- Jacket                            : `JAKT`
- Blazer                             : `BLZT`
- Coats.                             : `COAT`

Pants  --> "%P"
- Skirt                                : `SKIP`
- Yoga pants                     : `YOGP`
- Cargo Pants                   : `CARP`
- Jeans                              : `JEAP`
- Sweatpants                    : `SWTP`
- Track Pants                    : `TRAP`
- Dress Pants                    : `DRSP`

Shorts --> "%H"
- Regular                           : `RGSH`
- Swimshorts                    : `SWMH`
- Sweatshorts                   : `SWSH`              

Shoes  --> "%O"
- Sneakers                        : `SNEO`
- Runners                          : `RUNO`
- Boots                              : `BOTO`
- Dress                              : `DRSO`
- Sandals                          : `SNDO`
- Flip Flops                       : `FLIO`
- Heels                             : `HELO`
- Flats                               : `FLTO`

Hats.   --> "%A"
- Beanie                           : `BENA`
- Baseball                        : `BASA`
- Snapback                      : `SNPA`
- Bucket                           : `BCKA`
- Visor                              : `VIZA`

Misc.  --> "%X"
- Dress                             : `DREX`
- Tux                                 : `TUXX`


How Fits are represented : 6 - tuple

Occasion codes
- Workout : `WK`
- Formal    : `FF`
- Semi Formal : `SF`
- Casual : `CS`
- BeachDay/Outdoors : `BD`
- Comfy/Lazy : `LZ`

Weather Codes
- Cold : `C`
- Hot  : `H`
- Rainy : `R`
- Sunny : `S`
- Snowy : `N`
- Typical : `T`


- The Recommender creates fits from the wardrobe, feeds it to the ML model. The ML model wil predict whether the user will like the fit and feed it to the user. Seeing how the prediction fares with the user will give it more data so that it improves the model (validation). The Recommender can be random in the screening phase and then involve some basic calculations based on rating, etc. when it generates its fits; but, it doesn't need to be incredibly smart. 

- ML model is a binary classifier (0 or 1)




Each NN takes