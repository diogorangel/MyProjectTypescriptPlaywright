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

   //Positive Scenarios
    test('Should log in successfully with standard user', async ({ page }) => {
        await page.screenshot({ path: 'evidence/positive-1-initial.png' });
        
        await loginPage.login('standard_user', 'secret_sauce');
        await page.waitForTimeout(2000); 
        
        await expect(page).toHaveURL(/inventory.html/);
        await page.screenshot({ path: 'evidence/positive-2-success.png', fullPage: true });
        console.log('Positive Test: Login successful!');
    });

    // --- NEGATIVE SCENARIOS ---
    test('Should show error for locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        const error = await loginPage.getErrorMessage();
        await expect(error).toContainText('Sorry, this user has been locked out');
        
        await page.screenshot({ path: 'evidence/negative-locked-user.png' });
        console.log('Negative Test: Correctly identified locked user.');
    });

    test('Should show error for invalid password', async ({ page }) => {
        await loginPage.login('standard_user', 'wrong_password');
        
        const error = await loginPage.getErrorMessage();
        await expect(error).toContainText('Username and password do not match any user in this service');
        
        await page.screenshot({ path: 'evidence/negative-wrong-password.png' });
        console.log('Negative Test: Correctly blocked invalid password.');
    });

    test('Should show error when fields are empty', async ({ page }) => {
        await loginPage.login('', ''); 
        
        const error = await loginPage.getErrorMessage();
        await expect(error).toBeVisible();
        
        await page.screenshot({ path: 'evidence/negative-empty-fields.png' });
    });
});