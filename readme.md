# Quiz Application

This is a web application built using Node.js, Express, and MongoDB to create a quiz with three difficulty levels (easy, medium, and hard). High scores for each level are stored in a MongoDB database.

You can view a hosted application at [Quiz App](https://node-quiz-48f2858a076b.herokuapp.com/)

## Features

- Multiple quiz levels (easy, medium, hard)
- High score tracking for each level
- User-friendly interface

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/quiz-application.git
```

2. Navigate to the project directory:
```bash
cd quiz-application
```

3. install dependencies
```bash
npm install
```   
5. create a cluster on MongoDB. Following that create a database called quiz with three collections called: easy; medium;hard
6. create a .env file and paste following code into it while changing username and password to your respective user
```
MONGODB_URI = "mongodb+srv://<username>:<password>@cluster0.nd7iykw.mongodb.net/?retryWrites=true&w=majority";
```
For more help with MongoDB please visit [MongoDB Documentation](https://www.mongodb.com/docs/drivers/node/current/)
7. Start the application
```bash
npm start
```      
Visit http://localhost:3000 in your web browser to access the quiz application.

## Usage
1. Open your browser and go to http://localhost:3000.
2. Choose a quiz level (easy, medium, or hard).
3. Answer the questions and submit your quiz.
4. View high scores for each level.

## Contributing
Feel free to contribute to this project. Follow the steps below:

1. Fork the repository.
2. create a new branch: git checkout -b feature/your-feature.
3. Commit your changes: git commit -m 'Add your feature'.
4. Push to the branch: git push origin feature/your-feature.
5. Submit a pull request.