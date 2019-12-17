document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // variables
    const customer = document.getElementById('customer');
    const freelanser = document.getElementById('freelancer');

    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelanser = document.querySelector('#block-freelancer');
    const blockChoice = document.getElementById('block-choice');

    const btnExit = document.getElementById('btn-exit');

    const formCustomer = document.getElementById('form-customer');

    const orders = [];
    const ordersTable = document.getElementById('orders');

    const readOrderModal = document.getElementById('order_read');
    const activeOrderModal = document.getElementById('order_active');

    const modalCloseButton = document.querySelector('.close');

    // functions
    const renderOrders = () => {
        ordersTable.textContent = '';
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
            <tr class="order" data-order-number="${i}">
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${order.deadline}</td>
            </tr>`;
        });
    };

    const openModal = (orderNumber) => {
        const order = orders[orderNumber];
        const modal = order.active ? activeOrderModal : readOrderModal;
        const titleBlock = document.querySelector('.modal-title');
        const firstNameBlock = document.querySelector('.firstName');
        const emailBlock = document.querySelector('.email');
        const descriptionBlock = document.querySelector('.description');
        const deadlineBlock = document.querySelector('.deadline');
        const currencyBlock = document.querySelector('.currency_img');
        const countBlock = document.querySelector('.count');
        const callBlock = document.querySelector('.phone');

        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
        descriptionBlock.textContent = order.description;
        deadlineBlock.textContent = order.deadline;
        currencyBlock.className = order.currency;
        countBlock.textContent = order.amount;
        callBlock.href = `tel: ${order.phone}`;        
        
        modal.style.display = 'block';
    };

    // events
    modalCloseButton.addEventListener('click', () => {
        activeOrderModal.style.display = 'none';
        readOrderModal.style.display = 'none';
    });

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        const targetOrder = target.closest('tr');
        if (targetOrder) {
            openModal(targetOrder.dataset.orderNumber);
        }
    });

    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelanser.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelanser.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        blockFreelanser.style.display = 'none';
        blockCustomer.style.display = 'none';
        btnExit.style.display = 'none';
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const arr = [...formCustomer.elements];
        const obj = {};

        arr.filter(el =>
                (el.tagName === 'INPUT' && el.type !== 'radio') ||
                (el.type === 'radio' && el.checked) ||
                (el.tagName === 'TEXTAREA'))
            .forEach(el => {
                obj[el.name] = el.value;
            });

        orders.push(obj);
        formCustomer.reset();
    });


});