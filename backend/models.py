from config import db

class Contact(db.Model):            #a database model represented by a python class
    id=db.Column(db.Integer,primary_key=True)
    first_name=db.Column(db.String(80),unique=False,nullable=False)
    last_name=db.Column(db.String(80),unique=False,nullable=False)
    email=db.Column(db.String(120),unique=True,nullable=False)
    
    #create a func to convert the class into json because data is sent/received from frontend as json
    def to_json(self):
        return {
            "id":self.id,
            "firstName":self.first_name,
            "lastName":self.last_name,
            "email":self.email
        }