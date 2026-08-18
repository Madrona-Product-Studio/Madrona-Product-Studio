import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import PovThumb from "./PovThumb";
import { ArticleHeader, ArticleBody, ArticleSection, Prose, Figure, SpecTable, type TocItem } from "./ArticleTemplate";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: the out-of-the-box inventory (Artifact). Twelve jobs indexed
// by the owner's pain, grouped by the three doors. Every entry: prose with the
// tool names linked to the vendor's own page (the "how do I turn this on"
// answer), then a labeled needs-from-you / where-it-ends facts grid. Facts
// verified against vendor docs on the byline date; draft + verification notes
// in charlie-hq/thinking/madrona/working/.

const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

// One motif per judgment line, thesis-style: the key is what you bring to
// unlock the job; the flag marks the boundary where the packaged tool stops.
const P = {
  key: "M15 9a4 4 0 1 0-5.6 3.7L4 18v2h3v-2h2v-2h2l1.3-1.3A4 4 0 0 0 15 9Z",
  flag: "M5 21V4m0 1h12l-2.5 3.5L17 12H5",
};

const CLAUDE_SMB = "https://www.anthropic.com/news/claude-for-small-business";

// One inventory entry: question, linked prose (+ optional figure), then the
// two judgment lines as a labeled pair. Hairline-topped so the entries carry
// the same structural rhythm as the rest of the site.
function Entry({ q, needs, ends, children }: { q: string; needs: ReactNode; ends: ReactNode; children: ReactNode }) {
  return (
    <div className="art-inv-entry">
      <h3 className="art-inv-title">{q}</h3>
      {children}
      <div className="art-inv-facts">
        <div>
          <span className="m2-ab4-ico art-inv-ico" data-tone="sprout"><I d={P.key} /></span>
          <p className="art-inv-lbl">What it needs from you</p>
          <p>{needs}</p>
        </div>
        <div>
          <span className="m2-ab4-ico art-inv-ico" data-tone="storefront"><I d={P.flag} /></span>
          <p className="art-inv-lbl">Where it ends</p>
          <p>{ends}</p>
        </div>
      </div>
    </div>
  );
}

const GLANCE = [
  { name: "Month-end close", what: "Claude for Small Business, QuickBooks agents", why: "Assumes your books are current" },
  { name: "Chasing overdue invoices", what: "QuickBooks Payments agent, Claude invoice chaser", why: "Who gets grace is still your call" },
  { name: "Knowing your cash position", what: "Claude business pulse, QuickBooks alerts", why: "Only as honest as its connections" },
  { name: "Payroll planning", what: "Claude payroll workflow", why: "Plans it; your provider still runs it" },
  { name: "Routine customer email", what: "Gemini in Gmail, Shopify Inbox, Copilot", why: "Guesses when nothing is written down" },
  { name: "Contract review", what: "Claude contract reviewer, DocuSign Iris", why: "Flags, does not decide; not a lawyer" },
  { name: "Marketing assets", what: "Canva Magic Studio, Shopify Magic", why: "Multiplies your brand, or your lack of one" },
  { name: "Running a campaign", what: "Claude campaign workflow with Canva", why: "Runs the campaign; picking it is strategy" },
  { name: "Ad campaigns", what: "Meta Advantage+, Google Performance Max", why: "Worthless without conversion tracking" },
  { name: "Post-sale follow-up", what: "Square Marketing, HubSpot, Shopify Email", why: "Cadence is a decision before an automation" },
  { name: "Asking for reviews", what: "Square review collection, Gemini + Business Profile", why: "Automate the ask, never the review" },
  { name: "Knowing your best customers", what: "Claude margin analyzer, Square AI, Sidekick", why: "The answer hands you a harder question" },
];

const CLOSE_STEPS = [
  {
    name: "/smb-onboard",
    why: "Day one. The setup is one command, not a project.",
    p: "Walks you through connecting QuickBooks and PayPal first, then the rest as you go. Most workflows degrade gracefully when a connector is not there yet.",
  },
  {
    name: "/close-month",
    why: "The flagship. The weekend eater, handled.",
    p: "Reconciles your books against payment settlements, flags mismatches for your review, writes a plain-English P&L narrative, and packages an accountant-ready close packet.",
  },
  {
    name: "/monday-brief",
    why: "The habit that sticks.",
    p: "A start-of-week snapshot of cash, sales, pipeline, and your top three to-dos. Every step that touches money or customers waits for your approval.",
  },
];

