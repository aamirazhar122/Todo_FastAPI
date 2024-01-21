from sqlalchemy import create_engine, String, Integer, Column, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Session

SQLALCHEMY_DATABASE_URL = "postgresql://aamirlucky60:AhJX4ZpVc8mS@ep-weathered-base-a51yuvs0.us-east-2.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()

class Base(DeclarativeBase):
    pass
    

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True,serial_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)

Base.metadata.create_all(bind=engine)

# with engine.connect()as conn:
#     trans = conn.begin()
#     try:
       
#         conn.execute(
#             text("INSERT INTO todos (id,title ,description) VALUES (:id,:title ,:description)"),
#             [{"id": 1,'title' :'abc' ,"description": 'Pakistan'}, {"id": 2 ,'title' :'xyz' ,"description": 'Zindabad'}]
#         )
#         # Commit the transaction
#         trans.commit()
#     except:
#         # Rollback the transaction in case of error
#         trans.rollback()
#         raise
        
