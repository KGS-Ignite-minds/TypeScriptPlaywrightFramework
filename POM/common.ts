import { expect, selectors, type Locator, type Page } from '@playwright/test';
import * as TestData from '../TestData/TestData.json'
import * as TestLocators from '../POM/TestLocators.json'

export default class util {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async launchApplication() {
        try {
            let url = ""
            if (TestData.CommonData.ENV == "LOCAL") {
                url = TestData.CommonData.URL.LOCAL
            } else if (TestData.CommonData.ENV == "DEV") {
                url = TestData.CommonData.URL.DEV
            } else if (TestData.CommonData.ENV == "TEST") {
                url = TestData.CommonData.URL.TEST
            }
            console.log(url)
            await this.page?.goto(url, { timeout: 60000 });
            this.waitForElement(TestLocators.Login.KPMGTermsOfService)
            await this.page?.waitForTimeout(1000)
        } catch (error) {
            throw new Error(`Launch Application failed with an error: ${error});`);
        }
    }

    async launchBackEndApplication() {
        try {
            let url = "https://bidgpt-backend-dev.kpmg-aip-nonprod.co.uk/backend/"
            console.log(url)
            await this.page?.goto(url, { timeout: 60000 });

            this.waitForElement(TestLocators.Login.BackEndMessage)
            await this.page?.waitForTimeout(1000)
        } catch (error) {
            throw new Error(`Launch Application failed with an error: ${error});`);
        }
    }


    async waitForElement(selector: string) {
        try {
            await this.page?.waitForSelector(selector)
        } catch (error) {
            throw new Error(`waiting for element failed with an error: ${error});`)
        }
    }


    async clickObject(selector: string, objectName: string) {

        try {
            await this.page?.waitForSelector(selector)
            await this.page?.click(selector)
            console.log("Clicked on: " + objectName)
        } catch (error) {
            throw new Error(`Clicking on object ` + objectName + ` failed with an error: ${error});`);
        }
    }

    async isElementEnabled(selector: string) {
        let b = false
        try {
            await this.page?.waitForSelector(selector)
            b =await this.page?.locator(selector).isEnabled()
        } catch (error) {
            throw new Error(`isElementEnabled failed with an error: ${error});`);
        }
        return b
    }

    

    async selectDropdown(selector: string, fieldName: string, fieldValue: string) {
        try {
            console.log(selector)
            this.waitForElement(selector)
            await this.page?.click(selector)
            this.waitForElement("//*[text()='" + fieldValue + "']")
            await this.page?.click("//*[text()='" + fieldValue + "']")
            console.log("selectDropdown: " + fieldName + " with the value: " + fieldValue)
        } catch (error) {
            throw new Error(`selectDropdown ` + fieldName + ` with the value: ` + fieldValue + `failed with an error ${error});`);
        }
    }

    async selectMultipleValuesInDropdown(selector: string, fieldName: string, fieldValues: string[]) {
        try {

            await this.page?.click(selector)

            for (var i = 0; i < fieldValues.length; i++) {
                this.waitForElement("//*[text()='" + fieldValues[i] + "']")
                await this.page?.click("//*[text()='" + fieldValues[i] + "']")
                console.log("selectMultipleValuesInDropdown: " + fieldName + " with the value: " + fieldValues[i])
            }
            await this.page?.keyboard.press("Tab")
        } catch (error) {
            throw new Error(`selectMultipleValuesInDropdown ` + fieldName + `failed with an error ${error});`);
        }
    }

    async enterText(selector: string, fieldName: string, fieldValue: string) {
        try {
            await this.page?.waitForSelector(selector)
            await this.page?.fill(selector, fieldValue)
            console.log("Entered: " + fieldName)
        } catch (error) {
            throw new Error(`Enter text in field ` + fieldName + ` failed with an error: ${error});`);
        }
    }



    async validateVisibleText(fieldName: string, fieldValue: string) {
        try {
            await this.page?.waitForSelector("//*[contains(text(), '" + fieldValue + "')]")
            await expect.soft(this.page?.locator("//*[contains(text(), '" + fieldValue + "')]")).toBeVisible()
            console.log("validateVisibleText for " + fieldName + " to be : " + fieldValue)
        } catch (error) {
            throw new Error(`The text ` + fieldValue + ` validation failed with an error: ${error});`);
        }
    }

