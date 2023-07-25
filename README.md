# Node JS Assignment [![Node.js CI](https://github.com/ThamsanqaMpontshane/Node-JS-Assignment/actions/workflows/node.js.yml/badge.svg)](https://github.com/ThamsanqaMpontshane/Node-JS-Assignment/actions/workflows/node.js.yml)

# Purpose
Our test is designed to be open-ended and non-prescriptive, and this is by design. We understand and appreciate that developers possess diverse sets of skills and talents, each with their own unique toolbox. Our goal is to gain insight into your individual abilities and what you consider significant in your work. We look forward to discovering your talents and skills throughout this assessment.

## Assessment Overview
Create a simple NodeJS restful application that manages users and tasks for those users.

##  Requirements

 - You do NOT need to create a UI for this application - only REST endpoints.
 - The application should be able to CRUD users via REST.
 -  The application should be able to CRUD tasks for users via REST.
 - Data must be persisted to a storage mechanism (Mongo or MySql or Other).
 - Use migrations to setup your database if required.
## BE Careful
Uncomment line 23 to automatically create both the users and tasks table and a success message will be shown in your terminal if you managed to create the tables.
In order for you to be able to delete any data from the tables uncomment one the lines from 49 to 54 depending on which database you want to restart afresh . Take note that even if you reset you database the id will always start from the id after the last data entry.
## Database Used
My first choice of database to use was fs which is the file system , but due to the amount of errors I was getting . My last resort was to Use Sqlite3 which worked perfectly
## Installation
 Fork And Clone The Repo From Github To Local
 

    git clone https://github.com/ThamsanqaMpontshane/Node-JS-Assignment.git

## Usage

On your favourite text editor go to your terminal and run this command:

    npm install
 
Wait for the installation to finish.
The next command you want to run is:

    nodemon
Or

    npm run dev
After that has done navigate to : http://localhost:3000 you should see Hello World In page
## Api Documentation

As a guide, below are the curl commands with the REST endpoints we are expecting to test against.  You can use these urls as a guideline on how to design/develop your REST endpoints.

If you do not have access to curl, you can use the Postman chrome plugin (or any other HTTP client) to perform these calls in order to test your application.

 Create User
 

    curl -i -H "Content-Type: application/json" -X POST -d '{"username":"jsmith","first_name" : "John", "last_name" : "Smith"}' http://localhost:3000/api/users
Update User

    curl -i -H "Content-Type: application/json" -X PUT -d '{"first_name" : "John", "last_name" : "Doe"}' http://localhost:3000/api/users/{id}
List All Users

    curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/users
Get User Info

    curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/users/{id}
Create Task

    curl -i -H "Content-Type: application/json" -X POST -d '{"name":"My task","description" : "Description of task", "date_time" : "2016-05-25 14:25:00"}' http://localhost:3000/api/users/{user_id}/tasks
Update Task

    curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"My updated task"}' http://localhost:3000/api/users/{user_id}/tasks/{task_id}
Delete Task

    curl -i -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/users/{user_id}/tasks/{task_id}
Get Task Info

    curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/users/{user_id}/tasks/{task_id}
List All Tasks For User

    curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/users/{user_id}/tasks

# Visual Insights

![Alt](https://repobeats.axiom.co/api/embed/94ac652a49604ea34a653e5a605b696c47f35ac8.svg "Repobeats analytics image")
