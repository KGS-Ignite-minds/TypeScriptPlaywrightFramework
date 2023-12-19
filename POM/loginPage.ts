import { expect, type Locator, type Page } from '@playwright/test';
import { page } from '../hooks/hooks'
import * as TestLocators from '../POM/TestLocators.json'
import CommonPage from '../POM/common'
import * as TestData from '../TestData/TestData.json'

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async navigateToBidGPTSignIn() {
        let common = new CommonPage(this.page);
        await common.launchApplication()
        
        await common.clickObject(TestLocators.Login.IAgree, "I agree")
        await common.clickObject(TestLocators.Login.Continue, "Continue")
        await common.waitForElement(TestLocators.Login.SignInWithMicrosoft)
    }

    async loginToBidGPT(UserName: string, Password: string) {
        let common = new CommonPage(this.page);
        await common.launchApplication()
        
        await common.validateVisibleText("Reminder Text",TestData.TestCaseData.TC001_Login.ReminderText1)
        await common.validateVisibleText("Reminder Text",TestData.TestCaseData.TC001_Login.ReminderText2)
        await common.clickObject(TestLocators.Login.KPMGTermsOfService,"KPMGs terms of service.")
        await common.clickObject(TestLocators.Login.Close,"Close")
        await common.clickObject(TestLocators.Login.KPMGTermsOfService,"KPMGs terms of service.")
        await common.clickObject(TestLocators.Login.CloseIcon,"Close")
        await common.clickObject(TestLocators.Login.IAgree, "I agree")
        await common.clickObject(TestLocators.Login.Continue, "Continue")
        await common.clickObject(TestLocators.Login.SignInWithMicrosoft, "Sign in with microsoft")
        await common.enterText(TestLocators.Login.UserName,"User Name", UserName)
        await common.clickObject(TestLocators.Login.Next, "Next")
        await common.enterText(TestLocators.Login.Password,"User Name", Password)
        await common.clickObject(TestLocators.Login.SignIn, "Sign in")
        await common.clickObject(TestLocators.Login.NextOnMoreInfoRequired, "Next on More Information Required screen")
        await common.clickObject(TestLocators.Login.SkipSetUp, "Skip setup")
        await common.clickObject(TestLocators.Login.Yes, "Yes on Stay signed in? screen screen")
        await common.waitForElement(TestLocators.Login.NewQuestion)
    }

    async validateKPMGTermsOfService(UserName: string, Password: string) {
        let common = new CommonPage(this.page);
        await common.validateVisibleText("KPMG Terms Of Service",TestData.TestCaseData.TC001_Login.ReminderText1)

    }

    async verifyBackEndURL() {
        let common = new CommonPage(this.page);
        await common.launchBackEndApplication()

        await common.validateElementVisible(TestLocators.Login.BackEndMessage,"BackEndMessage")
    }


}