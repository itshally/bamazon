# Bamazon

This assignment creates an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, the app should track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

**Project Requirements:**
- #### Customer View:
	
	:white_check_mark: Create a MySQL Database called `bamazon`.
	
	:white_check_mark: Then create a Table inside of that database called `products`.
	
	:white_check_mark: The products table should have each of the following columns:
	
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: item_id (unique id for each product)
	
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: product_name (Name of product)

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: department_name

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: price (cost to customer)

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: stock_quantity (how much of the product is available in stores)
			
	:white_check_mark: Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

	:white_check_mark: Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

	:white_check_mark: The app should then prompt users with two messages.

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: The first should ask them the ID of the product they would like to buy.

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: The second message should ask how many units of the product they would like to buy.

	:white_check_mark: Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

	:white_check_mark: However, if your store does have enough of the product, you should fulfill the customer's order
	- This means updating the SQL database to reflect the remaining quantity.
	- Once the update goes through, show the customer the total cost of their purchase.

- #### Manager View:

	:white_check_mark: Create a new Node application called bamazonManager.js. Running this application will:

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: List a set of menu options:

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: View Products for Sale

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: View Low Inventory

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: Add to Inventory

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: Add New Product

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :heavy_check_mark: If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

## :open_file_folder: Files
```
bamazon
├─ .git
│ ├─ config
│ ├─ description
│ ├─ FETCH_HEAD
│ ├─ HEAD
│ ├─ hooks
│ │ ├─ applypatch-msg.sample
│ │ ├─ commit-msg.sample
│ │ ├─ fsmonitor-watchman.sample
│ │ ├─ post-update.sample
│ │ ├─ pre-applypatch.sample
│ │ ├─ pre-commit.sample
│ │ ├─ pre-push.sample
│ │ ├─ pre-rebase.sample
│ │ ├─ pre-receive.sample
│ │ ├─ prepare-commit-msg.sample
│ │ └─ update.sample
│ ├─ index
│ ├─ info
│ │ └─ exclude
│ ├─ logs
│ │ ├─ HEAD
│ │ └─ refs
│ │ ├─ heads
│ │ │ └─ master
│ │ └─ remotes
│ │ └─ origin
│ │ └─ HEAD
│ ├─ objects
│ │ ├─ info
│ │ └─ pack
│ │ ├─ pack-0315b647a39719b4b7940d236d2e367e62ff52f8.idx
│ │ └─ pack-0315b647a39719b4b7940d236d2e367e62ff52f8.pack
│ ├─ packed-refs
│ └─ refs
│ ├─ heads
│ │ └─ master
│ ├─ remotes
│ │ └─ origin
│ │ └─ HEAD
│ └─ tags
├─ .gitignore
├─ bamazonCustomer.js
├─ bamazonManager.js
├─ package-lock.json
├─ package.json
├─ products.sql
├─ README.md
└─ screenshots
├─ customer
│ ├─ img-1.PNG
│ ├─ img-2.PNG
│ ├─ img-3.PNG
│ ├─ img-4.PNG
│ ├─ img-5.PNG
│ ├─ img-6.PNG
│ └─ img-7.PNG
└─ manager
├─ img-1.PNG
├─ img-2.PNG
├─ img-3.PNG
├─ img-4.PNG
├─ img-5.PNG
├─ img-6.PNG
├─ img-7.PNG
├─ img-8.PNG
└─ img-9.PNG
```

## Technologies
- JavaScript
  - chalk
  - cli-table
  - dotenv
  - inquirer
  - mysql
  - table
  - Nodejs
- MySQL & MySQL Workbench

## Install
To clone this project to your device, type the `code` below to your git bash:
```bash
git clone https://github.com/itshally/bamazon.git
```

Then, type the code to run the project:
```bash
cd bamazon
npm install
```

You must add a `.env` file and type in the following:
```
MYSQL_USER_PASSWORD=[insert your workbench password here]
```
**:pencil: Note:**
- In your MySQL Workbench, open the **products.sql** file and execute all of the statements.
- Make sure that in your **Users and Privileges** *(you can find it under that **Management** of your left sidebar)*, the user account that you are using for this app **has an access rights to the schema**. Mine is `user` as my user account for my MySQL.
- Afterwards, try to modify the lines 8-15 if there are some changes needed:
	```javascript
	//creating mysql connection
	var  connection  =  mysql.createConnection({
		host:  'localhost',
		user :  'user',  //your mysql username
		port :  '3306',
		password : process.env.MYSQL_USER_PASSWORD,  //your mysql password
		database :  'bamazon'  //database name
	});
	```

## Screenshots
- ### Customer View
	- In your git bash console, type `node bamazonCustomer` to run the app for the customer POV.

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

- ### Manager View
	- In your git bash console, type `node bamazonManager` to run the manager's POV.

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

	- If the user chooses the **Add New Product**, the app will start prompting questions to get the information needed about the new product that will soon be added in the database.

	- Once the user is done sending information, the app will notify the user that the new product has been added to the database.
	![img8](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-8.PNG)

	- Here is a preview of what we just added from the example:
	![img9](https://github.com/itshally/bamazon/blob/master/screenshots/manager/img-9.PNG)

## Author

[@itshally](https://github.com/itshally)  
