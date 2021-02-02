# Class Heroes!!

## Description
A webapp using API's to design and create an application that can be used in a classroom setting that allows kids to participate more fully through use of comic characters. It was important to make sure that the users can fulfill the Create, Read, Update, and Delete functionalities(C.R.U.D.). Students can now message their teachers if they need help or is stuck on an assignment. They will be able to update their emergency contacts, what they prefer to be called in class, and also update their feelings for the day. Teachers will be able to record students feelings data as well as emailing parents for any reasons. 


Heroku deployment: https://class-heros.herokuapp.com/

## Table of contents
- [Title](#Title)
- [Demo](#Demo)
- [Installation](#Installation)
- [Technologies](#Technologies)
- [Team](#Team)
- [Test](#Test)
- [License](#License)
- [Questions](#Questions?)



## Demo
- Students Demo:
<img src = "public/images/student.gif" style="width: 600px:">

- Teachers Demo: 
<img src = "public/images/teacher.gif" style="width: 600px:">


## Installation
To download the application from git hub from the following location https://github.com/ktywelch/ClassMonsters-X-Force.

Onece downloaded run `npm install` which will provide you a npm dependencies such as node_modules idendtified in package.json.

To run this application on a local system you will need to have mysql installed and running on the default port 3306.

Change the file config/config.json so that the user name and  password in the development section matches the password on your local host.

Prior to running the application you will need to use the sql script "schema.sql" located in the /db_schema dicretory to create an initial empty database structure as required by sequelize models.

Start the application by running:
node server.js 
or 
nodemon server.js 

In this case will will need to pre-populate test data for the classes do this by executing:

npx sequelize-cli db:seed:all

This will create 3 sample teachers and students for you to use. 

These are the modules that have been installed in this exercise:
  - `inquirer` will capture user response in the command-line 
  - `mySQL2` a database management system
  - `animate.css` a package that can target a specific element to create a unique motion.
  - `bcryptjs` this allows that users to hash our their password when signing into the application
  - `sequelize` a promise-based ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
  - `passport` athentication and authorization services


## Technologies

 [Bootstrap](http://getbootstrap.com/) - Extensive list of components and  Bundled Javascript plugins.
 
 [Postman](https://www.postman.com/) - Simplify each step of building an API and streamline collaboration so you can create better APIs—faster.
 
 [Trello](https://trello.com/en-US) - Trello’s boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.
 
 [Lucid Chart](https://www.lucidchart.com/pages/) - Create powerful visuals to understand the teams, information and process.

 [MyWorkBench](https://www.mysql.com/products/workbench/) - Database that we used to run our SQLs to create tables and insert data. 

[VisualStudioCode](https://code.visualstudio.com/) - Text editor


## Team

[Christian Suchoski](https://github.com/Huski82) |[Kathleen Welch](https://github.com/ktywelch) |[Lea Wilhelmer](https://github.com/leawilhelmer) |[Victor Tran](https://github.com/Victortran415)

## License

MIT © [X-Force 4 Team](https://github.com/)

## Questions?

- Github: https://github.com/ktywelch/ClassMonsters-X-Force

- Email: ktywelch@gmail.com