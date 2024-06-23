from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt, metadata


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-subscriptions.user', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    subscriptions = db.relationship('Subscription', back_populates='user', cascade='all, delete-orphan', passive_deletes=True)
    providers = db.relationship(
        'Provider', secondary="Subscriptions")
    

    @validates('username')
    def validate_username(self, key, _name):
        if _name != '' and User.query.filter_by(username=_name).first() is None:
            return _name
        else:
            raise ValueError("Username is invalid")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    

    def __repr__(self):
        return f'{self.id}: User {self.username} created.'
    

class Employee(db.Model, SerializerMixin):
    __tablename__ = 'employees'    

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)

    @validates('username')
    def validate_username(self, key, _name):
        if _name != '' and User.query.filter_by(username=_name).first() is None:
            return _name
        else:
            raise ValueError("Username is invalid")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )


    def __repr__(self):
        return f'{self.id}: Employee: {self.username}'

    
class Subscription(db.Model, SerializerMixin):
    __tablename__= 'subscriptions'

    serialize_rules = ('-user.subscriptions', '-provider.subscriptions', '-user.providers')

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    sub_price = db.Column(db.Float)
    provider_price = db.Column(db.Float)
    description = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    user = db.relationship('User', back_populates='subscriptions')

    provider_id = db.Column(db.Integer, db.ForeignKey('providers.id'))
    provider = db.relationship('Provider', back_populates='subscriptions')

    def __repr__(self):
        return f'Subscription for {self.type} created.'
    

class Available_Services(db.Model, SerializerMixin):
    __tablename__='available_services'    

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'Service {self.type} now available'


class Provider(db.Model, SerializerMixin):
    __tablename__ = 'providers'

    serialize_rules = ('-subscriptions.provider',)

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String)
    state = db.Column(db.String)

    subscriptions = db.relationship('Subscription', back_populates='provider')
    

    def __repr__(self):
        return f'Provder {self.company} located in {self.location} added.'