document.addEventListener("DOMContentLoaded", function () {
  const formationButtons = document.querySelectorAll(".formation-item button");

  formationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isActive = button.classList.contains("active");

      // Remove active from all buttons
      formationButtons.forEach((btn) => btn.classList.remove("active"));
      // Remove active-description from all description divs
      formationButtons.forEach((btn) => {
        const desc = btn.parentElement.querySelector("div");
        desc.classList.remove("active-description");
        // reset height
        desc.style.height = "0px";
      });

      // Toggle the clicked button and its description only if it was not active
      if (!isActive) {
        button.classList.add("active");
        const curr_desc = button.parentElement.querySelector("div");
        curr_desc.classList.add("active-description");

        const fullHeight = curr_desc.scrollHeight + "px";

        curr_desc.style.height = fullHeight;
      }
    });
  });

  const skills_paragraphs = document.querySelectorAll(".skills-list li");
  skills_paragraphs.forEach((p) => {
    p.classList.add("skills-p");
    p.addEventListener("click", function () {
      const curr_desc = [
        ...p.parentElement.querySelectorAll(".skill-description"),
      ][0];
      curr_desc.classList.add("active-skill-description");
    });
  });
});
