Feature: Test Login functionality with Google account

  Scenario: Check if user can log in with Google account
    Given user is on the landing page
    When user clicks on the Sign in as button in the upper right corner
    And user clicks on the Google account they want to log in
    Then user is navigated to the user home page
