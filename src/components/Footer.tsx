import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { navItems } from '../data/nav';
import { siteConfig } from '../config/siteConfig';

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

const socials = [
  { href: siteConfig.links.instagram, label: 'Instagram', icon: Instagram },
  { href: siteConfig.links.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: siteConfig.links.youtube, label: 'YouTube', icon: Youtube },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="on-dark relative bg-void">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold uppercase leading-none tracking-tightest text-chalk">
              SWISF 2027
            </p>
            <p className="mt-2 text-[13px] font-medium tracking-[0.22em] text-cyan/85">
              CO-POWERED BY BOMBAY STOCK EXCHANGE
            </p>
            <p className="mt-6 max-w-[38ch] text-[14.5px] leading-relaxed text-haze">
              {siteConfig.tagline} <br /> A three-day summit and festival in Shillong, Meghalaya.
            </p>

            <div className="mt-8 flex items-center gap-2.5">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-haze transition-colors duration-300 hover:border-cyan/55 hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
              <a
                href={siteConfig.links.x}
                aria-label="X"
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-haze transition-colors duration-300 hover:border-cyan/55 hover:bg-cyan/10 hover:text-cyan"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-chalk/60">
              Navigate
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1 lg:gap-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-quiet text-[14.5px]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-chalk/60">
              Get in touch
            </h2>

            <ul className="mt-5 space-y-4 text-[14.5px]">
              <li className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-cyan/70" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-haze">
                  {siteConfig.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <Mail size={17} className="mt-0.5 shrink-0 text-cyan/70" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="link-quiet">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-cyan/70" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="link-quiet"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>

            <a
              href={siteConfig.links.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-block text-[13.5px] text-cyan underline decoration-cyan/30 underline-offset-4 transition-colors hover:decoration-cyan"
            >
              Open in Maps
            </a>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-3 text-[13px] text-haze/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} SWISF 2027. All rights reserved. Organised in association with E-Cell NIT Meghalaya.
          </p>
          <p>Built and maintained by the SWISF web team.</p>
        </div>
      </div>
    </footer>
  );
}
