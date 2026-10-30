
/* ===== EmailJS Settings ===== */

const EMAILJS_PUBLIC_KEY = "B43Yhi-d_rLeTpTX5";
const EMAILJS_SERVICE_ID = "service_av0apef";
const EMAILJS_OTP_TEMPLATE_ID = "template_mair7sa";
const EMAILJS_MESSAGE_TEMPLATE_ID = "template_dcpo6rn";

const MY_EMAIL = "porutselvi.tech@gmail.com";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* ===== Toast ===== */

let toastTimer;

function toast(msg) {
  const t = $("#toast");
  if (!t) return;

  t.textContent = msg;
  t.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    t.classList.remove("show");
  }, 3500);
}


/* ===== Placeholder Links ===== */

$$("a[data-link]").forEach(a => {
  const href = a.getAttribute("href") || "";

  if (!href.startsWith("REPLACE_")) return;

  a.setAttribute("aria-disabled", "true");
  a.title = "URL not added yet";

  a.addEventListener("click", e => {
    e.preventDefault();
    toast("Please add the " + a.dataset.link + " URL.");
  });
});


/* ===== Year ===== */

if ($("#year")) {
  $("#year").textContent = new Date().getFullYear();
}


/* ===== Mobile Menu ===== */

const burger = $("#burger");
const menu = $("#menu");

function setMenu(open) {
  if (!burger || !menu) return;

  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));

  burger.setAttribute(
    "aria-label",
    open ? "Close menu" : "Open menu"
  );
}

if (burger && menu) {
  burger.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
  });

  $$("a", menu).forEach(a => {
    a.addEventListener("click", () => setMenu(false));
  });
}


/* ===== Typing Animation ===== */

const roles = [
  "Frontend Developer",
  "Web Developer",
  "Creative Problem Solver"
];

const typed = $("#typed");

if (typed) {
  if (reduceMotion) {
    typed.textContent = roles[0];
  } else {
    let r = 0;
    let c = 0;
    let del = false;

    (function tick() {
      const word = roles[r];

      typed.textContent = word.slice(0, c);

      if (!del && c === word.length) {
        del = true;
        return setTimeout(tick, 1400);
      }

      if (del && c === 0) {
        del = false;
        r = (r + 1) % roles.length;
      }

      c += del ? -1 : 1;

      setTimeout(tick, del ? 40 : 80);
    })();
  }
}


/* ===== Scroll Reveal ===== */

if ("IntersectionObserver" in window) {

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach(el => io.observe(el));

  const links = $$("#menu a");

  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  $$("main section[id]").forEach(s => spy.observe(s));

} else {
  $$(".reveal").forEach(el => el.classList.add("in"));
}


/* ===== Back To Top ===== */

const topBtn = $("#top");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });
}


/* ===== Card Tilt ===== */

