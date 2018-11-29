class User < ApplicationRecord
  has_secure_password
  before_save :default_values
  has_many :meals
  has_many :food_items, through: :meals

  def default_values
    self.max_calories ||= 2000
  end
end
