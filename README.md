# wave-server

Runs the middleware server that bridges the frontend with the Python backend and the PSQL Database

## How to execute the Service

1. Open 3 terminals
   1. One in `wave-server`
   2. One in `wave-recommender`
   3. One in `wave-server/testing_files`
2. In (1), run `node index.js` 
   1. If dependencies are missing, run `npm install`
3. In (2) run `python3 Link.py`
   1. If dependencies are missing `python3 pip install -r requirements.txt`)
4. In (3) run `python3 random_wardrobe_generation.py` and observe the outputs on the other terminals with a sample wardrobe
5. Now you can use the `requests` module in Python (or you can use Node) to call HTTP endpoint requests to observe the process' behavior

### Clothing Types

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

- Jacket             : 'JAKC'
- Coats                : 'COAC'
- Vest                : 'VESC'
- Puffer            : 'PUFTC'

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
