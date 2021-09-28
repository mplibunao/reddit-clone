# syntax=docker/dockerfile:1
FROM postgres:13.2

# Custom initialization scripts
COPY ./create_db.sh /docker-entrypoint-initdb.d/create_db.sh

RUN chmod +x /docker-entrypoint-initdb.d/create_db.sh
