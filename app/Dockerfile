FROM python:3.9

WORKDIR app

COPY * /app/

#COPY requirements.txt /code/requirements.txt

RUN pip install --upgrade -r requirements.txt

#COPY ./ /code/app

CMD ["uvicorn", "server:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80", "--reload"]