import { Mail, Linkedin, Phone } from 'lucide-react';
import { Reveal } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { Section } from './Section';

export function Contact() {
  const { t } = useI18n();
  const cards = [
    {
      href: `mailto:${profile.email}`,
      icon: <Mail size={15} />,
      label: t.contact.workEmail,
      value: profile.email,
    },
    {
      href: `mailto:${profile.emailPersonal}`,
      icon: <Mail size={15} />,
      label: t.contact.personalEmail,
      value: profile.emailPersonal,
    },
    {
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      icon: <Phone size={15} />,
      label: t.contact.phone,
      value: profile.phone,
    },
    {
      href: profile.links.linkedin,
      icon: <Linkedin size={15} />,
      label: t.contact.linkedin,
      value: profile.links.linkedin.replace('https://www.', ''),
    },
  ];

  return (
    <Section id="contact" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead}>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="block h-full rounded-md border border-border bg-surface p-6 shadow-panel transition-colors hover:border-accent-line max-md:p-4"
            >
              <div className="flex items-center gap-2 text-accent">
                {c.icon}
                <span className="text-meta font-emph uppercase tracking-[0.14em]">{c.label}</span>
              </div>
              <div className="num mt-3 break-all text-dense font-emph text-text-strong">
                {c.value}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
