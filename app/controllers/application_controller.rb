class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?
  
  private 

  def current_user
    session[:user_id].nil? ? nil : User.find(session[:user_id])
  end

  def logged_in?
    !!current_user
  end
end
