import { test as base } from "@playwright/test";
import { HomePage } from "./homePage";
import { CreateAccountPage } from "./createAccountPage";
import { MyAccountPage } from "./myAccountPage";
import { CustomerLoginPage } from "./customerLoginPage";

exports.test = base.test.extend ({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    
    createAccountPage: async ({page}, use) => {
        const createAccountPage = new CreateAccountPage(page);
        await use(createAccountPage);
    },

    myAccountPage: async ({page}, use) => {
        const myAccountPage = new MyAccountPage(page);
        await use(myAccountPage);
    },

    customerLoginPage: async ({page}, use) => {
        const customerLoginPage = new CustomerLoginPage(page);
        await use(customerLoginPage);
    },
    
});

export { expect } from '@playwright/test';