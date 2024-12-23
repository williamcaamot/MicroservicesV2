# PGR3403 - Microservices Exam - Dealflow

## Instructions on how to build, start and run the project
In all of these cases, there needs to be supplied API keys for Google and OpenAI. I have not checked in these API keys, and if they are not provided, the application still works but will not provide results when using functionality to find websites and Sales pitch generation.

#### Demo user
There has been set up some demo data with these credentials, data for this user is automatically loaded into the application when building and running it:
- Username: test
- Password: abcd1234

## 1. Use Docker compose to build images locally (Recommended!)
#### Recommended way of building and running
Run the following command from the project root directory:
> docker compose up --build -d

Provide the API keys for WebscraperService and AIService as described in the PDF file named "How to add API keys". The service will need a few seconds to refresh the keys from Consul (automatically).

Application can be seen in localhost:5173

## 2. Use Docker compose with images from dockerhub
> docker compose -f docker-compose.dockerhub.yml up -d

Provide the API keys for WebscraperService and AIService as described in the PDF file named "How to add API keys". The service will need a few seconds to refresh the keys from Consul (automatically).

Application can be seen in localhost:5173

## 3. Use Docker compose to only run RabbitMQ, Consul and DB, then start each service individually with maven
For this version of running the services, Consul Config is disabled, config is gotten from the application.yaml file. Be sure to add the API keys to these files.

> docker compose -f docker-compose.dev.yml up -d


## Project overview - An overview of the project (the one from the arbeidskrav may be used as a basis). The overview should accurately describe the project implementation.
### Project description
The project is called "Dealflow", which is a business-to-business (B2B) software as a service (SaaS). It's functionality simplifies the process of finding relevant companies to sell to. It can be a time consuming and cumbersome task to search for and find relevant companies to sell to, when doing Business to Business Sales. This SaaS is targeted towards small and medium-sized businesses and solopreneurs, it can be used by different companies that struggle with their B2B sales processes, such as manufacturing businesses, event businesses, or IT businesses just to mention a few.

When dealing with B2B sales, there are a few processes that Dealflow simplifies; First, it simplifies the process of finding companies to sell to. Second, it simplifies the process of finding contact infromation (website, email, phone numbers). Third, it simplifies the process of writing a personalized sales pitch to companies, at last it allows to save all communication with a company.

Finding companies can be done directly inside Dealflow with the company search that is integrated with Brønnøysundregisterne for accurate and up to date information. You can find the company's website directly inside the platform through a Google Search integration (remember to provide API key). Contact details such as email addressess and phone numbers can be found through a click of a button, or they can be set manually if the automatic webscraping service does not provide results. Personalized sales pitches can be generated through an integration with OpenAI's ChatGPT-4. Communication with the company can be saved directly in the platform, to keep track of what has been communicated.

Users are be able to register and sign in, and then organize all their work within different workspaces, and each user can create as many workspaces as they want.

The project is built with microservices architecture to be scalable, flexible, resilient and easier maintainability because of smaller independent codebases. The project also uses an event-driven architecture using RabbitMQ to handle asynchronous communication between services, this helps with decoupling and scalability.

### Technical description
The project is implemented through multiple microservices, CompanyManager, AIService, WebScraperService and Authentication. These all handle their respective parts of the application. Functionality has been split in accordance with microservices principles; loose coupling of services, single responsebility, and independence.

Additionaly, Consul has been implemented for centralized configuration, service discovery and health checks. API Gateway through Spring Cloud Gateway has been implemented as a single point of access for the entire application. A Load Balancer has also been implemented to ensure that scalability is possible. A message queue (RabbitMQ) has been implemented to handle asynchronous communication for services that need this. At last, all services has been containerized and a CI pipeline has been set up to automatically build and publish images to dockerhub.

