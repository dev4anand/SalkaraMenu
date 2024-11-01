
//search button
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

//checkbox summarry

document.querySelectorAll('.checkbox-container').forEach(container => {
  container.addEventListener('click', function (event) {
    // Prevent default checkbox label click behavior
    if (event.target.tagName !== 'INPUT') {
      const checkbox = container.querySelector('.menu-checkbox');
      checkbox.checked = !checkbox.checked; // Toggle checkbox state
      container.classList.toggle('checked', checkbox.checked); // Add/remove 'checked' class
      toggleProceedButton();     
      calculateTotal(); // Update total after toggle
    }
  });
});


document.getElementById('proceedBtn').addEventListener('click', () => {
  // sessionStorage.clear();
  let selectedItems = [];
  document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
      selectedItems.push({
          name: item.dataset.name,
          price: item.dataset.price
      });
  });
  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  localStorage.setItem('totalAmount', document.getElementById('totalAmountWithLabel').textContent);

  const selectedItemsdis = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const totalAmount = localStorage.getItem('totalAmount') || 0;

  const itemsList = document.getElementById('selectedItemsList');
  
  // Clear the existing items in the list to avoid repetition
  itemsList.innerHTML = '';

  selectedItemsdis.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ₹${item.price}`;
      itemsList.appendChild(listItem);
  });

  document.getElementById('finalAmount').textContent = totalAmount;
});

//function to calculate the total 
function calculateTotal() {
  let total = 0;
  
  document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
    total += parseInt(item.dataset.price, 10);
  });

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(total);

  document.getElementById('totalAmountWithLabel').textContent = `Total: ${formattedTotal}`;
}

function toggleProceedButton() {
  const proceedButton = document.querySelector('.total-section');
  const anyCheckboxChecked = document.querySelectorAll('.menu-checkbox:checked').length > 0;
  
  if (anyCheckboxChecked) {
    proceedButton.classList.remove('d-none'); // Show the button
  } else {
    proceedButton.classList.add('d-none'); // Hide the button
  }
}

function loadSelectedItems() {
  const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  savedItems.forEach(savedItem => {
    document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
      if (checkbox.dataset.name === savedItem.name) {
        checkbox.checked = true;
        checkbox.closest('.checkbox-container').classList.add('checked');
      }
    });
  });
  toggleProceedButton(); // Update button visibility
}

// Call loadSelectedItems on page load
window.addEventListener('DOMContentLoaded', loadSelectedItems);

function clearStorage(){
  localStorage.clear();
        location.reload(); 
}