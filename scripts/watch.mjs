// Rebuild _site/ whenever content/ or design/ changes (debounced). Runs on the box.
//   npm run watch
//   POST_BUILD_CMD="./deploy.sh" npm run watch   # optional hook after every successful build
// content/inbox/ and *_*.md scratch files are ignored: they are never published anyway.
import { spawn } from "node:child_process";
import chokidar from "chokidar";

const DEBOUNCE_MS = Number(process.env.WATCH_DEBOUNCE_MS || 1500);
let timer = null, running = false, queued = false;

function build() {
  if (running) { queued = true; return; }
  running = true;
  const t0 = Date.now();
  console.log(`[watch] ${new Date().toISOString()} building…`);
  const p = spawn("npm", ["run", "build", "--silent"], { stdio: "inherit" });
  p.on("exit", (code) => {
    console.log(`[watch] build ${code === 0 ? "OK" : "FAILED (" + code + ")"} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    const done = () => { running = false; if (queued) { queued = false; build(); } };
    if (code === 0 && process.env.POST_BUILD_CMD) spawn(process.env.POST_BUILD_CMD, { shell: true, stdio: "inherit" }).on("exit", done);
    else done();
  });
}
const schedule = () => { clearTimeout(timer); timer = setTimeout(build, DEBOUNCE_MS); };

chokidar
  .watch(["content", "design", "lib", "src"], {
    ignoreInitial: true,
    ignored: (p) => /(^|[\\/])(inbox|node_modules|src[\\/]og|\.git)([\\/]|$)/.test(p) || /[\\/]content[\\/]_[^\\/]*$/.test(p) || /\.(tmp|swp)$|~$/.test(p),
  })
  .on("all", (ev, f) => { console.log(`[watch] ${ev} ${f}`); schedule(); });

console.log("[watch] watching content/, design/, lib/, src/ …");
build();
