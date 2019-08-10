//installed required packages to run this application
require('dotenv').config();
var mysql = require('mysql'),
    inquirer = require('inquirer'),
    Table = require('cli-table'),
    chalk = require('chalk');

//creating mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user : 'user', //your mysql username 
    port : '3306',
    password : process.env.MYSQL_USER_PASSWORD, //your mysql password
    database : 'bamazon' //database name
});

//declared variable names that will be holding an array of values later for this application
var shoppingCart = [], //will be using to collect the items 
    itemQuantity = []; //will be using to hold the values of each item's quantity

//Just a header ...
console.log(chalk.magenta("\t_ _ _ ____ _    ____ ____ _  _ ____    ___ ____    ___  ____ _  _ ____ ___  ____ _  _ "));
console.log(chalk.magenta("\t| | | |___ |    |    |  | |\\/| |___     |  |  |    |__] |__| |\\/| |__|   /  |  | |\\ | "));
console.log(chalk.magenta("\t|_|_| |___ |___ |___ |__| |  | |___     |  |__|    |__] |  | |  | |  |  /__ |__| | \\| "));
console.log(chalk.magenta("\t                                                                                      "));

//prompting an option for the customer of how they would like to view the products
function Start(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'How would you like to view our products?',
            choices: ['View All', 'View By Department', 'Exit'],
            name: 'custom_view'
        }
    ]).then(function(view_option){
    
        //as for the result, the function then will follow
        switch(view_option.custom_view){
            case 'View All':
                ViewAll();
                break;
            case 'View By Department':
                ViewByDepartment();
                break;
            case 'Exit':
                //if the customer chooses the 'Exit', the connection will end and so is the app
                connection.end();
                break;
        }
    });    
}

Start();

//a function to View All of the products
function ViewAll(){

    //grabbing all the product items from the database with the help of the mysql query
    connection.query('SELECT * FROM products', function(error, data){
        
        //creating the table for the items
        //as for this section, installing the npm 'cli-table' package is required
        var table = new Table({
            //state the table headers
            head: ['Product ID', 'Department', 'Product Name', 'Price'],  
            //giving each column a width size
            colWidths: [15, 25, 70, 15]
        });

        //calling the second parameter, 'data', from the function inside the query in line 57
        for(var x in data){

            //pushing data to the table row that was created in line 61
            table.push(
                //in each row, there will be the id, department, product name, price
                [data[x].item_id, data[x].department_name, data[x].product_name, data[x].price]
            );
        }

        //viewing the table in the console
        console.log(table.toString());

        //declared a variable to hold items that will be appearing in the prompt
        var items = [];

        //while the query is still not ended, getting the some data is still possible
        //in this case, grabbing only the product name to appear in the prompt
        for(var i in data){

            //pushing the product name to the array in line 82
            items.push(data[i].product_name);
        }

        //a prompt will appear after the user chooses the 'View All' in line 32
        inquirer.prompt([
            {
                type: 'list',
                message: chalk.green('Please choose your item.'),
                //as you can see, the type of prompt is 'list' but there are no array in the choices.
                //This is because the array is already created from line 82 - 90.
                //The variable 'items' has the choices
                choices: items, 
                name: 'product_name'
            },
            {
                type: 'input',
                //once the user chooses an item from the list, 
                //another prompt message will be asking the user 
                message: chalk.green('How many products would you like to take?'),
                name: 'product_quantity'
            }
        ]).then(function(result){

            if(result.items == 'Return to Main Menu'){
                Start();
            }else{
                //once the prompt messages are done,
                //a new mysql query is created, but this time it is filtered by the product_name 
                connection.query('SELECT * FROM products WHERE product_name=?', [result.product_name], function(error, data){
                    
                    //a loop is created for the parameter 'data' regarding to the query in Line 114
                    for(var x in data){

                        //inside this loop is the conditional statement,
                        //but we're grabbing the 'stock_quantity' field from our database
                        //so if the chosen item's stock quantity is greater than 0,
                        //purchasing the item will still continue on.
                        if(data[x].stock_quantity > 0){

                            //Then, declaring an 'update_stock_quantity' variable which holds a mathematical equation;
                            //this variable is used to update the stock_quantity of our database.
                            //In this case, the current stock quantity will reduce with the
                            //user's desired amount of product quantity of the item.
                            var update_stock_quantity = (data[x].stock_quantity - Number(result.product_quantity));

                            //Afterwards, a new query is created for updating the database
                            //In this case, only a specific field of stock_quantity is updated 
                            //because we filtered it with value of our 'product_name' field
                            connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [Number(update_stock_quantity), result.product_name], function(){
                                
                                //this function is used to prompt the user if they are ready to checkout after they selected an item, 
                                //otherwise, they can still continue on shopping...
                                ConfirmCheckout();
        
                            });
                            
                            //the item's data will be pushed to the shoppingCart array
                            shoppingCart.push(data[x]);
                            //the item's quantity that was prompted will be pushed to the itemQuantity array at the same time
                            itemQuantity.push(result.product_quantity);
                        }
                        
                        //if the chosen item's stock quantity is less than 0,
                        //purchasing the item is not possible
                        else{

                            //a notification of 'Insufficient quantity!' will be logged
                            console.log('Insufficient quantity!');
                        }
                    }
                });
            }
        });
    });  
} 

