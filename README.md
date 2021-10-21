# wikipedia-restful-app

#SETUP
Clone repository, then make sure your machine have nodeJS installed.
And make sure you have MongoDB Installed and running on localhost.
Go to downloaded folder and run "npm install".

#USE
To test this API use Postman, Thunder-Client or any similar program.

#API Link
After running application your url would look like "localhost:3000/articles/"

#Available requests
GET - To get all the articles available in database.
POST - To add new article to database: Use name title, and content for title and article input field in form.
DELETE - To delete all the articles in database.

#FOR SPECIFIC ARTICLE
Link Would look like: "localhost:3000/articles/'articleTitle'"
GET - To get specific article using title.
PUT - To update and overwrite whole article.
PATCH - To update any particular field without overwriting whole article.
DELETE - To delete any specific article instead of all.
