class Review < ApplicationRecord
  belongs_to :startup

  validates :rating, presence: true, numericality: { in: 1..5, message: "must be between 1 and 5" }
end
