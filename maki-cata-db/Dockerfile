FROM mariadb:11
RUN apt update && apt -y upgrade
COPY init.sql /docker-entrypoint-initdb.d/
