Feature: Add items to Cart

@Demo @Cart @C-1
Scenario: Verify that user can add items to card

* Open website home page
* Verify that "<userNameValue>" element is displayed at home page
* Set "<userNameValue>" to userName input field
* Set value from "Password for all users" to password input field
* Click "login" button by selector "//*[@id='login-button']"
* Wait for "500" milliseconds
* Verify that "Products" element is present
* Add all available items to Cart
* Click "Cart" button by selector "//*[@id='shopping_cart_container']"
* Verify number of elements by selector ".cart_item" in the Cart equals "6"
* Click logout link at burgerMenu
* Verify that "Login" button is displayed by selector "#login-button"
Examples:

|userNameValue          |
|standard_user          |
|locked_out_user        |
|problem_user           |
|performance_glitch_user|
|error_user             |
|visual_user            |


@Demo @Cart @C-2
Scenario: Verify that user can delete items from card

* Open website home page
* Verify that "<userNameValue>" element is displayed at home page
* Set "<userNameValue>" to userName input field
* Set value from "Password for all users" to password input field
* Click "login" button by selector "//*[@id='login-button']"
* Wait for "500" milliseconds
* Verify that "Products" element is present
* Add all available items to Cart
* Click "Cart" button by selector "//*[@id='shopping_cart_container']"
* Verify number of elements by selector ".cart_item" in the Cart equals "6"
* Remove all items from Cart
* Verify number of elements by selector ".cart_item" in the Cart equals "0"
* Click logout link at burgerMenu
* Verify that "Login" button is displayed by selector "#login-button"


Examples:

|userNameValue          |
|standard_user          |
|locked_out_user        |
|problem_user           |
|performance_glitch_user|
|error_user             |
|visual_user            |

