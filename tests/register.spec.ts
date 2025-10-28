import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Register Modal', () => {

  test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    homePage.open()
  })

  test('SignUp button is visible', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.signUpButtonVisible();
  })

  test('User can signUp', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.register(true, '', 'AQAName', 'AQALastName', homePage.emailForRegister, 'Qwerty!123');
  })

  test("User can't signUp with empty input", async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.register();
  })

  test("User can't signUp with invalid data", async({page}) => {
    const homePage = new HomePage(page);

    await homePage.register(false, 'invalid', '123', '123')
  })

  test("User can't signUp with wrong length or don't match data", async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.register(false, 'wrong', 'a', 'a', 'tt', 'sd')
  })

})