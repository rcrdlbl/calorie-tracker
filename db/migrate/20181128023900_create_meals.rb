class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.string :description
      t.integer :user_id
      t.integer :food_quantity
      t.integer :food_item_id

      t.timestamps
    end
  end
end
