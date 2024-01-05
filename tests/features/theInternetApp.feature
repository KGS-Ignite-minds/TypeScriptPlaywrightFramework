Feature: Exercise different page controls

  @Test 
  Scenario: Test to exercise checkboxes
    Given I navigate to the AUT
    When I click on "Checkboxes" link
    And I click on the "" checkbox
    Then checkbox must be selected
