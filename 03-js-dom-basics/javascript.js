const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];
const reds = new Set([32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3]);
const colorOf = n => (n === 0 ? "#0db35e" : reds.has(n) ? "#d54040" : "#16191f");

const wheel = document.getElementById("wheel");             
const spinBtn = document.getElementById("spinBtn");
const betInput = document.querySelector("#betInput");        
const resultEl = document.querySelector("#result");
const historyEl = document.getElementById("history");
const slotCount = wheelNumbers.length;
const slice = 360 / slotCount;

let deg = 0;
const gradientParts = [];
wheelNumbers.forEach((num) => {
  const start = deg;
  const end = deg + slice;
  gradientParts.push(`${colorOf(num)} ${start}deg ${end}deg`);
  deg = end;
});
wheel.style.background = `conic-gradient(${gradientParts.join(",")})`;

const labels = [];
wheelNumbers.forEach((num, i) => {
  const centerDeg = i * slice + slice / 2;
  const span = document.createElement("span");
  span.className = "label";
  span.textContent = String(num);
  span.style.transform =
    `translate(-50%, -50%) rotate(${centerDeg}deg) translate(0, calc(-42%)) rotate(${-centerDeg}deg)`;
  wheel.appendChild(span);
  labels.push(span);
});

let lastRotation = 0;
const loseBank = [
  "Better luck next time!",
  "You just lost the house!",
  "Man you suck at this.",
  "Lady Luck left the chat.",
  "Close! But no cigar.",
  "You should totally hit it again.",
  "Annnd there goes junior's college fund.",
];

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
  const centerAngle = winningIndex * slice + slice / 2;
  const spins = 4 + Math.floor(Math.random() * 4); 
  const targetRotation = spins * 360 + (360 - centerAngle);

  spinBtn.disabled = true;
  labels.forEach(l => l.classList.remove("highlight"));

  requestAnimationFrame(() => {
    wheel.style.transform = `rotate(${targetRotation}deg)`;
  });

  wheel.addEventListener("transitionend", () => {
    lastRotation = targetRotation;

    labels[winningIndex].classList.add("highlight");

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
  }, { once: true });
}

spinBtn.addEventListener("click", spin);

betInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") spinBtn.click();
});

let bgTimeout;
function pulseBackground(color) {
  document.body.style.transition = "background 450ms ease";
  const original = getComputedStyle(document.body).background;
  document.body.style.background =
    `radial-gradient(900px 420px at 75% -20%, ${hexToRGBA(color, .35)} 0%, transparent 55%), var(--bg)`;
  clearTimeout(bgTimeout);
  bgTimeout = setTimeout(() => {
    document.body.style.background = original;
  }, 950);
}

function hexToRGBA(hex, a = 1) {
  const c = hex.replace("#","").match(/[a-f\d]{2}/gi).map(h => parseInt(h,16));
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
}
