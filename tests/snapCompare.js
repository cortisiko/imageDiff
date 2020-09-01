import { Selector, t } from "testcafe";
import ImageCompare from "../imageCompare.js"

//const screenShotImagePath = '../tests/screenshots/Google/googleLandingPage.png';

const imageCompare = new ImageCompare();
const screenshotRoot = "/";

fixture`Google Snap shot diff:`.page`https://www.google.com`.beforeEach(async t => {
//    await t.resizeWindow(800,600);
});

test("Is the home page correct", async t => {
    const baseImage = '../images/HaroldQApassed.png';
    const screenShotImagePath = `${screenshotRoot}Google/`;
    const screenShotPath = '../tests/screenshots/Google/googleLandingPage.png';

    await t.takeScreenshot({
        path: `${screenShotImagePath}googleLandingPage.png`,
        fullPage: false
    });
    await imageCompare.compareImages(baseImage,screenShotPath);

});
