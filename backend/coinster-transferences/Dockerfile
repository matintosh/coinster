FROM python:3.8.5-alpine

WORKDIR /coinster-transferences

ADD ./backend/coinster-transferences /coinster-transferences
ADD ./helpers /coinster-transferences/app/helpers
ADD ./common /coinster-transferences/common

RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r ./common/requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

CMD ["python", "run.py"]
