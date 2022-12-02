Feature: To test functionality of the Payment page

    Scenario: Check if user can send money to other users
    Given user is on the Payment page
    When user enters username of the person they want to send money to, the amount, and the message
    And user clicks on the Pay button
    Then user is able to send money to that person