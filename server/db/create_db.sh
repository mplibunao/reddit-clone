#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating database: ${POSTGRES_DB}"

$POSTGRES <<EOSQL
CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};
EOSQL

if [ ${POPULATE_SCHEMA} -eq 1 ]; then
    echo "Creating schema..."
    psql -d ${POSTGRES_DB} -a -U${POSTGRES_USER} -f /schema.sql
fi

if [ ${POPULATE_DB} -eq 1 ]; then
    echo "Populating database..."
    psql -d ${POSTGRES_DB} -a  -U${POSTGRES_USER} -f /test_data.sql
fi

#set -e
#set -u

#echo "POSTGRES INIT SCRIPTS"

#function create_user_and_database() {
	#local database=$1
	#echo "  Creating user and database '$database'"
	#psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
			#CREATE USER $database;
			#CREATE DATABASE $database;
			#GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
#EOSQL
#}

#if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	#echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
	#for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		#create_user_and_database $db
	#done
	#echo "Multiple databases created"
#fi
