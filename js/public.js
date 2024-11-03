// let lastSelectedContainer = null;

// // window.addEventListener('DOMContentLoaded', loadSelectedItems);

// // function loadSelectedItems() {
// //     const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];

// //     savedItems.forEach(savedItem => {
// //         document.querySelectorAll('.checkbox-container').forEach(checkbox => {
// //             if (checkbox.dataset.name === savedItem.name) {
// //                 checkbox.checked = true; // Check the checkbox
// //                 checkbox.closest('.checkbox-container').classList.add('checked'); // Add 'checked' class
// //                 checkbox.closest('.menu-checkbox').classList.add('checked');
// //                 // Create and append the increment/decrement div
// //                 const incrementDiv = document.createElement('div');
// //                 incrementDiv.className = 'showincrementdiv';
// //                 incrementDiv.innerHTML = `
// //                     <div class="incrementbutton input">
// //                         <button data-price="${savedItem.price}" class="buttonincr minus" aria-label="Decrease by one" ${savedItem.quantity > 1 ? '' : 'disabled'}>
// //                             <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                                 <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
// //                             </svg>
// //                         </button>
// //                         <div class="qntitynumber">${savedItem.quantity}</div>
// //                         <button data-price="${savedItem.price}" class="buttonincr plus" aria-label="Increase by one">
// //                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
// //                                 <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
// //                                 <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
// //                             </svg>
// //                         </button>
// //                     </div>
// //                 `;
// //                 // Append the increment div below the checkbox container
// //                 const container = checkbox.closest('.checkbox-container');
// //                 const existingIncrementDiv = container.querySelector('.showincrementdiv');
// //                 if (existingIncrementDiv) {
// //                     existingIncrementDiv.remove(); // Remove existing increment div if present
// //                 }
// //                 container.appendChild(incrementDiv); // Append new increment div
// //             }
// //         });
// //     });

// //     toggleProceedButton(); // Update the state of the proceed button based on loaded items
// // }




// // document.querySelectorAll('.checkbox-container').forEach(container => {
// //     container.addEventListener('click', function (event) {
// //         // const mainContainer = document.querySelector('.container');
// //         // const existingIncrementDiv = mainContainer.querySelector('.showincrementdiv');
// //         // if (existingIncrementDiv) {
// //         //     existingIncrementDiv.remove(); 
// //         // }



// //         if (event.target.tagName !== 'INPUT') {

// //             const checkbox = container.querySelector('.menu-checkbox');
// //             checkbox.checked = !checkbox.checked; // Toggle checkbox state
// //             container.classList.toggle('checked', checkbox.checked);

// //             // Get the current items from local storage
// //             let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
// //             const itemData = {
// //                 id: container.dataset.id,
// //                 name: container.dataset.name,
// //                 price: container.dataset.price,
// //                 quantity: 1
// //             };
// //             const existingIncrementDiv = document.querySelector('.showincrementdiv');
// //             if (existingIncrementDiv) {
// //                 existingIncrementDiv.remove(); // Remove the existing increment div if it exists
// //             }
// //             // Remove any existing increment div
// //             // const existingIncrementDiv = container.querySelector('.showincrementdiv');
// //             // if (existingIncrementDiv) {
// //             //     existingIncrementDiv.remove();
// //             // }

// //             // If the checkbox is checked, add the item; otherwise, remove it
// //             if (checkbox.checked) {
// //                 // Check if the item already exists in selectedItems
// //                 const exists = selectedItems.some(item => item.name === itemData.name);
// //                 if (!exists) {
// //                     selectedItems.push(itemData); // Add item only if it doesn't exist
// //                 }
// //             } else {
// //                 // If unchecked, remove the item
// //                 selectedItems = selectedItems.filter(item => item.name !== itemData.name);
// //             }

// //             // Save updated selected items to local storage
// //             localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));

