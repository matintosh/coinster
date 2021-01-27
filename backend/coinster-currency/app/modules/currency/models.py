from app import db
from dataclasses import dataclass

class Base(db.Model):

    __abstract__  = True

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
@dataclass
class Currency(Base):

    __tablename__ = 'currency'
        
    id:   int
    name: str
    
    name = db.Column(db.String(192), nullable = False)

    def __init__(self, name ):

        self.name = name

    def __repr__(self):
        return '<Currency %r>' % (self.name)      
