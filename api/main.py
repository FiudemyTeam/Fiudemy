from fastapi import FastAPI
from contextlib import asynccontextmanager

from routers import courses, users
from db import create_db_and_tables, drop_db_and_tables, seed_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # This executes on startup
    print("Starting up Fiudemy API")
    create_db_and_tables()
    seed_db()
    yield

    # This executes on shutdown
    drop_db_and_tables()
    print("Shutting down Fiudemy API")

app = FastAPI(
    title="Fiudemy API",
    lifespan=lifespan
)

app.include_router(courses.router)
app.include_router(users.user_router)



@app.get("/")
async def root():
    return {"message": "Hello Fiudemy!"}