// //             // If the checkbox is checked, create the increment/decrement div
// //             if (checkbox.checked) {
// //                 // const incrementDiv = document.createElement('div');
// //                 // incrementDiv.className = 'showincrementdiv';
// //                 // incrementDiv.innerHTML = `
// //                 //     <div class="incrementbutton input">
// //                 //         <button data-price="${container.dataset.price}" data-id="${container.dataset.id}" data-name="${container.dataset.name}" class="buttonincr minus" id="incminus" aria-label="Decrease by one" disabled>
// //                 //             <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                 //                 <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
// //                 //             </svg>
// //                 //         </button>
// //                 //         <div class="qntitynumber" id="qntynmb">1</div>
// //                 //         <button data-price="${container.dataset.price}" class="buttonincr plus" id="incplus" aria-label="Increase by one">
// //                 //             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
// //                 //                 <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
// //                 //                 <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
// //                 //             </svg>
// //                 //         </button>
// //                 //     </div>
// //                 // `;
// //                 // container.appendChild(incrementDiv);
// //                 // container.insertAdjacentElement('afterend', incrementDiv);
// //                 const incrementDiv = document.createElement('div');
// //                 incrementDiv.className = 'showincrementdiv';
// //                 incrementDiv.dataset.name = container.querySelector('.checkbox-container').dataset.name;
// //                 incrementDiv.innerHTML = `
// //             <div class="incrementbutton input">
// //                 <button data-price="`+ container.dataset.price + `"  data-id="` + container.dataset.id + `"  class="buttonincr minus" id="incmin" aria-label="Decrease by one" disabled>
// //                     <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
// //                     </svg>
// //                 </button>
// //                 <div class="qntitynumber dim" id="qntynmb">1</div>
// //                 <button data-price="`+ container.dataset.price + `"  data-id="` + container.dataset.id + `"  class="buttonincr plus" id="incplus" aria-label="Increase by one">
// //                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
// //                          xmlns="http://www.w3.org/2000/svg" class="icon">
// //                         <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
// //                         <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
// //                     </svg>
// //                 </button>
// //             </div>
// //         `;
// //             }
// //             const itemName = container.querySelector('.menu-checkbox').dataset.name;
// //             const selectedItemsdata = JSON.parse(localStorage.getItem('salkaravithura')) || [];
// //             const item = selectedItemsdata.find(item => item.name === itemName);
// //             const quantity = item ? item.quantity : 1;
// //             incrementDiv.querySelector('#qntynmb').textContent = quantity;

// //             // Append the increment div to the clicked container
// //             container.appendChild(incrementDiv);

// //             // Call functions to update total and toggle proceed button
// //             // calculateTotal(plus = null, minus = null);
// //             toggleProceedButton();
// //         }
// //     });
// // });



document.querySelectorAll('.checkbox-container').forEach(container => {
    container.addEventListener('click', function (event) {

        // If the clicked element is inside an increment button, ignore the event
        if (event.target.closest('.incrementbutton')) {
            return; // Stop further execution of the container click handler
        }


        // Check if the same container was clicked
        if (lastSelectedContainer === container) {
            // Remove the 'checked' class and destroy the increment div
            container.classList.remove('checked');
            const incrementDiv = container.querySelector('.showincrementdiv');
            if (incrementDiv) {
                incrementDiv.remove();
            }
            lastSelectedContainer = null; // Reset the last selected container
            return; // Exit the function
        }

        // Remove 'checked' class and destroy all existing increment divs
        document.querySelectorAll('.checkbox-container.checked').forEach(activeContainer => {
            activeContainer.classList.remove('checked');
            const incrementDiv = activeContainer.querySelector('.showincrementdiv');
            if (incrementDiv) {
                incrementDiv.remove();
            }
        });
        // let insertintolocalstorage = JSON.parse(localStorage.getItem('salkaravithura')) || [];
        // const itemData = {
        //     id: container.dataset.id,
        //     name: container.dataset.name,
        //     price: container.dataset.price,
        //     quantity: 1
        // };
        // console.log(itemData);
        // if (checkbox.checked) {
            // Check if the item already exists in selectedItems
            // const exists = insertintolocalstorage.some(item => item.name === itemData.name);
            // if (!exists) {
            //     insertintolocalstorage.push(itemData); // Add item only if it doesn't exist
            //     localStorage.setItem('salkaravithura', JSON.stringify(insertintolocalstorage));
            //     console.log('inserted');
            // }
            
        // } else {
        //     // If unchecked, remove the item
        //     selectedItems = selectedItems.filter(item => item.name !== itemData.name);
        // }
        // Add 'checked' class to the clicked container
        container.classList.add('checked');
        // Create the new increment div
        const incrementDiv = document.createElement('div');
        incrementDiv.className = 'showincrementdiv';
        incrementDiv.dataset.name = container.querySelector('.menu-checkbox').dataset.name;
        incrementDiv.innerHTML = `
            <div class="incrementbutton input">
                <button data-price="`+ container.dataset.price + `"  data-id="` + container.dataset.id + `"  class="buttonincr minus" id="incmin" aria-label="Decrease by one" disabled>
                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
                    </svg>
                </button>
                <div class="qntitynumber dim" id="qntynmb">1</div>
                <button data-price="`+ container.dataset.price + `"  data-id="` + container.dataset.id + `"  class="buttonincr plus" id="incplus" aria-label="Increase by one">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg" class="icon">
                        <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
                        <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
                    </svg>
                </button>
            </div>
        `;

        // Load the quantity from localStorage
        const itemName = container.querySelector('.menu-checkbox').dataset.name;
        const selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];

        
        console.log(selectedItems);
        const item = selectedItems.find(item => item.name === itemName);
        const quantity = item ? item.quantity : 1;
        incrementDiv.querySelector('#qntynmb').textContent = quantity;

        // Append the increment div to the clicked container
        container.appendChild(incrementDiv);
        const itemData = {
            id: container.dataset.id,
            name: container.dataset.name,
            price: container.dataset.price,
            quantity: quantity
        };

        const exists = insertintolocalstorage.some(item => item.name === itemData.name);
        // if (!exists) {
        //     insertintolocalstorage.push(itemData); // Add item only if it doesn't exist
        //     localStorage.setItem('salkaravithura', JSON.stringify(insertintolocalstorage));
        //     console.log('inserted');
        // }
        // Update the last selected container
        lastSelectedContainer = container;
        toggleProceedButton();
    });
});

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































