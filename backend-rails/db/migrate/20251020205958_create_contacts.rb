class CreateContacts < ActiveRecord::Migration[7.1]
  def change
    create_table :contacts do |t|
      t.references :startup, null: false, foreign_key: true
      t.string :state, null: false
      t.string :email_status, null: false

      t.timestamps
    end
  end
end
