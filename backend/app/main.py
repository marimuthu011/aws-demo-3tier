# backend/app/main.py
from fastapi import FastAPI
from app.service.database import init_db
from app.routers import users, products
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

init_db()


origins = [
    "http://localhost:3000",
]


# Add CORS middleware here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(products.router, prefix="/products", tags=["Products"])
