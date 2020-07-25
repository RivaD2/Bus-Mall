'use strict';

/*LAB 11: Create a constructor function that creates an object associated with each product,
and has the following properties:
  -Name of the product
  - path of Image */

//global vars
var totalClicks = 0;
Product.productArray = [];
var displayRounds = 25;
var imgHistory = [0,1,2];
/********************************************************************* */

//Step 1:
function Product(imgName,src) {
  this.imgName = imgName;
  this.src = src;
  this.timesShown = 0;
  this.numOfVotes = 0;
  Product.productArray.push(this);
}


//step 2:
// this is where I start creating a new product//
Product.prototype.renderProduct = function() {
  var target = document.getElementById('productList');
  var productPlace = document.createElement('td');
  var productImage = document.createElement('img');
  productImage.src = this.src;
  productImage.alt = this.imgName;
  //Used setAttribute method on productImage
  //two parameters are passed, the 1st is name of attribute, the 2nd is a value (value for whaetever the attribute uses)
  productImage.setAttribute('class','products');
  productPlace.appendChild(productImage);
  var productPText = document.createElement('p');
  productPText.textContent = this.imgName;
  productPlace.appendChild(productPText);
  target.appendChild(productPlace);
  this.timesShown++;
};
// call render Product


// step 3:
function handleClickOnProductImg(event) {
  console.log(event.target);
  for(var i =0; i < Product.productArray.length;i++) {
    console.log('checking product', Product.productArray[i]);
    if(Product.productArray[i].src === event.target.getAttribute('src')) {
      // if product is equal to src of product img, we will increase total clicks and num of votes
      Product.productArray[i].numOfVotes++;
      totalClicks++;
      console.log('it\'s a match', totalClicks);
    }
  }
  var productArrayString = JSON.stringify(Product.productArray);
  localStorage.setItem('Products', productArrayString);

  displayProducts();
  // var totalClicksHTML = document.getElementById('totalClicks');  // not needed
  // totalClicksHTML.innerHTML= totalClicks;
  //check if rounds meet max amount of clicks of 25
  //remove event listener
  //render results
  if(totalClicks === displayRounds) {
    // renderTotalVotes();
    displayChart();
    productList.removeEventListener('click', handleClickOnProductImg);
  }
}
var productList  = document.getElementById('productList');
productList.addEventListener('click', handleClickOnProductImg);


//this goes after loop-- this is what will randomize the images to the user/ the images would be random
// the loop below will shift off a value of array from the front,so now we can remove items as we add
//step 4

function displayProducts() {
  productList = document.getElementById('productList');
  productList.innerHTML = '';
  var randomizerOne = randomImg(0, Product.productArray.length - 1);
  imgHistory.push(randomizerOne);
  var randomizerTwo = randomImg(0, Product.productArray.length - 1);
  imgHistory.push(randomizerTwo);
  var randomizerThree = randomImg(0, Product.productArray.length - 1);
  imgHistory.push(randomizerThree);

  for(var i = 0; i < 3; i++) imgHistory.shift(); //one-lined for loop // run this three times
  var newProductOne = Product.productArray[randomizerOne];
  var newProductTwo = Product.productArray[randomizerTwo];
  var newProductThree = Product.productArray[randomizerThree];
  newProductOne.renderProduct();
  newProductTwo.renderProduct();
  newProductThree.renderProduct();
}


function randomImg(min, max) {
  // Took getRandomNum and we turned it into a method
  min = Math.ceil(min); // The same code still works in the method
  max = Math.floor(max);// THe only thing I had to change was the function to the method, and line34 to this.getRandom
  var randomIndex = Math.floor(Math.random() * (max - min)) + min; // don't return here yet
  var isMatch = true;
  while( isMatch === true) {
    isMatch = false;
    for (var i = 0; i < imgHistory.length; i++) { // in each loop, for ea item in history, is our randomIndex in our imgHistory
      if (randomIndex === imgHistory[i]) {
        isMatch = true;
        break;
      }//if randomIndex IS in imgHistory, find new randomIndex
    } //continue while loop
    if(isMatch === true) {
      randomIndex = Math.floor(Math.random() * (max - min)) + min;
    }
  }
  return randomIndex;
}

