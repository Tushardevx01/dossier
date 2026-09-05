"use client";

import { LuRefreshCw, LuPower, LuCheck } from "react-icons/lu";

export const SubscriptionTrackerServer = () => {
  return (
    <section id="server" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>13</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>SERVER ENGINEERING</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Dynamic Port Fallback &amp; Graceful Shutdown
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Node applications often fail in development and containerized production due to port
          conflicts (EADDRINUSE) or severed connections during rolling deployments. The server bootstrap
          solves both.
        </p>
      </div>

      {/* Grid: Port Probing & Shutdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dynamic Port Probing Card */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <LuRefreshCw className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Dynamic Port Probing</h3>
                <p className="text-xs text-neutral-400 font-mono">EADDRINUSE Recovery</p>
              </div>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              10 Attempts
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Instead of crashing when the default port (5500) is occupied by a lingering process or
            another service, the bootstrap spins up transient test servers to probe sequential ports
            until an open socket is secured.
          </p>

          <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`const findAvailablePort = async (startPort, maxAttempts = 10) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = startPort + attempt;
    const isAvailable = await probePort(port);
    if (isAvailable) return port;
  }
  throw new Error(\`No port available after \${maxAttempts} tries\`);
};`}
            </pre>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Eliminates local development collisions and Docker port clashes</span>
          </div>
        </div>

        {/* Graceful Teardown Card */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <LuPower className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Graceful Teardown</h3>
                <p className="text-xs text-neutral-400 font-mono">SIGINT / SIGTERM Interceptor</p>
              </div>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              8000ms Timeout
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Intercepts termination signals from orchestrators (Docker/Kubernetes). Stops accepting new
            inbound requests, allows in-flight responses to complete cleanly, and triggers a safety
            timeout to prevent hung processes.
          </p>

          <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`const gracefulShutdown = (signal) => {
  server.close(() => {
    console.log('HTTP server closed cleanly');
    process.exit(0);
  });
  // Force exit after 8000ms if connections stall
  setTimeout(() => process.exit(1), 8000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));`}
            </pre>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Prevents abruptly dropping client requests during rolling deployments</span>
          </div>
        </div>
      </div>
    </section>
  );
};
