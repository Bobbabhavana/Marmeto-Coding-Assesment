let categories= document.getElementById("categories");
let tabContent = document.getElementById("tabContent");
let tabMen=document.getElementById("men");
let tabWomen=document.getElementById("women");
let tabKids=document.getElementById("kids");

tabMen.onclick = function () {
    showProducts('men');
    hideProduct("women");
    hideProduct("kids");
}

tabWomen.onclick = function () {
    showProducts('women');
    hideProduct("men");
    hideProduct("kids");
}

tabKids.onclick = function () {
    showProducts('kids')
    hideProduct("men");
    hideProduct("women");

}

function getProductData() {

    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json").then(res => res.json()).then(data => {
        renderProductUi(data);
    })
}


getProductData();


function renderProductUi(data) {
    let html = "";


    data?.categories.forEach(element => {
        element?.category_products.forEach(product => {

            html += `<div class="check ${element.category_name.toLowerCase()}">
        <img src = "${product?.image}" class= "productImg" >
            <p class="badge-text ${product.badge_text ?? 'no-badge'}">${product?.badge_text}</p>
            <div class="titleAndBrand">
                <h1 class="title">${product?.title}</h1>
                <ul><li class="brand">${product?.vendor}</li></ul>
            </div>
            <div class="priceInfo">
                <p>RS ${Number(product?.price).toFixed(2)}</p>
                <p class="straikeOffText">${Number(product?.compare_at_price).toFixed(2)}</del>
                <p class="red">${(((product?.compare_at_price - product?.price) / product?.compare_at_price) * 100).toFixed(0)}% off</p>
            </div>
            <button class="cartButton">Add to Cart</button>
        </div > `;
        })
    });
    document.querySelector("#bannerCards").innerHTML = html;

    showProducts('men');
}




function showProducts(category) {
    document.querySelectorAll(`.check.${category}`).forEach(element => {
        element.style.display = "flex";
    })
    document.querySelector(`.${category}`).classList.add('active');
}

function hideProduct(category) {
    document.querySelectorAll(`.check.${category}`).forEach(element => {
        element.style.display = "none";
    })
    document.querySelector(`.${category}`).classList.remove('active');

}