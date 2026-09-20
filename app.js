const $ = id => document.getElementById(id);

let active = "plant";
let saved = [];
let last = 0;

const defs = {

  plant: {
    name: "O‘simlik o‘sishi",
    cat: "BIOLOGIYA / TAJRIBA 01",
    desc: "Suv, yorug‘lik va harorat o‘simlik rivojlanishiga qanday ta’sir qiladi?",

    labels: [
      "☀ Yorug‘lik",
      "💧 Suv miqdori",
      "🌡 Harorat"
    ],

    units: ["%", "%", "°C"],

    vals: [70, 60, 24],

    min: [0, 0, 0],
    max: [100, 100, 45],

    ends: [
      ["Kam", "Ko‘p"],
      ["Quruq", "Serob"],
      ["0°C", "45°C"]
    ],

    metric: "O‘sish indeksi",

    explain:
      "O‘simlikka me’yorida suv, yetarli yorug‘lik va mos harorat kerak.",

    quiz: [
      "O‘simlik o‘sishi uchun qaysi sharoitlar muhim?",
      [
        "Faqat suv",
        "Suv, yorug‘lik va mos harorat",
        "Faqat yorug‘lik"
      ],
      1
    ]
  },

  heat: {
    name: "Suv harorati",
    cat: "FIZIKA / TAJRIBA 02",

    desc:
      "Isitish quvvati va suv miqdori qizish jarayoniga qanday ta’sir qiladi?",

    labels: [
      "🔥 Isitish quvvati",
      "💧 Suv miqdori",
      "🌡 Boshlang‘ich harorat"
    ],

    units: ["%", "ml", "°C"],

    vals: [50, 250, 20],

    min: [0, 50, 0],
    max: [100, 500, 45],

    ends: [
      ["Past", "Yuqori"],
      ["50 ml", "500 ml"],
      ["0°C", "45°C"]
    ],

    metric: "Qizish indeksi",

    explain:
      "Isitish quvvati oshishi qizishni tezlashtiradi.",

    quiz: [
      "Bir xil quvvatda suv miqdori ko‘paysa nima bo‘ladi?",
      [
        "Qizish sekinlashadi",
        "Darhol qaynaydi",
        "O‘zgarmaydi"
      ],
      0
    ]
  },

  light: {
    name: "Yorug‘lik tajribasi",
    cat: "FIZIKA / TAJRIBA 03",

    desc:
      "Manba kuchi va masofa yoritilganlikka qanday ta’sir qiladi?",

    labels: [
      "💡 Manba kuchi",
      "↔ Masofa",
      "🌡 Muhit harorati"
    ],

    units: ["%", "sm", "°C"],

    vals: [65, 40, 24],

    min: [0, 10, 0],
    max: [100, 150, 45],

    ends: [
      ["Kam", "Kuchli"],
      ["10 sm", "150 sm"],
      ["0°C", "45°C"]
    ],

    metric: "Yoritilganlik indeksi",

    explain:
      "Manbadan uzoqlashganda yorug‘lik darajasi kamayadi.",

    quiz: [
      "Manbadan uzoqlashganda yoritilganlik odatda…",
      [
        "Ortadi",
        "Kamayadi",
        "Bir xil qoladi"
      ],
      1
    ]
  },

  seed: {
    name: "Urug‘ unishi",
    cat: "BIOLOGIYA / TAJRIBA 04",

    desc:
      "Namlik, harorat va yorug‘lik urug‘ unishiga qanday ta’sir qiladi?",

    labels: [
      "💧 Namlik",
      "🌡 Harorat",
      "☀ Yorug‘lik"
    ],

    units: ["%", "°C", "%"],

    vals: [65, 24, 35],

    min: [0, 0, 0],
    max: [100, 45, 100],

    ends: [
      ["Quruq", "Nam"],
      ["0°C", "45°C"],
      ["Qorong‘i", "Yorqin"]
    ],

    metric: "Unish indeksi",

    explain:
      "Urug‘ unishi uchun namlik va mos harorat muhim.",

    quiz: [
      "Urug‘ unishi uchun odatda nima zarur?",
      [
        "Namlik va mos harorat",
        "Faqat yorug‘lik",
        "Faqat sovuq"
      ],
      0
    ]
  },

  magnet: {
    name: "Magnit maydoni",
    cat: "FIZIKA / TAJRIBA 05",

    desc:
      "Magnit kuchi va masofa jozibaga qanday ta’sir qilishini kuzating.",

    labels: [
      "🧲 Magnit kuchi",
      "↔ Masofa",
      "🧱 To‘siq qalinligi"
    ],

    units: ["%", "sm", "sm"],

    vals: [75, 20, 1],

    min: [0, 10, 0],
    max: [100, 150, 10],

    ends: [
      ["Kuchsiz", "Kuchli"],
      ["Yaqin", "Uzoq"],
      ["0 sm", "10 sm"]
    ],

    metric: "Ta’sir indeksi",

    explain:
      "Magnit ta’siri masofa ortgani sari kamayadi.",

    quiz: [
      "Magnitdan uzoqlashganda ta’sir odatda…",
      [
        "Kuchayadi",
        "Kamayadi",
        "O‘zgarmaydi"
      ],
      1
    ]
  },

  density: {
    name: "Zichlik tajribasi",
    cat: "FIZIKA / TAJRIBA 06",

    desc:
      "Jism massasi va hajmi zichlikni qanday belgilashini o‘rganing.",

    labels: [
      "⚖ Massa",
      "🧊 Hajm",
      "🌡 Harorat"
    ],

    units: ["g", "sm³", "°C"],

    vals: [300, 100, 20],

    min: [10, 100, 0],
    max: [1000, 500, 45],

    ends: [
      ["10 g", "1000 g"],
      ["100 sm³", "500 sm³"],
      ["0°C", "45°C"]
    ],

    metric: "Nisbiy zichlik",

    explain:
      "Zichlik massa va hajm nisbatidir: ρ = m / V.",

    quiz: [
      "Zichlik qanday hisoblanadi?",
      [
        "Massa × hajm",
        "Massa ÷ hajm",
        "Hajm ÷ massa"
      ],
      1
    ]
  },

  sound: {
    name: "Tovush to‘lqini",
    cat: "FIZIKA / TAJRIBA 07",

    desc:
      "Chastota va amplituda tovush to‘lqiniga qanday ta’sir qiladi?",

    labels: [
      "〰 Chastota",
      "📶 Amplituda",
      "↔ Masofa"
    ],

    units: ["Hz", "%", "m"],

    vals: [440, 60, 2],

    min: [100, 0, 1],
    max: [1000, 100, 20],

    ends: [
      ["Past", "Yuqori"],
      ["Kichik", "Katta"],
      ["Yaqin", "Uzoq"]
    ],

    metric: "To‘lqin ko‘rsatkichi",

    explain:
      "Chastota tovush balandligini, amplituda esa tovush kuchini belgilaydi.",

    quiz: [
      "Chastota oshsa, tovush odatda…",
      [
        "Ingichkaroq eshitiladi",
        "Pastroq eshitiladi",
        "Yo‘qoladi"
      ],
      0
    ]
  }

};

