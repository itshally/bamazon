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
### Manager View


In your git bash console, type `node bamazonManager` to run the manager's POV.


- Once the app starts running, this is what the first view for the manager.


![img1](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-1.PNG)


- If the user chooses the **View Products For Sale**


![img2](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-2.PNG)


- If the user chooses the **View Low Inventory**


![img3](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-3.PNG)


- If the user chooses the **Add To Inventory**, a list of items will appear.


![img4](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-4.PNG)


  - Once the user chooses a specific item, the app will then prompt a question of 
  how much stock does the user want to add.
  
  
   ![img5](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-5.PNG)
  
  
  - Afterwards, the app will send a log stating that the item's stock quantity is updated.
  
  
  - It will show the previous amount and the current amount of stock.
  
  
   ![img6](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-6.PNG)
  
  
  - Here is a preview of the updated item that we used for this example
  
  
   ![img7](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-7.PNG)
  

- If the user chooses the **Add New Product**, the app will start prompting questions to get the information needed 
about the new product that will soon be added in the database.


- Once the user is done sending information, the app will notify the user that the new product has been added to the database.


![img8](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-8.PNG)


- Here is a preview of what we just added from the example:


![img9](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-9.PNG)


---

### Author: Hally
