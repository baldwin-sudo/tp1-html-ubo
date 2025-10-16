document.addEventListener("DOMContentLoaded", function () {
  const formationButtons = document.querySelectorAll(".formation-item button");

  formationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isActive = button.classList.contains("active");

      // Remove active class from all buttons and their descriptions
      formationButtons.forEach((btn) => {
        btn.classList.remove("active");
        const description = btn.parentElement.querySelector("div");
        description.classList.remove("active-description");
        description.style.height = "0px"; // Collapse the description
      });

      // If not already active, activate this button and its description
      if (!isActive) {
        button.classList.add("active");
        const description = button.parentElement.querySelector("div");
        description.classList.add("active-description");
        description.style.height = description.scrollHeight + "px";
      }
    });
  });

  const skillListItems = document.querySelectorAll(".skills-list li");

  skillListItems.forEach((listItem) => {
    const skillButton = listItem.querySelector("button");
    const skillDescription = listItem.querySelector(".skill-description");

    skillButton.classList.add("skills-p");

    let inside = false; // Track if mouse is inside
    let parentRect = listItem.getBoundingClientRect();

    function showDescription(event) {
      // Hide all other descriptions
      document.querySelectorAll(".skill-description").forEach((desc) => {
        desc.classList.remove("active-skill-description");
      });

      skillDescription.style.left = event.clientX - parentRect.left + 10 + "px";
      skillDescription.style.top = event.clientY - parentRect.top + 10 + "px";

      skillDescription.classList.add("active-skill-description");
    }

    function hideDescription() {
      skillDescription.classList.remove("active-skill-description");
    }

    document.addEventListener("mousemove", (event) => {
      const x = event.clientX;
      const y = event.clientY;

      // Update parentRect in case of scroll or resize
      parentRect = listItem.getBoundingClientRect();

      // Check if mouse is inside skillButton bounds
      const btnRect = skillButton.getBoundingClientRect();

      if (
        x >= btnRect.left &&
        x <= btnRect.right &&
        y >= btnRect.top &&
        y <= btnRect.bottom
      ) {
        // Mouse is inside the button
        if (!inside) {
          // Mouse "entered"
          inside = true;
          // Your mouseenter logic
          showDescription(event);
        } else {
          // Mouse move inside - update position of description
          skillDescription.style.left = x - parentRect.left + 10 + "px";
          skillDescription.style.top = y - parentRect.top + 10 + "px";
        }
      } else {
        // Mouse is outside button
        if (inside) {
          // Mouse "left"
          inside = false;
          hideDescription();
        }
      }
    });
  });
});
