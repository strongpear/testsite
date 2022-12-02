Feature: Account Creation

  Scenario: Check if user can create a new account
    Given user is on the account creation page
    When user enters username, email address, and password
    And user clicks on the checkbox to accept all terms of services
    And user clicks on the Register button
    Then user is navigated to user home page

  Scenario: User does not want to create an account and want to go back to the landing page
    Given user is on the account creation page
    When user click on the Back to Homepage button
    Then user is navigated back to the landing page

  Scenario: Check if user is navigated to the account creation page from the landing page
    Given user is on the landing page
    When user clicks on the Register button
    Then user is navigated to the landing page
