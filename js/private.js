window.addEventListener('DOMContentLoaded', loadSelectedItems);
function loadSelectedItems() {
    const savedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
    // alert(savedItems);
    // localStorage.clear();
    savedItems.forEach(savedItem => {
        
        document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
            if (checkbox.dataset.name === savedItem.name) {
                checkbox.checked = true;
                checkbox.closest('.checkbox-container').classList.add('checked');
            }
        });
    });
    toggleProceedButton();
}

document.querySelectorAll('.checkbox-container').forEach(container => {
    container.addEventListener('click', function (event) {
        const quantityDiv = container.querySelector('.qntitynumber');

        // If the click is not directly on the checkbox, toggle the checkbox state
        if (event.target.tagName !== 'INPUT') {
            const checkbox = container.querySelector('.menu-checkbox');
            checkbox.checked = !checkbox.checked; // Toggle the checkbox state

            // Add or remove 'checked' class on the container
            container.classList.toggle('checked', checkbox.checked);

            // Remove any existing incrementer/decrementer div
            const existingIncrementDiv = container.querySelector('.showincrementdiv');
            if (existingIncrementDiv) {
                existingIncrementDiv.remove();
            }

            // Create and add the incrementer/decrementer div if the checkbox is checked
            if (checkbox.checked) {
                const incrementDiv = document.createElement('div');
                incrementDiv.className = 'showincrementdiv';
                incrementDiv.innerHTML = `
                    <div class="incrementbutton input">
                        <button data-price="${container.dataset.price}"  data-id="`+ container.dataset.id +`"  data-name="`+ container.dataset.name +`" class="buttonincr minus" aria-label="Decrease by one" disabled>
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
                            </svg>
                        </button>
                        <div class="qntitynumber" id="qntynmb">1</div>
                        <button data-price="${container.dataset.price}" class="buttonincr plus" aria-label="Increase by one">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                                <line x1="8" y1="0" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
                                <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
                            </svg>
                        </button>
                    </div>
                `;
                container.appendChild(incrementDiv);
            }

            // Manage local storage for selected items
            let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
           
            const itemData = {
                name: container.dataset.name,
                price: container.dataset.price,
                quantity: 1
            };


            // If the checkbox is checked, add the item; otherwise, remove it
            if (checkbox.checked) {
                selectedItems.push(itemData);
            } else {
                selectedItems = selectedItems.filter(item => item.name !== itemData.name);
            }

            // Save the updated selected items to local storage
            localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
            // Call additional functions as needed
            toggleProceedButton();
            calculateTotal(plus=null ,minus=null);
        }
    });
});

// document.querySelectorAll('.checkbox-container').forEach(container => {
//     container.addEventListener('click', function (event) {
//         // incrementDiv.innerHTML ='';
//         const quantityDiv = document.getElementById('qntynmb');
//         if (quantityDiv) {
//             quantityDiv.textContent = '1';
//         }
//         if (event.target.tagName !== 'INPUT') {
//             const checkbox = container.querySelector('.menu-checkbox');
//             checkbox.checked = !checkbox.checked; // Toggle checkbox state
//             container.classList.toggle('checked', checkbox.checked); // Add/remove 'checked' class

//             const incrementDiv = document.createElement('div');
//             incrementDiv.className = 'showincrementdiv';
//             incrementDiv.dataset.name = container.querySelector('.menu-checkbox').dataset.name;
//             incrementDiv.innerHTML = `
//             <div class="incrementbutton d-none input">
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
//             // incrementDiv.querySelector('#qntynmb').textContent = quantity;
//             container.appendChild(incrementDiv);
//             let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
//             const itemData = {
//                 name: checkbox.dataset.name,
//                 price: checkbox.dataset.price,
//                 quantity: 1
//             };
//             // If the checkbox is checked, add the item; otherwise, remove it
//             if (checkbox.checked) {
//                 selectedItems.push(itemData);
//             } else {
//                 selectedItems = selectedItems.filter(item => item.name !== itemData.name);
//             }
//             // alert(lastSelectedContainer);
//             // Save updated selected items to local storage
//             localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//             toggleProceedButton();
//             calculateTotal(plus = null, minus = null);
//             // lastSelectedContainer = container;


//         }
//     });
// });


// Variable to store the last selected container
//  let lastSelectedContainer = null;
// document.getElementById('incplus').addEventListener('click', () => {
//     const plus = parseInt(document.getElementById('qntynmb').textContent, 10)+1;


//     let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
//     selectedItems.forEach(savedItem => {
//         document.querySelectorAll('.menu-checkbox').forEach(checkbox => {
//             // document.getElementsByClassName('quantitycountdiv')[1].textContent = `(${plus})`;
//             const itemName = checkbox.dataset.name; 
//             const itemIndex = selectedItems.findIndex(item => item.name === itemName);
//             if (itemIndex !== -1) {

//                 selectedItems[itemIndex].quantity = plus;
//                 localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));
//                 // const quantityDiv = checkbox.closest('.checkbox-container').querySelector('.quantitycountdiv');
//                 // quantityDiv.textContent = `(${plus})`; 
//             }


//         });
//     });
//     calculateTotal(plus,minus = null);
// });
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
    // let total = 0;
    document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
        total += parseInt(item.dataset.price, 10);
        if (!isNaN(plus)) {
            total = total + total;

        } else if (!isNaN(minus)) {
            total = total - total;
        }
    });

    const formattedTotal = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(total);

    document.getElementById('totalAmountWithLabel').textContent = `Total: ${formattedTotal}`;
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

const buttons = document.querySelectorAll("button");
const minValue = 0;
const maxValue = 10;

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // 1. Get the clicked element
    const element = event.currentTarget;
    // 2. Get the parent
    const parent = element.parentNode;
    // 3. Get the number (within the parent)
    const numberContainer = parent.querySelector(".number");
    const number = parseFloat(numberContainer.textContent);
    // 4. Get the minus and plus buttons
    const increment = parent.querySelector(".plus");
    const decrement = parent.querySelector(".minus");
    // 5. Change the number based on click (either plus or minus)
    const newNumber = element.classList.contains("plus")
      ? number + 1
      : number - 1;
    numberContainer.textContent = newNumber;
    console.log(newNumber);
    // 6. Disable and enable buttons based on number value (and undim number)
    if (newNumber === minValue) {
      decrement.disabled = true;
      numberContainer.classList.add("dim");
      // Make sure the button won't get stuck in active state (Safari)
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