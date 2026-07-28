import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { PRESS_YEAR } from '../data/press';
import { Mark } from './Shell';

/* Same anatomy as the landing Footer — Products column links back to the
   imwy.ai sections, so the two sites read as one house. */
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-bg-sunken">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-start justify-between gap-8 px-6 py-12 max-md:px-4">
        <div className="max-w-[360px]">
          <div className="flex items-center gap-3">
            <Mark />
            <span className="text-title font-emph tracking-[0.08em] text-text-strong">
              imwy.ai <span className="font-body text-text-muted">/ portfolio</span>
            </span>
          </div>
          <p className="mt-3 text-dense leading-relaxed text-text-muted">
            The witness file of the engineer behind imwy.ai — cybersecurity project leadership,
            AI-assisted engineering under expert control, and the evidence to prove it.
          </p>
        </div>
        <div className="flex gap-16 max-md:gap-10">
          <div>
            <p className="text-meta font-emph uppercase tracking-[0.1em] text-text-faint">Products</p>
            <ul className="mt-3 space-y-2 text-dense">
              <li>
                <a className="text-text-muted transition-colors hover:text-text-strong" href="https://imwy.ai/#codewitness">
                  CodeWitness
                </a>
              </li>
              <li>
                <a className="text-text-muted transition-colors hover:text-text-strong" href="https://imwy.ai/#mimir">
                  Mimir
                </a>
              </li>
              <li>
                <a className="text-text-muted transition-colors hover:text-text-strong" href="https://imwy.ai/#beacon">
                  Beacon
                </a>
              </li>
              <li>
                <a className="text-text-muted transition-colors hover:text-text-strong" href="https://imwy.ai/">
                  imwy.ai — the platform
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-meta font-emph uppercase tracking-[0.1em] text-text-faint">Contact</p>
            <ul className="mt-3 space-y-2 text-dense">
              <li>
                <a
                  className="text-text-muted transition-colors hover:text-text-strong"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="text-text-muted transition-colors hover:text-text-strong" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="text-text-muted transition-colors hover:text-text-strong" href={`mailto:${profile.emailPersonal}`}>
                  {profile.emailPersonal}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-2 px-6 py-4 text-meta text-text-faint max-md:px-4">
          <span>© {PRESS_YEAR} Ferenc Bereczki · imwy.ai</span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
