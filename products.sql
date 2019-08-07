-- creating database
CREATE DATABASE bamazon;

USE bamazon;

-- create PRODUCTS table
CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price DECIMAL(7,2),
    stock_quantity INTEGER,
    PRIMARY KEY(item_id)
);

-- inserting values
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Blue Yeti USB Microphone - Blackout Edition", "Electronics" , 139.90, 50),
("Minecraft", "Apps & Games", 7.99, 57),
("FUJIFILM Instax SHARE Smartphone Printer SP-2 - Gold", "Electronics" , 123.99, 38),
("Mafia III - Deluxe Edition", "Software", 38.47, 24),
("Counter-Strike: Condition Zero", "Software", 106.45, 10),
("CUISINART SS-15C Coffee Maker, Silver", "Home & Kitchen", 229.97, 22),
("Bodum 1908-01 Java French Press Coffee Maker, 34 oz, Black", "Home & Kitchen", 19.98, 44),
("Breville BREBTM800XL Tea Maker", "Home & Kitchen", 269.98, 40),
("Champion Women's Fleece Jogger", "Clothing & Accessories", 22.01, 70),
("The Wedding by Nicholas Sparks (2005-08-01)", "Books", 40.97, 98);

SELECT * FROM products;
