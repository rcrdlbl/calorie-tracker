class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :max_calories
  has_many :meals
  has_many :food_items, through: :meals
end
