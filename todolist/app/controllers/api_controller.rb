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

  def found?(*args)
    if args.all? {|arg| arg != nil}
      yield if block_given?
      true
    else
      render status: :not_found, json: {response: 'resource not found'}
      false
    end
  end
end