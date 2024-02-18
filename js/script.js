// Selecting Elements
const availableSeatElement = document.getElementById('seat-available');
const seatSelectedElement = document.getElementById('total-seat-selected');
const seatDetailsElement = document.getElementById('seat-details');
const totalElement = document.getElementById('total');
const grandTotalElement = document.getElementById('grand-total');
const couponFieldElement = document.getElementById('coupon-field');
const couponBtnElement = document.getElementById('coupon-btn');
const nextBtnElement = document.getElementById('next-btn');
const nameInputElement = document.getElementById('name-field');
const phoneInputElement = document.getElementById('phone-field');
const emailInputElement = document.getElementById('email-field');
const couponContainerElement = document.getElementById('coupon-container');
const seatElements = document.getElementsByClassName('seat');

// Initial Data
let availableSeat = 40;
let seatSelected = 0;
let total = 0;
let grandTotal = total;
let isCouponUsed = false;

// Initial Setup
function initialSetup() {
  availableSeat = 40;
  seatSelected = 0;
  total = 0;
  grandTotal = total;
  isCouponUsed = false;

  availableSeatElement.innerText = availableSeat;
  seatSelectedElement.innerText = seatSelected;
  totalElement.innerText = total;
  grandTotalElement.innerText = grandTotal;

  couponBtnElement.setAttribute('disabled', '');
  couponContainerElement.classList.remove('hidden');
}
initialSetup();

// Utility Function
function bookedPhoneNameCheck() {
  const phoneNumber = phoneInputElement.value;
  const phoneNumberArr = phoneNumber.split('');

  if (
    phoneNumber &&
    !isNaN(phoneNumber) &&
    typeof parseInt(phoneNumber) === 'number' &&
    phoneNumberArr.length > 10 &&
    total > 0
  ) {
    nextBtnElement.classList.remove('cursor-not-allowed');
    nextBtnElement.removeAttribute('disabled', '');
  } else {
    nextBtnElement.classList.add('cursor-not-allowed');
    nextBtnElement.setAttribute('disabled', '');
  }
}

// Bus Seat Selection
for (const seatElement of seatElements) {
  seatElement.addEventListener('click', function (event) {
    if (seatSelected < 4) {
      seatSelected++;
      availableSeat--;
      event.target.classList.remove('bg-gray-200', 'hover:bg-yellow-500');
      event.target.classList.add('bg-yellow-500');
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
      isCouponUsed = false;
      bookedPhoneNameCheck();
      event.target.classList.add('cursor-not-allowed');
      event.target.classList.remove('cursor-pointer');
      event.target.setAttribute('disabled', '');
      if (seatSelected >= 4) {
        couponBtnElement.removeAttribute('disabled', '');
      }
    }
  });
}

// Coupone Add
couponBtnElement.addEventListener('click', function (event) {
  const providedCoupon = couponFieldElement.value;

  if (providedCoupon === 'NEW15' && !isCouponUsed) {
    isCouponUsed = true;
    grandTotal -= grandTotal * 0.15;
    grandTotalElement.innerText = grandTotal;
    couponContainerElement.classList.add('hidden');
    document.getElementById('discount-row').innerHTML = `<th>Discount</th>
    <th></th>
    <th>BDT ${total * 0.15}</th>
    `;
  }

  if (providedCoupon === 'Couple 20' && !isCouponUsed) {
    isCouponUsed = true;
    grandTotal -= grandTotal * 0.2;
    grandTotalElement.innerText = grandTotal;
    couponContainerElement.classList.add('hidden');
    document.getElementById('discount-row').innerHTML = `<th>Discount</th>
    <th></th>
    <th>BDT ${total * 0.2}</th>
    `;
  }
  if (!(providedCoupon === 'Couple 20') && !(providedCoupon === 'NEW15')) {
    alert('Provide Valid Coupon');
  }
  couponFieldElement.value = '';
  couponBtnElement.removeAttribute('disabled', '');
});

// Name Input Element
nameInputElement.addEventListener('keyup', function (event) {
  bookedPhoneNameCheck();
});

// Phone Input Element
phoneInputElement.addEventListener('keyup', function (event) {
  bookedPhoneNameCheck();
});

nextBtnElement.addEventListener('click', function () {
  nameInputElement.value = '';
  phoneInputElement.value = '';
  emailInputElement.value = '';
  initialSetup();

  seatDetailsElement.innerHTML = ``;
  document.getElementById('discount-row').innerHTML = ``;

  for (const seatElement of seatElements) {
    seatElement.removeAttribute('disabled', '');
    seatElement.classList.remove('cursor-not-allowed', 'bg-yellow-500');
    seatElement.classList.add(
      'cursor-pointer',
      'hover:bg-yellow-500',
      'bg-gray-200'
    );
    nextBtnElement.setAttribute('disabled', '');
  }
});

// couponFieldElement.addEventListener('keyup', function () {
//   if (couponFieldElement.value && total > 0) {
//     couponBtnElement.removeAttribute('disabled', '');
//   } else {
//     couponBtnElement.setAttribute('disabled', '');
//   }
// });
