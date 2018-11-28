class SessionsController < ApplicationController
  def new
  end

  def destroy
    session.delete(:user_id) unless session[:user_id].nil?
    redirect_to '/'
  end
end
