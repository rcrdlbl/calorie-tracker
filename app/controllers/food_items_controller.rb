class FoodItemsController < ApplicationController
  def index
    @food_items = FoodItem.all
  end

  def show
    @food_item = FoodItem.find(params[:id])
  end

  def new
  end

  def create
    food_item = FoodItem.new(food_item_params)
    if food_item && food_item.save
      redirect_to food_item_path(food_item)
    else
      flash[:notice] = "Something went wrong creating this food item. Did you fill out all the fields?"
      redirect_to new_food_item_path
    end
  end

  def edit
    @food_item = FoodItem.find(params[:id])
  end


  private

  def food_item_params
    params.require(:food_item).permit(:name, :calories)
  end
end
