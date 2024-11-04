let lastSelectedContainer = null;

window.addEventListener('DOMContentLoaded', loadSelectedItems);

function loadSelectedItems() {
    const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
    let totalPrice = 0;
    savedItems.forEach(savedItem => {
        // Select the checkbox based on the name
        document.querySelectorAll('.checkbox-container').forEach(checkbox => {
            
            if (checkbox.dataset.name === savedItem.name) {
                checkbox.checked = true;
                const container = checkbox.closest('.checkbox-container');
                container.classList.add('checked');
                 totalPrice += parseFloat(savedItem.price) * savedItem.quantity;
               
                // Update the quantity display
                const quantityCountDiv = container.querySelector('.quantitycountdiv');
                if (quantityCountDiv) {
                    quantityCountDiv.textContent = ` (${savedItem.quantity})`;
                }
            }
        });
       
    });
    if(totalPrice != 0){
        document.getElementById('totalAmountWithLabel').textContent = ` Total:₹${totalPrice}`;
    }
    
    //  toggleProceedButton(); // Ensure the proceed button state is updated
}

document.querySelectorAll('.checkbox-container').forEach(container => {
    container.addEventListener('click', function (event) {
        // Ignore clicks on the increment or decrement buttons
        if (event.target.closest('.incrementbutton')) {
            return;
        }

        const checkbox = container.querySelector('.menu-checkbox');
        checkbox.checked = !checkbox.checked; // Toggle the checkbox
        container.classList.toggle('checked', checkbox.checked);

        // Check if the increment div already exists
        const existingIncrementDiv = container.querySelector('.showincrementdiv');
        if (existingIncrementDiv) {
            existingIncrementDiv.remove();
        }

        // Load items from localStorage
        let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
        const itemName = container.dataset.name;
        const itemData = {
            id: container.dataset.id,
            name: itemName,
            price: container.dataset.price,
            quantity: 1
        };
        const quantityCountDiv = container.querySelector('.quantitycountdiv');

        if (quantityCountDiv) {
            quantityCountDiv.textContent = '';
            // quantityCountDiv.remove();
        }
        // Check if item is in localStorage
        const itemIndex = selectedItems.findIndex(item => item.name === itemName);

        if (!checkbox.checked) {
            // Remove item from localStorage if unchecked
            if (itemIndex > -1) selectedItems.splice(itemIndex, 1);
            container.classList.remove('checked');
            localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
            return;
        }

        // Create and append increment div
        const incrementDiv = document.createElement('div');
        incrementDiv.className = 'showincrementdiv';
        incrementDiv.dataset.name = itemName;
        incrementDiv.innerHTML = `
            <div class="incrementbutton input">
                <button data-price="${itemData.price}" data-id="${itemData.id}" class="buttonincr minus" aria-label="Decrease by one">
                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
                    </svg>
                </button>
                <div class="qntitynumber dim" id="qntynmb">1</div>
                <button data-price="${itemData.price}" data-id="${itemData.id}" class="buttonincr plus" aria-label="Increase by one">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
                        <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
                    </svg>
                </button>
            </div>
        `;

        // Load quantity if the item exists in localStorage
        if (itemIndex > -1) {
            itemData.quantity = selectedItems[itemIndex].quantity;
            incrementDiv.querySelector('#qntynmb').textContent = itemData.quantity;
        }

        // Append the increment div to the container
        container.appendChild(incrementDiv);

        // Update localStorage
        if (itemIndex > -1) {
            selectedItems[itemIndex] = itemData;
        } else {
            selectedItems.push(itemData);
        }
        localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
    });
});



