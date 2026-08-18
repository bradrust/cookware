# Channel Setup — One Time

Do this before uploading video #1. Skipping steps here will bite you later (channel type is irreversible, upload settings are baked in per-video, etc.).

## Step 1: Create a Brand Account (Not a Personal Account)

**This is irreversible.** A personal account ties the channel to one Google identity — meaning you can't add editors, you can't hand off the channel, and if you lose that Google account you lose the channel. A **Brand Account** is a separate identity that multiple Google accounts can manage.

1. Sign in to youtube.com with the Google account you want to own the channel.
2. Go to **Settings → Your channel → Add or manage your channel(s)**.
3. Click **Create a channel** → choose "Use a custom name" (this is what makes it a Brand Account).
4. Name it — the channel name is changeable later; the underlying Brand Account is not.

## Step 2: Set the Handle

Handles (like `@yourchannel`) are the modern way YouTube URLs look. Available immediately, doesn't require any subscriber count.

1. In YouTube Studio → **Settings → Channel → Basic info**.
2. Set the handle. Choose the same string you plan to use on TikTok / Instagram for consistency.
3. The handle URL is what you'll share everywhere: `https://youtube.com/@yourhandle`.

## Step 3: Verify Your Phone Number

Non-negotiable — unlocks:
- Custom thumbnails (your channel is dead without these)
- Videos longer than 15 minutes
- Live streaming
- Content ID appeals

Do it at [youtube.com/verify](https://www.youtube.com/verify).

## Step 4: Brand Assets

Upload before anything else. Missing brand assets kill the custom-URL claim and read as "abandoned channel" to first-time visitors.

| Asset | Spec | Notes |
|---|---|---|
| **Avatar** | 800×800 PNG, <4 MB | Amy's face works well. Round-crop safe. |
| **Banner** | 2048×1152 PNG, "safe area" 1235×338 in the middle | Displays differently on mobile/tablet/desktop/TV. Design in the safe area; expect the sides to be cropped on mobile. |
| **Video watermark** | 150×150 PNG w/ transparency | Bottom-right of every video, drives subscribes. Use the channel logo, not a full name. |

Free banner templates that hit all sizes: search "YouTube banner template" on Canva.

## Step 5: "About" Section

This gets skimmed by ~40% of new visitors before they subscribe. Structure:

```
[Hook - 1-2 sentences]
15-minute dinners for people who hate cooking. New recipe every Sunday.

[What to expect - 1 sentence]
Every video: one pan, five ingredients or less, ingredients one click from your door.

[CTA to site]
🛒 Shop this week's recipe → shopthisrecipe.com

[Business inquiries]
📧 partnerships@yourdomain.com

[Social]
📸 @yourhandle on Instagram / TikTok
```

Keep the URL to your site above the fold on the "About" page.

## Step 6: Advanced Channel Settings

YouTube Studio → **Settings → Channel → Advanced settings**:

- **Country of residence** — set correctly for the right regional advertiser targeting
- **Keywords** — add ~10 relevant terms: `quick dinners, weeknight recipes, 15 minute meals, easy cooking, meal prep`
- **Audience settings** — "No, set this channel as not made for kids" (unless you're actually targeting kids — per the target-audience analysis in your private plans repo (`cookware-plans/business-plan/target-audience.md`), you're not)
- **Automatic captions** — leave on

## Step 7: Default Upload Settings

YouTube Studio → **Settings → Upload defaults**. Save yourself 5 minutes per upload.

- **Title:** leave blank
- **Description:** paste the template from [per-video-config.md](per-video-config.md#description-template) — you'll edit per video, but the shell is always there
- **Visibility:** Private (you decide per video whether to publish)
- **Tags:** `easy dinner recipes, quick dinner ideas, weeknight cooking, 15 minute meals, shop this recipe`
- **Category:** How-to & Style
- **Language:** English
- **Video location:** leave blank (unless you're doing regional content)
- **Comments:** Allow all comments (encourages engagement; you'll moderate)
- **License:** Standard YouTube License

## Step 8: Custom URL (When Eligible)

YouTube gives you a "custom URL" (e.g. `youtube.com/c/yourname`) when you hit:
- 100+ subs
- 30+ days old
- Uploaded banner + avatar

Claim it as soon as you're eligible in **Settings → Channel → Basic info**.

## Step 9: YouTube Partner Program (When Eligible)

YPP unlocks monetization. Requirements (all must be met in 12 rolling months):
- **1,000 subscribers**
- **4,000 valid public watch hours** (long-form) OR **10 million Shorts views** in 90 days

Apply in YouTube Studio → **Earn**. Approval takes 1–4 weeks. Ads on your videos start ~24hr after approval.

**AdSense account required.** You'll link it during the YPP application. Do this with an account you own — not a shared account.

## Step 10: Verification Badge (Long-Term)

The gray checkmark next to your channel name is granted at 100k+ subscribers with an active channel. Apply at [support.google.com/youtube/answer/3046484](https://support.google.com/youtube/answer/3046484). Not required, but boosts trust for brand deals.

## Multi-Owner Access

You should have at least one other person able to admin the Brand Account in case something happens to your primary Google account. Add owners/editors in **YouTube Studio → Settings → Permissions**:

- **Manager** — full access (only give to yourself and one trusted co-owner)
- **Editor** — can edit videos, playlists, upload; can't delete channel or modify permissions (good for Amy or a VA)
- **Viewer (Limited)** — read-only, sees analytics (good for anyone helping with strategy but not editing)

## What NOT To Do

- **Don't set the channel as "Made for Kids"** — the demographic you're targeting is adults, and MFK disables comments, notifications, personalized ads, and the community tab. It cuts monetization by ~50%.
- **Don't buy subscribers.** YouTube's algorithm can detect it and it hurts the channel more than it helps. Subs from purchased sources don't watch your videos, which crushes your watch-time ratio.
- **Don't upload before the branding is done.** First-video first-impressions matter; an unbranded channel gets far worse first-day subscribe rates.
- **Don't skip the Brand Account step.** Personal → Brand Account migration is *possible* but painful. Just do it right the first time.
