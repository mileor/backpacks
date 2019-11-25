/* Открытие/закрытие модальных окон */

let openCartModal = document.querySelector(".header__cart");
let cartModal = document.querySelector(".modal-container-cart");
let closeCartModal = document.querySelector(".cart-modal__close");

openCartModal.onclick = function() {
    cartModal.classList.remove("invisible");
    document.body.classList.add("modal-open");
};

closeCartModal.onclick = function(event) {
    event.preventDefault();
    cartModal.classList.add("invisible");
    document.body.classList.remove("modal-open");
};

let openSuccessModal = document.querySelector(".cart-modal__btn");
let successModal = document.querySelector(".modal-container-success");
let closeSuccessModal = document.querySelector(".success-modal__btn");

openSuccessModal.onclick = function() {
    successModal.classList.remove("invisible");
    cartModal.classList.add("invisible");
};

closeSuccessModal.onclick = function() {
    successModal.classList.add("invisible");
    document.body.classList.remove("modal-open");
};



/* Данные для карточек товаров */

let backpacksData = [
    {
        name: 'Голубой рюкзак',
        image: 'images/backpack__1.png',
        price: 200,
    },
    {
        name: 'Коричневый рюкзак',
        image: 'images/backpack__2.png',
        price: 300,
    },
    {
        name: 'Спортивный рюкзак',
        image: 'images/backpack__3.png',
        price: 500,
    },
    {
        name: 'Минимализм',
        image: 'images/backpack__4.png',
        price: 250,
    },
    {
        name: 'Туристический рюкзак',
        image: 'images/backpack__5.png',
        price: 600,
    },
    {
        name: 'Красный рюкзак',
        image: 'images/backpack__6.png',
        price: 150,
    },
];

let productPrice = function(price) {
    priceRub = price + " руб.";
    return priceRub;
}

let cartTitleToggle = function() {
    let cartTitle = document.querySelector(".cart-modal__total-title");
    if (backpacksCartData.length === 0) {
        cartTitle.innerHTML = "В корзине пусто";
    }
    if (backpacksCartData.length !== 0) {
        let totalProductPrice;
        let totalPrice = 0;
        for (let backpack of backpacksCartData) {
            totalProductPrice = (backpack.count * backpack.price);
            totalPrice += totalProductPrice;
        }
        cartTitle.innerHTML = "<p class='cart-modal__total-title'>Итого: <span class='cart-modal__total-price'>" + productPrice(totalPrice) + "</span></p>";
    }
}

let cartBtnToggle = function() {
    let cartBtn = document.querySelector(".cart-modal__btn");
    if (backpacksCartData.length === 0) {
        cartBtn.classList.add("invisible");
    }
    if (backpacksCartData.length !== 0) {
        cartBtn.classList.remove("invisible");
    }
}



/* Наполнение страницы карточками товаров */

let productsTable = function() {
    let productsContainer = document.querySelector(".products-list");
    let productItems = "";

    for (let backpack of backpacksData) {
        let productItem = "<div class='products__item product'>";
            productItem += "<img class='product__img' src=" + "'" + backpack.image + "'" + " alt=" + "'" + backpack.name + "'" + "/>";
            productItem += "<h2 class='product__title'>" + backpack.name + "</h2>";
            productItem += "<p class='product__price'>" + productPrice(backpack.price) + "</p>";
            productItem += "<button class='product__btn' data-backpack-name=" + "'" + backpack.name + "'" + ">Добавить в корзину</button>"
        productItem += "</div>"
        productItems += productItem
    }
    productsContainer.innerHTML = productItems;
}

productsTable();



/* Формирование корзины с товарами */

let backpacksCartData = [

];