function buildSliders() {

  const d = defs[active];

  $("sliders").innerHTML = d.labels.map((label, i) => `

    <div class="slider">

      <div class="sliderhead">
        <label for="range${i}">
          ${label}
        </label>

        <output id="out${i}"></output>
      </div>

      <input
        id="range${i}"
        type="range"
        min="${d.min[i]}"
        max="${d.max[i]}"
        value="${d.vals[i]}"
      >

      <div class="ends">
        <span>${d.ends[i][0]}</span>
        <span>${d.ends[i][1]}</span>
      </div>

    </div>

  `).join("");

  d.vals.forEach((v, i) => {

    $("range" + i)
      .addEventListener(
        "input",
        calculate
      );

  });

}

function values() {

  return [0, 1, 2].map(
    i => +$("range" + i).value
  );

}

function calculate() {

  const d = defs[active];

  const [a, b, c] = values();

  let score;
  let text;

  if (active === "plant") {

    score = Math.round(

      Math.max(
        0,
        100 - Math.abs(a - 70) * 1.35
      ) * 0.38 +

      Math.max(
        0,
        100 - Math.abs(b - 60) * 1.65
      ) * 0.34 +

      Math.max(
        0,
        100 - Math.abs(c - 24) * 3.2
      ) * 0.28

    );

    text =
      score > 78
      ? "Sharoitlar qulay."
      : score > 48
      ? "Ayrim sharoitlarni yaxshilash mumkin."
      : "Sharoitlar noqulay.";

    $("scenehint").textContent =
      "O‘simlik holati: " + score + "%";

    $("sun").textContent = "☀";

  }

  else if (active === "heat") {

    score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          a * 0.72 +
          (500 - b) / 5 * 0.22 +
          c * 0.2
        )
      )
    );

    text =
      "Isitish quvvati oshsa qizish tezlashadi.";

    $("scenehint").textContent =
      "Suv harorati: " +
      Math.round(c + a * 0.45) +
      "°C";

    $("sun").textContent = "♨";

  }

  else if (active === "light") {

    score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          a * 100 /
          (Math.max(10, b) * 0.8)
        )
      )
    );

    text =
      "Masofa ortganda yoritilganlik kamayadi.";

    $("scenehint").textContent =
      "Yoritilganlik: " +
      score +
      "%";

    $("sun").textContent = "💡";

  }

  else if (active === "seed") {

    score = Math.round(

      Math.max(
        0,
        100 - Math.abs(a - 65)
      ) * 0.45 +

      Math.max(
        0,
        100 - Math.abs(b - 24) * 3
      ) * 0.4 +

      Math.max(
        0,
        100 - Math.abs(c - 35)
      ) * 0.15

    );

    text =
      "Namlik va mos harorat urug‘ unishiga yordam beradi.";

    $("scenehint").textContent =
      "Unish holati: " +
      score +
      "%";

    $("sun").textContent = "🌱";

  }

  else if (active === "magnet") {

    score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          a * 100 /
          (
            b *
            (1 + c * 0.12)
          )
        )
      )
    );

    text =
      "Masofa ortishi magnit ta’sirini kamaytiradi.";

    $("scenehint").textContent =
      "Magnit ta’siri: " +
      score +
      "%";

    $("sun").textContent = "🧲";

  }

  else if (active === "density") {

    const density = a / b;

    score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          density * 35
        )
      )
    );

    text =
      "Zichlik: " +
      density.toFixed(2) +
      " g/sm³";

    $("scenehint").textContent =
      "Zichlik: " +
      density.toFixed(2) +
      " g/sm³";

    $("sun").textContent = "⚖";

  }

  else {

    score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          a / 10 * 0.55 +
          b * 0.35 +
          (20 - c) * 2
        )
      )
    );

    text =
      "Chastota va amplituda tovush xususiyatlariga ta’sir qiladi.";

    $("scenehint").textContent =
      "To‘lqin: " +
      a +
      " Hz";

    $("sun").textContent = "〰";

  }

  d.units.forEach((u, i) => {

    $("out" + i).textContent =
      values()[i] + u;

  });

  $("result").textContent =
    d.metric +
    ": " +
    score +
    "%";

  $("resultdesc").textContent =
    text;

  $("status").textContent =
    score > 75
    ? "Qulay"
    : score > 45
    ? "O‘rtacha"
    : "Past";

  $("lastScore").textContent =
    score + "%";

  last = score;

  renderChart();

}

