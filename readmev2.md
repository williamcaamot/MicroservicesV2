# PGR3403 - Microservices Exam - Dealflow

## Instructions on how to build, start and run the project


## Project overview
- [ ] an overview of the project (the one from the arbeidskrav may be used as a basis). The
  overview should accurately describe the project implementation.

## User stories
- [ ] a list of user stories that allow an examiner to assess the functionality developed in the
  project (think of scenarios that the examiner can run to see what functionality you have
  implemented).
  The implementation of project specific user stories will be based on the user stories present in
  this list.

## Architecture diagram
- [ ] a diagram showing the architecture of the system. This should show what services the
  project contains and what type of communication they have between them (synchronous or
  asynchronous).

## Additional notes
This was made as a solo-project.

### Microservices specific requirements
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