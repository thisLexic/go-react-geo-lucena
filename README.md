# Description

This is for learning how to connect the following together:

1. React frontend website
2. Go backend api
3. Postgres relational database

The React frontend leverages Google maps to display a map with shaded areas. The frontend makes api calls to the backend written in Go. The api then connects to the Postgres database containing the data of each area. The database schema has four tables with two many-to-many relationships and one many-to-one relationship.
