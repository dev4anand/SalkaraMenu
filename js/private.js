// document.querySelectorAll('.checkbox-container').forEach(container => {
//     container.addEventListener('click', function (event) {
//         if (event.target.tagName !== 'INPUT') {
//             const checkbox = container.querySelector('.menu-checkbox');
//             checkbox.checked = !checkbox.checked; // Toggle checkbox state
//             container.classList.toggle('checked', checkbox.checked); // Add/remove 'checked' class
//             let selectedItems = [];
//             const totalamount = document.getElementById('totalAmountWithLabel').textContent;
//             document.querySelectorAll('.menu-checkbox:checked').forEach(item => {
//                 selectedItems.push({
//                     name: item.dataset.name,
//                     price: item.dataset.price,
//                     totalAmount: totalamount
//                 });
//                 localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));

//             });
//             calculateTotal();
//             toggleProceedButton();
            
//         }
//     });
// });

document.querySelectorAll('.checkbox-container').forEach(container => {
    container.addEventListener('click', function (event) {
        if (event.target.tagName !== 'INPUT') {
            const checkbox = container.querySelector('.menu-checkbox');
            checkbox.checked = !checkbox.checked; // Toggle checkbox state
            container.classList.toggle('checked', checkbox.checked); // Add/remove 'checked' class

            let selectedItems = JSON.parse(localStorage.getItem('salkaravithura')) || [];
            const itemData = {
                name: checkbox.dataset.name,
                price: checkbox.dataset.price
            };

            // If the checkbox is checked, add the item; otherwise, remove it
            if (checkbox.checked) {
                selectedItems.push(itemData);
            } else {
                selectedItems = selectedItems.filter(item => item.name !== itemData.name);
            }

            // Save updated selected items to local storage
            localStorage.setItem('salkaravithura', JSON.stringify(selectedItems));

            calculateTotal();
            toggleProceedButton();
        }
    });
});


function toggleProceedButton() {
    const proceedButton = document.querySelector('.total-section');
    const anyCheckboxChecked = document.querySelectorAll('.menu-checkbox:checked').length > 0;
    const incrementbutton = document.querySelector('.incrementbutton');
    if (anyCheckboxChecked) {
        // incrementbutton.classList.remove('d-none');
        proceedButton.classList.remove('d-none'); // Show the button
    } else {
        // incrementbutton.classList.add('d-none');
        proceedButton.classList.add('d-none'); // Hide the button
    }
}

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
        listItem.textContent = `${savedItem.name} - ₹${savedItem.price}`;
        itemsList.appendChild(listItem);
        totalPrice += parseFloat(savedItem.price);
        
    });
    document.getElementById('finalAmount').textContent = `₹${totalPrice}`;

  });
  


// //   incrementer and decrementer 

// const buttons = document.querySelectorAll("button");
// const minValue = 0;
// const maxValue = 10;

// buttons.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     // 1. Get the clicked element
//     const element = event.currentTarget;
//     // 2. Get the parent
//     const parent = element.parentNode;
//     // 3. Get the number (within the parent)
//     const numberContainer = parent.querySelector(".number");
//     const number = parseFloat(numberContainer.textContent);
//     // 4. Get the minus and plus buttons
//     const increment = parent.querySelector(".plus");
//     const decrement = parent.querySelector(".minus");
//     // 5. Change the number based on click (either plus or minus)
//     const newNumber = element.classList.contains("plus")
//       ? number + 1
//       : number - 1;
//     numberContainer.textContent = newNumber;
//     console.log(newNumber);
//     // 6. Disable and enable buttons based on number value (and undim number)
//     if (newNumber === minValue) {
//       decrement.disabled = true;
//       numberContainer.classList.add("dim");
//       // Make sure the button won't get stuck in active state (Safari)
//       element.blur();
//     } else if (newNumber > minValue && newNumber < maxValue) {
//       decrement.disabled = false;
//       increment.disabled = false;
//       numberContainer.classList.remove("dim");
//     } else if (newNumber === maxValue) {
//       increment.disabled = true;
//       numberContainer.textContent = `${newNumber}+`;
//       element.blur();
//     }
//   });
// });
