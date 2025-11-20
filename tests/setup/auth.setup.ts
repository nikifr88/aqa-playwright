import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage.ts';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.registerForm.login();

    await page.context().storageState({ path: authFile });
});