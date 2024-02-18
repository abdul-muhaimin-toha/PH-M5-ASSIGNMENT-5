// Selecting Elements
const availableSeatElement = document.getElementById('seat-available');
const seatSelectedElement = document.getElementById('total-seat-selected');
const seatDetailsElement = document.getElementById('seat-details');
const totalElement = document.getElementById('total');
const grandTotalElement = document.getElementById('grand-total');
const couponFieldElement = document.getElementById('coupon-field');
const couponBtnElement = document.getElementById('coupon-btn');
const seatElements = document.getElementsByClassName('seat');

// Initial Data
let availableSeat = 40;
let seatSelected = 0;
let total = 0;
let grandTotal = total;

// Initial Setup
availableSeatElement.innerText = availableSeat;
seatSelectedElement.innerText = seatSelected;
totalElement.innerText = total;
grandTotalElement.innerText = grandTotal;

for (const seatElement of seatElements) {
  seatElement.addEventListener('click', function (event) {
    if (seatSelected < 4) {
      seatSelected++;
      availableSeat--;
      event.target.classList.remove('bg-gray-200', 'hover:bg-yellow-500');
      event.target.classList.add('bg-blue-500');
      availableSeatElement.innerText = availableSeat;
      seatSelectedElement.innerText = seatSelected;
      const currentSeat = event.target.innerText;
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `<td>${currentSeat}</td><td>Economy</td><td>550</td>`;
      seatDetailsElement.appendChild(tableRow);
      total = seatSelected * 550;
      grandTotal = total;
      totalElement.innerText = total;
      grandTotalElement.innerText = grandTotal;
    }
  });
}

couponBtnElement.addEventListener('click', function () {
  const providedCoupon = couponFieldElement.value
    .toLowerCase()
    .split(' ')
    .join('');

  if (providedCoupon === 'new20') {
    console.log('coupon added');
  }
});
