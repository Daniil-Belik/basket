import {
    basketContainer,
    eraseBasket,
    createBasket,
} from './basket.js';


const cartCounterLabel = document.querySelector('#cart-counter-label');
const contentContainer = document.querySelector('#content-container');
const basketCartBtn = document.querySelector('.page-header__cart-btn')

let cardCounter = 0;
let productInBasketArr = null;
let cardPrice = 0;
let restoreHTML = null;

const cartCounterLabelPrint = (c) => (c > 0) ? cartCounterLabel.innerHTML = `${c}` : cartCounterLabel.style.display = 'none';

const incrementCounter = () => {
    cartCounterLabelPrint(++cardCounter);
    if (cardCounter === 1) cartCounterLabel.style.display = 'block';
};

const getMockData = (t) => +t.parentElement.previousElementSibling.innerHTML.replace(/^\$(\d+)\s\D+(\d+).*$/i, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const getProductName = (t) => t.parentElement.parentElement.querySelector('.item-title').innerHTML;

const disableControls = (t, fn) => {
    t.disabled = true;
    contentContainer.removeEventListener('click', fn)
};

const enableControls = (t, fn) => {
    t.disabled = false;
    contentContainer.addEventListener('click', fn)
};

const writeProductToBasket = (t, arr) => {

    let item = null;
    let product = {
        productName: getProductName(t),
        productCode: getProductName(t),
        price: getMockData(t),
        count: 1,
        sum: getMockData(t)
    };
    if (arr !== null) {
        let i = 0;

        while ((item === null) && (i < arr.length)) {
            (arr[i].productCode === getProductName(t)) ? item = i : i++
        };
        if (item === null) arr.push(product)
        else {
            arr[item].count++;
            arr[item].sum = Math.round((arr[item].sum + arr[item].price) * 100) / 100;
        };
    } else arr = [product];

    return arr;
};

const btnClickHandler = (e) => {
    const target = e.target;
    const interval = 500;


    if (target && target.matches('.item-actions__cart')) {
        if (basketContainer !== null) eraseBasket();

        incrementCounter();

        productInBasketArr = writeProductToBasket(target, productInBasketArr);

        cardPrice = getPrice(target, cardPrice);
        restoreHTML = target.innerHTML;
        target.innerHTML = `Added ${cardPrice.toFixed(2)} $`;
        disableControls(target, btnClickHandler);

        setTimeout(() => {
            target.innerHTML = restoreHTML;

            enableControls(target, btnClickHandler);

        }, interval);

    };

};

const basketBtnHandler = (e) => {
    const target = e.target;

    if (target) {
        eraseBasket();
        if (!target.classList.contains('basket__btn-next')) {
            if (target.classList.contains('basket__btn-order')) {

            };
            cardPrice = 0;
            productInBasketArr = null;
            cardCounter = 0;
            cartCounterLabelPrint(cardCounter);
        };
    };
};

const createBasketWork = (c, pArr) => {
    createBasket(c, pArr);
    const basketBtn = document.querySelector('#btn-container');
    basketBtn.addEventListener('click', basketBtnHandler);
    basketContainer.addEventListener('click', delProductHandler);
};

const delProductHandler = (e) => {
    const target = e.target;

    if (target && target.matches('.basket__item-del')) {
        let b = true;
        let i = 0;

        while (b && i < productInBasketArr.length) {
            if (productInBasketArr[i].productCode === target.parentElement.dataset.code) {
                cardPrice -= productInBasketArr[i].sum;
                cardCounter -= productInBasketArr[i].count;

                productInBasketArr.splice(i, 1);
                b = false;
            } else i++;
        };
        eraseBasket();
        createBasketWork(cardCounter, productInBasketArr);
        cartCounterLabelPrint(cardCounter);
    };
};

const basketClickHandler = (e) => {
    const target = e.target;
    if (target) {
        createBasketWork(cardCounter, productInBasketArr);
    };
};

export const shopInit = () => {
    contentContainer.addEventListener('click', btnClickHandler);
    basketCartBtn.addEventListener('click', basketClickHandler);
}



