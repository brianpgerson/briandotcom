class Post < ActiveRecord::Base
  validates :title, :body, :url, presence: true;
end
