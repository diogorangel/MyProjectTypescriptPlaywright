import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: string, pass: string) {
        await this.page.fill('#user-name', user);
        await this.page.fill('#password', pass);
        await this.page.click('#login-button');
    }

    async getErrorMessage() {
        return this.page.locator('[data-test="error"]');
    }
}