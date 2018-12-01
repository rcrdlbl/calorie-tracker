class MealsController < ApplicationController
  def new
    @meal = Meal.new(food_item_id: params[:food_item_id], user_id: session[:user_id] )
  end
end
