import { expect, type Locator, type Page } from '@playwright/test';
import { page } from '../hooks/hooks'
import CommonPage from '../POM/common'
import * as TestData from '../TestData/TestData.json'

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async launchApplicationUrl() {
        let common = new CommonPage(this.page);
        await common.launchApplicationUrl()
    }


}