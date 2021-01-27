import uuid
from app import db
from dataclasses import dataclass

class Base(db.Model):

    __abstract__  = True

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
@dataclass
class User(Base):

    __tablename__ = 'user'

    id: int
    first_name: str
    last_name:  str
    email:      str
    password:   str
    public_id:  str
    
    public_id           = db.Column(db.String(50), unique = True) 
    first_name          = db.Column(db.String(128),  nullable=False )
    last_name           = db.Column(db.String(128),  nullable=False )
    email               = db.Column(db.String(128),  nullable=False, unique=True)   
    password            = db.Column(db.String(192),  nullable=False )

    def __init__( self, first_name, last_name, email, password ):
        
        self.public_id      = str(uuid.uuid4()), 
        self.first_name     = first_name
        self.last_name      = last_name
        self.email          = email
        self.password       = password

    def __repr__(self):
        return '<User %r>' % (self.email)      
