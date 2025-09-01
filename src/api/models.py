from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    #is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    #acces_token: Mapped[str] = mapped_column(String, nullable=True)

    pantry = db.relationship('Pantry') #editar la relacion para que sea uno es a uno
    restriction = db.relationship('Restriction')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
        }

class Restriction(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    ingredient_id: Mapped[int] = mapped_column(ForeignKey('ingredient.id'), nullable=False)

class Pantry(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int] = mapped_column(nullable=False)
    unit: Mapped[int] = mapped_column(nullable=False) #aqui se debe modificar a varchar
    expiration: Mapped[int] = mapped_column(nullable=False) #aqui se debe agregar la fecha de caducidad

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    

class Ingredient(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)

    restriction = db.relationship('Restriction')

class Recipe(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[int] = mapped_column(nullable=False)
    difficulty: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[int] = mapped_column(nullable=False)

    ingredient: Mapped[int] = mapped_column(ForeignKey('ingredient.id'), nullable=False)