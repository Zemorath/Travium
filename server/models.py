from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    serialize_rules = ('-subscriptions.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    subscriptions = db.relationship('Subscription', back_populates='user')

    def __repr__(self):
        return f'{self.id}: User {self.username} created.'
    

class Employee(db.Model):
    __tablename__ = 'employees'    

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)

    def __repr__(self):
        return f'{self.id}: Employee: {self.username}'

    
class Subscription(db.Model):
    __tablename__= 'subscriptions'

    serialize_rules = ('-user.subscriptions', '-provider.subscriptions',)

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    sub_price = db.Column(db.Float)
    provider_price = db.Column(db.Float)
    description = db.Column(db.String)
    status = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='subscriptions')

    provider_id = db.Column(db.Integer, db.ForeignKey('providers.id'))
    provider = db.relationship('Provider', back_populates='subscriptions')

    def __repr__(self):
        return f'Subscription for {self.type} created.'
    


class Provider(db.Model):
    __tablename__ = 'providers'

    serialize_rules = ('-subscriptions.provider',)

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String)
    location = db.Column(db.String)

    subscriptions = db.relationship('Subscription', back_populates='provider')

    def __repr__(self):
        return f'Provder {self.company} located in {self.location} added.'