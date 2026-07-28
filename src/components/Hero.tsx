import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { Card, Reveal, VerdictStat } from '../landing/ui';
import { Beam } from '../landing/components/Shell';
import { profile } from '../data/profile';
import { CASE_NO } from '../data/nav';

/* WITNESS FILE hero — the landing's beam sweep over the dossier masthead.
   Four VerdictStats (K6): every number carries its "so what" line. */

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-14 overflow-hidden border-b border-border bg-bg">
      <Beam />
      <div className="relative mx-auto max-w-[1120px] px-6 pb-16 pt-24 max-md:px-4 max-md:pt-16">
        <Reveal>
          <p className="text-meta font-emph uppercase tracking-[0.42em] text-text-muted">
            Case file № {CASE_NO} — the engineer behind imwy.ai
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-12 gap-8 max-md:gap-6">
          <Reveal className="col-span-8 max-md:col-span-12">
            <h1 className="text-display font-hero tracking-tight text-text-strong max-md:text-hero">
              Ferenc Bereczki
            </h1>
            <p className="mt-3 text-lead leading-relaxed text-accent-strong">
              {profile.headline.en}
            </p>
            <p className="mt-5 max-w-[640px] text-lead leading-relaxed text-text">
              “My AI-assisted work is demonstrably under expert control.” That claim is the spine of
              this file: years of automotive cybersecurity, compliance and platform engineering —
              MCP servers, RAG architectures, audit-trail systems — and a homegrown approach for
              telling the LLM what we want, structurally: SIL. Exhibits A–E below carry the
              evidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="#projects"
                className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded bg-accent px-3 text-dense font-emph text-on-accent transition-opacity hover:opacity-90"
              >
                Index of evidence
                <ArrowRight size={13} />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded border border-border bg-surface px-3 text-dense font-emph text-text-strong transition-colors hover:border-border-strong"
              >
                <Linkedin size={13} />
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded border border-border bg-surface px-3 text-dense font-emph text-text-strong transition-colors hover:border-border-strong"
              >
                <Mail size={13} />
                Email
              </a>
            </div>
            <p className="mt-6 text-meta uppercase tracking-[0.16em] text-text-faint">
              {profile.currentRole.en} · {profile.location.en}
            </p>
          </Reveal>

          {/* Portrait — filed as an exhibit */}
          <Reveal delay={0.1} className="col-span-4 max-md:col-span-12">
            <figure className="mx-auto w-full max-w-[280px] md:ml-auto">
              <Card className="overflow-hidden border-accent-line p-2">
                <img
                  src={profile.portrait}
                  alt="Ferenc Bereczki"
                  className="aspect-[4/5] w-full rounded object-cover"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="flex items-baseline justify-between gap-2 px-1 pb-1 pt-3">
                  <span className="text-meta font-emph uppercase tracking-[0.1em] text-accent">
                    Exhibit 0 — the expert
                  </span>
                  <span className="text-meta text-text-faint">№ {CASE_NO}</span>
                </figcaption>
              </Card>
            </figure>
          </Reveal>
        </div>

        {/* KPI strip — 4 verdicts (K6/K10) */}
        <Reveal delay={0.15} className="mt-12 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          <VerdictStat
            label="National-security R&D programme"
            value="HUF 10.8bn"
            verdict="led customer-side at the Ministry of the Interior — proven at national-programme scale"
            hint="Full budget (HUF 10.8 Bn, €27M+) of the Ministry of the Interior cybersecurity R&D programme, 2017–2022 — Hungary's new national IT-security layer."
          />
          <VerdictStat
            label="Largest live audience"
            value="600"
            verdict="I have presented to a 600-person conference audience — I stand behind these claims on stage."
            hint="Multiple conference talks during the Ministry years, ~600 attendees at once."
          />
          <VerdictStat
            label="Engineering career"
            value="20+ yrs"
            verdict="from enterprise infrastructure to automotive cybersecurity"
            hint="Started in enterprise network & server operations at Pfizer Hungary; automotive cybersecurity at the Knorr-Bremse R&D Center today."
          />
          <VerdictStat
            label="Peak weekly leverage"
            value="×156"
            hint="Peak weekly leverage measured on the imwy.ai platform delivery ledger — measured, not claimed."
            verdict={
              <span>
                measured on the imwy.ai platform ledger —{' '}
                <a
                  href="https://imwy.ai/#evidence"
                  className="font-emph text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
                >
                  see the evidence at imwy.ai
                </a>
              </span>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
