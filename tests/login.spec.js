import {test} from "../pageObjects/pageObjectManager";

test.beforeEach (async({homePage}) => {
    await homePage.gotoHomePage();
    await homePage.checkPageTitle();
    await homePage.clickSignInLink();
});

test ("TC-LF-001: Login using a registered email and password.", async({customerLoginPage, homePage}) => {
    await customerLoginPage.enterLoginCredentials(process.env.EMAIL, process.env.PASSWORD);
    await customerLoginPage.clickSigninBtn();
    await homePage.checkPageTitle();

});

test ("TC-LF-002: Login using a registered email and incorrect password.", async({customerLoginPage}) => {
    await customerLoginPage.enterLoginCredentials(process.env.EMAIL, "password");
    await customerLoginPage.clickSigninBtn();
    await customerLoginPage.checkInvalidSigninMsg();
    await customerLoginPage.checkFieldValue(process.env.EMAIL, "");

});

test ("TC-LF-003: Login using an unregistered email and correct password.", async({customerLoginPage}) => {
    await customerLoginPage.enterLoginCredentials("email@test.com", process.env.PASSWORD);
    await customerLoginPage.clickSigninBtn();
    await customerLoginPage.checkInvalidSigninMsg();   
    await customerLoginPage.checkFieldValue("email@test.com", ""); 

});

test ("TC-LF-004: Login using an unregistered email and incorrect password.", async({customerLoginPage}) => {
    await customerLoginPage.enterLoginCredentials("email@test.com", "password");
    await customerLoginPage.clickSigninBtn();
    await customerLoginPage.checkInvalidSigninMsg();    
    await customerLoginPage.checkFieldValue("email@test.com", "");

});

test ("TC-LF-005: Validate that the proper warning message is displayed when logging in with empty credentials.", async({customerLoginPage}) => {
    await customerLoginPage.clickSigninBtn();
    await customerLoginPage.checkRequiredFieldMsg();    

});

test ("TC-LF-006: Validate that the proper warning message is displayed when Email format is invalid.", async({customerLoginPage}) => {
    const invalidEmail = JSON.parse(process.env.INVALID_PW);

    for (let email of invalidEmail) { //loop through the array of invalid emails
        await customerLoginPage.enterLoginCredentials(email, process.env.PASSWORD);
        await customerLoginPage.clickSigninBtn();
        await customerLoginPage.checkInvalidEmailMsg(); 
    };

});



