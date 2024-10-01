# PG3402

# Running the application
- Docker compose will run all the services.
- Docker port mapping problem: Cannot use port to be 0 (random available port) because all ports are available. It should be 
- Or can it be random because it shouldn't be accessible by the computer, only through the gateway

> docker compose up -d

# Running dev
There are a few services necessary for developmnet. Run the following command to run RabbitMQ, Consul and Postgres;
> docker compose -f docker-compose.dev.yml up -d

# Useful URLs
> - Consul: http://localhost:8500/ui/dc1/services
> - RabbitMQ: http://localhost:15672
> - Authentication inspiration: https://medium.com/@rajithgama/spring-cloud-gateway-security-with-jwt-23045ba59b8a

# Services

- Running RabbitMQ:
- [ ] docker run -d --hostname my-rabbit -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13.7-management
- [ ] Consul for Load Balancing, Service Discovery and configuration
- [ ] API Gateway

- [ ] companyManager
- [ ] AI sales communication recommender
- [ ] Sending emails service

# Google search 
 - Email service accont:  pg3402@microservices-436410.iam.gserviceaccount.com 
 - Unique ID service account: 108969935334828963980
 - Google custom search API key:  AIzaSyDjUBYwYTQ1vs143c3qO-Eiep8UVDt7dow 

## User stories and features
- [ ] Authentication, username and password for this simple project in the course.
- [ ] Products selling, used for prompts to generate pitches
- [ ] Global exception handling using the same DTO in ALL microservices

## Exam grades
### E Requirements:
- [ ] Multiple services that fulfull different functionality and communicate with each other

### D Requirements:
- [ ] At least two of the services communicate using synchronous communication (REST between two services)
- [ ] At least two of the services communicate asynchronously

### C Requirements:
- [X] The project uses a Gateway
- [ ] The projects also does load balancing
        - This is probably done but should be checked

### B Requirements:
- [X] The project has a means of centrally controlling the health of running services health check
- [ ] The project has a means of centrally controlling the configuration for the services, for example using consul

### A Requirements:
- [ ] Docker containerization and scaling (not auto scaling, but being able to select how many instances)


### Extras
- [ ] Gateway Circuit breaker - A dependency that should be added.
- [X] DTO For authentication service to not expose hashed password to client
- [ ] BaseEntities for services
- [ ] Testing
- [ ] Option to hide downstream services, or only let them be accessed directly from the gateway

### Todo
- [ ] Remove any duplicate code possible to remove from auth/gateway
- [ ] Error handling when service cannot be reached along with better retry logic? Maybe an interval between retries?
- [ ] Website getter enginge/service - If adding a company WITHOUT a website, the company service should add into queue to be getting recommended possible websites and the UI should also infrom about this
- [ ] AI Enginge for pitches also based on products