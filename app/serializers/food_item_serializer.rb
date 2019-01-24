class FoodItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :calories
  has_many :meals
  has_many :users, through: :meals
end
