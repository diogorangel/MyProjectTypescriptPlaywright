import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../../pages/LoginPage';
import { EvidenceHelper } from '../../utils/EvidenceHelper';

//Using PDf generation for evidence after all tests
test.afterEach(async ({}, testInfo) => {
    const testFolder = path.join(process.cwd(), 'evidence', testInfo.title.replace(/\s+/g, '_'));
    await EvidenceHelper.generatePDF(testInfo.title, testFolder);
});
test.describe('UI - Login Authentication 2', () => {
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
    
test('Login', async ({ page }) => {
    await loginPage.navigate();
    
    
    await loginPage
        .fillUsername('standard_user')
        .then(p => p.fillPassword('secret_sauce'))
        .then(p => p.submit());
});
});