from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'{self.id}: User {self.username} created.'
    
class Subscription(db.Model):
    __tablename__= 'subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    sub_price = db.Column(db.Float)
    service_price = db.Column(db.Float)
    description = db.Column(db.String)
    status = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())