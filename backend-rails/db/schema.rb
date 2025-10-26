# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_10_25_165615) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.bigint "startup_id", null: false
    t.string "state", null: false
    t.string "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_applications_on_category"
    t.index ["startup_id"], name: "index_applications_on_startup_id"
    t.index ["state"], name: "index_applications_on_state"
  end

  create_table "contacts", force: :cascade do |t|
    t.bigint "startup_id", null: false
    t.string "state", null: false
    t.string "email_status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_status"], name: "index_contacts_on_email_status"
    t.index ["startup_id"], name: "index_contacts_on_startup_id"
    t.index ["state"], name: "index_contacts_on_state"
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "startup_id", null: false
    t.string "city", null: false
    t.string "region"
    t.string "country", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city"], name: "index_locations_on_city"
    t.index ["country"], name: "index_locations_on_country"
    t.index ["region"], name: "index_locations_on_region"
    t.index ["startup_id"], name: "index_locations_on_startup_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "startup_id", null: false
    t.string "rating", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rating"], name: "index_reviews_on_rating"
    t.index ["startup_id"], name: "index_reviews_on_startup_id"
  end

  create_table "startups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_startups_on_created_at"
    t.index ["name"], name: "index_startups_on_name"
  end

  add_foreign_key "applications", "startups"
  add_foreign_key "contacts", "startups"
  add_foreign_key "locations", "startups"
  add_foreign_key "reviews", "startups"
end
