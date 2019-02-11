class DrawingSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :description, :created_at, :categories
end
