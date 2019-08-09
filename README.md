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

