const path = require('path')
const dbPath = path.resolve('./db', 'app.db')
const sqlite3 = require('sqlite3').verbose();
let UserModel = {};
let db;

UserModel.Open = function(){
  console.log(dbPath);  
  db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the app database.');
  });
}

UserModel.CreateTable = function(){
        db.run("DROP TABLE IF EXISTS Users");
        db.run("CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY AUTOINCREMENT, UserName NCHAR(55), UserPasswd NCHAR(55),  UserRole NCHAR(55))");
        console.log("La tabla usuarios ha sido correctamente creada");
}; 


UserModel.Close = function() {
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
};

UserModel.Find = function (userId, callback){
    let sql = `SELECT UserName, UserId, UserPasswd, UserRole
               FROM Users
               WHERE UserId  = ?`;
    db.get(sql,[userId], (err, row) =>{
       if(err) {
          console.error(err.message); 
          callback(err.message,null); 
       } else {
        if (row) {
            callback(null,row);  
        } else {
            callback(`Usuario con id ${userId} no encontrado`,null);  
        }
       } 
    });    
};


UserModel.Get = function (userName,callback){
    let sql = `SELECT UserName, UserId, UserPasswd, UserRole
               FROM Users
               WHERE UserName  = ?`;
    db.get(sql,[userName], (err, row) =>{
        if(err) {
            console.error(err.message); 
            callback(err.message,null); 
         } else {
          if (row) {
              callback(null,row);  
          } else {
              callback(`Usuario ${userName} no encontrado`,null);  
          }
         } 
    });
    
};

UserModel.All = function (callback){
    let sql = `SELECT UserName, UserId, UserPasswd, UserRole 
               FROM Users`;

    db.get(sql,[userId], (err, row) =>{
        if(err) {
            console.error(err.message); 
            callback(err.message,null); 
         } else {
          if (row) {
              callback(null,row);  
          } else {
              callback('No se encuentran registros',null);  
          }
         } 
    }); 
};

UserModel.Add =function(userData, callback)
{
	let response = {}; //respuesta para devolver 
    let stmt = db.prepare("SELECT * FROM Users WHERE UserName = ?");
    
    stmt.bind(userData.username);
    stmt.get(function(error, rows) 
    {
    	//console.log(JSON.stringify(error)); return;
        if(error) 
        {
            throw err;
        } 
        else 
        {
            if(rows) 
            {
                callback({msg:`El usuario ${userData.username} ya existe`});
            }
            else
            {
            	stmt = db.prepare("INSERT INTO Users VALUES (?,?,?,?)");
                stmt.bind(null,userData.username,userData.password,userData.userrole);
                stmt.run(function(err, result) 
             {
                 if(err) 
                 {
                     throw err;
                 } 
                 else 
                 {
                     callback({msg:`Usuario ${userData.username} añadido`});
                 }
             });
         }
     }
 });
};

module.exports = UserModel;

