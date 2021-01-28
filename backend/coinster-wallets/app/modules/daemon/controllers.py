from app.modules.wallet.models import Wallet
from app import db
from .producer import publish
import dataclasses

def validate_transference(transference):

    wallet_from_id      = transference['wallet_from']
    wallet_to_id        = transference['wallet_to']
    transference_amount = transference['amount']
    transference_id     = transference['id']
    
    wallet_object = db.session.query(Wallet)
    wallet_from   = wallet_object.filter_by(public_id=wallet_from_id).first()
    wallet_to     = wallet_object.filter_by(public_id=wallet_to_id).first()
    
    print("Transference ongoing")
    print("FROM:", wallet_from_id)
    print("TO:", wallet_to_id)
    if wallet_from and wallet_to:
        if wallet_from.balance > transference_amount:
            wallet_from.balance = wallet_from.balance - transference_amount
            wallet_to.balance = wallet_to.balance + transference_amount
                        
            db.session.commit()
            
            print('Tansference ' + str(transference_id) + ' aproved')
            publish("update_transference", {'transference_id': transference_id, 'status': 'aproved'})
        else:
            print('Tansference ' + str(transference_id) + ' rejected')
            publish("update_transference", {'transference_id': transference_id, 'status': 'rejected'})
            
        
            
    print("Finished transaction")
    
    
        