//a function to View By Department
function ViewByDepartment(){

    //declaring a variable that holds all the department names 
    var departments = [];

    //For this created query, using a DISTINCT keyword will prevent from returnign a duplicated value
    connection.query('SELECT DISTINCT department_name FROM products', function(e, result){

        //as for the result, we will be looping through the department_name in our database
        for(var x in result){

            //each will then pushed to the 'departments' variable
            departments.push(result[x].department_name);
        }
        
        //pushing a value to the department,
        //this value is an additional option for the user to return to the main menu
        //BUT this will not reset the shoppingCart
        departments.push('Return to Main Menu');

        //a prompt will be appearing asking the user which department 
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which department would you like to view?',
                //like from earlier, the array values for this 'choices' key were created from Line 173 - 177
                choices: departments, 
                name: 'department'
            }
        ]).then(function(department_name){

            if(department_name.department == 'Return to Main Menu'){
                Start();
            }else{
                //then, a new query has been created but is filtered with 'department_name'
                connection.query('SELECT * FROM products WHERE ?', {department_name: department_name.department}, function(e, data){

                    //all items of the chosen department will then be viewed in a table
                    var table = new Table({
                        head: ['Product ID', 'Product Name', 'Price'],
                        colWidths: [15, 70, 15]
                    });


                    for(var x in data){
                        table.push(
                            [data[x].item_id, data[x].product_name, data[x].price]
                        );
                    }

                    console.log(table.toString());
                    
                    var items = [];

                    for(var x in data){
                        items.push(data[x].product_name);
                    }
            
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: chalk.green('Please choose your item.'),
                            choices: items,
                            name: 'item_name'
                        },
                        {
                            type: 'input',
                            message: chalk.green('How many products would you like to take?'),
                            name: 'product_quantity'
                        }
                    ]).then(function(data){
                        
                        connection.query('SELECT * FROM products WHERE ?', {product_name: data.item_name}, function(error, result){
                    
                            for(var x in result){
                                if(result[x].stock_quantity > 0){
                                    var update_stock_quantity = (result[x].stock_quantity - Number(data.product_quantity));
                                    connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [update_stock_quantity, data.item_name], function(){
                                
                                        inquirer.prompt([
                                            {
                                                type: 'confirm',
                                                message: 'Ready to checkout?',
                                                name: 'confirm',
                                                default: false
                                            }
                                        ]).then(function(data){

                                            //if the user chooses 'no' or returned false, 
                                            if(data.confirm == false){

                                                //the ViewByDepartment() function will then restart again 
                                                //However, in this case, the shoppingCart is not returned empty
                                                ViewByDepartment();

                                            }
                                            //if the user then chooses 'yes' or returned true,
                                            else{
                                                
                                                //a purchase of history will appear
                                                //declared varible with a value of 0
                                                var product = 0;

                                                //just a header
                                                console.log(chalk.magenta("\t___ _  _ ____ _  _ _  _    _   _ ____ _  _    ____ ____ ____    ____ _  _ ____ ___  ___  _ _  _ ____ "));
                                                console.log(chalk.magenta("\t |  |__| |__| |\\ | |_/      \\_/  |  | |  |    |___ |  | |__/    [__  |__| |  | |__] |__] | |\\ | | __ "));
                                                console.log(chalk.magenta("\t |  |  | |  | | \\| | \\_      |   |__| |__|    |    |__| |  \\    ___] |  | |__| |    |    | | \\| |__] "));
                                                console.log(chalk.magenta("\t                                                                                                     \n"));
                                
                                                console.log('Here is your purchase history:\n\n');

                                                //looping through the shoppingCart array
                                                for(var i in shoppingCart){

                                                    //viewing the purchase history in a table format
                                                    var table = new Table();
                                
                                                    table.push(
                                                        { 'Item Name': shoppingCart[i].product_name },
                                                        { 'Price': shoppingCart[i].price },
                                                        {'Quantity': itemQuantity[i]}
                                                    );
                                                    
                                                    console.log(table.toString());
                                                    
                                                    //getting each product's price and then multiply to its itemQuantity
                                                    product += (shoppingCart[i].price * itemQuantity[i]);
                                                }

                                                var table = new Table();
                
                                                table.push(
                                                    { 'Total': product.toFixed(2) }
                                                );
                                                
                                                console.log(table.toString());

                                                connection.end();
                                            }
                                        });

                                    });
                                    shoppingCart.push(result[x]);
                                    itemQuantity.push(data.product_quantity);
                                }
                                //back from line 231's conditional statement, if the stock_quantity is less than 0
                                //it will log a phrase 'Insufficient quantity!'
                                else{
                                    console.log('Insufficient quantity!');
                                }
                            }
                        });
                    });
                })
            }
        });
    });
}
    
