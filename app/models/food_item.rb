class FoodItem < ApplicationRecord
  has_many :meals
  has_many :users, through: :meals
  validates :name, presence: true
  validates :calories, numericality: {greater_than: 0, only_integer: true}
end
