
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






































document.getElementById('incplus').addEventListener('click', () => {
  const plus = parseInt(document.getElementById('qntynmb').textContent, 10) + 1;
  let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
  selectedItems.forEach(savedItem => {
      document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
          const itemName = checkbox.dataset.name;
          const itemIndex = selectedItems.findIndex(item => item.name === itemName);
          if (itemIndex !== -1) {
              selectedItems[itemIndex].quantity = plus;
              localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
          }


      });
  });
  calculateTotal(plus, minus = null);
});
document.getElementById('incmin').addEventListener('click', () => {
  const minus = parseInt(document.getElementById('qntynmb').textContent, 10) - 1;

  let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
  selectedItems.forEach(savedItem => {
      document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
          const itemName = checkbox.dataset.name;
          const itemIndex = selectedItems.findIndex(item => item.name === itemName);
          if (itemIndex !== -1) {
              selectedItems[itemIndex].quantity = minus;
              localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
          }
      });
  });
  calculateTotal(plus = null, minus);
});
const checkboxContainers = document.querySelectorAll('.checkbox-container');
document.querySelectorAll('.checkbox-container').forEach(container => {
  container.addEventListener('click', function (event) {
      const quantityDiv = document.getElementById('qntynmb');
      if (quantityDiv) {
          quantityDiv.textContent = '1';
      }

      if (event.target.tagName !== 'INPUT') {
          const checkbox = container.querySelector('.menu-checkbox');
          checkbox.checked = !checkbox.checked; // Toggle checkbox state
          container.classList.toggle('checked', checkbox.checked); // Add/remove 'checked' class

          let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
          const itemData = {
              name: checkbox.dataset.name,
              price: checkbox.dataset.price,
              quantity: 1
          };
          // If the checkbox is checked, add the item; otherwise, remove it
          if (checkbox.checked) {
              const incrementContainers = document.querySelector('.showincrementdiv');

              // incrementContainers.forEach(container => {
                  const incrementButton = createIncrementButton();
                  incrementContainers.appendChild(incrementButton);
              // });
              selectedItems.push(itemData);
          } else {
              selectedItems = selectedItems.filter(item => item.name !== itemData.name);
          }

          // Save updated selected items to local storage
          localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
          toggleProceedButton();
          calculateTotal(plus = null, minus = null);

      }
  });
});


function toggleProceedButton() {
  const proceedButton = document.querySelector('.total-section');
  const anyCheckboxChecked = document.querySelectorAll('.menu-checkbox:checked').length > 0;
  const incrementbutton = document.querySelector('.incrementbutton');
  if (anyCheckboxChecked) {
      incrementbutton.classList.remove('d-none');
      proceedButton.classList.remove('d-none'); // Show the button
  } else {
      incrementbutton.classList.add('d-none');
      proceedButton.classList.add('d-none'); // Hide the button
      localStorage.clear();
  }
}



function calculateTotal(plus, minus) {
  let total = 0;
  document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
      total += parseInt(item.dataset.price, 10);
  });
  if (plus) {
      total = total * plus;
  }
  if (minus) {
      let values = document.getElementById('totalAmountWithLabel').textContent
      let numericValue = values.replace(/[^0-9.]/g, '');
      total = numericValue - total;
  }
  const formattedTotal = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
  }).format(total);

  document.getElementById('totalAmountWithLabel').textContent = `Total: ${formattedTotal}`;
}


window.addEventListener('DOMContentLoaded', loadSelectedItems);
function loadSelectedItems() {
  const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
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
function clearStorage() {
  localStorage.clear();
  location.reload();
}



//proceed button
document.getElementById('proceedBtn').addEventListener('click', () => {

  const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
  const itemsList = document.getElementById('selectedItemsList');
  itemsList.innerHTML = '';
  let totalPrice = 0;
  savedItems.forEach(savedItem => {
      const listItem = document.createElement('li');
      listItem.textContent = `${savedItem.name} - ₹${savedItem.price} - (${savedItem.quantity}) `;
      itemsList.appendChild(listItem);
      totalPrice += parseFloat(savedItem.price) * savedItem.quantity;

  });
  document.getElementById('finalAmount').textContent = `₹${totalPrice}`;

});


const buttons = document.querySelectorAll(".buttonincr");
const minValue = 1;
const maxValue = 60;

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
      const element = event.currentTarget;
      const parent = element.parentNode;
      const numberContainer = parent.querySelector(".qntitynumber");
      const number = parseFloat(numberContainer.textContent);
      const increment = parent.querySelector(".plus");
      const decrement = parent.querySelector(".minus");
      const newNumber = element.classList.contains("plus")
          ? number + 1
          : number - 1;
      numberContainer.textContent = newNumber;
      console.log(newNumber);
      if (newNumber === minValue) {
          decrement.disabled = true;
          numberContainer.classList.add("dim");
          element.blur();
      } else if (newNumber > minValue && newNumber < maxValue) {
          decrement.disabled = false;
          increment.disabled = false;
          numberContainer.classList.remove("dim");
      } else if (newNumber === maxValue) {
          increment.disabled = true;
          numberContainer.textContent = `${newNumber}+`;
          element.blur();
      }
  });
});



function createIncrementButton() {
  // Create a container div
  const incrementButtonDiv = document.createElement('div');
  incrementButtonDiv.className = 'incrementbutton';

  // Create the "Decrease" button
  const minusButton = document.createElement('button');
  minusButton.className = 'buttonincr minus';
  minusButton.id = 'incmin';
  minusButton.setAttribute('aria-label', 'Decrease by one');
  minusButton.disabled = true;

  const minusSvg = `
    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon"></line>
    </svg>`;
  minusButton.innerHTML = minusSvg;
  incrementButtonDiv.appendChild(minusButton);

  // Create the quantity number div
  const quantityDiv = document.createElement('div');
  quantityDiv.className = 'qntitynumber dim';
  quantityDiv.id = 'qntynmb';
  quantityDiv.textContent = '1';
  incrementButtonDiv.appendChild(quantityDiv);

  // Create the "Increase" button
  const plusButton = document.createElement('button');
  plusButton.className = 'buttonincr plus';
  plusButton.id = 'incplus';
  plusButton.setAttribute('aria-label', 'Increase by one');

  const plusSvg = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
      <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2"></line>
      <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2"></line>
    </svg>`;
  plusButton.innerHTML = plusSvg;
  incrementButtonDiv.appendChild(plusButton);

  return incrementButtonDiv;
}