// function toggleProceedButton() {
//     const proceedButton = document.querySelector('.total-section');
//     // Select all checkboxes that are checked
//     const anyCheckboxChecked = document.querySelectorAll('.menu-checkbox:checked').length > 0;
//     // Show or hide the proceed button based on whether any checkboxes are checked
//     if (anyCheckboxChecked) {
//         proceedButton.classList.remove('d-none'); // Show the button
//     } else {
//         proceedButton.classList.add('d-none'); // Hide the button
//         // Optionally, clear the local storage here
//         localStorage.clear();
//     }
// }






// // To keep track of the last selected container
// let lastSelectedContainer = null;

// document.querySelectorAll('.checkbox-container').forEach(container => {
//     container.addEventListener('click', function (event) {

//          // If the clicked element is inside an increment button, ignore the event
//          if (event.target.closest('.incrementbutton')) {
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
//                 <button data-price="`+ container.dataset.price +`"  data-id="`+ container.dataset.id +`"  class="buttonincr minus" id="incmin" aria-label="Decrease by one" disabled>
//                     <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
//                     </svg>
//                 </button>
//                 <div class="qntitynumber dim" id="qntynmb">1</div>
//                 <button data-price="`+ container.dataset.price +`"  data-id="`+ container.dataset.id +`"  class="buttonincr plus" id="incplus" aria-label="Increase by one">
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

//         // Update the last selected container
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

          
//                 const button = container.querySelector('.buttonincr');
//                 if (button) {
//                     alert(button.dataset.price); // Alert the data-price value
//                 }
            

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
let lastSelectedContainer = null;

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
                <button data-price="${container.dataset.price}" data-id="${container.dataset.id}" class="buttonincr minus" aria-label="Decrease by one" disabled>
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
        lastSelectedContainer = container;
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

          
                const button = container.querySelector('.buttonincr');
                if (button) {
                    alert(button.dataset.price); // Alert the data-price value
                }
            

            // Get the item name from the data attribute
            const itemName = container.querySelector('.menu-checkbox').dataset.name;
            
            // Get the current quantity from the UI
            const quantityElement = container.querySelector('#qntynmb');
            let currentQuantity = parseInt(quantityElement.textContent, 10) || 1;

            // Increment the quantity
            currentQuantity += 1;
            quantityElement.textContent = currentQuantity; // Update the UI

            // Update the quantity in localStorage
            let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
            const itemIndex = selectedItems.findIndex(item => item.name === itemName);
            
            if (itemIndex !== -1) {
                selectedItems[itemIndex].quantity = currentQuantity;
            } else {
                // If the item doesn't exist in localStorage, add it
                selectedItems.push({ name: itemName, price: container.querySelector('.menu-checkbox').dataset.price, quantity: currentQuantity });
            }

            // Save the updated items to localStorage
            localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
        }
    }
});
