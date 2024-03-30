from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Subscription, User, Employee, Provider, Available_Services

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
            email=fake.email(),
        )

        user._password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)


    print("Creating providers...")
    providers = []
    company = ["HEB", "Walmart", "Spectrum", "Verizon", "AT&T", "Dish", "Walgreens"]
    location = ["Texas", "California", "Florida", "New York"]
    for i in range(10):
        provider = Provider(
            company=rc(company),
            location=rc(location),
        )

        providers.append(provider)
    db.session.add_all(providers)

    print("Creating available services...")
    available_services = []
    services = ["Pharmacy", "Phone", "Internet", "Groceries", "Hair", "Cable"]
    for i in services:
        service = Available_Services(
            type=i,
        )

        available_services.append(service)
    db.session.add_all(available_services)

    print("Creating subscriptions...")
    subscriptions = []
    types = ["Pharmacy", "Phone", "Internet", "Groceries", "Hair", "Cable"]
    _bool = ["Active", "Not Active"]
    for i in range(100):
        description = fake.paragraph(nb_sentences=2)

        subscription = Subscription(
            type=rc(types),
            sub_price = randint(4, 7),
            provider_price = randint(10, 100.00),
            description=description,
            status=rc(_bool),
        )

        subscription.provider = rc(providers)
        subscription.user = rc(users)
        
        subscriptions.append(subscription)

    db.session.add_all(subscriptions)


    print("Creating employees...")
    employees = []
    for i in range(5):

        username = fake.first_name() + "" + fake.last_name()

        employee = Employee(
            username = username,
            email = fake.email(),
        )

        employee._password_hash = employee.username + 'password'

        employees.append(employee)
    
    db.session.add_all(employees)


    print("Committing changes...")
    db.session.commit()
    print("Complete.")