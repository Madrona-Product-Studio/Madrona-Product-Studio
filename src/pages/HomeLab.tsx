import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";

/**
 * Internal lab — three homepage directions to react to, switchable via
 * ?opt=a|b|c. All copy is DRAFT raw material (Charlie approves every word
 * that ships). Each option reserves a hero slot for the PNW photo Charlie
 * is sourcing. Cues taken (not copied) from ranchhousedesigns.com:
 * self-identification, founder-as-face, anti-commodity framing, clear
 * offer objects, repeated CTAs.
 */

/* ---------- shared bits ---------- */

function PhotoSlot({ ratio = "aspect-[21/9]", label = "PNW hero photo — Charlie's pick drops in here" }: { ratio?: string; label?: string }) {
  return (
    <div className={`${ratio} w-full rounded-card border border-line-soft bg-gradient-to-b from-faint/30 via-bg to-faint/20 flex items-end justify-start p-5`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
    </div>
  );
}

function Cta({ to = "/how-it-works", children = "See how the first conversation works" }: { to?: string; children?: React.ReactNode }) {
  return (
    <Link to={to} className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline">
      {children}
    </Link>
  );
}

const proofWork = caseStudies.filter((s) => ["lila-trips", "san-juan-boating-guide"].includes(s.slug));

function useCycler(words: string[]) {
  const [displayed, setDisplayed] = useState(words[0]);
  const wordRef = useRef(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const schedule = (fn: () => void, ms: number) => setTimeout(() => { if (!cancelled) fn(); }, ms);
    function del(cur: string, done: () => void) {
      if (cancelled) return;
      if (!cur.length) { done(); return; }
      schedule(() => { const n = cur.slice(0, -1); setDisplayed(n); del(n, done); }, 45);
    }
    function type(t: string, i: number, done: () => void) {
      if (cancelled) return;
      if (i > t.length) { done(); return; }
      schedule(() => { setDisplayed(t.slice(0, i)); type(t, i + 1, done); }, 70);
    }
    function cycle() {
      schedule(() => del(words[wordRef.current], () => {
        wordRef.current = (wordRef.current + 1) % words.length;
        schedule(() => type(words[wordRef.current], 1, cycle), 250);
      }), 2400);
    }
    cycle();
    return () => { cancelled = true; };
  }, [words]);
  return displayed;
}

/* ---------- Option A · The Letter ---------- */