// products.product = parsedProducts;
// if(parsedProducts !== null) {
//   var storedProductLS = JSON.parse(localStorage.getItem('products'));
// }
var storedProductLS = localStorage.getItem('Products');
if(storedProductLS !== null) {
  var parsedProducts = JSON.parse(storedProductLS); // extracted properties of object so we can send to constructor
  for(var i = 0; i < parsedProducts.length; i++) {
    var imgName = parsedProducts[i].imgName;
    var votes = parsedProducts[i].numOfVotes;
    var src = parsedProducts[i].src;
    var timesShown = parsedProducts[i].timesShown;
    new Product(imgName, src, timesShown,votes); // here we grabbed props and sent it back though constructor so we have all methods
  }
  console.log(parsedProducts);
} else {

  new Product('r2d2', 'busMall-Images/bag.jpg');
  new Product('banana', 'busMall-Images/banana.jpg');
  new Product('tpstand', 'busMall-Images/bathroomtpstand.jpg');
  new Product('boots', 'busMall-Images/boots.jpg');
  new Product('breakfast', 'busMall-Images/breakfast.jpg');
  new Product('bubblegum', 'busMall-Images/bubblegum.jpg');
  new Product('chair', 'busMall-Images/chair.jpg');
  new Product('cthulhu', 'busMall-Images/cthulhu.jpg');
  new Product('dog-duck', 'busMall-Images/dog-duck.jpg');
  new Product('dragon', 'busMall-Images/dragon.jpg');
  new Product('pen', 'busMall-Images/pen.jpg');
  new Product('pet-sweep', 'busMall-Images/pet-sweep.jpg');
  new Product('scissors', 'busMall-Images/scissors.jpg');
  new Product('shark', 'busMall-Images/shark.jpg');
  new Product('sweep', 'busMall-Images/sweep.png');
  new Product('tauntaun', 'busMall-Images/tauntaun.jpg');
  new Product('unicorn', 'busMall-Images/unicorn.jpg');
  new Product('usb', 'busMall-Images/usb.gif');
  new Product('water-can', 'busMall-Images/water-can.jpg');
  new Product('wine-glass', 'busMall-Images/wine-glass.jpg');
}

// function renderTotalVotes() {
//   var target = document.getElementById('productList');
//   for(var i = 0; i < Product.productArray.length; i++) {
//     var product = Product.productArray[i];
//     var productPlace = document.createElement('li');
//     productPlace.textContent = product.imgName + ' had ' + product.numOfVotes + ' and was shown ' + product.timesShown + ' times.';
//     target.appendChild(productPlace);
//   }
// }

function displayChart() {
  console.log('trying to render chart');
  var labelArray2 = [];
  var labelArray =[];
  var dataArray = []; // pushing values into array // each imgName of product
  var dataArray2 = [];
  for(var i = 0; i < Product.productArray.length; i++) {
    labelArray.push(Product.productArray[i].imgName);
    labelArray2.push(Product.productArray[i].timesShown);
    dataArray.push(Product.productArray[i].numOfVotes);
    dataArray2.push(Product.productArray[i].timesShown);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: labelArray,
      datasets: [{
        label: 'Votes ' + ' and ' + ' Times Shown',
        data: dataArray,
        backgroundColor: [
          'rgba(83, 51, 237, 1)',
          'rgba(77, 5, 232, 1)',
          'rgba(228, 241, 254, 1)',
          'rgba(89, 171, 227, 1)',
          'rgba(51, 110, 123, 1)',
          'rgba(92, 151, 191, 1)',
          'rgba(30, 139, 195, 1)',
          'rgba(34, 167, 240, 1)',
          'rgba(107, 185, 240, 1)',
          'rgba(0, 181, 204, 1)',
          'rgba(75, 119, 190, 1)',
          'rgba(197, 239, 247, 1)',
          'rgba(58, 83, 155, 1)',
          'rgba(1, 50, 67, 1)',
          'rgba(31, 58, 147, 1)',
          'rgba(25, 181, 254, 1)',
          'rgba(44, 130, 201, 1)',
          'rgba(129, 207, 224, 1)',
          'rgba(82, 179, 217, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(37, 116, 169, 1)',
          'rgba(77, 19, 209, 1)',
          'rgba(68, 108, 179, 1)',
          'rgba(52, 73, 94, 1)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Votes ' + ' and ' + ' Times Shown',
        data: dataArray2,
        backgroundColor: [
          'rgba(83, 51, 237, 1)',
          'rgba(77, 5, 232, 1)',
          'rgba(228, 241, 254, 1)',
          'rgba(89, 171, 227, 1)',
          'rgba(51, 110, 123, 1)',
          'rgba(92, 151, 191, 1)',
          'rgba(30, 139, 195, 1)',
          'rgba(34, 167, 240, 1)',
          'rgba(107, 185, 240, 1)',
          'rgba(0, 181, 204, 1)',
          'rgba(75, 119, 190, 1)',
          'rgba(197, 239, 247, 1)',
          'rgba(58, 83, 155, 1)',
          'rgba(1, 50, 67, 1)',
          'rgba(31, 58, 147, 1)',
          'rgba(25, 181, 254, 1)',
          'rgba(44, 130, 201, 1)',
          'rgba(129, 207, 224, 1)',
          'rgba(82, 179, 217, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(37, 116, 169, 1)',
          'rgba(77, 19, 209, 1)',
          'rgba(68, 108, 179, 1)',
          'rgba(52, 73, 94, 1)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
