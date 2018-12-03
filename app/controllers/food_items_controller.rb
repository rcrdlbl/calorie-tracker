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
    if food_item.valid?
      redirect_to food_item_path(food_item)
    else
      render :new
    end
  end

  def edit
    @food_item = FoodItem.find(params[:id])
  end

  def update
    food_item = FoodItem.find(params[:id])
    if food_item.update(food_item_params)
      redirect_to food_item_path(food_item)
    else
      render :edit
    end
  end


  private

  def food_item_params
    params.require(:food_item).permit(:name, :calories)
  end
end
