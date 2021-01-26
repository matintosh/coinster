from app.modules.wallet.models import Wallet
from app import db
import dataclasses

def validate_transference(transference):

    wallet_from_id = transference['wallet_from']
    wallet_to_id = transference['wallet_to']
    transference_amount = transference['amount']
    
    wallet_object = db.session.query(Wallet)
    
    wallet_from  = wallet_object.filter_by(id=wallet_from_id).first()
    wallet_to    = wallet_object.filter_by(id=wallet_to_id).first()
    
    if wallet_from and wallet_to:
        if wallet_from.balance > transference_amount:
            wallet_from.balance = wallet_from.balance - transference_amount
            wallet_to.balance = wallet_to.balance + transference_amount
                        
            db.session.commit()
        
            
    print("Finished transaction")
    
    
        