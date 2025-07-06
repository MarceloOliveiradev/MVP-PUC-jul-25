const form = document.getElementById("predict-form");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const themeToggle = document.getElementById("themeToggle");

// Função para alternar tema
function setTheme(darkMode) {
  document.body.classList.toggle("dark", darkMode);

  // Ícone mais bonito de Sol (modo escuro) e Lua (modo claro)
  themeToggle.innerHTML = darkMode
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24"><path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-16a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm10-10a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM5 12a1 1 0 01-1 1H2a1 1 0 010-2h2a1 1 0 011 1zm13.66 6.66a1 1 0 010 1.42l-1.41 1.42a1 1 0 01-1.42-1.42l1.42-1.42a1 1 0 011.41 0zM6.34 6.34a1 1 0 010 1.42L4.93 9.17a1 1 0 01-1.42-1.42l1.42-1.41a1 1 0 011.41 0zm12.02 0a1 1 0 010 1.41l-1.42 1.42a1 1 0 11-1.41-1.42l1.41-1.41a1 1 0 011.42 0zM6.34 17.66a1 1 0 011.42 0l1.42 1.41a1 1 0 11-1.42 1.42L6.34 19.1a1 1 0 010-1.42z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="lightblue" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>`;
}

// Inicializa tema
setTheme(false);

// Alternar ao clicar no botão
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  setTheme(isDark);
});

// Submissão do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  result.textContent = "";
  loading.style.display = "block";

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = Number(value);
  });

  try {
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    loading.style.display = "none";

    if (json.prediction !== undefined) {
      const mensagem =
        json.prediction === 1
          ? "⚠️ Possível doença cardíaca"
          : "✅ Sem indicação de doença cardíaca";

      result.innerHTML = `Resultado: ${mensagem}<br>Probabilidade: <strong>${(
        json.probability * 100
      ).toFixed(2)}%</strong>`;
    } else {
      result.textContent = "Erro: " + (json.error || "requisição inválida");
    }
  } catch (err) {
    loading.style.display = "none";
    result.textContent = "❌ Erro ao conectar com a API.";
  }
});
