class MealsController < ApplicationController
  def new
    @meal = Meal.new(food_item_id: params[:food_item_id], user_id: session[:user_id] )
  end

  def create
    #fix this it's not good
    meal = Meal.create(meal_params)
    if meal && meal.user_id == session[:user_id]
      redirect_to user_meal_path(meal)
    else
      flash[:notice] = "Something went wrong eating this meal."
      redirect_to new_food_item_meal_path
    end
  end

  private

  def meal_params
    params.require(:meal).permit(:description, :food_quantity, :user_id, :food_item_id)
  end
end
