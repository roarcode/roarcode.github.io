FX=1.096
def run(name,pv,rpm_usd,aff,live_frac):
    cum=0;rows=[]
    for i,(p,r) in enumerate(zip(pv,rpm_usd)):
        ads=p*live_frac[i]*(r/FX)/1000
        af=p*aff/1000
        tot=ads+af;cum+=tot;rows.append((i+1,p,r,round(ads),round(af),round(tot),round(cum)))
    return rows
# OLD (replicate)
old={'cons':run('c',[6,5,4,4,5,6],[3]*6,0.30,[0,1,1,1,1,1]),
     'base':run('b',[35,40,30,25,30,35],[5]*6,0.80,[.5,1,1,1,1,1]),
     'viral':run('v',[350,300,200,150,180,200],[6]*6,1.20,[.5,1,1,1,1,1])}
# scale: pv in k -> multiply by 1000 inside? p is in thousands so /1000*1000 ok -> fix
def run2(pv,rpm,aff,live):
    cum=0;out=[]
    for i,(p,r) in enumerate(zip(pv,rpm)):
        ads=p*live[i]*(r/FX)      # p in k PV -> k*rpm = $ 
        af=p*aff
        tot=ads+af;cum+=tot;out.append((i+1,p,r,round(ads),round(af),round(tot),round(cum)))
    return out
old={'cons':run2([6,5,4,4,5,6],[3]*6,0.30,[0,1,1,1,1,1]),
     'base':run2([35,40,30,25,30,35],[5]*6,0.80,[.5,1,1,1,1,1]),
     'viral':run2([350,300,200,150,180,200],[6]*6,1.20,[.5,1,1,1,1,1])}
# NEW
new={'cons':run2([3,4,4,4,5,6],[0.8]*6,0.30,[0,1,1,1,1,1]),
     'base':run2([20,30,25,20,22,25],[2.0,2.0,3.0,4.0,4.0,4.0],0.80,[.5,1,1,1,1,1]),
     'viral':run2([350,300,200,150,180,200],[2.5,3.0,4.0,4.0,4.0,4.0],1.20,[.5,1,1,1,1,1])}
for n,d in (('OLD',old),('NEW',new)):
    print(n)
    for k,v in d.items():
        print(k,[x[5] for x in v],'cum',v[-1][6], 'PV',sum(x[1] for x in v))
# break-even
fixed=35;sp=113.01
def be(rpm_usd,aff,withsp=True):
    blend=rpm_usd/FX+aff
    f=fixed+(sp if withsp else 0)
    return f/(blend*(0.96 if withsp else 1))*1000, blend
for lab,r,a in (('old cons',3,.3),('old base',5,.8),('old viral',6,1.2),('new cons',0.8,.3),('new base AdSense-only',2,.8),('new base Journey',4,.8),('new viral',4,1.2),('journey $3',3,.8),('journey $6',6,.8)):
    print(lab,[round(x,2) for x in be(r,a)],round(be(r,a,False)[0]))
