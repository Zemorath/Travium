from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Subscription, User, Employee, Provider

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Subscription.query.delete()
    User.query.delete()
    Employee.query.delete()
    Provider.query.delete()

    fake = Faker()

    print("Creating users...")

    users = []
    usernames = []

    for i in range(20):

        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            age=randint(55, 105),
            email=fake.email()
            
        )