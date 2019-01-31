class MealsController < ApplicationController
  def new
    @meal = Meal.new(food_item_id: params[:food_item_id], user_id: session[:user_id] )
    render :new, layout: false
  end

  def create
    #fix this it's not good
    @meal = Meal.create(meal_params)
    if @meal.valid? && @meal.user_id == session[:user_id]
      render json: @meal, status: 201
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
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @meal}
    end
  end

  def eaten_today
    @meals = Meal.all.eaten_today
  end

  private

  def meal_params
    params.require(:meal).permit(:description, :food_quantity, :user_id, :food_item_id)
  end
end
