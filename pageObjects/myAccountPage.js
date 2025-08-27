import { expect, locator } from "@playwright/test";

exports.MyAccountPage = class MyAccountPage {
    constructor (page) {
        this.page = page;
        this.contactInfo = "div[class='box box-information']";
        this.contactInfoContent = "div[class='box box-information']>div.box-content";
        this.thankYouMsg = page.getByText("Thank you for registering");

    };

    async checkPageTitle () {
        await expect(this.page).toHaveTitle("My Account");
    };    

    async checkThankYouMsg () {
        await expect(this.thankYouMsg).toBeVisible();
        await expect(this.thankYouMsg).toHaveText("Thank you for registering with Main Website Store.");
    };

    async checkContactInfo (firstName, lastName, email) {
        await expect(this.page.locator(this.contactInfo)).toBeVisible();
        await expect(this.page.locator(this.contactInfoContent)).toContainText(firstName + " " + lastName + " " + email);
    };

};