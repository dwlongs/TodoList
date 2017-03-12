class ApiController < ApplicationController
  def valid?(target)
    errors = target.respond_to?(:errors) ? target.errors : target
    if errors.blank?
      yield if block_given?
      true
    else
      render status: :bad_request, json: errors
      false
    end
  end
end