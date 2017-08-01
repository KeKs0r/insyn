# Insyn - Transparent Business Process Execution

This is a prototype for a a programming model to execute distributed processes in an enterprise environment.


## Table of Contents
1. [Motivation](#motivation)
1. [Structure](#structure)
1. [Setup](#setup)
1. [Documentation](#Documentation)


## Requirements
* node `^6.6.0`
* npm `^3.0.0`

## Motivation

#### Environment: Enterprise Software is complex but needs to be changed frequently
The business logic of enterprise software and its implementation is very complex. They have to cover global distributed process across several business units and still adhere to security, regulatory and compliance.
In current IT projects within enterprise organisations, there is an excessive focus on functionality due to the importance of requirements. These requirements only represent the status quo and do not account for future changes. Markets, and therefore business requirements, are changing constantly, which causes IT solutions to lag behind business functions. 

#### Challenge: Complexity makes logic intransparent and therefore harder to adapt
These constant changes also make the systems even more complex and intransparent due to requirements spread out over time, and lack of up to date documentation. This leads to business users not understanding how systems behave and should behave. Transparency and understanding of current processes is necessary in order to improve them faster. In order to deliver functionality faster, one trend in the IT industry is the microservice architecture. It allows to build functionality more independently, but it comes at the price that the overall increasing complexity and therefore decreasing transparency.

#### Hypothesis: Right programming model makes system transparent
Within a microservice environment using the right programming model, it is possible to focus on business functionality, while maintaining transparency over business logic and processes.

#### Requirements: Transparency, Adaptability, Testability and Fixability
In order to develop this programming model, it is important to break down which criterion it should fulfil in order to solve that problem.
Transparency: The programming model should allow business users as well as IT to understand the logic within the system for current, as well as past processes. 
Adaptability / Replaceability: Parts of the logic should be decoupled in order to adapt or even replace them completely.
Testability: The system should allow for meaningful tests that represent tests for actual business functionality.
Fixability: The system should be capable of rolling back processes when flawed code is deployed and has not obviously crashed the system, but moved it into a wrong state. 

#### Solution: Constraining write operations to asynchronous events
Business logic and process definitions are only relevant to write operations. Write operations are encapsulated in events and can be processed asynchronously, which is where our model is applied. State in our system can only be changed by those events and not directly.  
In order to achieve transparency within the system, the effects of actions need to be transparent as well. In particular, they need to define how they change state and what other events they dispatch and are not allowed to have any other side effects. With this paradigm our current state is derived from those events and is therefore only a second class.  


## Structure

The structure in this repository has 4 main parts:

```
.
├── lib                      # Framework that implements the proposed programming model
├── src                      # Application using the framework implementing a Demo Process
├── frontend                 # Frontend Application for Demo (based on react-redux-starter-kit)
└── tests                    # Unit tests and test application, which is also used for Demo
```

## Setup

First, clone the project:

```bash
$ git clone https://github.com/KeKs0r/insyn.git
$ cd insyn
```

Then install dependencies for the main applicaiton

```bash
$ npm install                   # Install project dependencies
```

Then test functionality of Application
```bash
$ npm test                   # Install project dependencies
```

Then install the frontend application

```bash
$ cd frontend
$ npm install                   # Install frontend dependencies
```

Then you should be able to run the frontend (still in frontend folder)

```bash
$ npm start                     # Runs development Server
```

Then you should see something like:
```
  app:config Creating default configuration. +0ms
  app:config Looking for environment overrides for NODE_ENV "development". +3ms
  app:config Found overrides, applying to default configuration. +2ms
  app:webpack:config Creating configuration. +1s
  app:webpack:config Enable plugins for live development (HMR, NoErrors). +3ms
  app:server Enable webpack dev and HMR middleware +151ms
  app:bin:server Server is now running at http://localhost:3000. +54ms
```
So the webserver is now available on localhost and port 3000


## Documentation
The Demo Client is able to visualize the events for a single order process. In order to see it, you need to navigate to `Order Process` in the left navigation bar.
On the order process screen the process needs to be executed by clicking the Sun icon next to the headline and selecting `replay actions`.
Then the events are replayed and executed, which visualizes the different process steps. Clicking on specific Events in a process state e.g. `ORDER.CREATE_ORDER`, it shows the single action on the right side. Which was the context that was provided to that action as well as the result and side actions that were dispatched.
When the customer on the navigation bar is catategorized as `B`, the final status of the invoice is `PARTIALLY_PAID`. This is an error path that was intentionally included. When categorizing the customer as `A` and replaying the actions again, we see that the invoice is now fully paid, since A-Customers get a higher discount.
