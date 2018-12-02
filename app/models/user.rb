class User < ApplicationRecord
  has_secure_password
  before_save :default_values
  has_many :meals
  has_many :food_items, through: :meals

  def default_values
    self.max_calories ||= 2000
  end

  def todays_calories
    cal_total = 0
    if self.meals.where("created_at >= ?", Time.zone.now.beginning_of_day)
      self.meals.where("created_at >= ?", Time.zone.now.beginning_of_day).each do |meal|
        cal_total += meal.calorie_count
      end
    end
    cal_total
  end
  
end