//this function is used for the ViewAll() function
function ConfirmCheckout(){

    //prompting the user if they are ready to checkout or not
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Ready to checkout?',
            name: 'confirm',
            default: false
        }
    ]).then(function(data){

        //if the user chooses 'no' or returned false,
        //calling back the ViewAll() function
        if(data.confirm == false){
            ViewAll();
        }
        //otherwise, the computation for the purchase history and the total amount will be processed.
        else{
            var product = 0;
            console.log(chalk.magenta("\t___ _  _ ____ _  _ _  _    _   _ ____ _  _    ____ ____ ____    ____ _  _ ____ ___  ___  _ _  _ ____ "));
            console.log(chalk.magenta("\t |  |__| |__| |\\ | |_/      \\_/  |  | |  |    |___ |  | |__/    [__  |__| |  | |__] |__] | |\\ | | __ "));
            console.log(chalk.magenta("\t |  |  | |  | | \\| | \\_      |   |__| |__|    |    |__| |  \\    ___] |  | |__| |    |    | | \\| |__] "));
            console.log(chalk.magenta("\t                                                                                                     \n"));

            console.log('Here is your purchase history:\n\n');
            for(var i in shoppingCart){

                var table = new Table();

                table.push(
                    { 'Item Name': shoppingCart[i].product_name },
                    { 'Price': shoppingCart[i].price },
                    {'Quantity': itemQuantity[i]}
                );
                
                console.log(table.toString());

                product += (shoppingCart[i].price * itemQuantity[i]);
            }
            var table = new Table();

            table.push(
                { 'Total': product.toFixed(2) }
            );
            
            console.log(table.toString());
            connection.end();
        }
    });
}