function OptionA() {
  return (
    <div className="space-y-24">
      {/* Hero: photo leads, words stay calm */}
      <section>
        <PhotoSlot />
        <div className="max-w-3xl pt-10">
          <h1 className="mb-6">
            Good businesses around here deserve
            <br />
            software this good.
          </h1>
          <div className="max-w-2xl">
            <Breath>
              Madrona is a small, senior team in Bellingham. We figure out
              what your business actually needs, then we make it real
              ourselves.
            </Breath>
          </div>
          <div className="mt-8"><Cta /></div>
        </div>
      </section>

      {/* The letter — founder authority, neighbor register */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-6">From Charlie</Label>
        <div className="flex gap-6 items-start">
          <div className="w-20 h-20 rounded-full bg-faint/40 border border-line-soft shrink-0 flex items-center justify-center text-[10px] text-muted text-center px-1">photo</div>
          <div className="space-y-5 text-ink70 text-lg leading-relaxed">
            <p>
              I spent fifteen years leading product at places like REI and
              Healthline. These days I build for businesses closer to home:
              the farm stand, the shop, the outfitter, the nonprofit. The
              ones that are great at what they do and get the least help
              from software.
            </p>
            <p>
              You talk to me, I do the work, and it actually gets finished.
              That's the whole model.
            </p>
          </div>
        </div>
      </section>

      {/* Services: three verbs, plain rows */}
      <section className="max-w-3xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">What we do</Label>
        <div className="border-t border-line divide-y divide-line-soft">
          {[
            ["Get found and chosen", "Brand, a site that does your work justice, fixing the one you have, content, e-commerce."],
            ["Keep them coming back", "Memberships, repeat ordering, win-back, reviews."],
            ["Run smoother", "Your operation mapped, the busywork handed to small tools and agents."],
          ].map(([t, d]) => (
            <div key={t} className="py-6">
              <h3 className="mb-1.5">{t}.</h3>
              <p className="text-ink70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda strip — the trust move */}
      <section className="max-w-2xl border-l-2 border-madrona/30 pl-6">
        <p className="text-ink text-lg leading-relaxed mb-3">
          The first conversation has a published agenda. You'll know exactly
          what we'll ask before you say yes, and you keep the written
          assessment either way.
        </p>
        <Link to="/how-it-works" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
          Read the agenda &rarr;
        </Link>
      </section>

      {/* Proof */}
      <section>
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">Things we've built and run</Label>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {proofWork.map((s) => <CaseStudyCard key={s.slug} study={s} />)}
        </div>
      </section>

      <section className="max-w-2xl border-t border-line pt-14">
        <h2 className="mb-6">Tell us about your business.</h2>
        <Cta>Book the first conversation</Cta>
      </section>
    </div>
  );
}

/* ---------- Option B · The Counter ---------- */

function OptionB() {
  const phrase = useCycler([
    "a website that earns trust",
    "customers who come back",
    "an agent for the busywork",
    "proof people want it",
  ]);
  return (
    <div className="space-y-24">
      {/* Hero: split — words + motion left, photo right */}
      <section className="grid md:grid-cols-[3fr_2fr] gap-10 items-center">
        <div>
          <h1 className="mb-6">
            We help businesses build
            <br />
            <span className="block min-h-[2.2em] md:min-h-[1.1em]">
              {phrase}
              <span className="text-madrona">.</span>
            </span>
          </h1>
          <Breath>
            A senior team in Bellingham. Strategy, design, and working
            software from the same person you talked to.
          </Breath>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 items-center">
            <Cta>Book the first conversation</Cta>
            <Link to="/services" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">What we do &rarr;</Link>
          </div>
        </div>
        <PhotoSlot ratio="aspect-[4/5]" label="PNW photo — portrait crop" />
      </section>

      {/* Self-identification — who we help */}
      <section>
        <Label className="block mb-5">Who we work with</Label>
        <div className="flex flex-wrap gap-3">
          {["Farms & food", "Shops & makers", "Outfitters & guides", "Clinics & practices", "Nonprofits & orgs", "Product companies"].map((w) => (
            <span key={w} className="text-sm text-ink70 border border-line rounded px-4 py-2">{w}</span>
          ))}
        </div>
      </section>

      {/* Offer as objects — three cards, price anchor visible */}
      <section>
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-4">What we do</Label>
        <h2 className="mb-10">Three ways a business gets better.</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["Get found and chosen", "Brand, websites, content, marketing, e-commerce. Or fixing the site you already have."],
            ["Keep them coming back", "Loyalty and memberships, repeat ordering, win-back, reviews."],
            ["Run smoother", "The operation mapped, efficiencies found, agents and small tools on the busywork."],
          ].map(([t, d]) => (
            <div key={t} className="border-t-2 border-madrona/25 pt-6">
              <h3 className="mb-2">{t}.</h3>
              <p className="text-ink70 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="text-ink70 mt-10">
          Every engagement starts the same way, and starting is small:{" "}
          <span className="text-ink font-medium">first projects are $2,500, fixed.</span>
        </p>
      </section>

      {/* Differentiators — the counter-positioning strip */}
      <section className="max-w-3xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">Why people pick us</Label>
        <div className="border-t border-line divide-y divide-line-soft">
          {[
            "You talk to the person doing the work. No junior team behind the pitch.",
            "The first meeting's agenda is published. No black-box process.",
            "It gets finished, and you can edit what we leave behind.",
            "We're from here. Bellingham is home, not a market.",
          ].map((d) => (
            <p key={d} className="py-5 text-[19px] md:text-[21px] tracking-[-0.02em] text-ink leading-[1.3]">{d}</p>
          ))}
        </div>
      </section>

      {/* Steps compact */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">How it works</Label>
        <div className="space-y-4 text-ink70 leading-relaxed">
          <p><span className="text-madrona/70 font-medium mr-3">01</span>A 45-minute conversation with a published agenda.</p>
          <p><span className="text-madrona/70 font-medium mr-3">02</span>A written assessment. Yours to keep either way.</p>
          <p><span className="text-madrona/70 font-medium mr-3">03</span>A scoped proposal, starting at $2,500 fixed.</p>
        </div>
        <div className="mt-8"><Cta /></div>
      </section>

      {/* Proof */}
      <section>
        <Label className="block mb-4">Built and running</Label>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {proofWork.map((s) => <CaseStudyCard key={s.slug} study={s} />)}
        </div>
      </section>
    </div>
  );
}

/* ---------- Option C · Sound familiar? ---------- */

function OptionC() {
  return (
    <div className="space-y-24">
      {/* Hero: the customer's voice over the photo */}
      <section>
        <PhotoSlot ratio="aspect-[2/1]" />
        <div className="max-w-3xl pt-10">
          <p className="font-serif text-2xl md:text-4xl text-ink leading-snug mb-6">
            "We're really good at what we do. You'd never know it from our
            website."
          </p>
          <p className="text-ink70 text-lg leading-relaxed max-w-2xl mb-8">
            Almost every good business we talk to says a version of this.
            Madrona exists to fix exactly it: a senior team in Bellingham
            that figures out what your business needs, then makes it real.
          </p>
          <Cta>Start with the 45-minute conversation</Cta>
        </div>
      </section>

      {/* Symptom → fix pairs */}
      <section className="max-w-3xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-4">Sound familiar?</Label>
        <div className="border-t border-line divide-y divide-line-soft">
          {[
            ["Nobody new is finding us.", "Brand, a real website, content, and marketing that gets measured."],
            ["People come once and don't come back.", "Memberships, repeat ordering, win-back, reviews."],
            ["I lose eleven hours a week to the same busywork.", "Your operation mapped, then agents and small tools with one job each."],
            ["We paid someone once. Never again.", "The agenda is published, the assessment is in writing before you pay us, and you can edit everything we leave behind."],
          ].map(([symptom, fix]) => (
            <div key={symptom} className="py-6">
              <p className="text-[19px] md:text-[22px] tracking-[-0.02em] text-ink leading-[1.25] mb-2">{symptom}</p>
              <p className="text-sm text-muted">{fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why this time is different */}
      <section className="max-w-2xl border-l-2 border-madrona/30 pl-6">
        <h2 className="mb-4">Why this time is different.</h2>
        <p className="text-ink70 leading-relaxed">
          Fifteen years of senior product work, now pointed at businesses
          like yours. One person, accountable, from here. Small first
          projects with visible payback, and nothing left half-finished.
        </p>
      </section>

      {/* Proof + steps merged, quiet */}
      <section>
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">We build for ourselves too</Label>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {proofWork.map((s) => <CaseStudyCard key={s.slug} study={s} />)}
        </div>
      </section>

      <section className="max-w-2xl border-t border-line pt-14">
        <h2 className="mb-5">Forty-five minutes. Published agenda.</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          Worst case, you leave with a written read on your biggest
          opportunities.
        </p>
        <Cta>Book it</Cta>
      </section>
    </div>
  );
}

/* ---------- switcher ---------- */

const options = [
  { id: "a", label: "A · The Letter", note: "Photo leads, Charlie's note builds the trust, services stay quiet rows. The most 'neighbor' of the three.", Body: OptionA },
  { id: "b", label: "B · The Counter", note: "Offer as scannable objects: who-we-help chips, three service cards with the $2,500 anchor, a differentiator strip. Closest to the Ranch House clarity, kept swiss. Cycler retained.", Body: OptionB },
  { id: "c", label: "C · Sound familiar?", note: "Symptom-first: the customer's own words as the hero, symptom→fix rows, the burned-before answer front and center. Boldest.", Body: OptionC },
];

export default function HomeLab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = options.find((o) => o.id === searchParams.get("opt")) ?? options[0];

  return (
    <div className="space-y-12">
      <PageMeta title="Homepage lab (internal)" description="Internal design lab." />
      <section>
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
          Internal · homepage directions · all copy is draft
        </p>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line pb-4">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => setSearchParams({ opt: o.id })}
              className={`press bg-transparent border-none cursor-pointer p-0 text-sm font-medium transition-colors ${
                o.id === current.id ? "text-ink border-b-2 border-madrona" : "text-madrona hover:text-madrona-dark"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted mt-3 max-w-2xl">{current.note}</p>
      </section>
      <current.Body />
    </div>
  );
}
