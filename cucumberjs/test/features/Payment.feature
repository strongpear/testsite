Feature: To test functionality of the Payment page

    Scenario: Check if user can request money from other users
    Given user is on the Payment page
    When user enters username of the person they want to request money from and the amount 
    And user clicks on the Request button
    Then user is able to send money request to that person 

    Scenario: Check if user can send money to other users
    Given user is on the Payment page
    When user enters username of the person they want to send money to and the amount 
    And user clicks on the Pay button
    Then user is able to send money to that person