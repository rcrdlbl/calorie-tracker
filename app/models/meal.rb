class Meal < ApplicationRecord
  belongs_to :food_item
  belongs_to :user

  def calorie_count
    self.food_item.calories * self.food_quantity
  end
end
