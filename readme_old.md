# PG3402

# Running the application
In all of these cases, there needs to be supplied API keys for Google and OpenAI. I have not checked in these API keys, and if they are not provided, the application still works but will not provide results when using serviced that require these API keys.
## 1. Use Docker compose to build images locally
This is the way I recommend.
> docker compose up --build -d

Visit localhost:8500, to KV storage, and provide the API keys as described in the word document. The service will need a few seconds to refresh the keys from Consul (automatically).

Application can be seen in localhost:5173

## 2. Use Docker compose with images from dockerhub
> docker compose -f docker-compose.dockerhub.yml up -d

## 3. Use Docker compose to only run RabbitMQ, Consul and DB, then start each service with maven
For this version of running the services, Consul Config is not enabled, and health checks will not work (consul is containerized and cannot access services running locally on the machine, that are not containerized)

> docker compose -f docker-compose.dev.yml up -d


# Useful URLs
> - Consul: http://localhost:8500/ui/dc1/services
> - RabbitMQ: http://localhost:15672


# Services

- Running RabbitMQ:
- [ ] docker run -d --hostname my-rabbit -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13.7-management
- [ ] Consul for Load Balancing, Service Discovery and configuration
- [ ] API Gateway

- [ ] AI sales communication recommender
- [ ] Webscraper Service
- [ ] companyManager
- [ ] Authentication
- [ ] TODO: Sending emails service

# Google search 
 - Email service accont:  pg3402@microservices-436410.iam.gserviceaccount.com 
 - Unique ID service account: 108969935334828963980
 - Google custom search API key:  AIzaSyDjUBYwYTQ1vs143c3qO-Eiep8UVDt7dow

- [ ] Want environment variables to be injected - send bogdan the .env in the exam delivery and explain how to run the project
- [ ] Want a UI to test the load balancing, should have centrlized logging, this should be controlled as a feature flag, set in the env file. Explain this also in the readme file

## User stories and features
- [X] As a user I want to be able to find relevant websites for a company with Google Search (Webscraper Service)
- [ ] Security and validation on the feature above - It works, but is it secure and resilient?
- [X] As a user I want to be able to find relevant emails from a company website (Webscraper Service)
- [X] As a user I want to be able to find relevant phone numbers from a company website (Webscraper Service)
- [X] Authentication, username and password for this simple project in the course.
- [X] Product description for selling, used for prompts to generate pitches
- [ ] Global exception handling using the same DTO in ALL microservices
- [ ] Fix Authentication so that a user can only access their own information
- [ ] Input validation

## Exam grades
### E Requirements:
- [X] Multiple services that fulfull different functionality and communicate with each other

### D Requirements:
- [X] At least two of the services communicate using synchronous communication (REST between two services)
- [X] At least two of the services communicate asynchronously

### C Requirements:
- [X] The project uses a Gateway
- [X] The projects also does load balancing
        - This is probably done but should be checked

### B Requirements:
- [X] The project has a means of centrally controlling the health of running services health check
- [X] The project has a means of centrally controlling the configuration for the services, for example using consul

### A Requirements:
- [X] Docker containerization and scaling (not auto scaling, but being able to select how many instances)

### Extras
- [ ] Gateway Circuit breaker - A dependency that should be added.
- [X] DTO For authentication service to not expose hashed password to client
- [ ] BaseEntities for services
- [ ] Testing
- [ ] Option to hide downstream services, or only let them be accessed directly from the gateway

### Todo
- [ ] Remove any duplicate code possible to remove from auth/gateway
- [ ] Error handling when service cannot be reached along with better retry logic? Maybe an interval between retries? - Should be better error handling...
- [ ] Website getter enginge/service - If adding a company WITHOUT a website, the company service should add into queue to be getting recommended possible websites and the UI should also infrom about this
- [ ] AI Enginge for pitches also based on products

## References
- For Authentication: https://medium.com/@rajithgama/spring-cloud-gateway-security-with-jwt-23045ba59b8a