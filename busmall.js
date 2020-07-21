'use strict';

/*LAB 11: Create a constructor function that creates an object associated with each product,
and has the following properties:
  -Name of the product
  - path of Image */

//global vars
var totalClicks = 0;
var productArray = [];
var displayRounds = 6;
/********************************************************************* */

//Step 1:
function Product(imgName,src,timesShown,numofVotes) {
  this.imgName = imgName;
  this.src = src;
  this.timesShown = 0;
  this.numOfVotes = 0;
  productArray.push(this);
}


//step 2:
// this is where I start creating a new product//
Product.prototype.renderProduct = function() {
  var target = document.getElementById('productList');
  var productPlace = document.createElement('td');
  var productImage = document.createElement('img');
  productImage.src = this.src;
  productImage.alt = this.imgName;
  productPlace.appendChild(productImage);
  var productPText = document.createElement('p');
  productPText.textContent = this.imgName;
  productPlace.appendChild(productPText);
  target.appendChild(productPlace);
  this.timesShown++; // had to include times shown as a prop on object so that all products timesShown is incremented
};
// call render Product


// step 3: //created event handler that wil check to see if the product src matches targeted src
function handleClickOnProductImg(event) {
  console.log(event.target);
  for(var i =0; i < productArray.length;i++) {
    console.log('checking product', productArray[i]);
    if(productArray[i].src === event.target.getAttribute('src')) {
      productArray[i].numOfVotes++; //each time the loop iterates through, one will add to num of votes on clicked image
      totalClicks++; // each time loops iterates thorough, total clicks will also increment
      console.log('it\'s a match', totalClicks);
    }
  }
  displayProducts();
  var totalClicksHtml = document.getElementById('totalClicks');
  totalClicksHtml.innerHtml= totalClicks;
  // Below check if rounds meet max amount of clicks of 25(diplayRounds var)
  //remove event listener
  //render results
  if(totalClicks === displayRounds) {
    renderTotalVotes();
    productList.removeEventListener('click', handleClickOnProductImg);
  }
}
var productList  = document.getElementById('productList');
productList.addEventListener('click', handleClickOnProductImg);


//this goes after loop-- this is what will randomize the images to the user/ the images would be random
//step 4

function displayProducts() {
  productList = document.getElementById('productList');
  productList.innerHTML = ''; // we set this to an empty string so that old images will be erased 
  var randomizerOne = randomImg(0, productArray.length - 1);
  var randomizerTwo = randomImg(0, productArray.length - 1); // index of array starts at 0 and the highest index of array will equal length-1.
  var randomizerThree = randomImg(0, productArray.length - 1);
  var newProductOne = productArray[randomizerOne];
  var newProductTwo = productArray[randomizerTwo];
  var newProductThree = productArray[randomizerThree];
  newProductOne.renderProduct();
  newProductTwo.renderProduct();
  newProductThree.renderProduct();
}
function randomImg(min, max) { // this function will take a max and min indexes and randomize number
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

new Product('r2d2', 'busMall-Images/bag.jpg',0,0); // here I created instances of multiple objects
new Product('banana', 'busMall-Images/banana.jpg',0,0);
new Product('tpstand', 'busMall-Images/bathroomtpstand.jpg',0,0);
new Product('boots', 'busMall-Images/boots.jpg',0,0);
new Product('breakfast', 'busMall-Images/breakfast.jpg',0,0);
new Product('bubblegum', 'busMall-Images/bubblegum.jpg',0,0);

function renderTotalVotes() {
  var target = document.getElementById('productList'); // this functions loop iterates through product list and renders total votes with image
  for(var i = 0; i < productArray.length; i++) {
    var product = productArray[i];
    var productPlace = document.createElement('li');
    productPlace.textContent = product.imgName + ' had' + product.numOfVotes + ' and was shown' + product.timesShown + ' times.';
    target.appendChild(productPlace); // had to write in the num of votes, plus times shown plus product name
  }
}
