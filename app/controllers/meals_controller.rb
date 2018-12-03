class MealsController < ApplicationController
  def new
    @meal = Meal.new(food_item_id: params[:food_item_id], user_id: session[:user_id] )
  end

  def create
    #fix this it's not good
    @meal = Meal.create(meal_params)
    if @meal.valid? && @meal.user_id == session[:user_id]
      redirect_to user_meal_path(@meal.user, @meal)
    else
      render :new
    end
  end

  def index
    @user = User.find(params[:user_id])
    @meals = @user.meals
  end

  def show
    @user = User.find(params[:user_id])
    @meal = Meal.find(params[:id])
  end

  def eaten_today
    @meals = Meal.all.eaten_today
  end

  private

  def meal_params
    params.require(:meal).permit(:description, :food_quantity, :user_id, :food_item_id)
  end
end
