class TodoListController < ApplicationController
  def index
    render :index, layout: nil
  end
end
