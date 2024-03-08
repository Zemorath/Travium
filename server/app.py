from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Subscription, Provider

class Signup(Resource):
    
    def post(self):

        data = request.get_json()

        if data.get('username') is not None:
            new_user = User(
                username=data.get('username'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                age=data.get('age'),
                email=data.get('email'),
                phone_number=data.get('phone_number'),
            )
            new_user.password_hash=data.get('password')
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        else:
            return {"message": "Entry could not be processed"}, 422

class Login(Resource):
    
    def post(self):
        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        if user:
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {"message": "User not found"}, 401

class Logout(Resource):
    
    def delete(self):
        if not session['user_id']:
            return {"message": "Unauthorized access"}, 401
        else:
            session['user_id'] = None
            return {}, 204
        

class CheckSession(Resource):
    
    def get(self):
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(user.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {"message": "Unauthorized log in"}, 401

class Subscriptions_All(Resource):
    
    def get(self):
        subscriptions = [sub.to_dict() for sub in Subscription.query.all()]
        return make_response(jsonify(subscriptions), 200)
    
    def post(self):
        data = request.get_json()
        new_sub = Subscription(
            type=data.get('type'),
            sub_price=data.get('sub_price'),
            provider_price=data.get('provider_price'),
            description=data.get('description'),
            status=data.get('status'),
        )
        db.session.add(new_sub)
        db.session.commit()

        return new_sub.to_dict(), 201

class Providers(Resource):
    "Providers will go here"

class Subscriptions_Using(Resource):
    "subscriptions_using will go here"