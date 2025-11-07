import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';

export const test = base.extend<{
  page: any;
  context: any;
  garagePage: GaragePage;
}>({

  
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: '.auth/user.json'
    });
    await use(context);
    await context.close();
  },

  
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

export { expect } from '@playwright/test';