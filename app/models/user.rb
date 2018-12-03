class User < ApplicationRecord
  has_secure_password
  before_save :default_values
  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  has_many :meals
  has_many :food_items, through: :meals

  def default_values
    self.max_calories ||= 2000
  end

  def todays_calories
    cal_total = 0
    if self.meals.eaten_today
      self.meals.eaten_today.each do |meal|
        cal_total += meal.calorie_count
      end
    end
    cal_total
  end

end
