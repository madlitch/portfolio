import json

from fastapi import FastAPI, Request, BackgroundTasks, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from constants import *

import uvicorn
import time
import logging
import random
import string

logging.basicConfig(filename='info.log', level=logging.INFO)
logger = logging.getLogger(__name__)


async def not_found(request: Request, exc):
    return templates.TemplateResponse("index.html", {"request": request})


exceptions_handler = {
    404: not_found
}

app = FastAPI(exception_handlers=exceptions_handler, docs_url=None, redoc_url=None)


@app.middleware('http')
async def log_requests(request: Request, call_next):
    idem = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    logger.info(f"rid={idem} start request path={request.url.path}")
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    formatted_process_time = '{0:.2f}'.format(process_time)
    logger.info(f"rid={idem} completed_in={formatted_process_time}ms status_code={response.status_code}")
    return response


@app.on_event("startup")
async def startup():
    global projects
    filename = "static/work.json"
    with open(filename, "r") as f:
        projects = json.load(f)
    return


@app.on_event("shutdown")
async def shutdown():
    return


app.mount("/static", StaticFiles(directory="{}static".format(APP_ROOT)), name="static")
templates = Jinja2Templates(directory="{}templates".format(APP_ROOT))


@app.get("/resume", response_class=FileResponse)
async def resume(request: Request):
    return FileResponse("static/assets/massimo_albanese_resume.pdf")


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def catch_all(request: Request, full_path: str):
    return templates.TemplateResponse("index.html", {"request": request, "projects": projects})
