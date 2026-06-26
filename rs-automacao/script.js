(function () {
  const WHATSAPP_NUMBER = "5532987073537";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  function onlyNumbers(value) {
    return String(value || "").replace(/\D+/g, "");
  }

  function openWhatsApp(message) {
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
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


  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const leadForm = document.getElementById("leadForm");

  if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!leadForm.checkValidity()) {
        leadForm.reportValidity();
        return;
      }

      const form = new FormData(leadForm);
      const nome = form.get("nome") || "";
      const whatsapp = form.get("whatsapp") || "";
      const negocio = form.get("negocio") || "";
      const dor = form.get("dor") || "";
      const mensagem = form.get("mensagem") || "";

      const leadPhone = onlyNumbers(whatsapp);
      const text = [
        "Olá! Quero um diagnóstico gratuito da RS Automação Digital.",
        "",
        `Nome: ${nome}`,
        `Meu WhatsApp: ${leadPhone || whatsapp}`,
        `Tipo de negócio: ${negocio}`,
        `Maior dor hoje: ${dor}`,
        `O que quero automatizar: ${mensagem || "Ainda não sei exatamente."}`,
      ].join("\n");

      openWhatsApp(text);
    });
  }
})();
