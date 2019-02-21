class DrawingSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :description, :artist, :created_at
end
