/*!
 * Start Bootstrap - Shop Item v5.0.4 (https://startbootstrap.com/template/shop-item)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
 */
$(document).ready(load());

let item;

function load() {
  axios.get("http://localhost:8080/item").then((response) => {
    item = response.data;
    console.log(item);
    renderItem();
  });
}

// $("button.submit").on("click", placeBid);
// $("#bid-form").submit(function (event) {
//   alert("Handler for .submit() called.");
//   event.preventDefault();
//   console.log("Bid!");
// });

$("#bid-form").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  console.log("Bid!");
  var form = $(this);
  var actionUrl = form.attr("action");

  $.ajax({
    type: "POST",
    url: actionUrl,
    data: form.serialize(), // serializes the form's elements.
    success: function (data) {
      alert(data); // show response from the php script.
    },
  });
});

function placeBid() {
  console.log("Bid!");
}

function renderItem() {
  const bidList = item.bidList;
  const highestBid = getHighestBid(bidList);
  const formatedHighestBid = (Math.round(highestBid * 100) / 100).toFixed(2);
  $("#item-list").append(`
        <h1 class="display-5 fw-bolder">
            ${item.name}
        </h1>
        <h3 class="fs-5 mb-5">
            Highest bid: ${formatedHighestBid} ${item.itemCurrencyTag}
        </h3>
        <p class="lead">${item.description}</p>
        <form id="bid-form">
            <div class="form-group row">
                <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="username" class="form-control" id="inputUsername" placeholder="Username">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputBidAmount" class="col-sm-2 col-form-label">Bid</label>
                <div class="col-sm-10">
                    <input type="bid-amount" class="form-control" id="inputBidAmount" placeholder="Bid">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputCurrency" class="col-sm-2 col-form-label">Currency</label>
                <div class="col-sm-10">
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>SEK</option>
                        <option>USD</option>
                        <option>GBP</option>
                        <option>EUR</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary id="bid-button">Submit</button>
        </div>`);
}

function getHighestBid(bidList) {
  if (bidList.length === 0) {
    return 0;
  }
  let bid = bidList[bidList.length - 1];
  return bid.amount;
}
