export let basketContainer = null;

const headerNavbar = document.querySelector('.page-header__navbar');

const createElement = ({ type, attrs, container = null }) => {
    const el = document.createElement(type);

    for (const [key, value] of Object.entries(attrs)) {
        if (key === 'innerText') {
            el.innerHTML = value;
        } else if (key.startsWith('data')) {
            el.dataset[key.slice(4)] = value;
        } else {
            el.setAttribute(key, value);
        }
    }

    if (container) {
        container.append(el);
    }

    return el;
};

const createBasketContainer = (count) => {
    basketContainer = createElement({
        type: 'div',
        attrs: { class: 'well basket__container' },
        container: headerNavbar,
    });

    createElement({
        type: 'p',
        attrs: { innerText: `В корзине ${count} товаров` },
        container: basketContainer,
    });

    return basketContainer;
};

const createBasketBtn = (count, container) => {
    const basketBtnContainer = createElement({
        type: 'div',
        attrs: {
            class: 'basket__btn-container',
            id: 'btn-container',
        },
        container,
    });

    createElement({
        type: 'button',
        attrs: {
            class: 'btn btn-primary basket__btn-next',
            id: 'btn-next',
            type: 'button',
            innerText: 'Продолжить покупки',
        },
        container: basketBtnContainer,
    });

    if (count > 0) {
        createElement({
            type: 'button',
            attrs: {
                class: 'btn btn-primary basket__btn-clear',
                type: 'button',
                innerText: 'Очистить корзину',
            },
            container: basketBtnContainer,
        });

        createElement({
            type: 'button',
            attrs: {
                class: 'btn btn-primary basket__btn-order',
                type: 'submit',
                innerText: 'Оформить заказ',
            },
            container: basketBtnContainer,
        });
    }
};

const createBasketList = (container, products) => {
    let sum = 0;

    for (const product of products) {
        const basketItem = createElement({
            type: 'div',
            attrs: {
                class: 'basket__item-container',
                datacode: product.productCode,
            },
            container,
        });

        createElement({
            type: 'span',
            attrs: { innerText: `${product.productName}  ` },
            container: basketItem,
        });
        createElement({
            type: 'span',
            attrs: {
                class: 'basket__item-count',
                innerText: `- ${product.count} шт  `,
            },
            container: basketItem,
        });
        createElement({
            type: 'span',
            attrs: { innerText: `цена ${product.price.toFixed(2)}$  ` },
            container: basketItem,
        });
        createElement({
            type: 'span',
            attrs: { innerText: `сумма: ${product.sum.toFixed(2)}$` },
            container: basketItem,
        });
        createElement({
            type: 'i',
            attrs: { class: 'fas fa-times basket__item-del' },
            container: basketItem,
        });

        sum += product.sum;
    }

    const basketTotal = createElement({
        type: 'div',
        attrs: {
            class: 'basket__total',
            innerText: `Сумма за товары ${sum.toFixed(2)}$`,
        },
        container,
    });

    return basketTotal;
};

const createStyle = () => {
    const css = `
.page-header__navbar {
    position: relative;
}
.basket__container {
    background-color: rgb(150, 200, 241);
    position: absolute;
    padding: 10px;
    bottom:0;
    right: 20%;
    transform: translateY(100%);
    z-index: 1000;
    border: 1px solid #2d8df3;
    border-radius: 4px;
}
.basket__container p {
    text-align: center;
    font-size: 18px;
}
.basket__total {
    margin: 10px auto;
    text-align: center;
    font-size: 18px;
}
.basket__btn-container {
    display: flex;
    gap: 10px;
}
.basket__item-container {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    border-bottom: 1px solid lightblue;
}
.basket__item-del {
    display: block;
    background-color: #007bff;
    border: 1px solid #041c36;
    padding: 5px 3px 0 3px;
    cursor: pointer;
    font-size: 10px;
    border-radius: 2px;
}`;

    createElement({
        type: 'style',
        attrs: { innerText: css },
        container: document.head,
    });
};

export const eraseBasket = () => {
    basketContainer.remove();
    basketContainer = null;
};

export const createBasket = (count, productArr) => {
    createBasketContainer(count);
    const basketItems = count > 0 && createBasketList(basketContainer, productArr);
    createBasketBtn(count, basketContainer);
    createStyle();
    return basketItems;
};