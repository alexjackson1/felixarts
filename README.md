# Felix Arts Web Application and Server

## Docker Containers

1. PostgreSQL Database Instance(s) `felart-db-*`: using image `postgis/postgis:14-3.1`.
2. Node Web Server `felart-server-*`: using custom image built from `./server/Dockerfile`.
3. Nginx Reverse Proxy `felart-proxy-*`: using image `nginx:1.21.6`.
4. PgAdmin4 Administration Interface `felart-admin-*`: using image `dpage/pgadmin4:latest`.
