(function () {
  "use strict";


  const WHATSAPP_NUMBER = "5532987073537";
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const heroSection = document.querySelector(".hero");
  const backToTop = document.querySelector("[data-back-to-top]");

  function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function updateBackToTop() {
    if (!heroSection || !backToTop) return;

    const headerHeight = header?.offsetHeight || 0;
    const firstSectionEnded = heroSection.getBoundingClientRect().bottom <= headerHeight + 8;

    backToTop.classList.toggle("is-visible", firstSectionEnded);
    backToTop.setAttribute("aria-hidden", String(!firstSectionEnded));
    backToTop.tabIndex = firstSectionEnded ? 0 : -1;
  }

  function updateFloatingUi() {
    updateHeader();
    updateBackToTop();
  }

  function closeMenu() {
    nav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const willOpen = !nav?.classList.contains("is-open");
    nav?.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", willOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 880) closeMenu();
    updateBackToTop();
  });

  window.addEventListener("scroll", updateFloatingUi, { passive: true });
  updateFloatingUi();

  backToTop?.addEventListener("click", (event) => {
    event.preventDefault();

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  });

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.addEventListener("click", (event) => {
      const message = link.getAttribute("data-message");
      if (!message) return;
      event.preventDefault();
      openWhatsApp(message);
    });
  });

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const projectCards = Array.from(document.querySelectorAll("[data-category]"));
  const filterEmpty = document.querySelector("[data-filter-empty]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter || "all";
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        const visible = selected === "all" || categories.includes(selected);
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (filterEmpty) filterEmpty.hidden = visibleCount > 0;
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const phoneInput = document.querySelector("[data-phone]");
  phoneInput?.addEventListener("input", () => {
    const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;

    if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;

    phoneInput.value = formatted;
  });

  const leadForm = document.getElementById("leadForm");
  leadForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      return;
    }

    const form = new FormData(leadForm);
    const message = [
      "Olá! Vi os projetos da RS Digital Lab e quero conversar sobre uma ideia.",
      "",
      `Nome: ${form.get("nome") || ""}`,
      `WhatsApp: ${form.get("whatsapp") || ""}`,
      `Preciso de: ${form.get("servico") || ""}`,
      `Tipo de negócio: ${form.get("negocio") || ""}`,
      `Principal objetivo: ${form.get("objetivo") || ""}`,
      `Sobre a ideia: ${form.get("mensagem") || "Ainda vou explicar melhor na conversa."}`,
    ].join("\n");

    openWhatsApp(message);
  });

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
