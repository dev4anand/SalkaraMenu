let lastSelectedContainer = null;

window.addEventListener('DOMContentLoaded', loadSelectedItems);

function loadSelectedItems() {
    const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];

    savedItems.forEach(savedItem => {
        // Select the checkbox based on the name
        document.querySelectorAll('.checkbox-container').forEach(checkbox => {
            if (checkbox.dataset.name === savedItem.name) {
                checkbox.checked = true;
                const container = checkbox.closest('.checkbox-container');
                container.classList.add('checked');

                // Update the quantity display
                const quantityCountDiv = container.querySelector('.quantitycountdiv');
                if (quantityCountDiv) {
                    quantityCountDiv.textContent = `Quantity: ${savedItem.quantity}`;
                }
            }
        });
    });

    // toggleProceedButton(); // Ensure the proceed button state is updated
}

document.querySelectorAll('.checkbox-container').forEach(container => {
    container.addEventListener('click', function (event) {
        // Ignore click events if they occur on the increment button
        if (event.target.closest('.incrementbutton')) {
            return;
        }

        const checkbox = container.querySelector('.menu-checkbox');
        checkbox.checked = !checkbox.checked; // Toggle the checkbox
        container.classList.toggle('checked', checkbox.checked);

        // Manage removal of increment div and uncheck if the same container was clicked
        if (lastSelectedContainer === container) {
            container.classList.remove('checked');
            const incrementDiv = container.querySelector('.showincrementdiv');
            if (incrementDiv) incrementDiv.remove();
            lastSelectedContainer = null;
            removeItemFromLocalStorage(container.dataset.name);
            return;
        }

        // Remove 'checked' class and increment divs from other containers
        document.querySelectorAll('.checkbox-container.checked').forEach(activeContainer => {
            if (activeContainer !== container) {
                activeContainer.classList.remove('checked');
                const incrementDiv = activeContainer.querySelector('.showincrementdiv');
                if (incrementDiv) incrementDiv.remove();
            }
        });

        // Create and append increment div
        const incrementDiv = document.createElement('div');
        incrementDiv.className = 'showincrementdiv';
        incrementDiv.dataset.name = container.querySelector('.menu-checkbox').dataset.name;
        incrementDiv.innerHTML = `
            <div class="incrementbutton input">
                <button data-price="${container.dataset.price}" data-id="${container.dataset.id}" class="buttonincr minus" aria-label="Decrease by one">
                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
                    </svg>
                </button>
                <div class="qntitynumber dim" id="qntynmb">1</div>
                <button data-price="${container.dataset.price}" data-id="${container.dataset.id}" class="buttonincr plus" aria-label="Increase by one">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
                        <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
                    </svg>
                </button>
            </div>
        `;

        // Load quantity from localStorage
        const itemName = container.querySelector('.menu-checkbox').dataset.name;
        let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
        const item = selectedItems.find(item => item.name === itemName);
        const quantity = item ? item.quantity : 1;
        incrementDiv.querySelector('#qntynmb').textContent = quantity;

        // Append the increment div to the container
        container.appendChild(incrementDiv);

        // Update localStorage
        const itemData = {
            id: container.dataset.id,
            name: container.dataset.name,
            price: container.dataset.price,
            quantity: quantity
        };

        if (checkbox.checked) {
            selectedItems = selectedItems.filter(item => item.name !== itemData.name);
            selectedItems.push(itemData);
        } else {
            selectedItems = selectedItems.filter(item => item.name !== itemData.name);
        }

        localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
        const quantityCountDiv = container.querySelector('.quantitycountdiv');
        // if (quantityCountDiv) {
        //     quantityCountDiv.textContent = `Quantity: ${quantity}`;
        // }
        lastSelectedContainer = container;
        // toggleProceedButton(); 
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
            const quantityCountDiv = container.querySelector('.quantitycountdiv');
            if (quantityCountDiv) {
                quantityCountDiv.textContent = ` (${currentQuantity})`;
            }
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
// document.addEventListener('click', function (event) {
//     // Check if the clicked element is an increment button
//     if (event.target.closest('.buttonincr.plus')) {
//         event.preventDefault(); // Prevent the default action

//         const incrementButton = event.target.closest('.buttonincr.plus');
//         const container = incrementButton.closest('.checkbox-container');

//         if (container) {
//             // Get the item name and ID from the data attribute
//             const itemName = container.querySelector('.menu-checkbox').dataset.name;
//             const itemId = container.dataset.id; // Assuming each container has a unique ID

//             // Get the current quantity from the UI
//             const quantityElement = container.querySelector('#qntynmb');
//             let currentQuantity = parseInt(quantityElement.textContent, 10) || 1;

//             // Increment the quantity
//             currentQuantity += 1;
//             quantityElement.textContent = currentQuantity; // Update the UI

//             // Update the quantity in localStorage
//             let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
//             const itemIndex = selectedItems.findIndex(item => item.id === itemId); // Check by ID

//             if (itemIndex !== -1) {
//                 // If the item exists, update the quantity
//                 selectedItems[itemIndex].quantity = currentQuantity;
//             } else {
//                 // If the item doesn't exist, add it
//                 selectedItems.push({
//                     id: itemId,
//                     name: itemName,
//                     price: container.querySelector('.menu-checkbox').dataset.price,
//                     quantity: currentQuantity
//                 });
//             }

//             // Save the updated items to localStorage
//             localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//         }
//     }
// });



// let lastSelectedContainer = null;

// document.querySelectorAll('.checkbox-container').forEach(container => {
//     container.addEventListener('click', function (event) {
//         // Ignore click events if they occur on the increment button
//         if (event.target.closest('.incrementbutton')) {
//             return;
//         }

//         const checkbox = container.querySelector('.menu-checkbox');
//         checkbox.checked = !checkbox.checked; // Toggle the checkbox
//         container.classList.toggle('checked', checkbox.checked);

//         // Manage removal of increment div and uncheck if the same container was clicked
//         if (lastSelectedContainer === container) {
//             container.classList.remove('checked');
//             const incrementDiv = container.querySelector('.showincrementdiv');
//             if (incrementDiv) incrementDiv.remove();
//             lastSelectedContainer = null;
//             removeItemFromLocalStorage(container.dataset.name);
//             return;
//         }

//         // Remove 'checked' class and increment divs from other containers
//         document.querySelectorAll('.checkbox-container.checked').forEach(activeContainer => {
//             if (activeContainer !== container) {
//                 activeContainer.classList.remove('checked');
//                 const incrementDiv = activeContainer.querySelector('.showincrementdiv');
//                 if (incrementDiv) incrementDiv.remove();
//             }
//         });

//         // Create and append increment div
//         const incrementDiv = document.createElement('div');
//         incrementDiv.className = 'showincrementdiv';
//         incrementDiv.dataset.name = container.querySelector('.menu-checkbox').dataset.name;
//         incrementDiv.innerHTML = `
//             <div class="incrementbutton input">
//                 <button data-price="${container.dataset.price}" data-id="${container.dataset.id}" class="buttonincr minus" aria-label="Decrease by one" disabled>
//                     <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
//                     </svg>
//                 </button>
//                 <div class="qntitynumber dim" id="qntynmb">1</div>
//                 <button data-price="${container.dataset.price}" data-id="${container.dataset.id}" class="buttonincr plus" aria-label="Increase by one">
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
//                         <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
//                         <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
//                     </svg>
//                 </button>
//             </div>
//         `;

//         // Load quantity from localStorage
//         const itemName = container.querySelector('.menu-checkbox').dataset.name;
//         let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
//         const item = selectedItems.find(item => item.name === itemName);
//         const quantity = item ? item.quantity : 1;
//         incrementDiv.querySelector('#qntynmb').textContent = quantity;

//         // Append the increment div to the container
//         container.appendChild(incrementDiv);

//         // Update localStorage
//         const itemData = {
//             id: container.dataset.id,
//             name: container.dataset.name,
//             price: container.dataset.price,
//             quantity: quantity
//         };

//         if (checkbox.checked) {
//             selectedItems = selectedItems.filter(item => item.name !== itemData.name);
//             selectedItems.push(itemData);
//         } else {
//             selectedItems = selectedItems.filter(item => item.name !== itemData.name);
//         }

//         localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//         lastSelectedContainer = container;
//     });
// });

// // Helper function to remove item from localStorage
// function removeItemFromLocalStorage(itemName) {
//     let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
//     selectedItems = selectedItems.filter(item => item.name !== itemName);
//     localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
// }


// To keep track of the last selected container
// let lastSelectedContainer = null;

// document.querySelectorAll('.checkbox-container').forEach(container => {
//     container.addEventListener('click', function (event) {
//         // const checkbox = container.querySelector('.menu-checkbox');
        
//         // checkbox.checked = !checkbox.checked; 
//         // container.classList.toggle('checked', checkbox.checked);

        
//           const checkbox = container.querySelector('.menu-checkbox');
//           checkbox.checked = !checkbox.checked;
//           container.classList.toggle('checked', checkbox.checked);
//         // If the clicked element is inside an increment button, ignore the event
//         if (event.target.closest('.incrementbutton')) {
//             return; // Stop further execution of the container click handler
//         }


//         // Check if the same container was clicked
//         if (lastSelectedContainer === container) {
//             // Remove the 'checked' class and destroy the increment div
//             container.classList.remove('checked');
//             const incrementDiv = container.querySelector('.showincrementdiv');
//             if (incrementDiv) {
//                 incrementDiv.remove();
//             }
//             lastSelectedContainer = null; // Reset the last selected container
//             return; // Exit the function
//         }

//         // Remove 'checked' class and destroy all existing increment divs
//         document.querySelectorAll('.checkbox-container.checked').forEach(activeContainer => {
//             activeContainer.classList.remove('checked');
//             const incrementDiv = activeContainer.querySelector('.showincrementdiv');
//             if (incrementDiv) {
//                 incrementDiv.remove();
//             }
//         });

//         // Add 'checked' class to the clicked container
//         container.classList.add('checked');
//         // Create the new increment div
//         const incrementDiv = document.createElement('div');
//         incrementDiv.className = 'showincrementdiv';
//         incrementDiv.dataset.name = container.querySelector('.menu-checkbox').dataset.name;
//         incrementDiv.innerHTML = `
//             <div class="incrementbutton input">
//                 <button data-price="`+ container.dataset.price + `"  data-id="` + container.dataset.id + `"  class="buttonincr minus" id="incmin" aria-label="Decrease by one" disabled>
//                     <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
//                     </svg>
//                 </button>
//                 <div class="qntitynumber dim" id="qntynmb">1</div>
//                 <button data-price="`+ container.dataset.price + `"  data-id="` + container.dataset.id + `"  class="buttonincr plus" id="incplus" aria-label="Increase by one">
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//                          xmlns="http://www.w3.org/2000/svg" class="icon">
//                         <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
//                         <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
//                     </svg>
//                 </button>
//             </div>
//         `;

//         // Load the quantity from localStorage
//         const itemName = container.querySelector('.menu-checkbox').dataset.name;

//         const selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
        
//         const item = selectedItems.find(item => item.name === itemName);
//         const quantity = item ? item.quantity : 1;
//         incrementDiv.querySelector('#qntynmb').textContent = quantity;

//         // Append the increment div to the clicked container
//         container.appendChild(incrementDiv);

//         const itemData = {
//             id: container.dataset.id,
//             name: container.dataset.name,
//             price: container.dataset.price,
//             quantity: quantity
//         };
//         // if (checkbox.checked) {
//         //     selectedItems.push(itemData);
//         //     localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//         // } else {
//         //     selectedItems = selectedItems.filter(item => item.name !== itemData.name);
//         //     localStorage.setItem('salkaravithura', JSON.stringify(null));
//         // }
//         if (checkbox.checked) {
//             selectedItems.push(itemData);
//         } else {
//             selectedItems = selectedItems.filter(item => item.name !== itemData.name);
//         }

//         // Save the updated selected items to local storage
//         localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//         lastSelectedContainer = container;
//     });
// });


// document.addEventListener('click', function (event) {

//     // Check if the clicked element is an increment button
//     if (event.target.closest('.buttonincr.plus')) {
//         event.preventDefault(); // Prevent the default action


//         const incrementButton = event.target.closest('.buttonincr.plus');
//         const container = incrementButton.closest('.checkbox-container');

//         if (container) {


//             const button = container.querySelector('.buttonincr');
//             if (button) {
//                 alert(button.dataset.price); // Alert the data-price value
//             }


//             // Get the item name from the data attribute
//             const itemName = container.querySelector('.menu-checkbox').dataset.name;

//             // Get the current quantity from the UI
//             const quantityElement = container.querySelector('#qntynmb');
//             let currentQuantity = parseInt(quantityElement.textContent, 10) || 1;

//             // Increment the quantity
//             currentQuantity += 1;
//             quantityElement.textContent = currentQuantity; // Update the UI

//             // Update the quantity in localStorage
//             let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
//             const itemIndex = selectedItems.findIndex(item => item.name === itemName);

//             if (itemIndex !== -1) {
//                 selectedItems[itemIndex].quantity = currentQuantity;
//             } else {
//                 // If the item doesn't exist in localStorage, add it
//                 selectedItems.push({ name: itemName, price: container.querySelector('.menu-checkbox').dataset.price, quantity: currentQuantity });
//             }

//             // Save the updated items to localStorage
//             localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//         }
//     }
// });

