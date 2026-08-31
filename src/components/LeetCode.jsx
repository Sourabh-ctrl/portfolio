import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'

const difficultyColors = {
  Easy: 'text-green border-green/40 bg-green/10',
  Medium: 'text-yellow-300 border-yellow-300/40 bg-yellow-300/10',
  Hard: 'text-red-400 border-red-400/40 bg-red-400/10',
}

function LeetCode() {
  const { leetcodeDaily } = data
  return (
    <section className="max-w-[70rem] mx-auto px-5 py-16 md:py-24" id="leetcode">
      <FadeInSection>
        <h2 className="flex items-center gap-4 text-white text-[clamp(1.4rem,3vw,2rem)] mb-10 whitespace-nowrap font-serif after:content-[''] after:block after:h-px after:flex-1 after:bg-lightest-navy/60">
          <span className="text-green font-sans mr-0.5">/</span>
          <span>{leetcodeDaily.heading || 'daily grind'}</span>
        </h2>

        <p className="text-slate max-w-[46rem] my-3 mb-10 leading-relaxed">
          {leetcodeDaily.description}
        </p>

        <div className="flex flex-col gap-4">
          {leetcodeDaily.problems.map((problem) => (
            <a
              key={problem.date + problem.title}
              href={problem.solutionUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-light-navy border border-lightest-navy/50 rounded-lg px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-green"
            >
              <span className="text-green font-mono text-sm whitespace-nowrap">
                {problem.date}
              </span>
              <span className="text-white text-lg font-serif group-hover:text-green transition-colors">
                {problem.title}
              </span>
              <span className="sm:ml-auto flex items-center gap-3">
                <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                  {problem.topics.map((t) => (
                    <li
                      key={t}
                      className="text-xs text-slate bg-lightest-navy/60 px-2.5 py-0.5 rounded-full font-mono"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span
                  className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                    difficultyColors[problem.difficulty] ||
                    'text-slate border-lightest-navy/60 bg-lightest-navy/40'
                  }`}
                >
                  {problem.difficulty}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={leetcodeDaily.profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-green hover:text-lightest-slate text-sm transition-colors before:content-['↗']"
          >
            View my LeetCode profile
          </a>
        </div>
      </FadeInSection>
    </section>
  )
}

export default LeetCode
