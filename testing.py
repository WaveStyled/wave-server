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
    r = requests.get('http://localhost:5000/users/private/auth', headers=header)
    print(r.text)