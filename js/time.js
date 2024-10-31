

document.getElementById("search-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    scrollToMatch();
  }
});


function scrollToMatch() {
  const searchText = document.getElementById("search-input").value.trim().toLowerCase();

  if (!searchText) {
    return; // No search term, do nothing
  }

  const menuPostDescElements = document.querySelectorAll(".menu-post-desc, .malayalam");

  for (const element of menuPostDescElements) {
    const elementText = element.textContent.toLowerCase();

    if (elementText.includes(searchText)) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }
  swal("No Item found !", "");

}


document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', calculateTotal);
});

function calculateTotal() {
  let total = 0;
  document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
      total += parseInt(item.dataset.price);
  });
  document.getElementById('totalAmount').textContent = total;
}

// Proceed button to display selected items on another page
document.getElementById('proceedBtn').addEventListener('click', () => {
  let selectedItems = [];
  document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
      selectedItems.push({
          name: item.dataset.name,
          price: item.dataset.price
      });
  });
  sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  sessionStorage.setItem('totalAmount', document.getElementById('totalAmount').textContent);
  window.location.href = 'summary.html';
});