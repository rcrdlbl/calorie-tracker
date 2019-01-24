class MealSerializer < ActiveModel::Serializer
  attributes :id, :description, :user_id, :food_quantity, :food_item_id
  belongs_to :food_item
  belongs_to :user
end