// Helper function to remove item from localStorage
function removeItemFromLocalStorage(itemName) {
    let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
    selectedItems = selectedItems.filter(item => item.name !== itemName);
    localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
}
document.addEventListener('click', function (event) {
    // Check if the clicked element is an increment button
    if (event.target.closest('.buttonincr.plus')) {
        event.preventDefault(); // Prevent the default action

        const incrementButton = event.target.closest('.buttonincr.plus');
        const container = incrementButton.closest('.checkbox-container');

        if (container) {
            // Get the item name and ID from the data attribute
            const itemName = container.querySelector('.menu-checkbox').dataset.name;
            const itemId = container.dataset.id; // Assuming each container has a unique ID

            // Get the current quantity from the UI
            const quantityElement = container.querySelector('#qntynmb');
            let currentQuantity = parseInt(quantityElement.textContent, 10) || 1;

            // Increment the quantity
            currentQuantity += 1;
            quantityElement.textContent = currentQuantity; // Update the UI

            // Update the quantity in localStorage
            let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
            const itemIndex = selectedItems.findIndex(item => item.id === itemId); // Check by ID

            if (itemIndex !== -1) {
                // If the item exists, update the quantity
                selectedItems[itemIndex].quantity = currentQuantity;
            } else {
                // If the item doesn't exist, add it
                selectedItems.push({
                    id: itemId,
                    name: itemName,
                    price: container.querySelector('.menu-checkbox').dataset.price,
                    quantity: currentQuantity
                });
            }

            // Save the updated items to localStorage
            localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
            // const quantityCountDiv = container.querySelector('.quantitycountdiv');
            // if (quantityCountDiv) {
            //     quantityCountDiv.textContent = ` (${currentQuantity})`;
            // }
        }
    }

    // Check if the clicked element is a decrement button
    if (event.target.closest('.buttonincr.minus')) {
       
        event.preventDefault(); // Prevent the default action

        const decrementButton = event.target.closest('.buttonincr.minus');
        const container = decrementButton.closest('.checkbox-container');

        if (container) {
            // Get the item name and ID from the data attribute
            const itemName = container.querySelector('.menu-checkbox').dataset.name;
            const itemId = container.dataset.id; // Assuming each container has a unique ID

            // Get the current quantity from the UI
            const quantityElement = container.querySelector('#qntynmb');
            let currentQuantity = parseInt(quantityElement.textContent, 10) || 1;

            // Decrement the quantity, ensuring it does not go below 1
            if (currentQuantity > 1) {
                currentQuantity -= 1;
                quantityElement.textContent = currentQuantity; // Update the UI

                // Update the quantity in localStorage
                let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
                const itemIndex = selectedItems.findIndex(item => item.id === itemId); // Check by ID

                if (itemIndex !== -1) {
                    // If the item exists, update the quantity
                    selectedItems[itemIndex].quantity = currentQuantity;

                    // Save the updated items to localStorage
                    localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
                    const quantityCountDiv = container.querySelector('.quantitycountdiv');
                    if (quantityCountDiv) {
                        quantityCountDiv.textContent = ` (${currentQuantity})`;
                    }
                }
            }
        }
    }
    updateTotalPrice();
});
function updateTotalPrice() {
    const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
    let totalPrice = 0;

    savedItems.forEach(savedItem => {
        totalPrice += parseFloat(savedItem.price) * savedItem.quantity;
    });

    // Update the total amount label
    document.getElementById('totalAmountWithLabel').textContent = ` Total:₹${totalPrice}`;
}

document.getElementById('proceedBtn').addEventListener('click', () => {
    const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
    const itemsList = document.getElementById('selectedItemsList');
    itemsList.innerHTML = ''; // Clear existing content

    // Create the table and add a header row
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered'); // Add Bootstrap classes if needed

    // Add the table headers
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Price (₹)</th>
        <th>Total (₹)</th>
    `;
    table.appendChild(headerRow);

    let totalPrice = 0;

    // Add a row for each saved item
    savedItems.forEach(savedItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${savedItem.name}</td>
            <td>${savedItem.quantity}</td>
            <td>${savedItem.price}</td>
            <td>₹${(parseFloat(savedItem.price) * savedItem.quantity).toFixed(2)}</td>
        `;
        table.appendChild(row);

        totalPrice += parseFloat(savedItem.price) * savedItem.quantity;
    });

    // Append the table to the container
    itemsList.appendChild(table);

    // Update the total amount
    document.getElementById('finalAmount').textContent = `₹${totalPrice.toFixed(2)}`;
});

function toggleProceedButton() {
    const proceedButton = document.querySelector('.total-section');
    const checkedContainers = document.querySelectorAll('.checkbox-container.checked');
    const anyCheckboxChecked = checkedContainers.length > 0;
    // console.log(anyCheckboxChecked);
    if (anyCheckboxChecked) {
        // incrementbutton.classList.remove('d-none');
        proceedButton.classList.remove('d-none'); // Show the button
    } else {
        // incrementbutton.classList.add('d-none');
        proceedButton.classList.add('d-none'); // Hide the button
        // localStorage.clear();
    }
}

function clearStorage() {
    localStorage.clear();
    location.reload();
}

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


