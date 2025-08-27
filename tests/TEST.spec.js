import { test, expect } from "@playwright/test";


test ("TC_RF_00", async({page}) => {
    
    await page.goto("https://magento.softwaretestingboard.com/");
    await expect(page).toHaveTitle("Home Page");


    // await page.getByRole("listitem").filter({hasText: "Create an Account"}).click();
    // await page.waitForTimeout(300);
    // await page.mouse.click(50, 50, {button: "left", delay:300});
    // await expect(page).toHaveTitle("Create New Customer Account");
    await page.getByRole("listitem").filter({hasText: "Sign In"}).click();
    await expect(page).toHaveTitle("Customer Login");
    // await page.locator("a[class='action create primary']").click();
    // await page.waitForTimeout(300);
    // await page.mouse.click(50, 50, {button: "left", delay:300});
    // await expect(page).toHaveTitle("Create New Customer Account");
    await page.getByRole("textbox", {name: "Email"}).fill("ana.give@test.com");
    await page.getByRole("textbox", {name: "Password"}).fill("anahive-1");
    await page.getByRole("button", {name: "Sign In"}).click();
    await page.waitForTimeout(300);

    // await page.getByRole('listitem').filter({ hasText: 'Change My Account My Wish' }).locator('button').click();
    await page.locator("div[class='panel header'] button[data-action='customer-menu-toggle']").click();
    await page.getByRole('link', { name: 'My Account' }).click();

    await expect(page.locator("div[class='box box-information']")).toBeVisible();
    await expect(page.locator("div[class='box box-information']>div.box-content")).toContainText("Ana Hive ana.give@test.coms");
    // await expect(page.locator("div[class='box box-information']>div.box-content")).toContainText("ana.give@test.com");

    // await expect(page.getByText("The account sign-in was incorrect")).toBeVisible();
    // await expect(page.getByText("The account sign-in was incorrect")).toHaveText("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.");
    // await expect(page.getByRole("textbox", {name: "Email"})).toHaveValue("ana.hive@test.com");
    // await expect(page.getByRole("textbox", {name: "Password"})).toHaveValue("");


    await page.waitForTimeout(1000);
});