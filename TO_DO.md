# Fix Error

1. edges of areas may be rendered in the wrong order

- may require extra order field in database

2. all areas are queried the first time the frontend is served

- costly for the backend
- load time of frontend will be too slow
- need to query the database one section of areas at a time

# Possible Concerns

1. the frontend does not call the api for one area (only the get all areas are used)
