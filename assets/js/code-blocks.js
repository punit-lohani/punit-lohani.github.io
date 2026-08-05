document.querySelectorAll(".language-sql").forEach((block) => {
  const button = document.createElement("button");

  button.className = "code-copy-button";
  button.type = "button";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy SQL");

  button.addEventListener("click", async () => {
    const code = block.querySelector("code").innerText;
    await navigator.clipboard.writeText(code);

    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1500);
  });

  block.appendChild(button);
});
