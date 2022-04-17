# wave-server
## How to execute the Service (as of now)
1. Open 3 terminals
	1. One in `wave-server`
	2. One in `wave-recommender`
	3. One in `wave-server/testing_files`
2. In (1), run `node index.js` (after installing the necessary dependencies using `npm -i <pkgname>`)
3. In (2) run `python3 Link.py` (after installing the necessary dependencies  using `python3 pip install <pkgnanme>`) -- NOTE: the installation lines are included in the beginning of the respective python file
4. In (3) run `python3 random_wardrobe_generation.py` and observe the outputs on the other terminals
5. Now you can use the `requests` module in Python (or you can use Node) to call HTTP endpoint requests to observe the process' behavior


## Initial Node Thoughts

  - Running the js file:
    - Command Line: `node file.js`
    - Command Line: `nodemon file.js`
      - can make changes without restarting possibly?
## Initial Database Thoughts



        - Need to make a dictionary when casting it back in python
      - Color encoding?
          - If we ever want to consider the color in rec algo it might be hard to just base it off the RGB number (unless we using it in ML then its a different story).

# Package.json
  - Add dependencies
      - pg, express, and cors





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
- Flannel                           : `FLAS`

Overtops --> "%T"
- Sweatshirt                     : `SWST`
- Hoodie                           : `HOOT`
- Blazer                             : `BLZT`


Jackets --> "%C"
- Jacket 			: 'JAKC'
- Coats				: 'COAC'
- Vest				: 'VESC'
- Puffer			: 'PUFTC'

Pants  --> "%P"
- Skirt                                : `SKIP`
- Yoga pants                     : `YOGP`
- Cargo Pants                   : `CARP`
- Jeans                              : `JEAP`
- Sweatpants                    : `SWTP`
- Track Pants                    : `TRAP`
- Dress Pants                    : `DRSP`
- Pajamas                          : `PJMT`

Shorts --> "%H"
- Regular                           : `RGSH`
- Swimshorts                    : `SWMH`
- Sweatshorts                   : `SWSH`  
- Athletic Shorts               : `ATSH`            

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
- Regular Hat.                  : `HATA`

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


# Testing Index.js 

App Bootup (after login) : `curl -X PUT localhost:5000/startup/123`
Train the Recommender : "curl -X PUT localhost:5000/recommender/train/123"
