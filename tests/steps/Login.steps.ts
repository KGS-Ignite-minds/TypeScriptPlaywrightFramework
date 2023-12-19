import { Given, When, Then } from "@cucumber/cucumber"
import { page } from '../../hooks/hooks'
import LoginPage from '../../POM/loginPage'


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

