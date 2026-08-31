import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import { CheckCircle2, ExternalLink, Code2 } from 'lucide-react'

const difficultyBadge = {
  Easy: 'bg-accent/10 text-accent border-accent/30',
  Medium: 'bg-yellow-300/10 text-yellow-300 border-yellow-300/30',
  Hard: 'bg-red-400/10 text-red-400 border-red-400/30',
}

function LeetCode() {
  const { leetcodeDaily } = data
  return (
    <section className="pt-8 pb-12" id="problems">
      <FadeInSection>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
              <span className="text-accent font-sans mr-0.5">/</span>
              <span>Problem Solving & Algorithms</span>
            </h2>
            <p className="text-sm font-sans text-slate mt-1">
              Recent solved challenges & data structure problems
            </p>
          </div>

          <a
            href={leetcodeDaily.profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => sound.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate hover:text-accent transition-colors"
          >
            <span>View LeetCode</span>
            <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="rounded-2xl border border-lightest-navy/60 bg-light-navy/60 divide-y divide-lightest-navy/50 overflow-hidden shadow-lg">
          {leetcodeDaily.problems.map((problem) => (
            <a
              key={problem.date + problem.title}
              href={problem.solutionUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => sound.playClick()}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 transition-colors hover:bg-light-navy/90"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-navy border border-lightest-navy flex items-center justify-center text-accent">
                  <Code2 className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-base text-heading group-hover:text-accent transition-colors">
                      {problem.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                        difficultyBadge[problem.difficulty] || 'bg-light-navy text-slate border-lightest-navy'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {problem.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-slate"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate sm:self-center pl-11 sm:pl-0">
                <span className="inline-flex items-center gap-1 text-accent font-medium">
                  <CheckCircle2 className="size-3.5" />
                  <span>Solved</span>
                </span>
                <span>·</span>
                <span className="tabular-nums">{problem.date}</span>
              </div>
            </a>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}

export default LeetCode
