require "rails_helper"

RSpec.describe Review, type: :model do
  describe "associations" do
    it { should belong_to(:startup) }
  end

  describe "validations" do
    it { should validate_presence_of(:rating) }

    it "is valid with a rating between 1 and 5" do
      (1..5).each do |value|
        review = build(:review, startup: build(:startup), rating: value)
        expect(review).to be_valid, "Expected #{value} to be valid but got errors: #{review.errors.full_messages}"
      end
    end

    it "is invalid with a rating below 1" do
      review = build(:review, rating: 0)
      expect(review).not_to be_valid
      expect(review.errors[:rating]).to include("must be between 1 and 5")
    end

    it "is invalid with a rating above 5" do
      review = build(:review, rating: 6)
      expect(review).not_to be_valid
      expect(review.errors[:rating]).to include("must be between 1 and 5")
    end
  end
end
