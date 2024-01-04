import { Given, When, Then } from "@cucumber/cucumber"
import { page } from '../../hooks/hooks'
import LoginPage from '../../POM/loginPage'
import Common from '../../POM/common'

Given('I Navigate to the AUT', async () => {
     const login = new LoginPage(page);
    await login.launchApplicationUrl()
})

Then('I click on dropdown option', async () => {
    
  })

  
Then("I select a value {string} from the dropdown", async (str) =>{
    
    

})