    async validateElementVisible(selector: string, elementName: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toBeVisible()
            console.log("validateElementVisible: " + elementName)
        } catch (error) {
            throw new Error(`The element: ` + elementName + ` visibility check failed with an error: ${error});`);
        }
    }

    async validateElementText(selector: string, elementText: string) {
        try {
            //await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toHaveText(elementText)
            console.log("validateElementText: " + elementText)
        } catch (error) {
            throw new Error(`The element text: ` + elementText + ` check failed with an error: ${error});`);
        }
    }

    async validateElementNotVisible(selector: string, elementName: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toBeHidden()
            console.log("validateElementNotVisible: " + elementName)
        } catch (error) {
            throw new Error(`The element: ` + elementName + ` not visibility check failed with an error: ${error});`);
        } 
    }

    async validateElementEnabled(selector: string, elementName: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toBeEnabled()
            console.log("validateElementEnabled: " + elementName)
        } catch (error) {
            throw new Error(`The validateElementEnabled: ` + elementName + ` failed with an error: ${error});`);
        }
    }

    async validateElementDisabled(selector: string, elementName: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toBeDisabled()
            console.log("validateElementEnabled: " + elementName);
        } catch (error) {
            throw new Error(`The validateElementDisabled: ` + elementName + ` failed with an error: ${error});`);
        }
    }

    async validateElementToHaveText(selector: string, elementName: string, elementText: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toHaveText(elementText)
            console.log("validateElementToHaveText: " + elementText)
        } catch (error) {
            throw new Error(`The validation for ` + elementName + ` to have text: ` + elementText + ` failed with an error: ${error});`);
        }
    }

    async validateElementEditable(selector: string, elementName: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toBeEditable()
            console.log("validateElementEditable: " + elementName)
        } catch (error) {
            throw new Error(`The validateElementEditable: ` + elementName + ` failed with an error: ${error});`);
        }
    }

    async validateElementChecked(selector: string, elementName: string) {
        try {
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector)).toBeChecked()
            console.log("validateElementChecked: " + elementName)
        } catch (error) {
            throw new Error(`The validateElementChecked: ` + elementName + ` failed with an error: ${error});`);
        }
    }

    async validateCountOfElementsWithTextUnderAnotherElement(selector: string, elementText: string, count: number) {
        try {
            console.log("count-"+count)
            await this.page?.waitForSelector(selector)
            await expect.soft(this.page?.locator(selector + "//*[contains(text(),'" + elementText + "')]")).toHaveCount(count)
            console.log("The count of elementText :: " + elementText + " should be: " + count)
        } catch (error) {
            throw new Error(`The count of elementText : ` + elementText + ` validation failed with an error: ${error});`);
        }
    }

    async validateCountOfElementsUnderAnotherElement(selectorParent: string, selectorChild: string, childElementName: string, count: number) {
        try {
            await this.page?.waitForSelector(selectorParent);
            await expect.soft(this.page?.locator(selectorParent + selectorChild)).toHaveCount(count);
            console.log("The count of " + childElementName + " should be: " + count)
        } catch (error) {
            throw new Error(`The count of child elements validation failed with an error: ${error});`);
        }
    }

    async hoverElement(selector: string) {
        try {
            await this.page?.locator(selector).hover()
        } catch (error) {
            throw new Error(`hoverElement failed with an error: ${error});`);
        }
    }


    async getCountOfElementsWithTextUnderAnotherElement(selector: string, elementText: string) {
        let count = 0
        try {
            await this.page?.waitForSelector(selector)
            count = await this.page?.locator(selector + "//*[contains(text(),'" + elementText + "')]").count()
        } catch (error) {
            throw new Error(`isElementEnabled failed with an error: ${error});`);
        }
        return count
    }

    async validateElementToContainText(selector: string, elementName: string, elementText: string) {
        try {
            console.log("Element text is: "+await this.page?.locator(selector).textContent())
            await expect.soft(this.page?.locator(selector)).toContainText(elementText)
            console.log("validateElementToContainText: " + elementText)
        } catch (error) {
            throw new Error(`The validation for ` + elementName + ` to contain text: ` + elementText + ` failed with an error: ${error});`);
        }
    }

    async launchApplicationUrl() {
        try {
            let url = ""
            if (TestData.CommonData.ENV == "LOCAL") {
                url = TestData.CommonData.URL.LOCAL
            } else if (TestData.CommonData.ENV == "DEV") {
                url = TestData.CommonData.URL.DEV
            } else if (TestData.CommonData.ENV == "TEST") {
                url = TestData.CommonData.URL.TEST
            }
            console.log(url)
            await this.page?.goto(url, { timeout: 60000 });
            await this.page?.waitForTimeout(1000)
        } catch (error) {
            throw new Error(`Launch Application failed with an error: ${error});`);
        }
    }

    async selectDropdownByValue(dropdownSelector: string, value: string) {

        try {
            await this.page.locator(dropdownSelector).selectOption(value)

        } catch (error) {
            throw new Error(`Selecting the dropdown value ` + value + ` failed with an error: ${error});`);
        }
    }


}