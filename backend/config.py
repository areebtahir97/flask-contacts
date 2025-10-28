from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__) #initialize flask application
CORS(app) #configures cors

#initialize database
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

#create db instance
db=SQLAlchemy(app)