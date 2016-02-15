class AddParsedDateColumnLargerBytes < ActiveRecord::Migration
  def change
    change_column :posts, :date, :integer, limit: 20
  end
end
