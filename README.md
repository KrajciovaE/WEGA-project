# Climbing Spots Project

## Description
This project is a climbing spots tracker built using Angular, Node.js, Express, and MongoDB. It allows users to explore climbing spots, rate them, and browse equipment recommendations.

---

## Requirements
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [MongoDB](https://www.mongodb.com/try/download/community).
3. Install Angular CLI globally:
   ```bash
   npm install -g @angular/cli
   ```
---


## Setup Instructions

### Backend setup

1. Navigate to the backend folder 
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Import the database

------

### Database setup

1. You can manually add the .json files from project/backend/backup/ClimbingSpots into you mongoDB compass or

---

1. Ensure the database dump (backup/climbingSpots) is accessible.

2. Start MongoDB server to allow database access.
    ```bash
    mongod
    ```
    - Note: By default, MongoDB runs on port 27017. Ensure the mongod service is running in the background.

3. Import the Database Dump

    Use the mongorestore command to load the provided database dump into your MongoDB instance.

    ```bash
    mongorestore --db climbingSpots ./backup/climbingSpots
    ```
    - Replace ./backup/climbingSpots with the path to the directory where the exported database is stored.

4. Verify Database Import

    Once the dump is restored, you can verify the database in the MongoDB shell or any MongoDB client. Instead of this you can go to MongoDB Compass and look for the data.

    1. Open the MongoDB shell:
    ```bash
    mongo
    ```
    2. List all databases:
    ```bash
    show dbs
    ```
    3. Switch to the climbingSpots database:
    ```bash
    use climbingSpots
    ```
    4. List all collections to ensure the data is imported
    ```bash
    show collections
    ```
    5. Check the data inside the collections:
    ```bash
    db.<collection_name>.find().pretty()
    ```
    Replace <collection)name> with the appropriate collection name, such as climbingSpots or users

5. Connect the Backend to MongoDb

    Ensure the backend is correctly configured to use MongoDB. Check the server.js file in the backend folder:

    - Locate the ongoDB connection string, e.g.:
    ```bash
    mongoose.connect('mongodb://localhost:27017/climbingSpots')
    ```
    - Make sure the dbPath points to your MongoDB instance, and the database name matches climbingSpots.

6. Test the Setup

    Start your backend server and verify the database connection is successful.

    1. Start the backend server:
    ```bash
    node server.js
    ```
    2. You should see a message like:
    ```bash
    Server beží na porte 5000
    MongoDB pripojený...
    ```
    3. Verify the backend can fetch data from MongoDB by navigating to the API endpoints (e.g., http://localhost:5000/api/climbingSpots).

-----
### Frontend setup

1. In new terminal navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the Angular development server:
    ```bash
    ng serve -o
    ```
4. App should open in your browser at http://localhost:4200

