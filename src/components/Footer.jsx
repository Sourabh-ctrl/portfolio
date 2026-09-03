import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import { Mail, ArrowUpRight } from 'lucide-react'

function Footer() {
  const { identity, socials } = data
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-8 pb-16" id="contact">
      <FadeInSection>
        {/* Contact CTA Card */}
        <div className="rounded-3xl border border-lightest-navy/60 bg-linear-to-b from-light-navy/80 to-navy p-8 sm:p-10 text-center shadow-soft">
          <div className="mx-auto size-12 rounded-2xl bg-navy border border-lightest-navy flex items-center justify-center text-accent mb-4 shadow-sm">
            <Mail className="size-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-heading">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>contact</span>
          </h2>

          <p className="mt-3 text-base font-sans text-slate max-w-md mx-auto leading-relaxed">
            I&apos;m always open to interesting opportunities and conversations.
            Reach out at{' '}
            <a
              href={`mailto:${identity.email}`}
              className="text-accent hover:text-lightest-slate transition-colors underline-offset-4 hover:underline"
            >
              {identity.email}
            </a>
            .
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href={`mailto:${identity.email}`}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-2xl border border-accent bg-accent/10 hover:bg-accent/20 text-accent px-6 py-3 text-sm font-sans font-semibold shadow-md transition-all duration-350 active:scale-97 cursor-pointer"
            >
              <span>Say hi!</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright and social row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-lightest-navy/40 text-xs font-sans text-slate">
          <p className="flex items-center gap-1">
            <span>Designed & developed by {identity.name}</span>
            <span>·</span>
            <span>© {currentYear}</span>
          </p>

          <div className="flex items-center gap-4 font-mono text-xs">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                onClick={() => sound.playClick()}
                className="hover:text-accent text-slate transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </FadeInSection>
    </footer>
  )
}

export default Footer
