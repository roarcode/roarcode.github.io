import { chromium } from 'playwright-core'; import fs from 'node:fs';
const OUT='/workspace/gta6-guides/review/strip';
const BASE=process.env.BASE||'https://roarcode.github.io';
const pages=process.env.PAGES?JSON.parse(process.env.PAGES):[['home','/'],['guide','/launch-hub/release-time/'],['hub','/launch-hub/'],['hub-empty','/missions/'],['search','/search/?q=pre-load']];
const SEL={
 'ticker (.ticker)':'.ticker','ticker pause btn':'.ticker__pause','marquee (.marquee)':'.marquee',
 'disclaimer bar':'.disclaimer-bar','all .badge':'.badge','badge--spoiler':'.badge--spoiler','badge--updated':'.badge--updated','badge--official':'.badge--official','badge--rumour':'.badge--rumour',
 'all .chip':'.chip','chip--filter':'.chip--filter','chip--ghost':'.chip--ghost','guide-card__chip (art overlay)':'.guide-card__chip',
 'hero tags row':'.hero-feature__tags','article-head tags row':'.article-head__tags',
 'svg icons (all)':'svg','svg .icon':'svg.icon','quick-access icon':'.quick-access__icon','icon-btn':'.icon-btn',
 'btn--cta (gradient)':'.btn--cta','btn--ghost':'.btn--ghost','btn (all)':'.btn',
 'section__kicker (eyebrow)':'.section__kicker','wire__live':'.wire__live','wire__cat':'.wire__cat','label (caps)':'.label',
 'spoiler-toggle':'.spoiler-toggle','spoiler (details)':'details.spoiler','key-answer':'.key-answer','byline avatar':'.byline__avatar','article-head__ai':'.article-head__ai',
 'toc (details)':'.toc','side-card':'.side-card','promo':'.promo','guide-card':'.guide-card','tile / trending':'.tile,.trending','quick-access item':'.quick-access__item',
 'wire (ranked list)':'.wire','hero shade/overlay':'.hero-feature__shade,.hub-header__img','read-progress':'.read-progress','source kind tags':'.sources__kind','section__head':'.section__head','h2 (all)':'h2','faq details':'details.faq','breadcrumbs':'.breadcrumbs','notice':'.notice',
};
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const res={};
for(const [vn,vp,dsf] of [['mobile',{width:390,height:844},2],['desktop',{width:1440,height:900},1]]){
 const ctx=await b.newContext({viewport:vp,deviceScaleFactor:dsf}); const pg=await ctx.newPage();
 for(const [name,url] of pages){
  await pg.goto(BASE+url,{waitUntil:'networkidle'}).catch(()=>{});
  await pg.addStyleTag({content:'.ticker__track,.marquee__track{animation:none!important}.site-header{position:static!important}.read-progress{display:none}'});
  await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}scrollTo(0,0)});
  await pg.waitForTimeout(500);
  await pg.screenshot({path:`${process.env.PFX||OUT+'/live-'}${name}-${vn}.png`,fullPage:true});
  res[`${name}|${vn}`]=await pg.evaluate((SEL)=>{
   const vis=e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&(r.width>0||r.height>0)};
   const o={sel:{}};
   for(const [k,s] of Object.entries(SEL)){const els=[...document.querySelectorAll(s)];o.sel[k]=[els.length,els.filter(vis).length];}
   const all=[...document.body.querySelectorAll('*')].filter(e=>!['SCRIPT','STYLE','NOSCRIPT','PATH','CIRCLE'].includes(e.tagName.toUpperCase()));
   o.dom=all.length; o.domVisible=all.filter(vis).length;
   let pill=0,clip=0,shadow=0,grad=0,border=0,anim=0; const hues={};
   const hue=c=>{const m=c.match(/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+))?/); if(!m)return null; const [r,g,b]=[+m[1],+m[2],+m[3]]; const a=m[4]===undefined?1:+m[4]; if(a<.5)return null; const mx=Math.max(r,g,b),mn=Math.min(r,g,b); if(mx-mn<40||mx<90)return null; let h; if(mx===r)h=((g-b)/(mx-mn)+6)%6; else if(mx===g)h=(b-r)/(mx-mn)+2; else h=(r-g)/(mx-mn)+4; h*=60; const n=h<20||h>=330?(h>=300&&h<345?'pink':'red'):h<50?'orange':h<75?'yellow':h<165?'green':h<200?'cyan':h<255?'blue':h<300?'violet':'pink'; return n==='red'&&h>=330?'pink':n;};
   for(const e of all.filter(vis)){const s=getComputedStyle(e);
     if(parseFloat(s.borderTopLeftRadius)>=99)pill++; if(s.clipPath!=='none')clip++; if(s.boxShadow!=='none')shadow++; if(s.backgroundImage.includes('gradient'))grad++; if(s.animationName!=='none')anim++;
     const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
     const cols=[]; if(own)cols.push(['text',s.color]); cols.push(['bg',s.backgroundColor]); if(parseFloat(s.borderTopWidth)>0)cols.push(['border',s.borderTopColor]);
     for(const [t,c] of cols){const h=hue(c); if(h){hues[h]=hues[h]||{n:0,ex:{}}; hues[h].n++; hues[h].ex[t]=(hues[h].ex[t]||0)+1;}}
   }
   o.pill=pill;o.clip=clip;o.shadow=shadow;o.grad=grad;o.anim=anim;o.hues=hues;
   const txt=document.body.innerText; o.emoji=(txt.match(/\p{Extended_Pictographic}/gu)||[]).length;
   o.h=document.documentElement.scrollHeight;
   return o;},SEL);
 }
 await ctx.close();
}
await b.close(); fs.writeFileSync(process.env.OUTJSON||`${OUT}/audit-live.json`,JSON.stringify(res,null,1)); console.log('ok');
