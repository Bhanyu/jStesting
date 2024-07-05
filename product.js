let iconCart = document.querySelector(".icon-part");
let body = document.querySelector('body')
let closeBtn = document.querySelector(".close")
const listProducts = [];
iconCart.addEventListener("click", ()=>{
    body.classList.toggle("showCart")
});

closeBtn.addEventListener("click", ()=>{
    body.classList.toggle("showCart")
});
const getData = ()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((data)=>{
listProducts.push(...data)
console.log(listProducts);
    })
}