export const FeaturesBento = () => {
  return (
    <div className="pb-8">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {/* Built for Agents */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg dark:bg-gray-400/7 bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <img alt="Agents collaborating on tasks" src="/img/resources/agents.png" className="h-80 object-cover object-left" />
              <div className="p-10 pt-4">
                <p className="text-xl font-semibold text-pink-600 font-[Sora] dark:text-white my-4">Built for Agents</p>
                <p className="mt-2 max-w-lg text-base text-gray-600 dark:text-slate-100">
                  Orchestrate multiple agents that collaborate, delegate, and share context across the same session—without extra glue code.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
          </div>

          {/* Real-Time Streaming */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg dark:bg-gray-400/7 bg-white lg:rounded-tr-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img alt="Live event stream flowing to UI" src="/img/resources/streaming.png" className="h-80 object-cover object-left lg:object-right" />
              <div className="p-10 pt-4">
                <p className="text-xl font-semibold text-pink-600 font-[Sora] dark:text-white my-4">Real-Time Streaming</p>
                <p className="mt-2 max-w-lg text-base text-gray-600 dark:text-slate-100">
                  Stream tokens, tool calls, and state via JSONPatch over SSE for instant, resilient UI updates—no polling, no sockets to babysit.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl" />
          </div>

          {/* Record / Resume / Replay */}
          <div className="relative lg:col-span-6">
            <div className="absolute inset-0 rounded-lg dark:bg-gray-400/7 bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <img alt="Timeline of recorded session events" src="/img/resources/recording.png" className="h-80 object-cover" />
              <div className="p-10 pt-4">
                <p className="text-xl font-semibold text-pink-600 font-[Sora] dark:text-white my-4">
                  Record. Resume. Replay.
                </p>
                <p className="mt-2 text-base text-gray-600 dark:text-slate-100">
                  Capture every event in a session and replay it exactly as seen—for debugging, demos, incident repro, and cost-effective regression runs.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* Pluggable & Customizable */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg dark:bg-gray-400/7 bg-white lg:rounded-bl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <img alt="Config knobs and modular blocks" src="/img/resources/customizable.png" className="h-80 object-cover object-left" />
              <div className="p-10 pt-4">
                <p className="text-xl font-semibold text-pink-600 font-[Sora] dark:text-white my-4">Pluggable & Customizable</p>
                <p className="mt-2 max-w-lg text-base text-gray-600 dark:text-slate-100">
                  Start fast with in-memory/JSON, scale to databases, and adapt the APIs to your stack. Bring your own UI—Flux0 stays out of the way.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl" />
          </div>

          {/* Your framework, your choice */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg dark:bg-gray-400/7 bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <img alt="Interlocking pieces showing compatibility" src="/img/resources/frameworks.png" className="h-80 object-cover" />
              <div className="p-10 pt-4">
                <p className="text-xl font-semibold text-pink-600 font-[Sora] dark:text-white my-4">Your framework, your choice</p>
                <p className="mt-2 max-w-lg text-base text-gray-600 dark:text-slate-100">
                  Flux0 is framework-agnostic—use your favorite tools and libraries with no lock-in.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};