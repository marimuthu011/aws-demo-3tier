# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "postgresql://admin:admin123@localhost:5432/mydb"

# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# # 👇 Add this line to create tables at app startup
# # backend/app/database.py

# def init_db():
#     from . import models
#     Base.metadata.create_all(bind=engine)


import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ Read DB URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Marimuthu123@dockerdb.c74qq6ow8zb5.ap-south-1.rds.amazonaws.com:5432/mydb")

# ✅ Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# ✅ Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Declare base model
Base = declarative_base()

# ✅ Initialize database (create tables)
def init_db():
    from . import models  # make sure models are imported here
    Base.metadata.create_all(bind=engine)
