$(function() {
  console.log('index.js loaded ... ');
  listenForFoodItemClick();
  listenForMealFormClick()
  getCurrentUser()
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

function getFoodItemForm(linkPath) {
  $.ajax({
    url: `${linkPath}`,
    method: 'get',
    dataType: 'html'
  }).done(function(response) {
    console.log("response: ", response)
    $('div.food-form-container').html(response)
  })
}

function getCurrentUser() {
  $.ajax({
    url: "http://localhost:3000/the_current_user",
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    console.log("response: ", response);


    let user = new User(response)
    let userDisplay = user.userHTML()
    // return user
    // $('div.main').html(userDisplay)
    if (user.userMealList().length > 0) {
      $('div.meal-history').append(user.userMealList())
    } else {
      $('div.meal-history').append('<div class="field">Nothing eaten today</div>')
    }
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
  meals = []
  this.meals.forEach(function(meal) {
    if (meal.eaten_today === true) {
      meals.push(`<div class="field"><strong>${meal.food_item.name}:</strong> ${meal.food_quantity} serving(s) <span class="right"><strong>Calories:</strong> ${(meal.food_item.calories * meal.food_quantity)}</span></div>`)
    }
  })
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

// FoodItem.prototype.foodItemForms = function () {
//   return(`
//       <div>
//       </div>
//     `)
// }

// function userMealList() {
//   let user = getUser()
//   let meals = user.meals
//   debugger
// }
// // Append meal history to user show page
// $('div.meal-history').append(userMealList())


// New Meal form ajax request
function listenForFoodItemClick() {
  $('a.food-item-link').click(function(event) {
    event.preventDefault()
    getFoodItemForm(this.href)
    listenForMealFormClick()
  })
}


function listenForMealFormClick() {
  $('input.submit-button').click(function(event) {
    debugger
    event.preventDefault()
    submitMealForm()
  })
}

function submitMealForm() {
  let values = $('form#new_meal.new_meal').serialize()
  let user_id = document.getElementById('meal_user_id').value
  let food_item_id = document.getElementById('meal_food_item_id').value
  let posting = $.post(`http://localhost:3000/food_items/${food_item_id}/meals`, values)

  posting.done(function(data) {
    // debugger
    header = `<h1>${data.user.name} just had ${data.food_quantity * data.food_item.calories} calories of ${data.food_item.name}.</h1>`
    $('div.meal-form').empty()
    $('div.meal-form').append(header)
  })
}

// $(function() {
//   $('form#new_meal.new_meal').submit(function(event) {
//     event.preventDefault()
//
//     let values = $(this).serialize()
//     let user_id = document.getElementById('meal_user_id').value
//     let food_item_id = document.getElementById('meal_food_item_id').value
//     let posting = $.post(`http://localhost:3000/food_items/${food_item_id}/meals`, values)
//
//     posting.done(function(data) {
//       // debugger
//       header = `<h1>${data.user.name} just had ${data.food_quantity * data.food_item.calories} calories of ${data.food_item.name}.</h1>`
//       $('div.meal-form').empty()
//       $('div.meal-form').append(header)
//     })
//   })
// })
