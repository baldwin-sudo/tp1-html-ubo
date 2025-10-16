// this was done solo , but i used ai to refactor code hence the structure .
document.addEventListener("DOMContentLoaded", async function () {
  let skillsData = { skills: [] };

  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Failed to load data.json");
    skillsData = await response.json();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }

  const formationButtons = document.querySelectorAll(".formation-item button");

  formationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isActive = button.classList.contains("active");

      formationButtons.forEach((btn) => {
        btn.classList.remove("active");
        const description = btn.parentElement.querySelector("div");
        description.classList.remove("active-description");
        description.style.height = "0px";
      });

      if (!isActive) {
        button.classList.add("active");
        const description = button.parentElement.querySelector("div");
        description.classList.add("active-description");
        description.style.height = description.scrollHeight + "px";
      }
    });
  });

  const skillList = document.querySelector(".skills-list");
  skillList.innerHTML = "";

  skillsData.skills.forEach((skill) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent =
      skill.name.charAt(0).toUpperCase() + skill.name.slice(1);
    button.classList.add("skills-p");

    // Add level indicator stars
    const levelIndicator =
      "★".repeat(skill.level) + "☆".repeat(5 - skill.level);
    const levelInfo = document.createElement("span");
    levelInfo.textContent = ` (${levelIndicator})`;
    levelInfo.style.fontSize = "0.9em";
    levelInfo.style.opacity = "0.8";
    button.appendChild(levelInfo);

    // Description
    const description = document.createElement("div");
    description.classList.add("skill-description");
    description.textContent = skill.description || "No description available.";

    li.appendChild(button);
    li.appendChild(description);
    skillList.appendChild(li);
  });

  const skillListItems = document.querySelectorAll(".skills-list li");

  skillListItems.forEach((listItem) => {
    const skillButton = listItem.querySelector("button");
    const skillDescription = listItem.querySelector(".skill-description");

    let inside = false;
    let parentRect = listItem.getBoundingClientRect();

    function showDescription(event) {
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

      parentRect = listItem.getBoundingClientRect();
      const btnRect = skillButton.getBoundingClientRect();

      if (
        x >= btnRect.left &&
        x <= btnRect.right &&
        y >= btnRect.top &&
        y <= btnRect.bottom
      ) {
        if (!inside) {
          inside = true;
          showDescription(event);
        } else {
          skillDescription.style.left = x - parentRect.left + 10 + "px";
          skillDescription.style.top = y - parentRect.top + 10 + "px";
        }
      } else if (inside) {
        inside = false;
        hideDescription();
      }
    });
  });
});
