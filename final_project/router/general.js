const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let promise1 = new Promise((resolve, reject)=>{
    if(books){
        resolve(res.send(JSON.stringify(books,null,4)))
    }else{
        reject("Books not found")
    }
  })
  
   promise1.then((successMessage) => {
    console.log("All books " + successMessage)
});
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let promise1 = new Promise((resolve, reject)=>{
    if(req.params.isbn){
        resolve(res.send(JSON.stringify(books[req.params.isbn],null,4)))
    }else{
        reject("Books not found")
    }
  })
  
   promise1.then((successMessage) => {
    console.log("Specific book " + successMessage)
});
//   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let promise1 = new Promise((resolve, reject)=>{
    if(req.params.author){
        let authorName = req.params.author
        let theBook = Object.values(books).filter(book => book.author === authorName);
        if(theBook){
            resolve(res.send(JSON.stringify(theBook,null,4)))
        }else{
            reject("Books not found")
        }
    }
  })
  
   promise1.then((successMessage) => {
    console.log("From Author " + successMessage)
});
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let promise1 = new Promise((resolve, reject)=>{
    if(req.params.title){
        let title = req.params.title
        let theBook = Object.values(books).filter(book => book.title === title);
        if(theBook){
            resolve(res.send(JSON.stringify(theBook,null,4)))
        }else{
            reject("Books not found")
        }
    }
  })
  
   promise1.then((successMessage) => {
    console.log("From Title " + successMessage)
});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send(books[req.params.isbn].reviews)
//   return res.status(300).json({message: "Yet to be implemented YUPI"});
});


module.exports.general = public_users;
