import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { Section } from './Section';

export function Contact() {
  const { t } = useI18n();
  return (
    <Section id="contact" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} number="08">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          href={`mailto:${profile.email}`}
          icon={<Mail size={16} />}
          label="Work email"
          value={profile.email}
        />
        <Card
          href={`mailto:${profile.emailPersonal}`}
          icon={<Mail size={16} />}
          label="Personal"
          value={profile.emailPersonal}
        />
        <Card
          href={`tel:${profile.phone.replace(/\s/g, '')}`}
          icon={<Phone size={16} />}
          label="Telefon"
          value={profile.phone}
        />
        <Card
          href={profile.links.linkedin}
          icon={<Linkedin size={16} />}
          label={t.contact.linkedin}
          value={profile.links.linkedin.replace('https://www.', '')}
        />
        <Card
          href={profile.links.github || '#'}
          icon={<Github size={16} />}
          label={t.contact.github}
          value={profile.links.github || '— soon —'}
          disabled={!profile.links.github}
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
  disabled = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  disabled?: boolean;
}) {
  const Tag: React.ElementType = disabled ? 'div' : 'a';
  return (
    <Tag
      href={disabled ? undefined : href}
      target={disabled ? undefined : '_blank'}
      rel={disabled ? undefined : 'noreferrer'}
      className={`paper-card p-6 transition-shadow ${
        disabled ? 'opacity-50' : 'hover:shadow-paper-hover hover:border-oxblood'
      }`}
    >
      <div className="mb-3 flex items-center gap-2 text-oxblood">
        {icon}
        <span className="label-mono-ink">— {label}</span>
      </div>
      <div className="break-all font-serif text-[14.5px] text-ink">{value}</div>
    </Tag>
  );
}
