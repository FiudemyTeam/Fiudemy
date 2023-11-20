from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routers import courses, users, donations
from db import create_db_and_tables, drop_db_and_tables, seed_db

from dependencies import get_current_user


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

# Configura la middleware de CORS para permitir solicitudes desde http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(courses.router, dependencies=[Depends(get_current_user)])
app.include_router(users.user_router)
app.include_router(donations.router, dependencies=[Depends(get_current_user)])


@app.get("/")
async def root():
    return {"message": "Hello Fiudemy!"}
