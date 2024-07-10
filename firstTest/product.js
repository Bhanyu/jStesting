let iconCart = document.querySelector(".icon-part");
let body = document.querySelector('body')
let closeBtn = document.querySelector(".close")
let cardsBox = document.querySelector(".listProducts")
let cardList = document.querySelector(".cartList");
let iconSpan = document.querySelector(".icon-part span") 
let totalPrice = document.querySelector(".totalPrice p")
const listProducts = [];
const addingCards = []; 
iconCart.addEventListener("click", ()=>{
    body.classList.toggle("showCart")
});

closeBtn.addEventListener("click", ()=>{
    body.classList.toggle("showCart")
});
const addScreenFunc  = ()=>{
cardsBox.innerHTML = "";
if (listProducts.length > 0 ) {
    listProducts.slice(0,8).forEach((product)=>{
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id
        newProduct.innerHTML = `
        <div class="img-part" ><img class="cardImg" src="${product.image}" alt=""></div>
        <div class="info-part">
        <h2 class="proName">${product.title}</h2>
        <p class="price"> ${product.price} $</p>
<button class="addCart">
Add To Cart
</button>

</div>`
cardsBox.appendChild(newProduct)
    })
  }}



  cardsBox.addEventListener("click", (event)=>{
let  alertClick = event.target;
if (alertClick.classList.contains("addCart")) {
    let product_id = alertClick.parentElement.parentElement.dataset.id
    addToCard(product_id)
} 
  })




  const addToCard = (product_id)=>{
    let positionThisProductInCart = addingCards.findIndex ((value)=>value.product_id == product_id)
if (positionThisProductInCart < 0) {
    addingCards.push({
        product_id: product_id,
        count: 1 
    })
  
}


else{
    addingCards[positionThisProductInCart].count += 1
}
addCardsScreen()
addCardMemory()
  }


  
  const addCardMemory = ()=>{
    localStorage.setItem("cart", JSON.stringify(addingCards))
  }

  
  const addCardsScreen = ()=>{
    cardList.innerHTML = ""
    let totalCount = 0
    if(addingCards.length > 0 ) {
        addingCards.forEach((card)=>{
            totalCount += card.count
            let newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.dataset.id = card.product_id
          
              let positionCard = listProducts.findIndex((value)=>{
                return value.id == card.product_id
              })
              let info  = listProducts[positionCard];

            newCard.innerHTML = `
            <div class="img-part" ><img class="cardImg" src="${info.image}" alt="img1"></div>
           
            <h2 class="proName">${info.title} </h2>
            <p class="price">Price: ${info.price}$ </p>
            <div class="quantity">
            <span class="minus">-</span>
        <span> ${card.count}</span>
        <span class="plus">+</span>
        </div>
    
    `;
   cardList.appendChild(newCard)

     })
    }
  getPrice()
    iconSpan.innerHTML = totalCount
  
  }
  const getPrice = ()=>{
    let price = 0
    addingCards.forEach((card)=>{
      let positionCard = listProducts.findIndex((value)=>{
        return value.id == card.product_id
      })
      let info  = listProducts[positionCard];
      price += card.count * info.price
    })
    totalPrice.innerHTML = `Total Price: ${price.toFixed(2)}$`
  }


  cardList.addEventListener("click", (event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains("minus") || positionClick.classList.contains("plus")){
      let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if(positionClick.classList.contains("plus")){
        type = "plus"
    }
    changeCount(product_id,type)

    }
  })




  const changeCount = (product_id, type)=>{
    let positionItemInCard = addingCards.findIndex((value)=>value.product_id == product_id)
    if (positionItemInCard >= 0) {
        switch (type) {
            case "plus":
                addingCards[positionItemInCard].count +=1
                break;
        
            default:
                let valueChange = addingCards[positionItemInCard].count - 1
                if (valueChange > 0) {
                    addingCards[positionItemInCard].count = valueChange

                }
                else{
                    addingCards.splice(positionItemInCard, 1)
                }
                break;
        }
    }


    addCardMemory()
    addCardsScreen()
   
  }
  



const getData = ()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((data)=>{
       listProducts.push(...data)
   addScreenFunc()

     
// karti yaddasdan alirsan
if (localStorage.getItem('cart')) {
    addingCards = JSON.parse(localStorage.getItem('cart'))
    addCardsScreen()
}
    })
    
}





getData();