class Api::V1::TypesController < ApplicationController
  before_action :find_type, only: [:show, :update, :destroy]

  def index
    @types = Type.all
    render json: @types
  end

  def show
  end

  def create
    @type = Type.create(type_params)
    render json: @type
  end

  def update
    @type.update(type_params)
    render json: @type
  end

  def destroy
    @types = Type.all
    @type.destroy
    render json: @types
  end

  private
  def find_type
    @type = Type.find(params[:id])
  end

  def type_params
    params.permit(:category_id, :drawing_id)
  end
end
