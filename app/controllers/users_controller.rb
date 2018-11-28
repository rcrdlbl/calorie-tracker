class UsersController < ApplicationController
  def new
  end


  private

  def auth
    request.env['omniauth.auth']
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :max_calories)
  end
end
