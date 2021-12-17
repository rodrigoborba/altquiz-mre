# AltQuiz 2.0

Customization created for an internal event.

Some tips:

1. The original AltspaceVR/altquiz-mre project/database does not have questions previously registered. the questions are filled in a trivia database API (https://opentdb.com)
2. To initialize the data the first time you must add the application in Altspace using the parameter "questions=true" at the end of URL

ws://your_app_host:3901?questions=true

3. Its possible to increse the number of questions (default is 5), changing the const numOfQs in the line 191 of app.ts file.
4. Its possible to insert yours custom questions directly on postgres, without registering on OpenTDB. 
  
  docker exec -it altquiz-mre_db_1 bash
  
  psql -U altquiz
  
INSERT INTO questionsTest (source, categoryId, category, difficulty, question, answer, incorrect1, incorrect2, incorrect3)
VALUES ('manual', 50, 'Join', 'easy', 
'How much is 7 + 7?', 
'14', 
'15', '10', '3');
  
  OBS: you need at least a minimum of X questions of difficulty 'easy', where X its equal the number of "numOfQs" on app.ts file.



