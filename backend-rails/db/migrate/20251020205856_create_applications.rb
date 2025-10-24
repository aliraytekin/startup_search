class CreateApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :applications do |t|
      t.references :startup, null: false, foreign_key: true
      t.string :state, null: false
      t.string :category, null: false

      t.timestamps
    end
  end
end
