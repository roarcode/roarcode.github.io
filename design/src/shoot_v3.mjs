import { chromium } from 'playwright-core'; import path from 'node:path'; import { serve } from '/workspace/gta6-guides/design/src/_server.mjs';
const D='/workspace/gta6-guides/design'; const srv=await serve(D);
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const fold=process.argv[2]==='fold';
for(const [dev,vp,dsf] of [['desktop',{width:1440,height:900},1],['mobile',{width:390,height:844},2]]){
 const ctx=await b.newContext({viewport:vp,deviceScaleFactor:dsf}); const pg=await ctx.newPage();
 for(const n of ['home','guide']){
  await pg.goto(`${srv.url}/mockup-${n}-v3.html`,{waitUntil:'networkidle'});
  await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}scrollTo(0,0)});
  await pg.waitForTimeout(300);
  await pg.screenshot({path:`${D}/screenshots/v3-${n}-${dev}.png`,fullPage:true});
  await pg.screenshot({path:`${D}/screenshots/v3-${n}-${dev}-fold.png`});
 }
 await ctx.close();
}
{const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2}); const pg=await ctx.newPage(); await pg.goto(`${srv.url}/mockup-home-v3.html`,{waitUntil:'networkidle'}); await pg.click('.menu summary'); await pg.screenshot({path:`${D}/screenshots/v3-menu-mobile.png`}); await ctx.close();}
{const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2}); const pg=await ctx.newPage(); await pg.goto(`${srv.url}/mockup-guide-v3.html`,{waitUntil:'networkidle'}); await pg.click('[data-spoilers] >> nth=1',{force:true}).catch(()=>{}); await pg.evaluate(()=>{document.querySelector('details.spoiler').open=true;document.querySelector('details.spoiler').scrollIntoView({block:'center'})}); await pg.screenshot({path:`${D}/screenshots/v3-spoiler-mobile.png`}); await ctx.close();}
await b.close(); srv.close(); console.log('ok');
