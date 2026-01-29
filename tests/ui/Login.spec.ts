import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EvidenceHelper } from '../../utils/EvidenceHelper';
import fs from 'fs';
import path from 'path';

// Using PDF generation for evidence after all tests
test.afterEach(async ({}, testInfo) => {
    const testFolder = path.join(process.cwd(), 'evidence', testInfo.title.replace(/\s+/g, '_'));
    await EvidenceHelper.generatePDF(testInfo.title, testFolder);
});
test.describe('UI - Login Authentication', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }, testInfo) => {
        const testName = testInfo.title.replace(/\s+/g, '_');
        const evidenceDir = path.join(process.cwd(), 'evidence', testName);
        if (!fs.existsSync(evidenceDir)) {
            fs.mkdirSync(evidenceDir, { recursive: true });
        }
        await page.screenshot({ path: path.join(evidenceDir, 'positive-1-initial.png') });
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

   //Positive Scenarios
    test('Should log in successfully with standard user', async ({ page }, testInfo) => {
        const testName = testInfo.title.replace(/\s+/g, '_');
        const evidenceDir = path.join(process.cwd(), 'evidence', testName);
        await page.screenshot({ path: path.join(evidenceDir, 'positive-1-initial.png') });

        await loginPage.login('standard_user', 'secret_sauce');
        await page.screenshot({ path: path.join(evidenceDir, 'positive-1-login.png') });
        await page.waitForTimeout(2000);

        await expect(page).toHaveURL(/inventory.html/);
        await page.screenshot({ path: path.join(evidenceDir, 'positive-2-success.png'), fullPage: true });
        console.log('Positive Test: Login successful!');
    });

    // --- NEGATIVE SCENARIOS ---
    test('Should show error for locked out user', async ({ page }, testInfo) => {
        const testName = testInfo.title.replace(/\s+/g, '_');
        const evidenceDir = path.join(process.cwd(), 'evidence', testName);
        await page.screenshot({ path: path.join(evidenceDir, 'negative-1-initial.png') });
        await loginPage.login('locked_out_user', 'secret_sauce');

        await page.screenshot({ path: path.join(evidenceDir, 'negative-locked-user-initial.png') });
        const error = await loginPage.getErrorMessage();
        await page.screenshot({ path: path.join(evidenceDir, 'show-error-initial.png') });
        await expect(error).toContainText('Sorry, this user has been locked out');
        
        await page.screenshot({ path: 'evidence/negative-locked-user.png' });
        console.log('Negative Test: Correctly identified locked user.');
    });

    test('Should show error for invalid password', async ({ page }) => {
        await page.screenshot({ path: 'evidence/negative-1-initial.png' });
        await loginPage.login('standard_user', 'wrong_password');
        await page.screenshot({ path: 'evidence/negative-1-initial.png' });
        const error = await loginPage.getErrorMessage();
        await page.screenshot({ path: 'evidence/negative-1-initial.png' });
        await expect(error).toContainText('Username and password do not match any user in this service');
        await page.screenshot({ path: 'evidence/negative-1-initial.png' });
        await page.screenshot({ path: 'evidence/negative-wrong-password.png' });
        console.log('Negative Test: Correctly blocked invalid password.');
        await page.screenshot({ path: 'evidence/negative-wrong-password.png' });
    });

    test('Should show error when fields are empty', async ({ page }) => {
        await page.screenshot({ path: 'evidence/negative-wrong-fields-empty.png' });
        await loginPage.login('', ''); 
        await page.screenshot({ path: 'evidence/negative-wrong-fields-empty.png' });
        const error = await loginPage.getErrorMessage();
        await page.screenshot({ path: 'evidence/negative-wrong-fields-empty.png' });
        await expect(error).toBeVisible();
        await page.screenshot({ path: 'evidence/negative-wrong-fields-empty.png' });
        await page.screenshot({ path: 'evidence/negative-empty-fields.png' });
    });
});