function choose(id) {

  active = id;

  document
    .querySelectorAll(".navitem")
    .forEach(x => {

      x.classList.toggle(
        "selected",
        x.dataset.id === id
      );

    });

  const d = defs[id];

  $("category").textContent = d.cat;
  $("title").textContent = d.name;
  $("desc").textContent = d.desc;
  $("learnText").textContent = d.explain;
  $("activeName").textContent = d.name;

  buildSliders();

  $("quiz").hidden = true;

  $("quizToggle").textContent =
    "Testni ochish →";

  renderQuiz();

  calculate();

}

function renderQuiz() {

  const q = defs[active].quiz;

  $("question").textContent =
    q[0];

  $("answers").innerHTML =
    q[1].map((v, i) => `

      <button data-i="${i}">
        ${String.fromCharCode(65 + i)}.
        ${v}
      </button>

    `).join("");

  $("answers")
    .querySelectorAll("button")
    .forEach(b => {

      b.onclick = () => {

        const correct =
          +b.dataset.i === q[2];

        $("feedback").textContent =
          correct
          ? "To‘g‘ri! Ajoyib."
          : "Noto‘g‘ri. Yana urinib ko‘ring.";

      };

    });

}

function renderChart() {

  let data =
    saved
      .filter(
        x => x.lab === active
      )
      .map(
        x => x.score
      );

  if (last !== null) {
    data.push(last);
  }

  const points =
    data.slice(-8)
      .map((v, i) => {

        const x =
          data.length <= 1
          ? 300
          : i * 600 /
            (
              Math.min(
                data.length,
                8
              ) - 1
            );

        const y =
          180 -
          v * 1.7;

        return `${x},${y}`;

      })
      .join(" ");

  $("line")
    .setAttribute(
      "points",
      points
    );

  $("chartCount").textContent =
    data.length + " ta";

}

