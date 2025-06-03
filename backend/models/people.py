from database import db

class People(db.Model):
    __tablename__ = 'people'
    people_id = db.Column("people_id", db.Integer, primary_key=True)
    people_name = db.Column("people_name", db.String(255))

    def to_dict(self):
        return {'people_id': self.people_id, 'people_name': self.people_name}