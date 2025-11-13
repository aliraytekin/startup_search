require 'faker'

puts 'Starting seeds'

Review.delete_all
Contact.delete_all
Application.delete_all
Location.delete_all
Startup.delete_all

LOCATION_COMBOS = [
  {
    city:    "no_city_set",
    region:  "no_region_set",
    country: "no_country_set"
  },
  {
    city:    "london",
    region:  "western_europe",
    country: "united_kingdom"
  },
  {
    city:    "new_york",
    region:  "northern_america",
    country: "united_states"
  },
  {
    city:    "liverpool",
    region:  "western_europe",
    country: "united_kingdom"
  },
  {
    city:    "tel_aviv",
    region:  "western_asia",
    country: "israel"
  },
  {
    city:    "genova",
    region:  "southern_europe",
    country: "italy"
  },
  {
    city:    "birmingham",
    region:  "western_europe",
    country: "united_kingdom"
  },
  {
    city:    "amsterdam",
    region:  "western_europe",
    country: "netherlands"
  },
  {
    city:    "dublin",
    region:  "western_europe",
    country: "ireland"
  }
].freeze

TARGET = 1000

ApplicationRecord.transaction do
  TARGET.times do |i|
    name = Faker::Company.unique.name
    location_combo = LOCATION_COMBOS.sample

    next if Startup.exists?(name: name)

    startup = Startup.create!(name: name)

    startup.create_location!(
      city:    location_combo[:city],
      region:  location_combo[:region],
      country: location_combo[:country]
    )

    startup.create_application!(
      state:    Application::STATES.sample,
      category: Application::CATEGORIES.sample
    )

    startup.create_contact!(
      state:        Contact::STATES.sample,
      email_status: Contact::EMAIL_STATUS.sample
    )

    Review.create!(
      startup: startup,
      rating: rand(1..5)
    )

    puts "  • Created #{i + 1}/#{TARGET}: #{startup.name}"
  end
end

puts "Done."
puts "Startups: #{Startup.count}"
puts "Locations: #{Location.count}"
puts "Applications: #{Application.count}"
puts "Contacts: #{Contact.count}"
puts "Reviews: #{Review.count}"
