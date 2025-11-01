require 'rails_helper'

RSpec.describe Startup, type: :model do
  describe "associations" do
    it { should have_one(:location).dependent(:destroy) }
    it { should have_one(:application).dependent(:destroy) }
    it { should have_one(:contact).dependent(:destroy) }
    it { should have_one(:review).dependent(:destroy) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
  end

  describe "nested attributes" do
    it { should accept_nested_attributes_for(:location) }
    it { should accept_nested_attributes_for(:application) }
    it { should accept_nested_attributes_for(:contact) }
    it { should accept_nested_attributes_for(:review) }
  end
end
