import { articles } from "../data/writing";

export default function Writing() {
  return (
    <div>
      <section className="max-w-2xl mb-20">
        <h1 className="mb-5">Writing</h1>
        <p className="text-lg md:text-xl text-ink-light leading-relaxed">
          Thinking on product strategy, team structure, and the work of
          building things that matter.
        </p>
      </section>

      <div className="max-w-2xl divide-y divide-cream-dark">
        {articles.map((article) => (
          <a
            key={article.title}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-8 first:pt-0 no-underline group"
          >
            <p className="text-xs tracking-wide uppercase text-ink-light mb-2">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              &middot; {article.source}
            </p>
            <h3 className="text-xl text-ink group-hover:text-madrona transition-colors mb-2">
              {article.title}
            </h3>
            <p className="text-ink-light leading-relaxed">
              {article.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
