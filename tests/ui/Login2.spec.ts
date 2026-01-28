import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EvidenceHelper } from '../../utils/EvidenceHelper';

//Using PDf generation for evidence after all tests
test.afterEach(async ({}, testInfo) => {
    const testName = testInfo.title.replace(/\s+/g, '_');
    await EvidenceHelper.generatePDF(testName);
});
test.describe('UI - Login Authentication', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });
    
test('Login', async ({ page }) => {
    await loginPage.navigate();
    
    // Agora você vê exatamente o que está acontecendo linha por linha
    await loginPage
        .fillUsername('standard_user')
        .then(p => p.fillPassword('secret_sauce'))
        .then(p => p.submit());
});
});