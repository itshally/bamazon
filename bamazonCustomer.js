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


console.log(chalk.magenta("\t_ _ _ ____ _    ____ ____ _  _ ____    ___ ____    ___  ____ _  _ ____ ___  ____ _  _ "));
console.log(chalk.magenta("\t| | | |___ |    |    |  | |\\/| |___     |  |  |    |__] |__| |\\/| |__|   /  |  | |\\ | "));
console.log(chalk.magenta("\t|_|_| |___ |___ |___ |__| |  | |___     |  |__|    |__] |  | |  | |  |  /__ |__| | \\| "));
console.log(chalk.magenta("\t                                                                                      "));
    
inquirer.prompt([
    {
        type: 'list',
        message: 'How would you like to view our products?',
        choices: ['View All', 'View By Department', 'Exit'],
        name: 'custom_view'
    }
]).then(function(view_option){
    switch(view_option.custom_view){
        case 'View All':
            ViewAll();
            break;
        case 'View By Department':
            ViewByDepartment();
            break;
        case 'Exit':
            connection.end();
            break;
    }
});


//This view the products at first
function ViewAll(){
    connection.query('SELECT * FROM products', function(error,data){
        // console.log("\nWELCOME TO BAMAZON! HERE ARE THE PRODUCTS THAT ARE AVAILABLE FOR YOU\n");
        
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
        // Order();

        var items = [];
        for(var i in data){
            items.push(data[i].product_name)
        }
        inquirer.prompt([
            {
                type: 'list',
                message: chalk.green('Please choose your item.'),
                choices: items,
                name: 'product_name'
            },
            {
                type: 'input',
                message: chalk.green('How many products would you like to take?'),
                name: 'product_quantity'
            }
        ]).then(function(result){
            var q = connection.query('SELECT * FROM products WHERE product_name=?', [result.product_name], function(error, data){
                
                for(var x in data){
                    if(data[x].stock_quantity > 0){
                        console.log('there are still more stock');
                        var update_stock_quantity = (data[x].stock_quantity - Number(result.product_quantity));
                        var q = connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [Number(update_stock_quantity), result.product_name], function(){
                            console.log('Data is successfully updated!');
                            // connection.end();
                        ConfirmCheckout();
    
                        })
                        console.log(q.sql)
                        console.log("SQ: " + data[x].stock_quantity + "\nGet: " + result.product_quantity + "\nLeft: " + (data[x].stock_quantity - result.product_quantity))
                        shoppingCart.push(data[x]);
                        itemQuantity.push(result.product_quantity)
                    }else{
                        console.log('Insufficient quantity!');
                    }
                }
                })

                console.log(q.sql)
            });
        


    });  
} 

function ViewByDepartment(){
    var departments = [];
    // var shoppingCart = []
    connection.query('SELECT DISTINCT department_name FROM products', function(e, result){
        for(var x in result){
            departments.push(result[x].department_name)
        }
        
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which department would you like to view?',
                choices: departments,
                name: 'department'
            }
        ]).then(function(department_name){
            connection.query('SELECT * FROM products WHERE ?', {department_name: department_name.department}, function(e, data){
                var table = new Table({
                    head: ['Product ID', 'Product Name', 'Price', 'Stocks Left']
                  , colWidths: [15, 70, 15, 15]
                });
                for(var x in data){
                    table.push(
                        [data[x].item_id, data[x].product_name, data[x].price, data[x].stock_quantity]
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
                    var q = connection.query('SELECT * FROM products WHERE ?', {product_name: data.item_name}, function(error, result){
                
                        for(var x in result){
                            if(result[x].stock_quantity > 0){
                                var update_stock_quantity = (result[x].stock_quantity - Number(data.product_quantity));
                                var q = connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [update_stock_quantity, data.item_name], function(){
                                    console.log('Data is successfully updated!');
                                    
                        // connection.end();

                        inquirer.prompt([
                            {
                                type: 'confirm',
                                message: 'Ready to checkout?',
                                name: 'confirm',
                                default: false
                            }
                        ]).then(function(data){
                            if(data.confirm == false){
                                ViewByDepartment();
                            }else{
                                //printing receipt
                                var product = 0;
                                    console.log(chalk.magenta("\t___ _  _ ____ _  _ _  _    _   _ ____ _  _    ____ ____ ____    ____ _  _ ____ ___  ___  _ _  _ ____ "));
                                    console.log(chalk.magenta("\t |  |__| |__| |\\ | |_/      \\_/  |  | |  |    |___ |  | |__/    [__  |__| |  | |__] |__] | |\\ | | __ "));
                                    console.log(chalk.magenta("\t |  |  | |  | | \\| | \\_      |   |__| |__|    |    |__| |  \\    ___] |  | |__| |    |    | | \\| |__] "));
                                    console.log(chalk.magenta("\t                                                                                                     \n"));
                    
                                    console.log('Here is your purchase history:\n\n')
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
                                    // product
                                // console.log("Total: " + product)
                                var table = new Table();
 
                                table.push(
                                    { 'Total': product.toFixed(2) }
                                );
                                
                                console.log(table.toString());
                                connection.end();
                            }
                        });

                                })
                                console.log(q.sql)
                                console.log("SQ: " + result[x].stock_quantity + "\nGet: " + Number(data.product_quantity) + "\nLeft: " + (result[x].stock_quantity - data.product_quantity))
                                shoppingCart.push(result[x]);
                                itemQuantity.push(data.product_quantity);
                            }else{
                                console.log('Insufficient quantity!');
                            }
                        }
                        
                    });
                    console.log(q.sql)
                    
                })
            })
        });
    });
}
    

//prompting two messages
function Order(){
    
    
}

function ConfirmCheckout(){
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Ready to checkout?',
            name: 'confirm',
            default: false
        }
    ]).then(function(data){
        if(data.confirm == false){
            ViewAll();
        }else{
            //printing receipt
            var product = 0;
                // console.log('Thank you for Shopping! \n Here is your receipt! \n');
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

                    // console.log();

                    product += (shoppingCart[i].price * itemQuantity[i]);
                }
                // product
                var table = new Table();
 
                    table.push(
                        { 'Total': product.toFixed(2) }
                    );
                    
                    console.log(table.toString());
            // console.log("Total: " + product.toFixed(2))
            connection.end();
        }
    });
}