#!/usr/bin/env python3
"""Read-only Reddit fetch via Arctic Shift archive (legit public API). Usage: reddit_fetch.py [minutes_back=60]
Prints newest posts from target subs with reddit.com permalinks, score, comments, age. Also tries subreddit RSS once (often 404/429 -> skipped, no bypass)."""
import json, sys, time, urllib.request, urllib.parse
SUBS=["GTA6","GTA","PS5","GamingLeaksAndRumours","GTAVI","GTA6Online"]
UA="gta6-guides-monitor/1.0 (read-only)"
mins=int(sys.argv[1]) if len(sys.argv)>1 else 60
after=int(time.time())-mins*60
def get(u):
    r=urllib.request.Request(u,headers={"User-Agent":UA})
    with urllib.request.urlopen(r,timeout=20) as f: return f.read()
out=[]
for s in SUBS:
    q={"subreddit":s,"after":after,"limit":100,"sort":"desc"}
    if s in("PS5","GamingLeaksAndRumours"): q["title"]="GTA"
    try:
        d=json.loads(get("https://arctic-shift.photon-reddit.com/api/posts/search?"+urllib.parse.urlencode(q)))["data"]
    except Exception as e:
        print(f"# {s}: error {e}",file=sys.stderr); continue
    for p in d:
        out.append((p.get("score",0)+2*p.get("num_comments",0),s,p))
out.sort(key=lambda x:-x[0])
for _,s,p in out:
    age=(time.time()-p["created_utc"])/60
    print(f"r/{s}\t{p.get('score',0)}↑\t{p.get('num_comments',0)}c\t{age:.0f}m\thttps://www.reddit.com{p['permalink']}\t{p['title'][:140]}")
print(f"# {len(out)} posts in last {mins} min (archive scores may lag live Reddit)",file=sys.stderr)
