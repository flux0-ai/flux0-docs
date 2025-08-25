import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

// Logo metadata with direct links.
const logos = [
  { alt: 'LangChain', src: 'img/frameworks/langchain.svg', width: 158, href: 'docs/agents-examples/langchain_simple' },
  { alt: 'LangGraph', src: 'img/frameworks/langgraph.svg', width: 158, href: 'https://langchain-ai.github.io/langgraph' },
  { alt: 'PydanticAI', src: 'img/frameworks/pydanticai.svg', width: 158, href: 'https://ai.pydantic.dev/'},
  { alt: 'OpenAI SDK', src: 'img/frameworks/openai.svg', width: 158, href: 'docs/agents-examples/openai_simple'},
]

export const Logos = () => {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="-mx-6 grid grid-cols-3 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-4">
          {logos.map(({ alt, src, width, href }) => (
            <a
              key={alt}
              href={withBaseUrl(href)}
              className="bg-gray-400/7 dark:bg-xenon-900 p-6 sm:p-10 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer inset-shadow-none hover:inset-shadow-sm hover:bg-blue-400/40 !no-underline"
            >
              <img alt={alt} src={src} width={width} height={48} className="max-h-12 w-full object-contain" />
              <span className="mt-4 text-sm font-medium text-zinc-400 dark:text-slate-200 !no-underline">{alt}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};