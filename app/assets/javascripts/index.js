$(function() {
  console.log('index.js loaded ... ');
})
// Get model functions
function getUser() {
  $.ajax({
    url: "http://localhost:3000/users/1",
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    console.log("response: ", response);


    let user = new User(response)
    let userDisplay = user.userHTML()
    // return user
    // $('div.main').html(userDisplay)

  })
}

function getFoodItem() {
  $.ajax({
    url: "http://localhost:3000/food_items/1",
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    console.log("response: ", response);


    let food_item = new FoodItem(response)


  })
}

function getMeal() {
  $.ajax({
    url: "http://localhost:3000/meals/1",
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    console.log("response: ", response);


    let meal = new Meal(response)


  })
}
getUser()

// Model classes
class User {
  constructor(obj) {
    this.name = obj.name
    this.email = obj.email
    this.id = obj.id
    this.max_calories = obj.max_calories
  }
}

User.prototype.userHTML = function () {
  return (`
    <div>
    <h1>${this.name}</h1>
    </div>
  `)
}

class Meal {
  constructor(obj) {
    this.description = obj.description
    this.food_quantity = obj.food_quantity
  }
}

class FoodItem {
  constructor(obj) {
    this.name = obj.name
    this.calories = obj.calories
  }
}

FoodItem.prototype.foodItemHTML = function () {
  return(`
      <div>
      <h4>${this.name} - ${this.calories} calories per serving</h4>
      </div>
    `)
}
