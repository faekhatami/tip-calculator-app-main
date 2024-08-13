document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".tip-btn");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalAmountDisplay = document.getElementById("total-amount");
  const resetBtn = document.getElementById("reset-btn");

  let billValue = 0.0;
  let peopleValue = 1;
  let tipValue = 0.15; // Default to 15% tip

  function calculateTip() {
    if (peopleValue > 0) {
      const tipAmount = (billValue * tipValue) / peopleValue;
      const totalAmount = (billValue + billValue * tipValue) / peopleValue;
      tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }
  }

  billInput.addEventListener("input", function () {
    billValue = parseFloat(billInput.value);
    calculateTip();
  });

  peopleInput.addEventListener("input", function () {
    peopleValue = parseInt(peopleInput.value);
    calculateTip();
  });

  tipButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tipButtons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");
      tipValue = parseFloat(btn.getAttribute("data-tip")) / 100;
      customTipInput.value = ""; // Clear custom tip input when a button is clicked
      calculateTip();
    });
  });

  customTipInput.addEventListener("input", function () {
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipValue = parseFloat(customTipInput.value) / 100;
    calculateTip();
  });

  resetBtn.addEventListener("click", function () {
    billInput.value = "";
    peopleInput.value = "1";
    customTipInput.value = "";
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipButtons[2].classList.add("active"); // Set 15% tip as default
    tipValue = 0.15;
    billValue = 0.0;
    peopleValue = 1;
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
  });
});
