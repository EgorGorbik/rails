class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :name
      t.string :comment
      t.string :timeStamp
      t.text  :highlight, array: true, default: []

      t.timestamps
    end
  end
end
