const searchProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => showDetails(data))

}


const showDetails = (products) => {
  const details = document.getElementById('display-card');
  products.forEach(element => {
    console.log(element)
    const ratingStar = ratings(element.rating.rate);

    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `

          <div class="card ms-4 border-0 shadow  h-100 product">
            <div class="p-5">
            <img src="${element.image}" class="card-img-top" alt="..."  height=300 >
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">${element.title}</h5>
             
              <h5 class="card-text text-center fw-bold">$<span class="sp fw-bold">${element.price}</span></h5>
              <h5 class="card-text text-center"><span class="sp fw-bold">${ratingStar}</span></h5>

              <p class="card-text text-center">${element.description}</p>


            </div>
            <div class="footer mx-auto">
            <button class="btn btn-secondary" onclick="addToCard(${element.id},${element.price})" >Add to Card</button>
            
            </div>
          </div>
        
     
        
        
        `
    details.appendChild(div);


  });





}
let count = 0;
const addToCard = (id, price, newPrice) => {
  count = count + 1;
  document.getElementById('total-products').innerHTML = count;
  updatePrice(price);
  total();



}
const total = () => {
  const price = parseFloat(document.getElementById('price').innerText);
  const deliver = parseFloat(document.getElementById('delivery-charge').innerText);
  const shipping = parseFloat(document.getElementById('shipping-charge').innerText);
  const total = price + deliver + shipping;
  document.getElementById('total').innerText = total.toFixed(2)
  TaxCharge(total);

  const tax = parseFloat(document.getElementById('tax-charge').innerText);

  document.getElementById('taxtotal').innerText = (total + tax).toFixed(2);

}

const updatePrice = (price) => {
  const oldPrice = document.getElementById('price').innerText;
  const oldPriceFloat = parseFloat(oldPrice);
  const newPrice = price + oldPriceFloat;
  document.getElementById('price').innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
  ShippingCharge(newPrice);


}

const TaxCharge = (newPrice) => {
  document.getElementById('tax-charge').innerText = (newPrice * 0.15).toFixed(2);
}

const DeliveryCharge = (newPrice) => {
  let DeliveryCharge;
  if (newPrice <= 500) {
    return document.getElementById('delivery-charge').innerText = 0;
  }
  if (newPrice > 500 && newPrice <= 800) {
    document.getElementById('delivery-charge').innerText = 100
  }
  else if (newPrice > 800 && newPrice <= 1000) {
    document.getElementById('delivery-charge').innerText = 150
  } else if (newPrice > 1000) {
    document.getElementById('delivery-charge').innerText = 200
  }

}

const ShippingCharge = (newPrice) => {
  let ShippingCharge;
  if (newPrice <= 500) {
    return document.getElementById('shipping-charge').innerText = 0;
  }
  if (newPrice > 500 && newPrice <= 800) {
    document.getElementById('shipping-charge').innerText = 100
  }
  else if (newPrice > 800 && newPrice <= 1000) {
    document.getElementById('shipping-charge').innerText = 150
  } else if (newPrice > 1000) {
    document.getElementById('shipping-charge').innerText = 200
  }

}

const ratings = (rate) => {
  if (rate >= 4) {
    return star = ` <h6><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h6>`
  }
  else if (rate >= 3 && rate < 4) {
    return star = ` <h6><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h6>`
  }
  else if (rate >= 2 && rate < 3) {
    return star = ` <h6><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h6>`
  }
  else {
    return star = ` <h6><i class="fas fa-star"></i> ${rate}</h6>`
  }

}


const orderProducts = () => {
  const details = document.getElementById('details1');
  details.classList.remove("hidden");

  details.textContent = '';
  const totalPrice = document.getElementById('taxtotal').innerText;

  const div = document.createElement('div');

  div.innerHTML = ` <div class="alert alert-info alert-dismissible fade in " id="detailsHidden">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <h4>Your total Shopping : $${totalPrice}</h4>
                            <p>Thanks for Shopping With Us!!!!!</p>
                        </div>
  
    `

  details.appendChild(div)
}





searchProducts();





