import GitHubContributions from './GitHubContributions.jsx'
import StatCards from './StatCards.jsx'
import Reveal from './Reveal.jsx'
import { ArrowUpRight } from 'lucide-react'
import data from '../data.js'

/*
 * The receipts: two live embeds. The GitHub card keeps GitHub's own visual
 * language (light contribution shades, its system font stack), while the
 * LeetCode card stays in the page's editorial one.
 */
function Activity() {
  return (
    <section
      id="activity"
      className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[minmax(240px,0.55fr)_minmax(0,1.45fr)] lg:gap-20">
        <aside className="h-fit min-w-0 lg:sticky lg:top-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
                the receipts
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
            </div>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              where the
              <br />
              <em className="font-normal italic text-muted-foreground">hours went.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Pulled live from GitHub and LeetCode. No screenshots of green squares — the squares
              are the point.
            </p>
          </Reveal>
          <Reveal delay={170}>
            <a
              href={data.github.profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline mt-8 inline-flex items-center gap-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-cursor="the whole trail."
            >
              see the whole trail
              <ArrowUpRight className="size-3.5" />
            </a>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-12 hidden font-hand text-[1.15rem] leading-snug text-muted-foreground lg:block">
              consistency, not heroics.
            </p>
          </Reveal>
        </aside>

        <div className="grid min-w-0 gap-6">
          <GitHubContributions />
          <StatCards />
        </div>
      </div>
    </section>
  )
}

export default Activity
