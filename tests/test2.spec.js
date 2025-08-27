import {expect} from "@playwright/test";

exports.HomePage = class HomePage {
    constructor (page) {
        this.page = page;
        this.url = process.env.URL;
        this.signIn = page.getByRole("listitem").filter({hasText: "Sign In"});
        this.createAccount = page.getByRole("listitem").filter({hasText: "Create an Account"});
        
    };

    async gotoHomePage () {
        await this.page.goto(this.url);
    };

    async checkPageTitle () {
        await expect(this.page).toHaveTitle("Home Page");
    };

    async clickCreateAcountLink () {
        await this.createAccount.click();
        await this.page.waitForTimeout(300);
        await this.page.mouse.click(50, 50, {button: "left", delay:300});
    };

    async clickSignInLink () {
        await this.signIn.click();
        await this.page.waitForTimeout(300);
    };

};