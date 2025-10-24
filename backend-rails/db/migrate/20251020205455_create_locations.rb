class CreateLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.references :startup, null: false, foreign_key: true
      t.string :city, null: false
      t.string :region
      t.string :country, null: false

      t.timestamps
    end
  end
end
