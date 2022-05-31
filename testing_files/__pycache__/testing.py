"""
Tests user authentication and Log In using bcrypt

Now DEPRECATED as we have switched to Firebase for authentication

"""

import requests

if __name__ == '__main__':
    data = {
        "email" : "sanjay.shrikanth@gmail.com",
        "name" : "Jaysan",
        "password" : 'testingtesting'
    }
    r = requests.post('http://localhost:5000/users/signup', json=data)
    print(r.json())
    r = requests.post('http://localhost:5000/users/login', json=data)
    print(r.json())

    tok = r.json()['token']

    header = {
        "Authorization" : tok
    }
    r = requests.get('http://localhost:5000/users/private/auth', json=data,headers=header)
    print(r.text)