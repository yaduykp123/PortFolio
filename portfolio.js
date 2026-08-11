document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const MY_EMAIL = "yadukrishnanP917@gmail.com";

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.querySelector("input[name='name']");
      const emailInput = document.querySelector("input[name='email']");
      const messageInput = document.querySelector("textarea[name='message']");

      const nameVal = nameInput ? nameInput.value : "";
      const emailVal = emailInput ? emailInput.value : "";
      const messageVal = messageInput ? messageInput.value : "";

      const subject = "Portfolio Message from " + nameVal;
      const body = "Sender Name: " + nameVal + "\nSender Email: " + emailVal + "\n\nMessage:\n" + messageVal;

      const mailtoUrl = "mailto:" + MY_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      if (formStatus) {
        formStatus.classList.remove("hidden");
        formStatus.className = "p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-medium block";
        formStatus.innerHTML = "Opening email app to send to <strong>" + MY_EMAIL + "</strong>...";
      }

      window.location.href = mailtoUrl;

      setTimeout(function () {
        contactForm.reset();
      }, 1000);
    });
  }
});
