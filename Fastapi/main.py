from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Annotated
from sqlmodel import select
from models import User
from db import SessionDep, create_db_and_tables


app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

class SignupRequest(BaseModel):   # request structure
    email:EmailStr
    password: str

class SigninRequest(BaseModel):
    email:EmailStr
    password:str

@app.post("/signup/")   # sign up
def create_new_user(
    data:SignupRequest,
    session:SessionDep
):
    existing_email = session.exec(select(User).where(User.email == data.email)).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="user already Exists")
    # extract username from email
    end_point = data.email.index("@")
    user_name = data.email[0:end_point]

    user = User(email=data.email, user_name=user_name, password_hash="")
    user.set_password(data.password)


    #saving data to db
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return {
        "user_id":user.id,
        "username": user_name,
        "email": data.email,
    }

@app.post("/signin")
def authenticate_user(
    data:SigninRequest,
    session:SessionDep
):
    user = session.exec(select(User).where(User.email == data.email)).first()
    if not user:
        raise HTTPException(status_code=401, detail="Email doesnot exist")
    if not user.verify_password(data.password):
        raise HTTPException(status_code=401, detail="password incorrect")
    
    return {
        "username":user.user_name,
        "email":user.email,
        "message":"user Loged in  successfully"
        }
    


@app.get("/users")
def get_users(session:SessionDep) -> list[User]:
    users = session.exec(select(User).offset(0).limit(100)).all()
    return users


from pydantic import BaseModel

class UserResponse(BaseModel):
    username: str
    email: str

@app.get("/users/{email}", response_model=UserResponse)
def get_user(session: SessionDep, email: str):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(username=user.user_name, email=user.email)


