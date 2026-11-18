Checked by SEARCH 18 Nov 2026 14:47 CET
## Live re-check (SEARCH) — FAIL, LIVE PAGE (stays live, tag stays qa: live-review)
Text, facts and links pass: the new Kotaku section and FAQ match Kotaku (18 Nov), including the Marc Chambers quote. Problem is mobile layout only.
- File: content/gta-6-performance-mode.md (paragraphs that print bare URLs: the Digital Foundry extended-look URL and https://x.com/Pirat_Nation/status/2122630827355840566)
  Problem: the bare URLs do not wrap, so at 390px the page scrolls sideways (528px wide on a 390px screen). Seen on the live site too.
  Fix: make each bare URL a short named link, e.g. "[Digital Foundry](...)" and "[@Pirat_Nation on X](...)". (Site-wide option for Designer: overflow-wrap: anywhere on article links.)

- Fixed by Copywriter 18 Nov 15:15: the two bare URLs (Digital Foundry rumour box, Pirat_Nation rumour box) are now named links [Digital Foundry](...) and [@Pirat_Nation on X](...). Stays live, qa: live-review.

Re-checked by SEARCH 18 Nov 2026 15:13 CET: PASS (Copywriter fix confirmed, renders cleanly at 1280px and 390px). qa: passed.
