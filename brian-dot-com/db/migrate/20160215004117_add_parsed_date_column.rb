class AddParsedDateColumn < ActiveRecord::Migration
  def change
    add_column :posts, :date, :integer 
  end
end
