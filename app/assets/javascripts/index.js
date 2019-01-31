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
    $('div.meal-history').append(user.userMealList())
  })
}

function getFoodItem(id) {
  $.ajax({
    url: `http://localhost:3000/food_items/${id}`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    console.log("response: ", response);


    let food_item = new FoodItem(response)


  })
}

function getCurrentUser() {
  $.ajax({
    url: "http://localhost:3000/current_user",
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    console.log("response: ", response);


    let user = new User(response)
    let userDisplay = user.userHTML()
    // return user
    // $('div.main').html(userDisplay)
    $('div.meal-history').append(user.userMealList())
  })
}

function getFoodItems() {
  $.ajax({
    url: `http://localhost:3000/food_items/`,
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
// getCurrentUser()

// Model classes
class User {
  constructor(obj) {
    this.name = obj.name
    this.email = obj.email
    this.id = obj.id
    this.max_calories = obj.max_calories
    this.meals = obj.meals
  }
}

User.prototype.userHTML = function () {
  return (`
    <div>
    <h1>${this.name}</h1>
    </div>
  `)
}

User.prototype.userMealList = function () {
  meals = ['<ul>']
  this.meals.forEach(function(meal) {
    var today = new Date()
    if (meal.eaten_today === true) {
      meals.push(`<li>${meal.food_quantity} ${meal.food_item.name}(s) – ${(meal.food_item.calories * meal.food_quantity)}</li>`)
    }
  })
  meals.push('</ul>')
  return meals
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
      <div hidden>
      <h4>${this.name} - ${this.calories} calories per serving</h4>
      <a href="/food_items/${this.id}/meals/new">Eat</a>
      </div>
    `)
}

FoodItem.prototype.foodItemForms = function () {
  return(`
      <div>
      </div>
    `)
}

// function userMealList() {
//   let user = getUser()
//   let meals = user.meals
//   debugger
// }
// // Append meal history to user show page
// $('div.meal-history').append(userMealList())


// New Meal form ajax request
$(function() {
  $('a.food-item-link').click(function(event) {
    event.preventDefault()
    let foodItemId = this.dataset.foodItem
  })
})

$(function() {
  $('form#new_meal.new_meal').submit(function(event) {
    event.preventDefault()

    let values = $(this).serialize()
    let user_id = document.getElementById('meal_user_id').value
    let food_item_id = document.getElementById('meal_food_item_id').value
    let posting = $.post(`http://localhost:3000/food_items/${food_item_id}/meals`, values)

    posting.done(function(data) {
      // debugger
      header = `<h1>${data.user.name} just had ${data.food_quantity * data.food_item.calories} calories of ${data.food_item.name}.</h1>`
      $('div.meal-form').empty()
      $('div.meal-form').append(header)
    })
  })
})
