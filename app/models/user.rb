class User < ApplicationRecord
  has_secure_password
  has_many :meals
  has_many :food_items, through: :meals
end
