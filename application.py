from flask import Flask
application = Flask(__name__)

@application.route('/')
def hello_world():
    return 'hello world, this is my first flask application!'