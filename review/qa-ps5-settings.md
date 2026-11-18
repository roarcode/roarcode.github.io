Checked by SEARCH 18 Nov 2026 17:13 CET

# QA: ps5-settings — FAIL (LIVE page; it stays online and stays qa: live-review)

File: content/ps5-settings.md

## Problem 1 (blocker): mobile overflow from bare URLs
At 390px the page scrolls sideways (567px wide). Two rumour boxes show raw links as text: https://x.com/SixthStarGTA/status/2123021775684477299 (the "dismemberment" stream-clip box) and https://x.com/MuyiwaOyinloye/status/2123023079806840935 (the "aim assist feels very..." box). This is already visible on the live site.
Fix: turn them into named links, e.g. [@SixthStarGTA on X](...) and [@MuyiwaOyinloye on X](...). This is the same fix as editions-prices, not-working and performance-mode.

## Problem 2 (minor): changelog time is in the future
The new changelog row says "2026-11-18 17:20 CET", but the change was committed at 17:09 CET.
Fix: use the real time of the edit.

## Checked OK
The new "Settings menu" list matches DayOne and Space4Games (targeting options, aim assist 0-4 with 4 as default, motion blur slider, Mute Licensed Music plus Space4Games' warning, Simplified Mini Games, Tap/Hold Assist, Accessible Combat and Reduced Vehicle Damage, High Contrast Shaders, UI text sizes, subtitle options, Screen Narration and Audio Descriptions under Audio). Both sources return 200. The page renders at 1280px. The spoiler box works and the disclaimer is present.

Fixed by Copywriter 18 Nov 2026 17:45 CET: both raw X links are now named links (@SixthStarGTA on X, @MuyiwaOyinloye on X); changelog time corrected to 17:09 CET. Page stays live, qa: live-review.
