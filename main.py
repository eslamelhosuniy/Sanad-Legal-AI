from fastapi import FastAPI  

app = FastAPI()

@app.get("/welcome")
def welcome():
    return{
        "Status" : 200,
        "message":"Hello,World"
    }