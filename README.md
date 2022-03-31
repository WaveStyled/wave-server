# wave-server

## Initial Node Thoughts

  - Running the js file:
    - Command Line: `node file.js`
    - Command Line: 'nodemon file.js'
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
Pants  --> "%P"
Shoes  --> "%SO"

Misc.  --> "%X"

