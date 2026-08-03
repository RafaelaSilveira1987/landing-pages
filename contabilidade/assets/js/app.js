(() => {
  "use strict";

  const CONFIG = {
    // Troque pelo WhatsApp do contador, com DDI + DDD + número. Exemplo: 5598999999999
    whatsappNumber: "5500000000000",
    businessName: "Contador Tributarista",
    defaultMessage: "Olá! Quero solicitar um diagnóstico tributário para minha empresa.",
    // Opcional: cole aqui um webhook do n8n/CRM para receber os leads também.
    webhookUrl: ""
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const header = $("[data-header]");
  const nav = $("[data-nav]");
  const menuToggle = $("[data-menu-toggle]");
  const backToTop = $("[data-back-to-top]");
  const toast = $("[data-toast]");
  const form = $("[data-lead-form]");

  const onlyDigits = (value) => String(value || "").replace(/\D/g, "");

  const setWhatsAppLinks = () => {
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.defaultMessage)}`;
    $$('[data-whatsapp-link]').forEach((link) => {
      link.href = url;
    });
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3500);
  };

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const updateBackToTop = () => {
    if (!backToTop) return;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    const degrees = Math.round(percent * 360);

    backToTop.style.background = `conic-gradient(var(--gold) ${degrees}deg, rgba(14, 34, 56, .12) ${degrees}deg)`;
    backToTop.classList.toggle("is-visible", window.scrollY > 420);
  };

  const setupMenu = () => {
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen ? '<i class="ti ti-x"></i>' : '<i class="ti ti-menu-2"></i>';
    });

    $$('a[href^="#"]', nav).forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="ti ti-menu-2"></i>';
      });
    });
  };

  const setupReveal = () => {
    const items = $$(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  };

  const setupMasks = () => {
    const phoneInput = $("#whatsapp");
    const cnpjInput = $("#cnpj");

    phoneInput?.addEventListener("input", (event) => {
      const value = onlyDigits(event.target.value).slice(0, 11);
      const part1 = value.slice(0, 2);
      const part2 = value.length > 10 ? value.slice(2, 7) : value.slice(2, 6);
      const part3 = value.length > 10 ? value.slice(7, 11) : value.slice(6, 10);

      event.target.value = [
        part1 ? `(${part1}` : "",
        part1.length === 2 ? ") " : "",
        part2,
        part3 ? `-${part3}` : ""
      ].join("");
    });

    cnpjInput?.addEventListener("input", (event) => {
      const value = onlyDigits(event.target.value).slice(0, 14);
      event.target.value = value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    });
  };

  const buildLeadMessage = (data) => {
    const lines = [
      "Olá! Quero solicitar um diagnóstico tributário.",
      "",
      `Nome: ${data.nome}`,
      `WhatsApp: ${data.whatsapp}`,
      data.email ? `E-mail: ${data.email}` : "",
      `Empresa: ${data.empresa}`,
      data.cnpj ? `CNPJ: ${data.cnpj}` : "",
      `Regime tributário: ${data.regime}`,
      data.faturamento ? `Faturamento médio: ${data.faturamento}` : "",
      data.mensagem ? `Dúvida/problema: ${data.mensagem}` : ""
    ].filter(Boolean);

    return lines.join("\n");
  };

  const sendToWebhook = async (payload) => {
    if (!CONFIG.webhookUrl) return;

    try {
      await fetch(CONFIG.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, origem: "landing-page-tributaria", enviadoEm: new Date().toISOString() })
      });
    } catch (error) {
      console.warn("Não foi possível enviar para o webhook:", error);
    }
  };

  const setupForm = () => {
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (!data.nome || !data.whatsapp || !data.empresa || !data.regime) {
        showToast("Preencha os campos obrigatórios para continuar.");
        return;
      }

      await sendToWebhook(data);

      const message = buildLeadMessage(data);
      const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

      showToast("Tudo certo. Abrindo WhatsApp com os dados do lead.");
      window.open(whatsappUrl, "_blank", "noopener");
      form.reset();
    });
  };

  const setupFaq = () => {
    const details = $$('[data-faq-list] details');

    details.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        details.forEach((other) => {
          if (other !== item) other.removeAttribute("open");
        });
      });
    });
  };

  const setupBackToTop = () => {
    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const setYear = () => {
    const yearElement = $("[data-year]");
    if (yearElement) yearElement.textContent = new Date().getFullYear();
  };

  window.addEventListener("scroll", () => {
    updateHeader();
    updateBackToTop();
  }, { passive: true });

  document.addEventListener("DOMContentLoaded", () => {
    setWhatsAppLinks();
    setupMenu();
    setupReveal();
    setupMasks();
    setupForm();
    setupFaq();
    setupBackToTop();
    setYear();
    updateHeader();
    updateBackToTop();
  });
})();
