from random import random, randint, choice as rc

from faker import Faker

from app import app
from models import db, Subscription, User, Employee

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Subscription.query.delete()
    User.query.delete()
    Employee.query.delete()

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
            email=fake.email(),
        )

        user._password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating subscriptions...")
    subs = []
    types = ["Pharmacy", "Phone", "Internet", "Groceries", "Hair", "Cable"]
    _bool = ["True", "False"]
    for i in range(100):
        description = fake.paragraph(nb_sentences=2)

        subscription = Subscription(
            type=rc(types),
            sub_price = random.random(0, 5.00),
            provider_price = random.random(0, 100.00),
            description=description,
            status=rc(_bool),
        )

        subs.append(subscription)

    db.session.add_all(subs)


    print("Creating employees...")
    emps = []
    for i in range(5):

        username = fake.first_name() + "" + fake.last_name()

        employee = Employee(
            username = username,
            email = fake.email(),
        )

        employee._password_hash = employee.username + 'password'

        emps.append(employee)
    
    db.session.add_all(emps)

    
        