document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const customer = document.getElementById('customer');
    const freelanser = document.getElementById('freelancer');

    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelanser = document.querySelector('#block-freelancer');
    const blockChoice = document.getElementById('block-choice');

    const btnExit = document.getElementById('btn-exit');

    const formCustomer = document.getElementById('form-customer');

    const orders = [];

    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelanser.addEventListener('click', () => {
        blockChoice.style.display = 'none';
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
        const arr = Array.from(formCustomer.elements);
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