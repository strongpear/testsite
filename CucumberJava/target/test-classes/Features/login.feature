Feature: Test Login functionality

  Scenario: Check if user is navigated to the Login page
    Given user is on the landing page
    When user clicks on the Log In button
    Then user is navigated to the Login page

  Scenario: Check if login is successful with valid credentials
    Given user is on the login page
    When user enters username and password
    And user clicks on the Login button
    Then user is navigated to the user home page

  Scenario: Check if the Forget password button works
    Given user is on the login page
    When user clicks on the Forget password button
    Then user is navigated to the Reset password page

  Scenario: Check if user is able to reset password
    Given user is on the Reset password page
    When user enters email address
    And user clicks on the Send password reset email button
    Then user is navigated to the Login page

  Scenario: Check if user can navigate back to the landing page
    Given user is on the Login page
    When user clicks on the Back to Homepage button
    Then user is navigated back to the landing page

  Scenario: Check if user can navigate to the account creation page
    Given user is on the Login page
    When user clicks on the Create an account button
    Then user is navigated to the Account creation page

  Scenario: Check if user can log out from their home page
    Given user is on their home page
    When user clicks on the Log Out button
    Then user is navigated back to the landing page
