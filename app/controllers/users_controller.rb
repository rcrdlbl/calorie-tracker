class UsersController < ApplicationController
  def new
  end


  private

  def auth
    request.env['omniauth.auth']
  end
end