function renderReports() {

  const root =
    $("reportsList");

  if (!saved.length) {

    root.innerHTML =
      `<div class="empty">
        Hozircha natija yo‘q.
      </div>`;

    return;

  }

  root.innerHTML =
    saved
      .slice()
      .reverse()
      .map((x, i) => `

        <div class="reportrow">

          <span>
            ${saved.length - i}
          </span>

          <b>
            ${x.name}
          </b>

          <span>
            ${x.params.join(" · ")}
          </span>

          <b>
            ${x.score}%
          </b>

          <span>
            ${x.time}
          </span>

        </div>

      `)
      .join("");

}

$("save").onclick = () => {

  const d =
    defs[active];

  saved.push({

    lab: active,

    name: d.name,

    params:
      values().map(
        (v, i) =>
          v +
          d.units[i]
      ),

    score: last,

    time:
      new Date()
        .toLocaleTimeString(
          "uz-UZ",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )

  });

  $("doneCount").textContent =
    saved.length;

  renderReports();
  renderChart();

  toast(
    "Natija jurnalga saqlandi!"
  );

};

$("reset").onclick = () => {

  defs[active]
    .vals
    .forEach((v, i) => {

      $("range" + i).value =
        v;

    });

  calculate();

};

$("clear").onclick = () => {

  saved = [];

  $("doneCount").textContent =
    "0";

  renderReports();
  renderChart();

};

$("quizToggle").onclick = () => {

  $("quiz").hidden =
    !$("quiz").hidden;

};

$("theme").onclick = () => {

  document.body
    .classList.toggle(
      "dark"
    );

};

function toast(text) {

  $("toast").textContent =
    text;

  $("toast")
    .classList
    .add("show");

  setTimeout(() => {

    $("toast")
      .classList
      .remove("show");

  }, 2200);

}

document
  .querySelectorAll(".navitem")
  .forEach(b => {

    b.onclick = () =>
      choose(
        b.dataset.id
      );

  });

choose("plant");