import requests


def validate_if_user_exists(user_id):
    
    req          = requests.get('http://coinster-users:5000/api/v1/user/%r' % user_id)  
    user_data    = req.json()
    
    return "error" not in user_data


def validate_if_wallet_exists(wallet_id):
    
    req             = requests.get('http://coinster-wallets:5000/api/v1/wallet/%r' % wallet_id)  
    wallet_data     = req.json()

    return "error" not in wallet_data


def get_user_wallets(user_id):
    print("EL USER ID")
    print(user_id)
    url = 'http://coinster-wallets:5000/api/v1/wallet/user/' + user_id
    print(url)
    req             = requests.get(url)  
    wallets_data    = req.json()

    return wallets_data

def get_currencies():
    
    req             = requests.get('http://coinster-currency:5000/api/v1/currency')  
    currency_data    = req.json()

    return currency_data

