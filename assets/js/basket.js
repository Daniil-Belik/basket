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
    background-color: rgb(150, 200, 260);
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
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}
.basket__total {
    margin: 20px auto;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
}
.basket__btn-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
}
.basket__btn {
    display: inline-block;
    background-color: #2d8df3;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out; 
}
.basket__btn:hover {
    background-color: #fff;
    color: #2d8df3;
    border: 2px solid #2d8df3;
    padding-bottom: 5px;
}
.basket__item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #ccc;
    margin-bottom: 10px;
    gap: 10px;
}
.basket__item-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 10px;
}
.basket__item-info {
    flex-grow: 1;
}
.basket__item-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}
.basket__item-price {
    font-size: 16px;
    color: #333;
}
.basket__item-qty {
    font-size: 16px;
    color: #333;
}
.basket__item-del {
    display: inline-block;
    background-color: #f00;
    border: none;
    color: #fff;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1px solid #f00;
}
.basket__item-del:hover {
    background-color: #fff;
    color: #f00;
    border: 1px solid #f00;
    text-aling: center;
    font-size: 14px;
}
`
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


