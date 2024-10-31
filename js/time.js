

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


// Toggle checkbox and style when clicking on the entire .checkbox-container div
document.querySelectorAll('.checkbox-container').forEach(container => {
  container.addEventListener('click', function (event) {
    // Prevent default checkbox label click behavior
    if (event.target.tagName !== 'INPUT') {
      const checkbox = container.querySelector('.menu-checkbox');
      checkbox.checked = !checkbox.checked; // Toggle checkbox state
      container.classList.toggle('checked', checkbox.checked); // Add/remove 'checked' class
      calculateTotal(); // Update total after toggle
    }
  });
});

// Recalculate total whenever a checkbox changes
function calculateTotal() {
  let total = 0;
  
  // Sum up prices from all checked checkboxes
  document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
    total += parseInt(item.dataset.price, 10);
  });

  // Format the total as INR currency
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(total);

  // Display the formatted total in the target element
  document.getElementById('totalAmountWithLabel').textContent = `Total: ${formattedTotal}`;
}

// document.querySelectorAll('.checkbox-container').forEach(container => {
//   container.addEventListener('click', function () {
//      const checkbox = container.querySelector('.menu-checkbox');
//      checkbox.checked = !checkbox.checked;
//      container.classList.toggle('checked', checkbox.checked);
//   });
// });
// document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
//   checkbox.addEventListener('change', calculateTotal);
// });

// function calculateTotal() {
//   let total = 0;
//   alert(total);
//   document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
//     total += parseInt(item.dataset.price);
//   });

//   // Format the total with a currency symbol (optional)
//   const formattedTotal = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR'
//   }).format(total);

//   // Combine the label and total for display
//   const totalWithLabel = `Total: ${formattedTotal}`;

//   // Update the content of the new span element
//   document.getElementById('totalAmountWithLabel').textContent = totalWithLabel;
// }

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
  sessionStorage.setItem('totalAmount', document.getElementById('totalAmountWithLabel').textContent);
  window.location.href = 'summary.html';
});
