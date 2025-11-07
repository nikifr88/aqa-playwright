import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Register Modal', () => {

  let homePage: HomePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    await homePage.open()
  })

  test('Correct login', async () => {
    await homePage.registerForm.login();
  })

  test('SignUp button is visible', async () => {
    await homePage.registerForm.signUpButtonVisible();
  })

  test('User can signUp', async () => {
    await homePage.registerForm.register(true, '', 'AQAName', 'AQALastName', homePage.registerForm.emailForRegister, 'Qwerty!123');
  })

  test("User can't signUp with empty input", async () => {
    await homePage.registerForm.register();
  })

  test("User can't signUp with invalid data", async() => {
    await homePage.registerForm.register(false, 'invalid', '123', '123')
  })

  test("User can't signUp with wrong length or don't match data", async () => {
    await homePage.registerForm.register(false, 'wrong', 'a', 'a', 'tt', 'sd')
  })
})