# PG3402

# Running the application
Docker compose will run all the services.
> docker compose up -d

# Running dev
There are a few services necessary for developmnet. Run the following command to run RabbitMQ, Consul and Postgres;
> docker compose -f docker-compose.dev.yml up -d

# Useful URLs
 - Consul: http://localhost:8500/ui/dc1/services

# Services

- Running RabbitMQ:
- [ ] docker run -d --hostname my-rabbit -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13.7-management

- [ ] companyManager
- [ ] AI sales communication recommender
- [ ] Sending emails service


