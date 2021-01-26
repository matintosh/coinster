FROM python:3.8.5-alpine

WORKDIR /coinster-currency

ADD ./backend/coinster-currency /coinster-currency
ADD ./helpers /coinster-currency/app/helpers
ADD ./common /coinster-currency/common

RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r ./common/requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

CMD ["python", "run.py"]