const TOC: TocItem[] = [
  { id: "the-shelf", label: "The shelf nobody shows you" },
  { id: "at-a-glance", label: "The inventory at a glance" },
  { id: "running-smoother", label: "Running smoother" },
  { id: "getting-found", label: "Getting found" },
  { id: "coming-back", label: "Coming back" },
  { id: "how-to-start", label: "How to actually start" },
];

const HREF = "/thinking/ai-tools-for-small-business";

export default function MadronaV2InventoryNote() {
  useReveal();

  return (
    <main className="m2 art">
      <LabMeta title="AI tools for small business: the 12 jobs they already do · Thinking" />
      <M2Nav active="pov" />
      <div className="art-wrap">
        <ArticleHeader
          kicker="An inventory"
          author="Charlie Koch"
          meta={["9 min read", "Updated August 2026"]}
          title="The 12 jobs AI tools already do for small businesses."
          standfirst="A lot of the work that fills your week is already handled, out of the box, by tools you may be paying for today. Nobody lays that shelf out plainly, so we did: twelve jobs, organized by problem rather than product, each with what it needs from you and where it ends. We update this page as the shelf changes."
          toc={TOC}
          visual={<div className="art-head-plate"><div className="m2-pov-plate"><PovThumb motif="inventory" /></div></div>}
        />
        <ArticleBody share={{ title: "The 12 jobs AI tools already do for small businesses", href: HREF }}>
          <ArticleSection id="the-shelf" num="1" eyebrow="The gap" title="The shelf nobody shows you.">
            <Prose>
              <p>You keep hearing that AI could help your business, and between the demos, the pricing pages, and the think pieces, it is hard to tell what any of it actually does. Meanwhile the close still takes a weekend, the invoices are still late, and you are still answering the same six emails.</p>
              <p>The part nobody says plainly: a lot of that work is already handled by tools sitting in subscriptions you have. QuickBooks now ships agents that reconcile your books. Claude comes with workflows named for the jobs themselves. Gemini is already inside your Google Workspace plan. But vendors describe these things from their side of the glass. &ldquo;15 pre-built workflows for running the whole business&rdquo; tells you something exists. It does not tell you what it takes to put it to work on a Tuesday.</p>
              <p>We run our own studio on this stuff, agents included, so this list comes from use, not from press releases. Every capability here was checked against the vendors&rsquo; current documentation on the date above, and we revise the page as the tools change. Each tool is linked to the vendor&rsquo;s own page, so when an entry fits, you can go turn it on.</p>
            </Prose>
          </ArticleSection>

          <ArticleSection id="at-a-glance" num="2" eyebrow="Twelve jobs" title="The inventory at a glance.">
            <Figure caption="The honest catch column is the point. Every packaged capability has one.">
              <SpecTable head={["The job", "What handles it today", "The honest catch"]} rows={GLANCE} />
            </Figure>
          </ArticleSection>

          <ArticleSection id="running-smoother" num="3" eyebrow="The back office" title="Running smoother.">
            <Prose>
              <p>The jobs that eat your evenings: bookkeeping, invoices, email, paperwork.</p>
            </Prose>

            <Entry
              q="Can AI do my month-end close?"
              needs="Books that are roughly current. These workflows reconcile what is there. If three months of transactions are uncategorized, the first run surfaces a cleanup project, not a close packet. Useful information, but not the demo."
              ends="The mismatches it flags still need your call, and a messy chart of accounts confuses every tool in this category. The close gets dramatically shorter. The judgment stays yours, and your accountant stays your accountant."
            >
              <Prose>
                <p>Mostly, yes. This is the flagship of the category, and the best worked example of what &ldquo;out of the box&rdquo; now means.</p>
                <p><Ext href={CLAUDE_SMB}>Claude for Small Business</Ext> ships a close workflow. It reconciles your books against payment settlements, flags mismatches for your review, writes a plain-English P&amp;L narrative, and packages an accountant-ready close packet through the QuickBooks connector. Inside QuickBooks itself, Intuit now ships its own <Ext href="https://quickbooks.intuit.com/ai-accounting/">Accounting agent</Ext> that reconciles statements, matches bank transactions, and cleans up categorization. Here is what the first week actually looks like:</p>
              </Prose>
              <Figure caption="The actual commands. This is the part the marketing pages skip.">
                <div className="m2-sg-prompts">
                  {CLOSE_STEPS.map((s) => (
                    <div key={s.name} className="m2-sg-prompt">
                      <h3>{s.name}</h3>
                      <p className="why">{s.why}</p>
                      <p className="p">{s.p}</p>
                    </div>
                  ))}
                </div>
              </Figure>
            </Entry>

            <Entry
              q="Can AI chase my overdue invoices?"
              needs="Invoices actually issued from the system, so there is something to chase."
              ends="The good customer who is late is a relationship decision, not a workflow. The tool drafts, you decide who gets grace."
            >
              <Prose>
                <p>This might be the fastest payback on the list. QuickBooks&rsquo; <Ext href="https://quickbooks.intuit.com/payments-agent/">Payments agent</Ext> drafts personalized reminders for overdue invoices and learns which payers respond to what; Intuit claims invoices get paid noticeably sooner. <Ext href={CLAUDE_SMB}>Claude&rsquo;s invoice chaser</Ext> does the same job across QuickBooks and email, queueing reminders for your approval rather than sending on its own.</p>
              </Prose>
            </Entry>

            <Entry
              q="What is my actual cash position right now?"
              needs="Connected accounts. All of them."
              ends="The pulse is only as honest as its connections. If half your money moves through a system it cannot see, you get a tidy number that is wrong. Connect everything or read it skeptically."
            >
              <Prose>
                <p>If you cannot answer that without opening three tabs, you are who this entry is for. <Ext href={CLAUDE_SMB}>Claude&rsquo;s business pulse</Ext> puts cash position, sales trends, pipeline, and the week&rsquo;s commitments on one page, with a start-of-week brief and your top three to-dos. QuickBooks runs cash-flow shortage alerts with suggested actions.</p>
              </Prose>
            </Entry>

            <Entry
              q="Can AI help me plan payroll?"
              needs="The same connected accounts as the cash pulse, and a payroll date to plan toward."
              ends="This is payroll planning. Running payroll, benefits, and compliance stay with your payroll provider."
            >
              <Prose>
                <p>It can handle the planning half. <Ext href={CLAUDE_SMB}>Claude&rsquo;s payroll workflow</Ext> settles your QuickBooks cash position against PayPal settlements, forecasts 30 days ahead, and ranks which overdue invoices to chase so payroll clears comfortably. Nothing sends or moves money without your approval, which is the feature, not a limitation.</p>
              </Prose>
            </Entry>

            <Entry
              q="Can AI answer routine customer emails?"
              needs="Written answers to draw from: your policies, your shipping times, your return rules. If it is not written down, the AI guesses, confidently. An afternoon spent writing your ten most common answers is the highest-leverage AI work most small businesses can do."
              ends="The upset customer. Draft with AI, but send that one yourself."
            >
              <Prose>
                <p>The drafting, yes. <Ext href="https://workspace.google.com/solutions/ai/">Gemini&rsquo;s &ldquo;Help me write&rdquo;</Ext> is now included in base Google Workspace subscriptions and drafts replies from the thread. <Ext href="https://www.microsoft.com/en-us/microsoft-365/copilot/business">Microsoft&rsquo;s Copilot</Ext> does the same in Outlook on its small business plans. If you sell on Shopify, Inbox suggests answers to customer chats from your store&rsquo;s own information, part of <Ext href="https://www.shopify.com/magic">Shopify Magic</Ext>.</p>
              </Prose>
            </Entry>

            <Entry
              q="Can AI review a contract before I sign it?"
              needs="The contract as a document it can read, and your questions about it."
              ends="It flags, it does not decide, and it is not your lawyer. For the lease or the partnership agreement, the review buys you a sharper conversation with counsel, not a substitute for one."
            >
              <Prose>
                <p>It makes a good first reader. <Ext href={CLAUDE_SMB}>Claude&rsquo;s contract reviewer</Ext> flags key terms and risks and answers questions about what you are agreeing to. DocuSign has serious contract AI under its <Ext href="https://www.docusign.com/products/platform/ai">Iris</Ext> brand, but note the fine print: it lives on their contract-management plans, not the eSignature plan most small businesses actually have.</p>
              </Prose>
            </Entry>
            <p className="art-inv-doorlink"><Link className="m2-text-link" to="/consulting">See how we help businesses run smoother <span aria-hidden="true">→</span></Link></p>
          </ArticleSection>

          <ArticleSection id="getting-found" num="4" eyebrow="Growth" title="Getting found.">
            <Prose>
              <p>The jobs that grow the business: assets, campaigns, ads.</p>
            </Prose>

            <Entry
              q="Can AI make my marketing assets?"
              needs="A brand kit, set up once: logo, colors, fonts, and a few sentences about voice. Every generation pulls from it. Skip this and each asset drifts a little differently off-brand, and you spend the saved time fixing them. Real product photos help too: the tools are far better at polishing your actual photo than inventing your product."
              ends="Voice and positioning are decisions, and they are still yours. AI multiplies whatever you hand it, including generic. If the words underneath are not sharp about who you serve and why you are different, you now produce forgettable assets faster. That is the edge where tooling stops and strategy starts."
            >
              <Prose>
                <p>This one has come further than most owners realize. <Ext href="https://www.canva.com/canva-ai/">Canva&rsquo;s Magic Studio</Ext> writes copy in your brand voice, generates and edits images, drafts whole design options from a prompt, and resizes one asset across every format you need. <Ext href="https://www.shopify.com/magic">Shopify Magic</Ext> writes product descriptions, strips and regenerates photo backgrounds, and drafts store content in place. Between the two, a small business can produce a month of decent assets in an afternoon that used to cost a freelancer retainer.</p>
              </Prose>
            </Entry>

            <Entry
              q="Can AI plan and run a marketing campaign?"
              needs="Revenue data it can read, and your yes at each step."
              ends="It runs the campaign you approve. Whether it is the right campaign, for the right audience, at the right moment, is exactly the question the workflow cannot answer for you."
            >
              <Prose>
                <p>End to end, if you want it to. <Ext href={CLAUDE_SMB}>Claude&rsquo;s campaign workflow</Ext> analyzes your revenue, drafts strategy, and produces the assets through the Canva connector. One command runs the whole arc, and you approve each step that touches customers.</p>
              </Prose>
            </Entry>

            <Entry
              q="Should I let Meta and Google automate my ads?"
              needs="Conversion tracking wired up and verified before the first dollar. This is the entry we see done wrong most often. These systems optimize toward whatever signal they receive; no signal, and they spend your budget optimizing toward noise. Google's own guidance says give Performance Max six weeks and stable budgets before judging it."
              ends="Automation optimizes toward the goal you set. Choosing the goal, and checking the tracking, is the work."
            >
              <Prose>
                <p>They already assume you will. <Ext href="https://www.facebook.com/business/ads/meta-advantage-plus">Meta&rsquo;s Advantage+ sales campaigns</Ext> and <Ext href="https://support.google.com/google-ads/answer/10724817">Google&rsquo;s Performance Max</Ext> both take budget, creative, and a goal, then automate audience, placements, and bidding across everything they own. For a small advertiser this beats hand-tuned campaigns most of the time.</p>
              </Prose>
            </Entry>
            <p className="art-inv-doorlink"><Link className="m2-text-link" to="/consulting">See how we help businesses get found <span aria-hidden="true">→</span></Link></p>
          </ArticleSection>

          <ArticleSection id="coming-back" num="5" eyebrow="Retention" title="Coming back.">
            <Prose>
              <p>The jobs that turn one sale into a relationship: follow-up, reviews, knowing your people.</p>
            </Prose>

            <Entry
              q="Can AI follow up with customers after the sale?"
              needs="A decision. A follow-up rhythm is a decision before it is an automation: who hears from you, how soon after a sale, saying what? An hour with those questions, then the automation runs it forever."
              ends="The tools execute cadence. They do not know your regulars."
            >
              <Prose>
                <p>The machinery is built in. <Ext href="https://squareup.com/us/en/software/marketing">Square&rsquo;s Marketing automations</Ext> run welcome, win-back, lapsed-customer, and abandoned-cart campaigns on its marketing plans, with AI-drafted copy. Shopify Email does the same for stores. <Ext href="https://www.hubspot.com/products/artificial-intelligence">HubSpot&rsquo;s</Ext> free tier includes an AI assistant for drafting; its autonomous follow-up agents sit on paid tiers.</p>
              </Prose>
            </Entry>

            <Entry
              q="Can AI ask customers for reviews?"
              needs="Your Google Business Profile connected, and a sale worth asking about."
              ends="Automate the ask, never the review. Incentivized or faked reviews violate every platform's rules and, eventually, your customers' trust."
            >
              <Prose>
                <p>You should let it, because the ask is what nobody gets around to. <Ext href="https://squareup.com/help/us/en/article/8418-collect-google-reviews">Square collects Google reviews</Ext> automatically by email or text after a sale, triggered by things like a customer&rsquo;s third purchase, once your Google Business Profile is synced. On the other side, <Ext href="https://blog.google/innovation-and-ai/products/gemini-app/gemini-features-for-businesses/">connecting your Business Profile to the Gemini app</Ext> lets it draft review replies in your voice and flag unanswered questions.</p>
              </Prose>
            </Entry>

            <Entry
              q="Can AI tell me who my best customers are?"
              needs="Sales history living in one system."
              ends="The answer usually hands you a harder question. Knowing your top customers is a query. Deciding what to build for them is strategy, and no workflow ships that."
            >
              <Prose>
                <p>The analysis is the instant part. <Ext href={CLAUDE_SMB}>Claude&rsquo;s margin analyzer</Ext> works the numbers through your QuickBooks data. <Ext href="https://squareup.com/us/en/ai">Square AI</Ext> answers plain questions over your own sales history: best sellers, margins by location, what changed this month. <Ext href="https://www.shopify.com/sidekick">Shopify&rsquo;s Sidekick</Ext> does the same for stores and takes admin actions you approve.</p>
              </Prose>
            </Entry>
            <p className="art-inv-doorlink"><Link className="m2-text-link" to="/consulting">See how we help businesses keep customers coming back <span aria-hidden="true">→</span></Link></p>
          </ArticleSection>

          <ArticleSection id="how-to-start" num="6" eyebrow="The move" title="How to actually start.">
            <Prose>
              <p>Pick one job. Not five. The one that ate last weekend.</p>
              <p>Then take the free path first. Anthropic runs a <Ext href="https://newsroom.paypal-corp.com/2026-05-PayPal-partners-with-Anthropic-to-Close-the-AI-Gap-for-Small-Businesses">free AI fluency course</Ext> for small business owners, built with PayPal, and <Ext href={CLAUDE_SMB}>free half-day workshops</Ext> in cities around the country. Gemini is already in your Workspace subscription. Shopify Magic is on every Shopify plan. You may get this job handled without spending anything new, and you should be suspicious of anyone who suggests otherwise.</p>
              <p>An honest note on where the shelf ends, because it does. Packaged workflows assume standard tools and standard process. The edges show up fast in a real business: the industry system with no connector, the two tools that will not talk to each other, the workflow that almost fits but not quite, the point where approving every step quietly becomes its own job. Those edges are not a reason to skip the shelf. They are a map of where your business is genuinely different, and that is worth knowing.</p>
              <p>When you hit one, that is the moment worth a conversation. Figuring out what to build when the packaged version runs out is our actual work. Either way, take the inventory: somewhere in these twelve jobs, there is a weekend you get back this month.</p>
            </Prose>
            <div className="m2-th-close-links">
              <Link className="m2-text-link" to="/checkup">Not sure which job is yours? Take the free signal check <span aria-hidden="true">→</span></Link>
              <Link className="m2-text-link" to="/connect">Hit an edge? Get in touch <span aria-hidden="true">→</span></Link>
            </div>
          </ArticleSection>
        </ArticleBody>
      </div>
      <SiteFooter cta={false} />
    </main>
  );
}
