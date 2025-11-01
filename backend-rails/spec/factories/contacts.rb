FactoryBot.define do
  factory :contact do
    association :startup
    state { "contacted" }
    email_status { "delivered" }
  end
end
