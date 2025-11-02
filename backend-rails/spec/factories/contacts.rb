FactoryBot.define do
  factory :contact do
    state { "contacted" }
    email_status { "delivered" }
  end
end
