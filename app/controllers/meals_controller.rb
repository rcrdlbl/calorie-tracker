class MealsController < ApplicationController
  def new
    @meal = Meal.new(food_item_id: params[:food_item_id], user_id: session[:user_id] )
  end

  def create
  end

  private

  def meal_params
    params.require(:meal).permit(:description, :food_quantity, :user_id, :food_item_id)
  end
end
