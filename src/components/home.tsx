import { useColorMode } from "@docusaurus/theme-common";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import React from "react";
import { FeaturesBento } from "./home/features-bento";
import { Logos } from "./home/frameworks";
import { PrimaryButton } from "./ui/button";
import { FlipWords } from "./ui/flip-words";

function Home() {
  const { withBaseUrl } = useBaseUrlUtils();
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    if (colorMode === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [colorMode]);

  function Header() {
    return (
      <div className="mt-20 mb-10 snap-start">
        {/* <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 z-[10]" fill="white" /> */}
        <div className="flex flex-col items-center rounded-md p-10 pb-0">
          <div className="text-center font-[Sora] text-black dark:text-white">
            <div className="flex items-center justify-center mb-2">
              <span
                role="img"
                aria-label="sparkles"
                className="mr-2 animate-pulse"
              >
                ✨
              </span>
              <span className="text-pink-600 font-semibold text-lg md:text-xl shimmer-effect mb-2">
                Flux0 0.1.0-beta.4 is out!
              </span>
              <span
                role="img"
                aria-label="sparkles"
                className="ml-2 animate-pulse"
              >
                ✨
              </span>
            </div>
            <p className="text-center text-4xl font-bold bg-gradient-to-tl from-neutral-900 to-neutral-600 md:text-8xl dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-transparent">
              Flux0: Multi-Agent, Streaming, Open
            </p>
            <p className="text-base md:text-2xl">
              Build, deploy, and orchestrate AI agents with real-time streaming
              and session management — all while staying framework-agnostic.
            </p>
          </div>
          <div className="flex my-12 gap-8">
            {/* <Button href={withBaseUrl('docs/quickstart/introduction')}>Find out more</Button> */}
            <PrimaryButton href={withBaseUrl("docs/quickstart/introduction")}>
              Quick Start
            </PrimaryButton>
          </div>
          {/* <VideoPlayer chapters={videoChapters} /> */}
        </div>
      </div>
    );
  }

  function Description() {
    return (
      <>
        {/* Showcase */}
        <div className="py-16 overflow-hidden snap-start">
          <div className="relative max-w-xl mx-auto px-4 md:px-6 lg:px-8 lg:max-w-screen-xl">
            <div className="max-w-screen-xl mx-auto mb-16 px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-3xl text-black dark:text-white font-bold leading-9 font-[Sora] md:text-4xl md:leading-10">
                  Your framework, your choice.
                </p>
                <p className="text-lg md:text-2xl text-slate-400 dark:text-slate-500">
                  From lightweight SDKs to full agent frameworks, Flux0
                  integrates seamlessly.
                </p>
              </div>
            </div>
            <Logos />

            {/* <div className="w-full flex justify-center">
              <a
                href="https://.."
                rel="noreferrer"
                target="_blank"
                className="text-center text-lg text-slate-400 dark:text-slate-500"
              >
                ...And <span className="font-bold">much more!</span>
              </a>
            </div> */}
          </div>
        </div>

        {/* Features */}
        <div className="py-16 overflow-hidden snap-start">
          <div className="relative max-w-xl mx-auto px-4 md:px-6 lg:px-8 lg:max-w-screen-xl">
            <div className="max-w-screen-xl mx-auto mb-16 px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-3xl text-black dark:text-white font-bold leading-9 font-[Sora] md:text-4xl md:leading-10">
                  The Infrastructure Behind Your Agents
                </p>
                <p className="text-lg md:text-2xl text-slate-400 dark:text-slate-500">
                  Streaming, sessions, orchestration, security and more — Flux0
                  takes care of the plumbing so you don’t have to.
                </p>
              </div>
            </div>
            <FeaturesBento />
          </div>
        </div>

        <div className="py-16 overflow-hidden snap-start">
          <div className="relative max-w-xl mx-auto px-4 md:px-6 lg:px-8 lg:max-w-screen-xl">
            <div className="max-w-screen-xl mx-auto mb-16 px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
                <div className="text-3xl mb-4 mt-12 text-black dark:text-white font-bold leading-9 font-[Sora] md:text-4xl md:leading-10">
                  Create{" "}
                  <FlipWords
                    className="text-pink-600"
                    words={[
                      "real-time streaming",
                      "multi-agent",
                      "streaming",
                      "framework‑agnostic",
                      "scalable",
                      "open",
                    ]}
                  />{" "}
                  <br />
                  with Flux0
                </div>
                <PrimaryButton
                  key="apply"
                  href={withBaseUrl("docs/quickstart/first-agent")}
                >
                  Your first agent
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container snap-y z-[10] snap-proximity">
        <Header />
        <Description />
      </div>
    </>
  );
}

export default Home;
