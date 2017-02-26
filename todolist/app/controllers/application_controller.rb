require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :json, :html
  protect_from_forgery with: :null_session
end
