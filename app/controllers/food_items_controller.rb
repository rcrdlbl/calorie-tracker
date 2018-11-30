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
    food_item = FoodItem.create(food_item_params)
    redirect_to food_item_path(food_item)
  end


  private

  def food_item_params
    params.require(:food_item).permit(:name, :calories)
  end
end
