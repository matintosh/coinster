from app import db
from dataclasses import dataclass
import uuid

class Base(db.Model):

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())


@dataclass
class Wallet(Base):

    __tablename__ = 'wallet'

    id:         int
    user_id:    str
    balance:    int
    currency:   int
    public_id:  str

    public_id = db.Column(db.String(50), unique=True)
    user_id = db.Column(db.String(50), nullable=False)
    currency = db.Column(db.Integer(), nullable=False)
    balance = db.Column(db.Integer(), nullable=False)

    def __init__(self, user_id, currency):
        
        self.public_id = str(uuid.uuid4()),
        self.user_id = user_id
        self.currency = currency
        self.balance = 2000

    def __repr__(self):
        return '<Wallet %r>' % (self.currency)
