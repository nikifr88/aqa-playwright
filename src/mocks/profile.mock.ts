import { Page } from "@playwright/test";

export const mockProfile = async (
    page: Page, 
    name: string, 
    lastName: string, 
    dateBirth: string,
    country: string
) => {
    const body = {
        "status": "ok",
        "data": {
            "userId": 290899,
            "photoFilename": "user-1762886469663.png",
            name,
            lastName,
            "dateBirth": dateBirth + 'T00:00:00.000Z',//2025-11-11T00:00:00.000Z
            country
        }
    }

    return await page.route('/api/users/profile', async (route) => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify(body)
        })
    })
}