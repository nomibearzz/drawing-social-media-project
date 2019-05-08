class TypeSerializer < ActiveModel::Serializer
  attributes :id, :drawing_id, :category_id
  belongs_to :category
  belongs_to :drawing
end
