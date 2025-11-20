import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage.ts';
import { ProfilePage } from '../../src/pages/ProfilePage.ts';

test.describe('Profile Page', () => {
    let homePage: HomePage;
    let profilePage: ProfilePage;

    test.beforeEach(async({page}, testInfo) => {
        homePage = new HomePage(page);
        profilePage = new ProfilePage(page);

        await homePage.open();
        await await homePage.registerForm.login()
        // await homePage.registerForm.register(
        //     true,
        //     'empty',
        //     'Name',
        //     'LastName',
        //     homePage.registerForm.emailForRegister,
        //     'Qwerty!123'
        // );

        if(testInfo.tags.includes('@mock')) await profilePage.userProfileCard.mockProfileData(
            'mockName',
            'mockLastName',
            '2024-04-07',
            'mockCountry'
        )

        await profilePage.open();
    })

    test('Real change profile', async () => {
        await profilePage.editProfileForm.editProfile(
            'ChangeName', 
            'ChangeLastName', 
            'ChangeCountry',
            '05.08.2024',
            false
        )

        await profilePage.editProfileForm.checkDataProfile(
            'ChangeName ChangeLastName',
            '05.08.2024',
            'ChangeCountry'
        )
    })

    test('Mock data', { tag: '@mock' }, async () => {
        await profilePage.editProfileForm.checkDataProfile(
            'mockName mockLastName',
            '07.04.2024',
            'mockCountry'
        )
    })
})