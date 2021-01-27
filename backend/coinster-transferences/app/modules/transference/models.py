import uuid, datetime
from app import db
from dataclasses import dataclass

class Base(db.Model):

    __abstract__  = True

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
@dataclass
class Transference(Base):

    __tablename__ = 'transference'

    id:           int
    wallet_from:  str
    wallet_to:    str
    currency:     int
    amount:       int
    status:       str
    date_created: datetime.datetime
    
    wallet_from  = db.Column(db.String(50), nullable=False)
    wallet_to    = db.Column(db.String(50), nullable=False)   
    currency     = db.Column(db.Integer(), nullable=False)
    amount       = db.Column(db.Integer(), nullable=False)
    status       = db.Column(db.String(192), nullable=False) 
    

    def __init__( self, wallet_from, wallet_to, currency, amount ):
        
        self.public_id      = str(uuid.uuid4())
        self.wallet_from    = wallet_from
        self.wallet_to      = wallet_to
        self.currency       = currency
        self.amount         = amount
        self.status         = "pending"
        
    def __repr__(self):
        return '<Transference %r>' % (self.wallet_from)      
