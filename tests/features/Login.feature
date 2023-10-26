Feature: Login/Logout
@Demo @Login

Scenario: Verify that user can login and logout with all default wrap credentials

* Open website home page
* Verify that "<userNameValue>" element is displayed at home page
* Set "<userNameValue>" to userName input field
* Set value from "Password for all users" to password input field
* Click Login button with "<userNameValue>"
#* Click "login" button by selector "//*[@id='login-button']"
* Wait for "500" milliseconds
* Verify that "Products" element is present
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