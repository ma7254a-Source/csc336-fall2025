const FIXED_SPINS = 6;
const SPIN_MS = 4000;
const LABEL_RADIUS_RATIO = 0.78;

const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];
const reds = new Set([32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3]);
const colorOf = n => (reds.has(n) ? "#d54040" : "#16191f");

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const betInput = document.querySelector("#betInput");
const resultEl = document.querySelector("#result");
const historyEl = document.getElementById("history");


const winOverlay = document.createElement("div");
winOverlay.id = "winOverlay";
wheel.appendChild(winOverlay);

const slotCount = wheelNumbers.length;
const sliceDeg = 360 / slotCount;

let deg = 0;
const gradientParts = [];
wheelNumbers.forEach(num => {
  gradientParts.push(`${colorOf(num)} ${deg}deg ${deg + sliceDeg}deg`);
  deg += sliceDeg;
});
wheel.style.background = `conic-gradient(${gradientParts.join(",")})`;

const labels = [];
wheelNumbers.forEach(num => {
  const span = document.createElement("span");
  span.className = "label";
  span.textContent = String(num);
  span.style.whiteSpace = "nowrap";
  wheel.appendChild(span);
  labels.push(span);
});

function layoutLabels() {
  const rect = wheel.getBoundingClientRect();
  const R = rect.width / 2;
  const labelR = R * LABEL_RADIUS_RATIO;
  const thetaRad = (Math.PI / 180) * sliceDeg;
  const arc = labelR * thetaRad;
  const fontPx = Math.max(10, Math.min(16, Math.floor(arc * 0.55)));
  labels.forEach((span, i) => {
    const center = i * sliceDeg + sliceDeg / 2;
    span.style.fontSize = `${fontPx}px`;
    span.style.transform =
      `translate(-50%, -50%) rotate(${center}deg) translate(0, -${labelR}px) rotate(${-center}deg)`;
  });
}
layoutLabels();
let resizeRAF;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeRAF);
  resizeRAF = requestAnimationFrame(layoutLabels);
});

const loseBank = [
  "Better luck next time!",
  "You just lost the house!",
  "Annnnd there goes junior's college fund.",
  "Lady Luck left the chat.",
  "Close! But no cigar.",
  "You should totally spin again",
  "Guess who's getting a divorce!",
  "You didn't want to retire, did you?"
];

let bgTimeout;
function pulseBackground(color) {
  document.body.style.transition = "background 450ms ease";
  const original = getComputedStyle(document.body).background;
  document.body.style.background =
    `radial-gradient(900px 420px at 75% -20%, ${hexToRGBA(color, .35)} 0%, transparent 55%), var(--bg)`;
  clearTimeout(bgTimeout);
  bgTimeout = setTimeout(() => { document.body.style.background = original; }, 950);
}
function hexToRGBA(hex, a = 1) {
  const c = hex.replace("#","").match(/[a-f\d]{2}/gi).map(h => parseInt(h,16));
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
}

function prepSpinFromZero() {
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  void wheel.offsetWidth;
  wheel.style.transition = `transform ${SPIN_MS}ms cubic-bezier(.2,.65,0,1)`;
}

function spin() {
  const betRaw = betInput.value.trim();
  const bet = Number.parseInt(betRaw, 10);
  if (!Number.isInteger(bet) || bet < 0 || bet > 36) {
    resultEl.textContent = "Enter a valid number between 0 and 36.";
    pulseBackground("#ff5a5f");
    return;
  }

  const winningIndex = Math.floor(Math.random() * slotCount);
  const winningNumber = wheelNumbers[winningIndex];

  const centerAngle = winningIndex * sliceDeg + sliceDeg / 2;
  const targetRotation = FIXED_SPINS * 360 + (360 - centerAngle);

  spinBtn.disabled = true;
  labels.forEach(l => l.classList.remove("highlight"));
  winOverlay.style.opacity = "0";
  winOverlay.style.background = "none";

  prepSpinFromZero();
  requestAnimationFrame(() => {
    wheel.style.transform = `rotate(${targetRotation}deg)`;
  });

  let finished = false;
  const onEnd = () => {
    if (finished) return;
    finished = true;

    labels[winningIndex].classList.add("highlight");

    const startD = winningIndex * sliceDeg;
    const endD = startD + sliceDeg;
    winOverlay.style.background =
      `conic-gradient(transparent 0deg ${startD}deg, rgba(24,199,126,0.95) ${startD}deg ${endD}deg, transparent ${endD}deg 360deg)`;
    winOverlay.style.opacity = "1";

    const didWin = bet === winningNumber;
    if (didWin) {
      resultEl.textContent = `You Win! 🎉 Number: ${winningNumber}`;
      pulseBackground("#18c77e");
    } else {
      const msg = loseBank[Math.floor(Math.random() * loseBank.length)];
      resultEl.textContent = `${msg} (Winning number: ${winningNumber})`;
      pulseBackground("#ff5a5f");
    }

    const li = document.createElement("li");
    li.className = didWin ? "win" : "lose";
    li.textContent = `Bet ${bet} → ${winningNumber} • ${didWin ? "WIN" : "LOSE"}`;
    historyEl.prepend(li);

    spinBtn.disabled = false;
  };

  wheel.addEventListener("transitionend", onEnd, { once: true });
  setTimeout(onEnd, SPIN_MS + 80);
}

spinBtn.addEventListener("click", spin);
betInput.addEventListener("keydown", (e) => { if (e.key === "Enter") spinBtn.click(); });
