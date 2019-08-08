require('dotenv').config();
var mysql = require('mysql'),
    inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user : 'user',
    port : '3306',
    password : process.env.MYSQL_USER_PASSWORD,
    database : 'bamazon'
});

var shoppingCart = [],
itemQuantity = [];

//This view the products at first
connection.query('SELECT * FROM products', function(error,data){
    console.log("\nWELCOME TO BAMAZON! HERE ARE THE PRODUCTS THAT ARE AVAILABLE FOR YOU\n");
    var divider = "\n-------------------------------------------\n";
    for(var x in data){
        var view_products = divider + "\n\tProduct ID: " + data[x].item_id + 
                            "\n\tDepartment: "+ data[x].department_name +
                            "\n\tProduct: "+ data[x].product_name +
                            "\n\tPrice: $"+ data[x].price +
                            "\n\tStocks Left: "+data[x].stock_quantity;
        console.log(view_products);
        
    }
    console.log(divider)
    Order();
});   
    

//prompting two messages
function Order(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please type the product id you want to buy.',
            name: 'product_id'
        },
        {
            type: 'input',
            message: 'How many products would you like to take?',
            name: 'product_quantity'
        }
    ]).then(function(result){
        connection.query('SELECT * FROM products WHERE item_id=?', [Number(result.product_id)], function(error, data){
            
            for(var x in data){
                if(data[x].stock_quantity > 0){
                    console.log('there are still more stock');
                    var update_stock_quantity = (data[x].stock_quantity - result.product_quantity);
                    var q = connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [Number(update_stock_quantity), Number(result.product_id)], function(){
                        console.log('Data is successfully updated!');
                        // connection.end();
                    })
                    console.log(q.sql)
                    console.log("SQ: " + data[x].stock_quantity + "\nGet: " + result.product_quantity + "\nLeft: " + (data[x].stock_quantity - result.product_quantity))
                    shoppingCart.push(data[x]);
                    itemQuantity.push(result.product_quantity)
                    
                }else{
                    console.log('Insufficient quantity!');
                }
            }
            ConfirmCheckout();
        })
    });
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
            Order();
        }else{
            //printing receipt
            var product = 0;
                console.log('Thank you for Shopping! \n Here is your receipt! \n');
                console.log('-------------------------------------------')
                for(var i in shoppingCart){
                    console.log("Item: " + shoppingCart[i].product_name + "\nPrice: " + shoppingCart[i].price +
                    "\nQuantity: " + itemQuantity[i] + "\n");

                    product += (shoppingCart[i].price * itemQuantity[i]);
                }
                // product
            console.log("Total: " + product)
            connection.end();
        }
    });
}