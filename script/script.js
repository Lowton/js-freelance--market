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

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log('orders: ', typeof orders);
    const ordersTable = document.getElementById('orders');

    const readOrderModal = document.getElementById('order_read');
    const activeOrderModal = document.getElementById('order_active');

    const modalCloseButton = document.querySelector('.close');

    // functions
    const toStorege = () => {
        localStorage.setItem('orders', JSON.stringify(orders));
    };

    const countableName = (count) => {
        if ((count % 10 === 1) && (count%100 !== 11)) {return 'день';}
        if (((count % 10 > 1) && (count % 10 < 5)) && ((count % 100 < 10) || (count % 100 > 15))) {return 'дня';}
        return 'дней';
    };

    const calcDeadline = (deadline) => {
        const dayDiff = Math.floor((new Date(deadline) - Date.now())/(1000 * 60 * 60 * 24));
        if (dayDiff === 0) {return 'Сегодня!';}
        if (dayDiff < 0) {return 'Просрочено!!!';}
        return `через ${dayDiff} ${countableName(dayDiff)}`;
    }

    const renderOrders = () => {
        ordersTable.textContent = '';
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
            <tr class="order ${order.active ? 'taken' : ''}" data-order-number="${i}">
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${calcDeadline(order.deadline)}</td>
            </tr>`;
        });
    };

    const handlerModal = (event) => {
        const target = event.target;
        const modal = target.closest('.order-modal');
        const order = orders[modal.orderNumber];

        const baseActions = () => {
            modal.style.display = 'none';
            renderOrders();
            toStorege();
        };
        
        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        }

        if (target.classList.contains('get-order')) {
            order.active = true;
            baseActions();
        }

        if (target.id === 'capitulation') {
            order.active = false;
            baseActions();
        }

        if (target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1);
            baseActions();
        }        
    };

    const openModal = (orderNumber) => {
        const order = orders[orderNumber];
        
        const { title, firstName, email, phone, description, amount, currency, deadline, active = false } = order;

        const modal = active ? activeOrderModal : readOrderModal;

        const titleBlock = modal.querySelector('.modal-title');
        const firstNameBlock = modal.querySelector('.firstName');
        const emailBlock = modal.querySelector('.email');
        const descriptionBlock = modal.querySelector('.description');
        const deadlineBlock = modal.querySelector('.deadline');
        const currencyBlock = modal.querySelector('.currency_img');
        const countBlock = modal.querySelector('.count');
        const callBlock = modal.querySelector('.phone');

        modal.orderNumber = orderNumber;

        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.textContent = email;
        emailBlock.href= `mailto:${email}`;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = calcDeadline(deadline);
        currencyBlock.className = 'currency_img';
        currencyBlock.classList.add(currency);
        countBlock.textContent = amount;
        if (callBlock) {
            callBlock.href = `tel: ${phone}`;
            callBlock.closest('.btn').style.display = phone ? 'inline-block' : 'none';
        }        
        
        modal.style.display = 'flex';

        modal.addEventListener('click', handlerModal);
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
        toStorege();
        formCustomer.reset();
    });
});