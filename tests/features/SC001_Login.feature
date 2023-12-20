Feature: Login

  # @smoke
  # Scenario: 1.1 To verify BidGPT application sign in
  #   Given I launch BidGPT backend application
  #   Then I enter "aip-bidgpt-qa-serviceaccount@kpmgcloudops.onmicrosoft.com" and "BidGpt123456" and Sign In to the BidGPT application

  @smoke
   Scenario: 1.1 To select a value from dropdown
    Given I launch the application url
    Then I click on dropdown option
    Then I select a value '1' from the dropdown

