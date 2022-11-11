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

# uvicorn server:app --reload --host 0.0.0.0
# stripe listen --forward-to 0.0.0.0:8080/webhook

maintenance = MAINTENANCE
debug = False
if DEBUG == 1:
    debug = True

logging.basicConfig(filename='info.log', level=logging.INFO)
logger = logging.getLogger(__name__)


async def not_found(request: Request, exc):
    return templates.TemplateResponse("index.html", {"request": request})


exceptions_handler = {
    404: not_found
}

app = FastAPI(exception_handlers=exceptions_handler, debug=debug, docs_url=None, redoc_url=None)


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
    # await database.connect()
    return


@app.on_event("shutdown")
async def shutdown():
    # await database.disconnect()
    return


app.mount("/static", StaticFiles(directory="{}static".format(APP_ROOT)), name="static")
templates = Jinja2Templates(directory="{}templates".format(APP_ROOT))


@app.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/resume", response_class=FileResponse)
async def resume(request: Request):
    return FileResponse("static/assets/massimo_albanese_resume.pdf")






