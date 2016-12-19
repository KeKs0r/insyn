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

####Environment: Enterprise Software is complex but needs to be changed frequently
The business logic of enterprise software and its implementation is very complex. They have to cover global distributed process across several business units and still adhere to security, regulatory and compliance.
In current IT projects within enterprise organisations, there is an excessive focus on functionality due to the importance of requirements. These requirements only represent the status quo and do not account for future changes. Markets, and therefore business requirements, are changing constantly, which causes IT solutions to lag behind business functions. 

####Challenge: Complexity makes logic intransparent and therefore harder to adapt
These constant changes also make the systems even more complex and intransparent due to requirements spread out over time, and lack of up to date documentation. This leads to business users not understanding how systems behave and should behave. Transparency and understanding of current processes is necessary in order to improve them faster. In order to deliver functionality faster, one trend in the IT industry is the microservice architecture. It allows to build functionality more independently, but it comes at the price that the overall increasing complexity and therefore decreasing transparency.

####Hypothesis: Right programming model makes system transparent
Within a microservice environment using the right programming model, it is possible to focus on business functionality, while maintaining transparency over business logic and processes.

####Requirements: Transparency, Adaptability, Testability and Fixability
In order to develop this programming model, it is important to break down which criterion it should fulfil in order to solve that problem.
Transparency: The programming model should allow business users as well as IT to understand the logic within the system for current, as well as past processes. 
Adaptability / Replaceability: Parts of the logic should be decoupled in order to adapt or even replace them completely.
Testability: The system should allow for meaningful tests that represent tests for actual business functionality.
Fixability: The system should be capable of rolling back processes when flawed code is deployed and has not obviously crashed the system, but moved it into a wrong state. 

####Solution: Constraining write operations to asynchronous events
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
$ git clone https://github.com/KeKs0r/insyn.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies for the main applicaiton

```bash
$ npm install                   # Install project dependencies
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


## Documentation

To be completed