### Short description of functionality in services
#### CompanyManager Service
CompanyManager Service handles managing Workspaces, Companies, searching through Brønnøysundregistrene, and saving Communication with companies. It serves as the central repository for all company-related data, including contact details and interactions. CompanyManager also sends events to AIService through RabbitMQ for generating sales pitches and persists the results, aligning with the principles of event-driven architecture.

#### AIService
AI Service handles generating and persisiting sales pitches, also handles API calls for fetching these sales pitches from the React Client.

#### Webscraper Service
WebscraperService handles Google Search, scraping Email addresses and Phone numbers. These data are persisted in the CompanyManager, which aligns well with the role of CompanyManager which is to store and manage company-related data.

#### Authentication Service
Authentication Service manages user authentication using JWT (JSON Web Token). JWT allows the Gateway to authenticate requests without directly calling the Auth Service (reduces latency and load on auth service). The Auth Service is responsible for user sign-in, registration, and sign-out processes. The AI Service stores user related data such as encrypted passwords, usernames and email addresses.

#### Gateway
The Gateway acts as a single point of entry for the entire application. It handles request authentication, routing, and forwarding requests to the appropriate microservices. Load Balancer has also been set up. Services register in the Consul Service Discovery and the Load Balancer sends requests to different services that are registered.


## User stories - A list of user stories that allow an examiner to assess the functionality developed in the project (think of scenarios that the examiner can run to see what functionality you have implemented). The implementation of project specific user stories will be based on the user stories present in this list.

These are the prioritized user stories from Arbeidskrav:
- [X] As a user I want to be able to search for relevant businesses and save them.
- [X] As a user I want to be able to find relevant websites for a company with Google Search directly from the appplication.
- [X] As a user I want to be able to generate sales pitches using AI.

Additionaly, I have completed these user stories:
- [X] As a user I want to be able to find relevant emails from a company website (Webscraper Service)
- [X] As a user I want to be able to find relevant phone numbers from a company website (Webscraper Service)
- [X] As a user I want to be able to manually set phone numbers, emails and websites as a fallback mechanism if the automatic service does not work, or gives incorrect results.
- [X] As a user I want to be able to manage my work in different workspaces, where each workspace have a different title and description used by the AI service for better pitches.
- [X] As a user I want to be able to write down communication with different companies, so that I can keep of track of what has been communicated. (from best case scenario)


## Architecture diagram - A diagram showing the architecture of the system. This should show what services the project contains and what type of communication they have between them (synchronous or asynchronous).
![Architecture diagram](/architecture.png)

## Additional notes
This was made as a solo-project.

# Microservices specific requirements
Required (but not sufficient) for E:
- [X] Use multiple services, that fulfill different functionality and communicate with each
other
- [X] At least two of the services communicate using synchronous communication (for
example, direct REST calls between two services).
- [X] At least two of the services communicate using asynchronous communication (for example, using Message Queue). This will be done in accordance with event-driven architecture, as discussed in class.

Required (but not sufficient) for D:
- [X] Each service has a clear structure and functionality.
- [X] The architecture of the project is consistent with the documentation. (All services are described in the architecture, they can be found in the project, their functionality, structure, interactions are documented.

Required (but not sufficient) for C:
- [X] The project uses a unique access point, that handled calls and routes them to appropriate
services – Gateway
- [X] The project uses a unique access point that, in addition to routing calls, also does load balancing

Required (but not sufficient) for B:
- [X] The project has a means of centrally controlling the health of running services – health
check
- [X] The project has a means of centrally controlling configurations for the services – for example, using Consul

Required (but not sufficient) for A:
- [X] The project has a means of containerization – building container images from the
existing services and getting such containers running and interacting with each other.

## References
- For Authentication: https://medium.com/@rajithgama/spring-cloud-gateway-security-with-jwt-23045ba59b8a
- Logo was created with Looka.com


# Useful URLs
> - Consul: http://localhost:8500/ui/dc1/services
> - RabbitMQ: http://localhost:15672
