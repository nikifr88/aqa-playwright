import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async navTo(url: string) {
        await this.page.goto(url, {waitUntil: 'load'});
    }

    async click(element: Locator) {
        await element.waitFor({ state: 'visible' });
        await element.click();
    }

    async fill(element: Locator, value: string) {
        await element.fill(value);
    }

    async expectVisible(element: Locator, visible: boolean = true) {
        await element.waitFor({state: 'visible'})
        visible ? await expect(element).toBeVisible() : await expect(element).not.toBeVisible();
    }

    async expectDisabled(element: Locator, disabled: boolean = true) {
        disabled ? await expect(element).toBeDisabled() : await expect(element).not.toBeDisabled();
    }

    async expectText(element: Locator, text: string) {
        await expect(element).toHaveText(text);
    }

    async expectCss(element: Locator, typeCss: string, value: string){
        await expect(element).toHaveCSS(typeCss, value);
    }

    async expectCurrUrl(url: string) {
        await this.page.waitForURL(`**${url}`, {timeout: 3000})
        expect(this.page.url()).toContain(url);
    }

    async select(element: Locator, val: string) {
        await expect(element).toBeEnabled({ timeout: 15000 })
        await element.selectOption(val);
    }

    async addFile(element: Locator, path: string) {
        await element.setInputFiles(path);
    }

    async findLiInList(element: Locator, val: string) {
        return element.filter({hasText: val}).first();
    }
}