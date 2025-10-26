class AddIndexToDb < ActiveRecord::Migration[7.1]
  def change
    add_index :startups, :created_at
    add_index :startups, :name
    add_index :locations, :city
    add_index :locations, :region
    add_index :locations, :country
    add_index :applications, :state
    add_index :applications, :category
    add_index :contacts, :state
    add_index :contacts, :email_status
    add_index :reviews, :rating
  end
end
