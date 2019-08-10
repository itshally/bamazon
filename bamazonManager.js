require('dotenv').config();
var mysql = require('mysql'),
    inquirer = require('inquirer'),
    Table = require('cli-table'),
    chalk = require('chalk');

var connection = mysql.createConnection({
    host: 'localhost',
    user : 'user',
    port : '3306',
    password : process.env.MYSQL_USER_PASSWORD,
    database : 'bamazon'
});


var lowInventory = [];

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
        
    })
}

ManagerFunctions();

function ViewProductsForSale(){
    //This view the products at first
    connection.query('SELECT * FROM products', function(error,data){
        console.log("\nWELCOME TO BAMAZON! HERE ARE THE PRODUCTS THAT ARE AVAILABLE FOR YOU\n");
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


function ViewLowInventory(){
    //This view the products at first
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
            //This view the products at first
            // var total_quantity = Number(result.quantity);
            console.log(Number(result.quantity))
            connection.query('SELECT stock_quantity FROM products WHERE product_name=?', [result.item_name], function(e, data){
                
                for(var x in data){
                    console.log(data[x].stock_quantity)
                    var total_quantity = (data[x].stock_quantity + Number(result.quantity));
                    
                }
                console.log(Number(total_quantity))
                // console.log(total_quantity)
                var q = connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [total_quantity, result.item_name], function(){
                    // console.log("\nWELCOME TO BAMAZON! HERE ARE THE PRODUCTS THAT ARE AVAILABLE FOR YOU\n");
                    // var divider = "\n-------------------------------------------\n";
                    // for(var x in data){
                    //     var view_products = divider + "\n\tProduct ID: " + data[x].item_id + 
                    //                         "\n\tDepartment: "+ data[x].department_name +
                    //                         "\n\tProduct: "+ data[x].product_name +
                    //                         "\n\tPrice: $"+ data[x].price +
                    //                         "\n\tStocks Left: "+data[x].stock_quantity;
                    //     console.log(view_products);
                        
                    // }
                    // connection.end();
                }); 
                console.log(q.sql)
                
                    ManagerFunctions();
            
                
            })
            
        })  
    })
    
}