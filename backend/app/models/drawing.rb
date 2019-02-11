class Drawing < ApplicationRecord
  has_many :types, dependent: :destroy
  has_many :categories, through: :types
end
