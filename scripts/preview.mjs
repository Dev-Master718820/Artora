import {chromium} from '@playwright/test';
import {existsSync,mkdirSync} from 'node:fs';
const directory='artifacts/screenshots';
mkdirSync(directory,{recursive:true});
const browser=await chromium.launch({
 executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||(existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined),
 headless:true,args:['--no-sandbox']
});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await page.goto(process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3000',{waitUntil:'networkidle'});
await page.evaluate(async()=>{for(const image of document.images){image.scrollIntoView({block:'center',behavior:'instant'});await image.decode().catch(()=>{});}window.scrollTo(0,0);});
await page.screenshot({path:directory+'/home-desktop.png',fullPage:true});
console.log('Title:',await page.title());
console.log('JavaScript errors:',errors);
console.log('Broken images:',await page.locator('img').evaluateAll(images=>images.filter(image=>image.complete&&image.naturalWidth===0).map(image=>image.src)));
await page.setViewportSize({width:390,height:844});
await page.screenshot({path:directory+'/home-mobile.png',fullPage:true});
console.log('Mobile overflow:',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await browser.close();