let cartTable = function() {
    let cartContainer = document.querySelector(".cart-modal-items");
    let cartItems = "";

    for (let backpack of backpacksCartData) {
        let cartItem = "<div class='product-in-cart'>";
        let productPriceInCart = backpack.count * backpack.price;
        cartItem += "<img class='product-in-cart__img' src=" + "'" + backpack.image + "'" + " alt=" + "'" + backpack.name + "'" + "/>";
        cartItem += "<p class='product-in-cart__name'>" + backpack.name + "</p>";
        cartItem += "<div class='product-in-cart__counter'>";
            cartItem += "<i class='fas fa-minus product-in-cart__count-minus' data-backpack-minus=" + "'" + backpack.name + "'" + "></i>";
            cartItem += "<input class='product-in-cart__count' type='text' value='" + backpack.count + "'/>";
            cartItem += "<i class='fas fa-plus product-in-cart__count-plus' data-backpack-plus=" + "'" + backpack.name + "'" + "></i>";
        cartItem += "</div>";
        cartItem += "<p class='product-in-cart__price'>" + productPrice(productPriceInCart) + "</p>";
        cartItem += "<a href='' class='product-in-cart__delete' data-backpack-name-delete="  + "'" + backpack.name + "'" + ">";
            cartItem += "<i class='far fa-trash-alt'></i>";
        cartItem += "</a>";
        cartItem += "</div>";
        cartItems += cartItem;
    }

    cartContainer.innerHTML = cartItems;

    let removeFromCardBtn = document.querySelectorAll(".product-in-cart__delete");
    for (let removeProduct of removeFromCardBtn) {
        removeProduct.onclick = function(event) {
            event.preventDefault();
            let productNameDelete = removeProduct.getAttribute("data-backpack-name-delete");
            for (let i = 0; i < backpacksCartData.length; i++) {
                if(backpacksCartData[i].name === productNameDelete) {
                    backpacksCartData.splice(i, 1);
                }
            }
            let cartFull = document.querySelector(".header__cart");
            if (backpacksCartData.length === 0) {
                cartFull.classList.remove("header__cart_full");
            }
            cartTable();
        }
    }

    let counterPlusProduct = document.querySelectorAll(".product-in-cart__count-plus");
    for (let plusProduct of counterPlusProduct) {
        plusProduct.onclick = function() {
            let plusProductName = plusProduct.getAttribute("data-backpack-plus");
            for (let i = 0; i < backpacksCartData.length; i++) {
                if(backpacksCartData[i].name === plusProductName) {
                    backpacksCartData[i].count ++;
                }
            }
            cartTable();
        }
    }

    let counterMinusProduct = document.querySelectorAll(".product-in-cart__count-minus");
    for (let minusProduct of counterMinusProduct) {
        minusProduct.onclick = function() {
            let minusProductName = minusProduct.getAttribute("data-backpack-minus");
            for (let i = 0; i < backpacksCartData.length; i++) {
                if(backpacksCartData[i].name === minusProductName) {
                    backpacksCartData[i].count --;
                }
                if(backpacksCartData[i].count <= 0) {
                    backpacksCartData.splice(i, 1);
                }
            }
            let cardFull = document.querySelector(".header__cart");
            if (backpacksCartData.length === 0){
                cardFull.classList.remove("header__cart_full");
            }
            cartTable();
        }
    }
    cartTitleToggle();
    cartBtnToggle();
}



/* Добаление товаров в корзину */

let addToCardBtn = document.querySelectorAll(".product__btn");
let successAddProduct = document.querySelector(".alert-success");
for (let addProduct of addToCardBtn) {
    addProduct.onclick = function() {
        successAddProduct.classList.remove("invisible-alert");
        setTimeout ('successAddProduct.classList.add("invisible-alert")', 1600 );
        let productName = addProduct.getAttribute("data-backpack-name");
        let isInCart = false;
        for(backpackInCart of backpacksCartData) { 
            if(productName === backpackInCart.name) {
                backpackInCart.count ++;
                isInCart = true;
            }
        } 
        if (isInCart === false) {
            for(backpack of backpacksData) { 
                if(productName === backpack.name) {
                    backpacksCartData.push(backpack);
                    backpack.count = 1;
                }
            } 
        }
        let cartFull = document.querySelector(".header__cart");
        if (backpacksCartData.length >= 0) {
            cartFull.classList.add("header__cart_full");
        } 
        cartTable();
    };
}
cartTable();