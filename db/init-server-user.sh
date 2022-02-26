#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER server;

    CREATE SCHEMA felix;
    CREATE SCHEMA private;
    CREATE SCHEMA globe;
    CREATE SCHEMA ref;

    GRANT ALL ON SCHEMA felix TO server;
    GRANT ALL ON SCHEMA private TO server;
    GRANT ALL ON SCHEMA globe TO server;
    GRANT ALL ON SCHEMA ref TO server;
EOSQL