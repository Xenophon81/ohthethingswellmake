const modelToggle = document.querySelector('#toggleModel');
const servingsInput = document.querySelector('#servings');
const servingsLabel = document.querySelector('#servingsLabel');
const recipeYield = document.querySelector('#recipeYield');
const recipeCbd = document.querySelector('#recipeCbd');
const jarSize = document.querySelector('#jarSize');
const ingredientAmounts = document.querySelectorAll('[data-base]');
const printButton = document.querySelector('#printRecipe');
const rateButton = document.querySelector('#rateRecipe');

modelToggle.addEventListener('click', () => {
  const isVisible = document.body.classList.toggle('show-model');
  modelToggle.setAttribute('aria-pressed', String(isVisible));
  modelToggle.textContent = isVisible ? 'Verberg Drupal-velden' : 'Toon Drupal-velden';
});

const updateRecipe = () => {
  const servings = Number(servingsInput.value);
  const factor = servings / 60;
  const yieldText = `${servings} ml`;
  servingsLabel.textContent = yieldText;
  recipeYield.textContent = yieldText;
  jarSize.textContent = yieldText;
  recipeCbd.textContent = `${Math.round(300 * factor)} mg`;
  ingredientAmounts.forEach((amount) => {
    const value = Number(amount.dataset.base) * factor;
    const formatted = Number.isInteger(value) ? value : value.toFixed(1).replace('.', ',');
    const unit = amount.textContent.includes('ml') ? 'ml' : 'g';
    amount.textContent = `${formatted} ${unit}`;
  });
};

servingsInput.addEventListener('input', updateRecipe);
servingsInput.addEventListener('change', updateRecipe);

printButton.addEventListener('click', () => window.print());

rateButton.addEventListener('click', () => {
  const isRated = rateButton.getAttribute('aria-pressed') === 'true';
  rateButton.setAttribute('aria-pressed', String(!isRated));
  rateButton.textContent = isRated ? '☆ Waardeer' : '★ Gewaardeerd';
});
