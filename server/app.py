from flask import request, session, jsonify, make_response, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# from dotenv import load_dotenv
# load_dotenv()

from config import app, db, api
from models import User, Subscription, Provider, Employee, Available_Services


class UserSignup(Resource):
    
    def post(self):

        data = request.get_json()

        if data.get('username') is not None:
            new_user = User(
                username=data.get('username'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                age=data.get('age'),
                email=data.get('email'),
            )
            new_user._password_hash=data.get('password')
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        else:
            return {"message": "Entry could not be processed"}, 422

class EmployeeSignup(Resource):

    def post(self):

        data = request.get_json()

        if data.get('email') is not None:
            new_employee = Employee(
                username=data.get('username'),
                email=data.get('email'),
            )
            new_employee.password_hash=data.get('password')
            db.session.add(new_employee)
            db.session.commit()
            session['employee_id'] = new_employee.id
            return new_employee.to_dict(), 201
        else:
            return {"message": "Entry could not be processed"}, 422

        

class UserLogin(Resource):
    
    def post(self):
        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        if user:
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {"message": "User not found"}, 401
        


class EmployeeLogin(Resource):

    def post(self):
        username = request.get_json().get('username')
        employee = Employee.query.filter(Employee.username == username).first()

        if employee:
            session['employee_id'] = employee.id
            return employee.to_dict(), 200
        else:
            return {"message": "Employee not found"}, 401

        

class UserLogout(Resource):
    
    def delete(self):
        if not session['user_id']:
            return {"message": "Unauthorized access"}, 401
        else:
            session['user_id'] = None
            return {}, 204
        

class EmployeeLogout(Resource):

    def delete(self):
        if not session['employee_id']:
            return {"message": "Unauthorized access"}, 401
        else:
            session['employee_id'] = None
            return {}, 204
        

class UserCheckSession(Resource):
    
    def get(self):
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {"message": "Unauthorized log in"}, 401
        
class EmpCheckSession(Resource):

    def get(self):
        emp_id = session['employee_id']
        if emp_id:
            emp = Employee.query.filter(Employee.id == emp_id).first()
            return emp.to_dict(), 200
        else:
            return {"message": "Unauthorized log in"}, 401
        

class Subscriptions_All(Resource):
    
    def get(self):
        subscriptions = [sub.to_dict() for sub in Subscription.query.distinct()]
        return make_response(jsonify(subscriptions), 200)
    

class All_Available_Services(Resource):

    def get(self):
        services = [item.to_dict() for item in Available_Services.query.all()]
        return make_response(jsonify(services), 200)
    

class Providers(Resource):

    def get(self):
        providers = [provider.to_dict() for provider in Provider.query.all()]
        return make_response(jsonify(providers), 200)
    
    def post(self):
        data=request.get_json()
        new_provider = Provider(
            company=data.get('company'),
        )
        db.session.add(new_provider)
        db.session.commit()

        return new_provider.to_dict(), 201


class Subscriptions_Using(Resource):
    
    def get(self):

        if session['user_id']:
            user_id = session['user_id']
            subs = [sub.to_dict() for sub in Subscription.query.filter(Subscription.user_id == user_id)]
            return make_response(jsonify(subs), 200)
        else:
            return {"message": "User not signed in"}, 401
        
    def post(self):
        data = request.get_json()
        new_sub = Subscription(
            type=data.get('type'),
            sub_price=data.get('sub_price'),
            provider_price=data.get('provider_price'),
            description=data.get('description'),
            status=data.get('status'),
            user_id=data.get('user_id'),
            provider_id=data.get('provider_id'),
        )
        db.session.add(new_sub)
        db.session.commit()

        return new_sub.to_dict(), 201
        
class UserByID(Resource):

    def get(self):

        if session['user_id']:
            user_id = session['user_id']
            user = User.query.filter(User.id==user_id).first().to_dict()
            return make_response(jsonify(user), 200)
        else:
            return {"message": "User not signed in"}, 401
    
    def patch(self):

        if session['user_id']:
            user_id = session['user_id']
            user = User.query.filter(User.id==user_id).first()
            json_data = request.get_json()

            username = json_data.get('username')
            setattr(user, 'username', username)

            db.session.add(user)
            db.session.commit()

            user_dict = user.to_dict()

            return make_response(user_dict, 200)
        else:
            return {"message": "User not signed in"}, 401
        
    def delete(self):

        if session['user_id']:
            try:
                user_id = session['user_id']
                user = User.query.filter(User.id == user_id).first()

                if user:
                    db.session.delete(user)

                    deleted_subscriptions = Subscription.query.filter_by(user_id = user_id).delete()
                    db.session.commit()

                    session['user_id'] = None
                    return make_response({}, 204)
                else:
                    return {"error": "User not found"}, 404
            except Exception as e:
                db.session.rollback()
                error_message = f"Error deleting user and subscriptions: {str(e)}"
                app.logger.error(error_message)
                return {"error": error_message}, 500
        else:
            return {"message": "User not signed in"}, 401
        
class EmployeeByID(Resource):

    def get(self):

        if session['employee_id']:
            employee_id = session['employee_id']
            employee = Employee.query.filter(Employee.id==employee_id).first().to_dict()
            return make_response(jsonify(employee), 200)
        else:
            return {"message": "Employee not signed in"}, 401
    
    def patch(self):

        if session['employee_id']:
            employee_id = session['employee_id']
            employee = Employee.query.filter(Employee.id==employee_id).first()
            json_data = request.get_json()

            username = json_data.get('username')
            setattr(employee, 'username', username)

            db.session.add(employee)
            db.session.commit()

            employee_dict = employee.to_dict()

            return make_response(employee_dict, 200)
        else:
            return {"message": "Employee not signed in"}, 401
        
    def delete(self):

        if session['employee_id']:
            try:
                employee_id = session['employee_id']
                employee = Employee.query.filter(Employee.id == employee_id).first()

                if Employee:
                    db.session.delete(employee)
                    db.session.commit()

                    session['employee_id'] = None
                    return make_response({}, 204)
                else:
                    return {"error": "Employee not found"}, 404
            except Exception as e:
                db.session.rollback()
                error_message = f"Error deleting Employee: {str(e)}"
                app.logger.error(error_message)
                return {"error": error_message}, 500
        else:
            return {"message": "Employee not signed in"}, 401
    


class AllUsers(Resource):

    def get(self):

        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
api.add_resource(AllUsers, '/users/all', endpoint='allusers')
        




api.add_resource(UserSignup, '/usersignup', endpoint='usersignup')
api.add_resource(EmployeeSignup, '/employeesignup', endpoint='employeesignup')
api.add_resource(UserLogin, '/userlogin', endpoint='userlogin')
api.add_resource(UserLogout, '/userlogout', endpoint='userlogout')
api.add_resource(EmployeeLogin, '/employeelogin', endpoint='employeelogin')
api.add_resource(EmployeeLogout, '/logout/employee', endpoint='employeelogout')
api.add_resource(UserCheckSession, '/userchecksession', endpoint='userchecksession')
api.add_resource(Subscriptions_All, '/subscriptionsall', endpoint='subscriptionsall')
api.add_resource(Subscriptions_Using, '/subscriptionsusing', endpoint='subscriptionsusing')
api.add_resource(Providers, '/providers', endpoint='providers')
api.add_resource(EmployeeByID, '/employeeinfo', endpoint='employeeinfo')
api.add_resource(UserByID, '/userinfo', endpoint='userinfo')
api.add_resource(All_Available_Services, '/availableservices', endpoint='availableservices')
api.add_resource(EmpCheckSession, '/employee/session', endpoint='employeesession')

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")



if __name__ == '__main__':
    app.run(port=5555, debug=True)
