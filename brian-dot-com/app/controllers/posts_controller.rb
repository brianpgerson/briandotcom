class PostsController < ApplicationController
  def index
    @posts = Post.all.sort_by { |post| post.title.scan(/\d+/)[0].to_i }
    respond_to do |format|
        format.html { render :index }
        format.json { render json: @posts }
      end
  end

  def create
    @post = Post.new(post_params)
    if @post.save!
      render json: @post
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :author, :body, :url, :date)
  end
end
