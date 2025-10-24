require 'faker'

puts 'Starting seeds'

Review.delete_all
Contact.delete_all
Application.delete_all
Location.delete_all
Startup.delete_all

TARGET = 45

ApplicationRecord.transaction do
  TARGET.times do |i|
    name = Faker::Company.unique.name

    next if Startup.exists?(name: name)

    startup = Startup.create!(name: name)

    startup.create_location!(
      city:    Location::CITIES.sample,
      region:  Location::REGIONS.sample,
      country: Location::COUNTRIES.sample
    )

    startup.create_application!(
      state:    Application::STATES.sample,
      category: Application::CATEGORIES.sample
    )

    startup.create_contact!(
      state:        Contact::STATES.sample,
      email_status: Contact::EMAIL_STATUS.sample
    )

    rand(2..34).times do
      Review.create!(
        startup: startup,
        rating: rand(1..5)
      )
    end

    puts "  • Created #{i + 1}/#{TARGET}: #{startup.name}"
  end
end

puts "Done."
puts "Startups: #{Startup.count}"
puts "Locations: #{Location.count}"
puts "Applications: #{Application.count}"
puts "Contacts: #{Contact.count}"
puts "Reviews: #{Review.count}"
