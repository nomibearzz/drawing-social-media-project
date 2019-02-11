class Api::V1::CategoriesController < ApplicationController
  before_action :find_category, only: [:show]

  def index
    @categories = Category.all
    render json: @categories
  end

  def show
  end

  private
  def find_category
    @category = Category.find(params[:id])
  end
end
