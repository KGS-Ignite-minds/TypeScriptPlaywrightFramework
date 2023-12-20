import { Given, When, Then } from "@cucumber/cucumber"
import { page } from '../../hooks/hooks'
import LoginPage from '../../POM/loginPage'
import Common from '../../POM/common'
import * as TestLocators from '../../POM/TestLocators.json'

Given('I navigate to BidGPT Sign In page', async () => {
     const login = new LoginPage(page);
    await login.navigateToBidGPTSignIn()
})

Given('I enter {string} and {string} and Sign In to the BidGPT application', async (UserName:string, Password: string) => {
     const login = new LoginPage(page);
    await login.loginToBidGPT(UserName,Password)
})

Given('I launch BidGPT backend application', async () => {
     const login = new LoginPage(page);
    await login.verifyBackEndURL()
})


Given('I launch the application url', async () => {
    const login = new LoginPage(page);
    await login.launchApplicationUrl()
})

Then('I click on dropdown option', async () => {
    const common = new Common(page);
    await common.clickObject(TestLocators.HomePage.dropdown,'Dropdown')
  })

  
Then("I select a value {string} from the dropdown", async (str) =>{
    const common = new Common(page);
    common.selectDropdownByValue(TestLocators.HomePage.dropdownObject,str)

})



