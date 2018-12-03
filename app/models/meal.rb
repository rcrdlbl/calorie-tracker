class Meal < ApplicationRecord
  belongs_to :food_item
  belongs_to :user
  validates :food_quantity, numericality: {greater_than: 0, only_integer: true}
  validates :user_id, presence: true
  validates :food_item_id, presence: true

  def calorie_count
    self.food_item.calories * self.food_quantity
  end
end
