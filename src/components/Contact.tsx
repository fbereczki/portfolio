import { Mail, Linkedin, Phone } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { Section } from './Section';

export function Contact() {
  const { t } = useI18n();
  return (
    <Section id="contact" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Card
          href={`mailto:${profile.email}`}
          icon={<Mail size={16} />}
          label={t.contact.workEmail}
          value={profile.email}
        />
        <Card
          href={`mailto:${profile.emailPersonal}`}
          icon={<Mail size={16} />}
          label={t.contact.personalEmail}
          value={profile.emailPersonal}
        />
        <Card
          href={`tel:${profile.phone.replace(/\s/g, '')}`}
          icon={<Phone size={16} />}
          label={t.contact.phone}
          value={profile.phone}
        />
        <Card
          href={profile.links.linkedin}
          icon={<Linkedin size={16} />}
          label={t.contact.linkedin}
          value={profile.links.linkedin.replace('https://www.', '')}
        />
      </div>
    </Section>
  );
}

function Card({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="paper-card p-6 transition-shadow hover:border-oxblood hover:shadow-paper-hover"
    >
      <div className="mb-3 flex items-center gap-2 text-oxblood">
        {icon}
        <span className="label-mono-ink">— {label}</span>
      </div>
      <div className="break-all font-serif text-[14.5px] text-ink">{value}</div>
    </a>
  );
}
