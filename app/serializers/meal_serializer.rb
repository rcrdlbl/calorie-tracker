class MealSerializer < ActiveModel::Serializer
  attributes :id, :description, :user_id, :food_quantity, :food_item_id, :created_at, :food_item, :eaten_today
  belongs_to :food_item
  belongs_to :user
  # scope :eaten_today, -> {where("created_at >= ?", Time.zone.now.beginning_of_day)}
  def eaten_today
    if object.created_at >= DateTime.now.in_time_zone(Time.zone).beginning_of_day
      true
    else
      false
    end
  end
end
