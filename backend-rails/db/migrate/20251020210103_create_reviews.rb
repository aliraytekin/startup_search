class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.references :startup, null: false, foreign_key: true
      t.string :rating, null: false

      t.timestamps
    end
  end
end
