from sqlmodel import Field, SQLModel
from pydantic import EmailStr
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated='auto')

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: EmailStr = Field(index=True, unique=True, nullable=False, default=None)
    user_name: str = Field(index=True, nullable=False)
    password_hash: str = Field(nullable=False)

    def set_password(self, password:str):
        self.password_hash= pwd_context.hash(password)

    def verify_password(self, password:str) -> bool:
        return pwd_context.verify(password, self.password_hash)