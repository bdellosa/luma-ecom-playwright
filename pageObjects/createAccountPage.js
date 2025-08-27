import { expect, locator } from "@playwright/test";

exports.CreateAccountPage = class CreateAccountPage {
    constructor (page) {
        this.page = page;
        this.firstName = "input#firstname";
        this.lastName = "input#lastname";
        this.email = "input#email_address";
        this.password = "input#password";
        this.confirmPassword = "input#password-confirmation";
        this.createAccount = "button[title='Create an Account']";
        this.firstNameErr = "#firstname-error";
        this.lastNameErr = "#lastname-error";
        this.emailErr = "#email_address-error";
        this.passwordErr = "#password-error";
        this.confirmPwErr = "#password-confirmation-error";
        this.emailExistsErr = page.getByText("There is already an account");
        this.passwordSpace = page.getByText("The password can't begin or end");

    };

    async enterFirstName (firstName) {
        await this.page.locator(this.firstName).fill(firstName);
    };

    async enterLastName (lastName) {
        await this.page.locator(this.lastName).fill(lastName);
    };

    async enterEmail (email) {
        await this.page.locator(this.email).fill(email);
    };

    async enterPassword (password) {
        await this.page.locator(this.password).fill(password);
    };

    async enterConfirmPassword (confirmPassword) {
        await this.page.locator(this.confirmPassword).fill(confirmPassword);
    };
    
    async clickCreateAccountBtn () {
        await this.page.locator(this.createAccount).click();
    };

    async checkPageTitle () {
        await expect(this.page).toHaveTitle("Create New Customer Account");
    };

    async fieldValidationMsg (loc, message) {
        await expect(this.page.locator(loc)).toBeVisible();
        await expect(this.page.locator(loc)).toHaveText(message);
    };

    async checkRequiredFieldMsg () {
        await this.fieldValidationMsg(this.firstNameErr, "This is a required field.");
        await this.fieldValidationMsg(this.lastNameErr, "This is a required field.");
        await this.fieldValidationMsg(this.emailErr, "This is a required field.");
        await this.fieldValidationMsg(this.passwordErr, "This is a required field.");
        await this.fieldValidationMsg(this.confirmPwErr, "This is a required field.");
    };

    async checkInvalidEmailMsg () {
        await this.fieldValidationMsg(this.emailErr, "Please enter a valid email address (Ex: johndoe@domain.com).");
    };

    async checkEmailExistsMsg () {
        await expect(this.emailExistsErr).toBeVisible();
        await expect(this.emailExistsErr).toHaveText("There is already an account with this email address. If you are sure that it is your email address, click here  to get your password and access your account.");
    };

    async checkInvalidPasswordMsg () {
        await this.fieldValidationMsg(this.passwordErr, "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.");
    };

    async checkInvalidPasswordMsg2 () {
        await this.fieldValidationMsg(this.passwordErr, "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.");
    };

    async checkInvalidPasswordMsg3 () {
        await expect(this.passwordSpace).toBeVisible();
        await expect(this.passwordSpace).toHaveText("The password can't begin or end with a space. Verify the password and try again.")
    };

    async checkUnmatchPasswordMsg () {
        await this.fieldValidationMsg(this.confirmPwErr, "Please enter the same value again.");
    };

};