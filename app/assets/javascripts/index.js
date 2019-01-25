$(function () {
	console.log('index.js loaded ... ');
})

function getUser() {
	$.ajax({
		url: "http://localhost:3000/users/1",
		method: 'get',
		dataType: 'json'
	}).done(function (response) {
		console.log("response: ", response);


		let user = new User(response)

		// let userDisplay = user.userHTML()
    // return user

	})
}
function getFoodItem() {
	$.ajax({
		url: "http://localhost:3000/food_items/1",
		method: 'get',
		dataType: 'json'
	}).done(function (response) {
		console.log("response: ", response);


		let user = new FoodItem(response)

		// let userDisplay = user.userHTML()
    // return user

	})
}
function getMeal() {
	$.ajax({
		url: "http://localhost:3000/meals/1",
		method: 'get',
		dataType: 'json'
	}).done(function (response) {
		console.log("response: ", response);


		let user = new Meal(response)

		// let userDisplay = user.userHTML()
    // return user

	})
}
getUser()

class User {
  constructor(obj) {
    this.name = obj.name
    this.email = obj.email
    this.id = obj.id
    this.max_calories = obj.max_calories
  }
}
