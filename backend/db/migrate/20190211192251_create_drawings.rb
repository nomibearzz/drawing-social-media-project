class CreateDrawings < ActiveRecord::Migration[5.2]
  def change
    create_table :drawings do |t|
      t.string :title
      t.string :image
      t.string :description

      t.timestamps
    end
  end
end
