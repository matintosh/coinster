import requests


def validate_if_user_exists(user_id):
    
    req          = requests.get('http://coinster-users:5000/user/%r' % user_id)  
    user_data    = req.json()
    
    return "error" not in user_data


def validate_if_wallet_exists(wallet_id):
    
    req             = requests.get('http://coinster-wallets:5000/wallet/%r' % wallet_id)  
    wallet_data     = req.json()

    return "error" not in wallet_data