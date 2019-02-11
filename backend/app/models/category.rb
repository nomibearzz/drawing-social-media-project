class Category < ApplicationRecord
  has_many :types, dependent: :destroy
  has_many :drawings, through: :types
end
