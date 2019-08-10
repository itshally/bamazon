# bamazon
This assignment creates an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, the app should track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

### In order to run this, please install these required packages

- [dotenv](https://www.npmjs.com/package/dotenv)
  - For this file, create a `.env` file where the password of your mysql is located;
  
  
    `MYSQL_USER_PASSWORD=[insert your database password here]`
    
    
    Afterwards, type `require('dotenv').config();` in your `js` file.
    
    
    Through this, you can access your mysql password from your `.env` while creating a connection in your `js` file. 
    
    
    In this case, `password : process.env.MYSQL_USER_PASSWORD` when configuring your connection of your mysql.
- [mysql](https://www.npmjs.com/package/mysql)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [cli-table](https://www.npmjs.com/package/cli-table)
- [chalk](https://www.npmjs.com/package/chalk)

- I used **git bash** as my console


- Lastly, clone this repository. Here's a '[Cloning a repository](https://help.github.com/en/articles/cloning-a-repository)' guide
if you encountered problems for this part of requirement.
---
### Customer View

In your git bash console, type `node bamazonCustomer` to run the app for the customer POV.


- This is the first view when the file bamazonCustomer.js runs


![img1](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-1.PNG)


- If the user chooses the **View All**, this is going to be the view


![img2](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-2.PNG)


- Else, if the user chooses the **View By Department** then another list of choices will appear.


![img3](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-3.PNG)


- Then, after choosing one of the departments, it will then show the list of items under that department.


![img4](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-4.PNG)


- Afterwards, it will then prompt of how many of it would like to take.


![img5](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-5.PNG)


- Once the quantity has been entered, it will prompt another question if the user is ready to checkout.


- If the user typed 'No' or returned ***false***, it will return to the list of departments


![img6](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-6.PNG)


- Otherwise, it will show the purchase history and the total amount of the items 


![img7](https://github.com/itshally/bamazon/blob/master/screenshots/customer/img-7.PNG)


---

### Author: Hally