if (!reduceMotion) {
  $$(".tilt").forEach(card => {

    card.addEventListener("mousemove", e => {
      const b = card.getBoundingClientRect();

      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;

      card.style.transform =
        `perspective(700px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

  });
}


/* ===== Lightbox ===== */

const lb = $("#lb");
const lbImg = lb ? $("img", lb) : null;

let lastFocus;

function closeLb() {
  if (lb && !lb.hidden) {
    lb.hidden = true;

    if (lastFocus) {
      lastFocus.focus();
    }
  }
}

$$(".shot").forEach(button => {

  button.addEventListener("click", () => {

    if (!lb || !lbImg) return;

    lastFocus = button;

    lbImg.src = button.dataset.full;
    lbImg.alt = button.dataset.alt || "Project screenshot";

    lb.hidden = false;

    const closeButton = $("#lbx");

    if (closeButton) {
      closeButton.focus();
    }

  });

});

if (lb) {
  lb.addEventListener("click", e => {
    if (e.target === lb || e.target.id === "lbx") {
      closeLb();
    }
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    setMenu(false);
    closeLb();
  }
});


/* ===== Image Fallback ===== */

$$(".shot img").forEach(img => {

  img.addEventListener("error", () => {

    const fallback = document.createElement("span");

    fallback.textContent =
      "Screenshot missing: add it to assets/images/";

    fallback.style.cssText =
      "display:grid;place-items:center;height:100%;color:#C4B5FD;padding:1rem;text-align:center";

    img.replaceWith(fallback);

  });

});


/* ===== Background Orbs ===== */

(function orbs() {

  const cv = $("#orbs");
  if (!cv) return;

  const ctx = cv.getContext("2d");
  if (!ctx) return;

  let w, h;

  const dots = Array.from({ length: 36 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1 + Math.random() * 2,
    v: 0.00004 + Math.random() * 0.00008
  }));

  const fit = () => {
    w = cv.width = window.innerWidth;
    h = cv.height = window.innerHeight;
  };

  fit();

  window.addEventListener("resize", fit);

  function draw() {

    ctx.clearRect(0, 0, w, h);

    [
      [.15, .2, "139,92,246"],
      [.85, .75, "168,85,247"]
    ].forEach(([x, y, c]) => {

      const g = ctx.createRadialGradient(
        w * x, h * y, 0,
        w * x, h * y, Math.max(w, h) * 0.45
      );

      g.addColorStop(0, `rgba(${c},.18)`);
      g.addColorStop(1, "rgba(8,8,13,0)");

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

    });

    ctx.fillStyle = "rgba(196,181,253,.5)";

    dots.forEach(d => {

      if (!reduceMotion) {
        d.y = (d.y - d.v * 16 + 1) % 1;
      }

      ctx.beginPath();
      ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
      ctx.fill();

    });

    if (!reduceMotion) {
      requestAnimationFrame(draw);
    }
  }

  draw();

})();


/* ==========================================
   CONTACT FORM + 4 DIGIT EMAIL OTP
========================================== */

const form = $("#form");
const status = $("#status");
const sendBtn = $("#send");


/* ===== Status Message ===== */

function say(msg, cls = "") {
  if (!status) return;

  status.textContent = msg;
  status.className = cls;
}


/* ===== EmailJS Initialization ===== */

const configured = [
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_OTP_TEMPLATE_ID,
  EMAILJS_MESSAGE_TEMPLATE_ID
].every(v => v && !v.startsWith("YOUR_"));

if (configured && window.emailjs) {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}


/* ===== OTP Variables ===== */

let generatedOTP = null;
let otpExpiry = 0;


/* ===== Generate 4 Digit OTP ===== */

function generateOTP() {

  const randomValues = new Uint32Array(1);

  window.crypto.getRandomValues(randomValues);

  return String(
    1000 + (randomValues[0] % 9000)
  );

}


/* ===== Contact Form Submission ===== */

if (form && sendBtn) {

  form.addEventListener("submit", async e => {

    e.preventDefault();

    if (sendBtn.disabled) return;

    // Honeypot spam protection
    if (form.elements.website?.value) return;


    /* ===== Validate Fields ===== */

    let bad = false;

    $$("input:not(.hp), textarea", form).forEach(field => {

      const value = field.value.trim();

      const valid =
        value.length > 0 &&
        (
          field.type !== "email" ||
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        );

      field.classList.toggle("invalid", !valid);

      if (!valid) {
        bad = true;
      }

    });

    if (bad) {
      return say(
        "Please fill in every field and use a valid email address.",
        "err"
      );
    }


    /* ===== Check EmailJS ===== */

    if (!configured || !window.emailjs) {
      return say(
        "EmailJS is not configured. Please check your EmailJS IDs and library.",
        "err"
      );
    }


    /* ===== Get Form Values ===== */

    const name = form.elements.from_name.value.trim();
    const email = form.elements.reply_to.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();


    sendBtn.disabled = true;
    sendBtn.textContent = "Sending OTP...";


    try {

      /* ===== STEP 1: Generate OTP ===== */

      generatedOTP = generateOTP();

      otpExpiry = Date.now() + 5 * 60 * 1000;


      /* ===== STEP 2: Send OTP to Visitor Email ===== */

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_OTP_TEMPLATE_ID,
        {
          to_email: email,
          from_name: name,
          reply_to: email,
          otp: generatedOTP
        }
      );

      say(
        "4-digit OTP sent successfully! Please check your email.",
        "ok"
      );


      /* ===== STEP 3: Ask OTP ===== */

      const userOTP = prompt(
        "A 4-digit OTP has been sent to " + email +
        "\n\nEnter your OTP:"
      );


      if (userOTP === null) {

        generatedOTP = null;

        return say(
          "OTP verification cancelled.",
          "err"
        );

      }


      /* ===== STEP 4: Check OTP Expiry ===== */

      if (Date.now() > otpExpiry) {

        generatedOTP = null;

        return say(
          "OTP expired! Please submit the form again.",
          "err"
        );

      }


      /* ===== STEP 5: Verify OTP ===== */

      if (!/^\d{4}$/.test(userOTP.trim())) {

        generatedOTP = null;

        return say(
          "Please enter a valid 4-digit OTP.",
          "err"
        );

      }


      if (userOTP.trim() !== generatedOTP) {

        generatedOTP = null;

        return say(
          "Incorrect OTP! Message not sent.",
          "err"
        );

      }


      /* ===== STEP 6: Send Message to Your Gmail ===== */

      say(
        "OTP verified! Sending your message...",
        "ok"
      );

      sendBtn.textContent = "Sending message...";

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_MESSAGE_TEMPLATE_ID,
        {
          to_email: MY_EMAIL,
          from_name: name,
          reply_to: email,
          subject: subject,
          message: message
        }
      );


      /* ===== STEP 7: Success ===== */

      say(
        "Message sent successfully! Thank you. I'll reply soon.",
        "ok"
      );

      form.reset();

      generatedOTP = null;
      otpExpiry = 0;


    } catch (error) {

      console.error("EmailJS Error:", error);

      generatedOTP = null;

      say(
        "Email could not be sent. Please check your EmailJS templates, service and email settings.",
        "err"
      );

    } finally {

      sendBtn.disabled = false;
      sendBtn.textContent = "Send message";

    }

  });

}
