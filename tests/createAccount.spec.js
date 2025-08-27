// import { test } from "@playwright/test";

import {test} from "../pageObjects/pageObjectManager";

test.beforeEach (async({homePage, createAccountPage}) => {
    await homePage.gotoHomePage();
    await homePage.checkPageTitle();
    await homePage.clickCreateAcountLink();
    await createAccountPage.checkPageTitle();

})

test ("TC_RF_001: Validate that the registration is successful when all the mandatory fields are provided."+
    "TC_RF_002: Validate that the 'Thank you for registering with Main Website Store.' message is displayed."+
    "TC_RF_003: Validate the Account Information details match with the details provided during registration.", async({createAccountPage, myAccountPage}) => {
    await createAccountPage.enterFirstName(process.env.FIRSTNAME);
    await createAccountPage.enterLastName(process.env.LASTNAME);
    await createAccountPage.enterEmail(process.env.EMAIL);
    await createAccountPage.enterPassword(process.env.PASSWORD);
    await createAccountPage.enterConfirmPassword(process.env.PASSWORD);
    await createAccountPage.clickCreateAccountBtn();
    await myAccountPage.checkPageTitle();
    await myAccountPage.checkThankYouMsg();
    await myAccountPage.checkContactInfo(process.env.FIRSTNAME, process.env.LASTNAME, process.env.EMAIL);

});

test ("TC_RF_004: Validate that the proper notification message is displayed on the mandatory field when left blank.", async({createAccountPage}) => {
    await createAccountPage.clickCreateAccountBtn();
    await createAccountPage.checkRequiredFieldMsg();

});

test ("TC_RF_005: Validate the registration when Email format is invalid.", async({createAccountPage}) => {
    const invalidEmail = JSON.parse(process.env.INVALID_EMAIL);

    await createAccountPage.enterFirstName(process.env.FIRSTNAME);
    await createAccountPage.enterLastName(process.env.LASTNAME);
    await createAccountPage.enterPassword(process.env.PASSWORD);
    await createAccountPage.enterConfirmPassword(process.env.PASSWORD);
    for (let email of invalidEmail) { //loop through the array of invalid emails
        await createAccountPage.enterEmail(email);
        await createAccountPage.clickCreateAccountBtn();
        await createAccountPage.checkInvalidEmailMsg();
    };

});

test ("TC_RF_006: Validate the registration when the Email  already exists in the system.", async({createAccountPage}) => {
    await createAccountPage.enterFirstName(process.env.FIRSTNAME);
    await createAccountPage.enterLastName(process.env.LASTNAME);
    await createAccountPage.enterEmail(process.env.EMAIL);
    await createAccountPage.enterPassword(process.env.PASSWORD);
    await createAccountPage.enterConfirmPassword(process.env.PASSWORD);
    await createAccountPage.clickCreateAccountBtn();
    await createAccountPage.checkEmailExistsMsg();

});

test ("TC_RF_007: Validate the proper notification message is displayed when password did not meet the standard.", async({page, createAccountPage}) => {
    const invalidPassword = JSON.parse(process.env.INVALID_PW);

    await createAccountPage.enterFirstName(process.env.FIRSTNAME);
    await createAccountPage.enterLastName(process.env.LASTNAME);
    await createAccountPage.enterEmail(process.env.EMAIL);
    for (let pw of invalidPassword) { //loop through the array of invalid passwords
        await createAccountPage.enterPassword(pw);
        await page.keyboard.press("Tab");
        if (pw.length < 8) {
            await createAccountPage.checkInvalidPasswordMsg();
        } else {
            await createAccountPage.checkInvalidPasswordMsg2();
        };
    };
    
});

test ("TC_RF_008: Validate the leading and trailing spaces on the Password are ignored.", async({page, createAccountPage}) => {
    const passwordSpace = JSON.parse(process.env.SPACE_PW);

    await createAccountPage.enterFirstName(process.env.FIRSTNAME);
    await createAccountPage.enterLastName(process.env.LASTNAME);
    await createAccountPage.enterEmail(process.env.EMAIL2);
    for (let pw of passwordSpace) {
        await createAccountPage.enterPassword(pw);
        await createAccountPage.enterConfirmPassword(pw);
        await createAccountPage.clickCreateAccountBtn();
        await page.waitForTimeout(300);
        await createAccountPage.checkInvalidPasswordMsg3();
    };

});

test ("TC_RF_009: Validate the registration when the entered value in Password and Confirm Password are unmatched.", async({createAccountPage}) => {
    await createAccountPage.enterFirstName(process.env.FIRSTNAME);
    await createAccountPage.enterLastName(process.env.LASTNAME);
    await createAccountPage.enterEmail(process.env.EMAIL2);
    await createAccountPage.enterPassword(process.env.PASSWORD);
    await createAccountPage.enterConfirmPassword("password");
    await createAccountPage.clickCreateAccountBtn();
    await createAccountPage.checkUnmatchPasswordMsg();

});

test ("TC_RF_010: Validate whether the mandatory fields accept only spaces.", async({createAccountPage}) => {
    await createAccountPage.enterFirstName(" ");
    await createAccountPage.enterLastName(" ");
    await createAccountPage.enterEmail(" ");
    await createAccountPage.enterPassword("         ");
    await createAccountPage.enterConfirmPassword("         ");
    await createAccountPage.clickCreateAccountBtn();
    await createAccountPage.checkRequiredFieldMsg();

});

test ("TC_RF_011: Validate ways to launch the Create New Customer Account page.", async({homePage, createAccountPage, customerLoginPage}) => {
    await homePage.clickSignInLink();
    await customerLoginPage.checkPageTitle();
    await customerLoginPage.clickCreateAccountBtn();
    await createAccountPage.checkPageTitle();

});