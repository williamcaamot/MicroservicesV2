# PG3402

# Running the application
Docker compose will run all the services.
> docker compose up -d

# Running dev
There are a few services necessary for developmnet. Run the following command to run RabbitMQ, Consul and Postgres;
> docker compose -f docker-compose.dev.yml up -d

# Useful URLs
> - Consul: http://localhost:8500/ui/dc1/services
> - RabbitMQ: http://localhost:15672

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

# User stories and features
- [ ] Authentication, Email and password for this simple project in the course.
- [ ] Products selling, used for prompts to generate pitches
- [ ] 

