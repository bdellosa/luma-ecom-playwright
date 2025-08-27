import { expect } from "@playwright/test";

exports.CustomerLoginPage = class CustomerLoginPage {
    constructor (page) {
        this.page = page;
        this.email = page.getByRole("textbox", {name: "Email"});
        this.password = page.getByRole("textbox", {name: "Password"});
        this.signIn = page.getByRole("button").filter({hasText: "Sign In"});
        this.forgotPw = page.getByText("Forgot Your Password?", {exact:true});
        this.createAccount = "a[class='action create primary']";
        this.invalidCredential = page.getByText("The account sign-in was incorrect");
        this.emailErr = "div#email-error";
        this.passwordErr = "div#pass-error";
    };

    async checkPageTitle () {
        await expect(this.page).toHaveTitle("Customer Login");
    };

    async enterLoginCredentials (email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
    };

    async clickCreateAccountBtn () {
        await this.page.locator(this.createAccount).click();
    };

    async clickSigninBtn () {
        await this.signIn.click();
        await this.page.waitForTimeout(300);
    };

    async checkInvalidSigninMsg () {
        await expect(this.invalidCredential).toBeVisible();
        await expect(this.invalidCredential).toHaveText("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."); 
    };

    async checkFieldValue (emailValue, pwValue) {
        await expect(this.email).toHaveValue(emailValue);
        await expect(this.password).toHaveValue(pwValue);
    };

    async checkRequiredFieldMsg () {
        await expect(this.page.locator(this.emailErr)).toBeVisible();
        await expect(this.page.locator(this.emailErr)).toHaveText("This is a required field.");
        await expect(this.page.locator(this.passwordErr)).toBeVisible();
        await expect(this.page.locator(this.passwordErr)).toHaveText("This is a required field.");
    };

    async checkInvalidEmailMsg () {
        await expect(this.page.locator(this.emailErr)).toBeVisible();
        await expect(this.page.locator(this.emailErr)).toHaveText("Please enter a valid email address (Ex: johndoe@domain.com).");
    };

};