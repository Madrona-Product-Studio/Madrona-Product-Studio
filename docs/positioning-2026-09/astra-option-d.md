# Astra option D: the outreach landing (authored by Astra)

_2026-09-29, Codex CLI read-only. Prompt: astra-prompt-5.md. Built verbatim at /lab/home-options/d._

---

The three options changed the presentation but kept asking visitors to absorb the studio’s full offer. Charlie’s contacts arrive with a relationship or a referral, so they mainly need to understand what they can bring him and what happens next. The questions, demonstrations, and repeated service menus made that simple invitation feel like homework.

The outreach note:

> Hi [Name],
>
> I wanted to share what I’m doing with Madrona, my studio here in Bellingham. I’m helping people sharpen their brand and website, and put AI to work on the processes that take too much time.
>
> I bring the experience from REI and Healthline, and I’m hands-on with the work, from figuring out what would help through designing and building it.
>
> If there’s something you’ve been meaning to improve, I’d love to help you think it through. No need to have a project figured out. Here’s a little more about what I do:
>
> https://madronaproduct.com

The one-line version:

> I’m helping people improve their brand and website and put AI to work on everyday processes. Would love to help: https://madronaproduct.com

Make this **the homepage at `/`**. Charlie should be able to send the studio’s address with confidence, and recipients should be able to forward it without explaining which page to read.

Use the following as the complete homepage specification. Quoted text is published copy; layout instructions are not.

Use a warm-paper ground, ink text, Hanken Grotesk 500 for the headline, Inter for body and section headings, and the existing Figtree navigation. Maximum width 1040px; desktop gutters 48px, mobile gutters 24px. Headline 56px desktop and 36px mobile; body 18px with 1.5 line height. Left-align everything. Separate blocks with hairlines and 56px vertical padding, reduced to 32px on mobile. Orange appears in the existing logo and text links; buttons are charcoal with paper text. Render the content immediately and keep this page in the warm-paper theme.

**Header.** Layout: existing studio lockup left; two text links and one button right, all visible on mobile with navigation on a second row.

> Madrona Product Studio  
> How we help  
> About  
> Get in touch

Destinations, respectively: `/`, `/services`, `/about`, `/connect`. The logo’s accessible name is “Madrona Product Studio home.” A keyboard-focus-only link precedes it: “Skip to content,” targeting the main content.

**Introduction.** Layout: one left-aligned text column, maximum 680px; headline, paragraph, button, then a smaller credibility line.

> Better websites. Practical AI. Someone to see it through.
>
> Madrona is Charlie Koch’s studio. We help you show people what makes your work good, and make the work behind it easier. You work directly with Charlie, with trusted specialists joining when needed.
>
> Get in touch
>
> Charlie previously led membership and mobile products at REI and helped launch AI-powered patient guidance at Healthline.

The button links to `/connect`. The credibility line is plain text, without company logos.

**The offer.** Layout: “How we help” in a narrow left rail; two equally weighted text rows on the right, separated by a hairline; stack rail above rows on mobile.

> How we help
>
> **Brand and web**
>
> Clear messaging, a distinctive identity, and a website that makes it easy to understand what you offer and take the next step.
>
> **AI in your workflow**
>
> Put AI to work on repetitive tasks, from organizing information to drafting follow-up, with your team reviewing what matters.
>
> We also build new products, offer paid strategy sprints that can end in “don’t build,” and work alongside teams as an ongoing product partner.
>
> More about working together

Only the final line is linked, to `/services`. Keep the secondary-offer sentence at body size beneath both rows.

**Invitation.** Layout: “Start here” in the left rail; paragraph and button on the right; stack on mobile.

> Start here
>
> Tell us what you’ve been meaning to improve. We’ll start with a free 30-minute conversation, then send a short written recommendation. If there’s a fit, we’ll agree on a small first project and what success looks like.
>
> Get in touch

Button destination: `/connect`.

**Footer.** Layout: one quiet row, wrapping naturally on mobile.

> Bellingham, Washington. Working with people near and far.  
> hello@madronaproduct.com  
> © 2026 Madrona Product Studio

Email links to `mailto:hello@madronaproduct.com`.

That is the entire page, roughly 260 words including navigation. Use no imagery beyond the existing logo. Typography, spacing, and the quality of the page itself carry the initial design impression; examples belong on the next page.

Page title: “Brand, websites, and practical AI | Madrona Product Studio.” Description: “Work directly with Charlie Koch on your brand, website, or AI workflows. Based in Bellingham, working with people near and far.”

The rest of the site becomes supporting material:

- **Keep `/services`**, labeled “How we help.” Merge the four service pages into it, with brand and web first, AI workflows second, then new products, paid strategy, ongoing partnership, and the engagement process. Use clearly labeled illustrative examples. Issue permanent redirects from `/services/brand-website`, `/services/ai-operations`, `/services/growth-retention`, and `/services/new-products` to their relevant sections.
- **Keep `/about`** for Charlie’s experience, the specialist network, and studio background. Merge useful material from `/charlie` and `/open`; permanently redirect both to `/about`.
- **Keep `/connect`** with name, email, and “What would you like help with?” plus the existing scheduling option. Remove service-selection chips and the repeated sales pitch.
- **Keep `/apps`**, linked only from About as “Our own products.” Identify studio-owned products clearly.
- **Keep `/thinking`, its five existing article routes, and `/thesis`**. Reach them through a “Writing” link on About, with the thesis listed in Thinking.
- **Hide `/tools` and `/tools/:slug` from navigation.** Link relevant illustrative demos only from `/services`, with their scripted nature stated.
- **Retire `/ai-opportunities`**, redirecting to `/connect`.
- Keep `/lab/madrona-system` and `/lab/home-options/:v` unlinked and noindexed for internal review. Remove `/pitch-kit` from the public deployment; retain its source locally.

Use the same three-item header throughout. Retire the expanded footer directory.

The risk is that the short homepage leaves a new referral wanting evidence of craft. Mitigate that on `/services` with one carefully presented illustrative brand-and-web example and one illustrative AI workflow, each explaining what was designed and why, without invented client results.
