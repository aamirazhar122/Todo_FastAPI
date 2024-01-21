from fastapi import FastAPI, Depends
from database import engine, SessionLocal, session, Todo
from sqlalchemy.orm import  Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class TodoCreate(BaseModel):
    title : str
    description : str

class TodoResponse(BaseModel):
    id: int
    title: str
    description: str

class TodoUpdate(TodoCreate): 
    pass   

app_todo : FastAPI = FastAPI()    

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app_todo.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#get method

@app_todo.get("/")
def get_todo(db : Session = Depends(get_db)):
    todos = db.query(Todo).all()
    return todos

#Post method

@app_todo.post("/todos", response_model = TodoResponse)
def create_todo(todo : TodoCreate, db : Session = Depends(get_db) ) : 
    todo_model = Todo(title= todo.title, description= todo.description)
    db.add(todo_model)
    db.commit()
    db.refresh(todo_model)
    return todo_model

#Put method

@app_todo.put("/todos/{id}", response_model = TodoResponse)
async def update_todo(id: int,todo : TodoUpdate ,db: Session =Depends(get_db)):
    todo_update = db.query(Todo).filter(Todo.id == id).first()
    if todo_update is None :
        return {"error" : "Todo not found"}
    for key, value in todo.dict(by_alias=True).items():
        setattr(todo_update, key, value)
    db.commit()
    db.refresh(todo_update)
    return todo_update
    
#Delete todo

@app_todo.delete("/todos/{id}")
async def delete_todo(id : int, db : Session = Depends(get_db)):
    todo_del = db.query(Todo).filter(Todo.id == id).first()
    if todo_del is None:
        return {"error ": "todo not found"}
    db.delete(todo_del)
    db.commit()
    return {"message" : "todo deleted"}
