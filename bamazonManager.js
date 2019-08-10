//installed required packages to run this application
require('dotenv').config();
var mysql = require('mysql'),
    inquirer = require('inquirer'),
    Table = require('cli-table'),
    chalk = require('chalk');

//creating mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user : 'user',
    port : '3306',
    password : process.env.MYSQL_USER_PASSWORD,
    database : 'bamazon'
});

//created a variable that will hold an array with low stock quantity
var lowInventory = [];

//Just a header ...
console.log(chalk.magenta("\t_ _ _ ____ _    ____ ____ _  _ ____    ___ ____    ___  ____ _  _ ____ ___  ____ _  _ "));
console.log(chalk.magenta("\t| | | |___ |    |    |  | |\\/| |___     |  |  |    |__] |__| |\\/| |__|   /  |  | |\\ | "));
console.log(chalk.magenta("\t|_|_| |___ |___ |___ |__| |  | |___     |  |__|    |__] |  | |  | |  |  /__ |__| | \\| "));
console.log(chalk.magenta("\t                                                                                      "));
console.log(chalk.green('\n\t You are logged in as Admin\n'));

//prompting an options for the manager once the app starts running from its POV
function ManagerFunctions(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Hi admin, choose what you want to do right now:',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit'
            ],
            name: 'manager_activity'
        }
    ]).then(function(result){

        //calling back a specific function is depending to what the user chooses from the prompt list
        switch(result.manager_activity){
            case 'View Products for Sale':
                ViewProductsForSale();
                break;
            case 'View Low Inventory':
                ViewLowInventory();
                break;
            case 'Add to Inventory':
                AddToInventory();
                break;
            case 'Add New Product':
                AddNewProduct();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}

ManagerFunctions();

//if the user chooses the 'View Products for Sale', it will show all of the items in the inventory
function ViewProductsForSale(){
    //created a query that grabs all of the data in the database
    connection.query('SELECT * FROM products', function(error,data){

        var table = new Table({
            head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stocks Left']
          , colWidths: [15, 25, 70, 15, 15]
        });

        for(var x in data){
            table.push(
                [data[x].item_id, data[x].department_name, data[x].product_name, data[x].price, data[x].stock_quantity]
            );
        }

        console.log(table.toString());

        //calling back the ManagerFunction() 
        ManagerFunctions();
    });   
}

//if the user chooses the 'View Low Inventory', it will show all the data with low stock quantity
function ViewLowInventory(){

    //creating a query that grabs all data from the database if its stock_quantity field's value is less than 5
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(error,data){

        var table = new Table({
            head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stocks Left']
          , colWidths: [15, 25, 70, 15, 15]
        });

        for(var x in data){
            table.push(
                [data[x].item_id, data[x].department_name, data[x].product_name, data[x].price, data[x].stock_quantity]
            );
        }

        console.log(table.toString());
        ManagerFunctions();
    });   
}

//if the user chooses the 'Add To Inventory'...
function AddToInventory(){
    connection.query('SELECT * FROM products', function(e, data){
        var lowInventory = [];
        for(var x in data){
            lowInventory.push(data[x].product_name);
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which item would you like to add more?',
                choices: lowInventory,
                name: 'item_name'
            }, 
            {
                type: 'input',
                message: 'Please type how much you want to add for this item.',
                name: 'quantity'
            }
        ]).then(function(result){

            //created a new query that gets the specific item based from the earlier prompt
            connection.query('SELECT product_name, stock_quantity FROM products WHERE product_name=?', [result.item_name], function(e, data){
                
                for(var x in data){

                    //In this case, we can get the current stock quantity of that item and then add to it the value from the prompt
                    var total_quantity = (data[x].stock_quantity + Number(result.quantity));
                    //
                    console.log('\n\tYou have successfully updated the stock quantity of the product: \n\t\t' + data[x].product_name + '\n');
                    console.log('\tThe stock quantity was: ' + data[x].stock_quantity);
                    console.log('\n\tNow the current stock quantity is: ' + total_quantity + '\n');
                }

                connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [Number(total_quantity), result.item_name], function(){}); 
                
                ManagerFunctions();
            });
        });  
    });
}

//if the user chooses the 'Add New Product'...
function AddNewProduct(){

    //it will prompt about the new product to display:
    //the new product name, in which department, the product price, and how many stocks are available
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the product\'s name?',
            name: 'product_name'
        },
        {
            type: 'input',
            message: 'In which department?',
            name: 'product_department'
        },
        {
            type: 'input',
            message: 'For what price do you want to sell it?',
            name: 'product_price'
        },
        {
            type: 'input',
            message: 'How many stocks are available right now?',
            name: 'product_quantity'
        }
    ]).then(function(data){
        
        console.log('\n\tNew product has been added to the inventory.\n');

        //a query that updates the databse for a new row to be added
        connection.query('INSERT INTO products SET ?', {product_name:data.product_name, 
            department_name: data.product_department, price: data.product_price, stock_quantity: data.product_quantity}, function(error, result){
            
        });
        
        ManagerFunctions();
    })
}