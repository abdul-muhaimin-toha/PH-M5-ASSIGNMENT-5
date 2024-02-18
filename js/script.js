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
const seatElements = document.getElementsByClassName('seat');

// Initial Data
let availableSeat = 40;
let seatSelected = 0;
let total = 0;
let grandTotal = total;
let isCouponUsed = false;

// Initial Setup
availableSeatElement.innerText = availableSeat;
seatSelectedElement.innerText = seatSelected;
totalElement.innerText = total;
grandTotalElement.innerText = grandTotal;

// Utility Function
function coupneBtnStyleAdd() {
  couponBtnElement.classList.add(
    'text-black',
    'border',
    'border-black',
    'hover:border-black',
    'hover:bg-grey-500',
    'bg-grey-900',
    'cursor-not-allowed'
  );

  couponBtnElement.classList.remove(
    'bg-yellow-500',
    'hover:bg-yellow-600',
    'text-white'
  );
}
function coupneBtnStyleReset() {
  couponBtnElement.classList.remove(
    'text-black',
    'border',
    'border-black',
    'hover:border-black',
    'hover:bg-grey-500',
    'bg-grey-900',
    'cursor-not-allowed'
  );

  couponBtnElement.classList.add(
    'bg-yellow-500',
    'hover:bg-yellow-600',
    'text-white'
  );
}

// Bus Seat Selection
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
      isCouponUsed = false;
      coupneBtnStyleReset();
      bookedPhoneNameCheck();
      console.log(event.target.classList);
      event.target.classList.add('cursor-not-allowed');
      event.target.classList.remove('cursor-pointer');
    }
  });
}

// Coupone Add
couponBtnElement.addEventListener('click', function (event) {
  const providedCoupon = couponFieldElement.value
    .toLowerCase()
    .split(' ')
    .join('');

  if (providedCoupon === 'new15' && !isCouponUsed) {
    isCouponUsed = true;
    grandTotal -= grandTotal * 0.2;
    grandTotalElement.innerText = grandTotal;

    coupneBtnStyleAdd();
  }

  if (providedCoupon === 'couple20' && !isCouponUsed) {
    isCouponUsed = true;
    grandTotal -= grandTotal * 0.2;
    grandTotalElement.innerText = grandTotal;

    coupneBtnStyleAdd();
  }
  couponFieldElement.value = '';
});

nameInputElement.addEventListener('keyup', function (event) {
  bookedPhoneNameCheck();
});

phoneInputElement.addEventListener('keyup', function (event) {
  bookedPhoneNameCheck();
});

function bookedPhoneNameCheck() {
  const userName = nameInputElement.value;
  const phoneNumber = phoneInputElement.value;
  const phoneNumberArr = phoneNumber.split('');

  if (
    userName &&
    phoneNumber &&
    !isNaN(phoneNumber) &&
    typeof parseInt(phoneNumber) === 'number' &&
    phoneNumberArr.length > 10 &&
    total > 0
  ) {
    nextBtnElement.classList.remove('cursor-not-allowed');
  } else {
    nextBtnElement.classList.add('cursor-not-allowed');
  }
}
