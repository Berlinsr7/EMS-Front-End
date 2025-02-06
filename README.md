Employee Management System: 
This is a web app built to ease the process of managing the employees, creating and assigning tasks for them and also to get a overview of the status of the tasks with the help of dashboard.

Packages used: React Js, React-Bootstrap, React-Router-Dom, Axios, react-hot-toast, Jwt-Decode....

Specs:
Home Page: This is the landing page of this app and it has a button for you to login into the app. Since this is a employee managemnt system and will be used only by the employees created by the admin I haven't kept the create user option open for all, only admins can have this option.
For login : mail: ber@gmail.com, password: ber

Profile: This will have all the info regarding that particular user, he can view all his data, the tasks he worked in and also can get an insight of the efforts that he had put for the tasks assigned to him.

Create Task: In this page you can create a task for tghe employees to work on.

CheckStatus: You can also get track of individual tasks with the help of this page wher you need to search with the task no to get the details regading the same. (note: you can find the task no in dashboard page based on the progress that task currently in.)

Login: This will redirect the users to the login page.

Dashboard: This page will cojntain all the tasks grouped by the progress that each task has. By clicking on the progress card you can view all the tasks related to that progress. You can also view that particular task from here and take action accordingly. The users can assign the tasks to themselves and move it to To-Do, In-Progress and move it to done by giving some resolution comments. Here there will be an extra button for admins which helps to assign tasks to someone of his wish.

Users: This page will have info regarding all the users of the company and only admins can access this page. Here the admin can view and get info of all the users and can able to delete the user if needed. He can also assign tasks to that user from here.

Create user: using this page the admin can able to create the users.

Finally there will be a logout button which will clear all the session storage and will move the user to the login page.
