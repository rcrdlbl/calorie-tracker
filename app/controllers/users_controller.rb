class UsersController < ApplicationController
  def new
  end

  def create
    if auth
      user = User.find_or_create_by(uid: auth['uid']) do |u|
        u.name = auth['info']['name']
        u.email = auth['info']['email']
        u.password = SecureRandom.hex
      end
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      user = User.new(user_params)
      if user && user.save
        session[:user_id] = user.id
        redirect_to user_path(user)
      else
        flash[:notice] = "Something Went Wrong Creating This User. Maybe one with this username already exists?"
        redirect_to '/users/new'
      end
    end
  end

  def show
    @user = User.find(params[:id])
  end


  private

  def auth
    request.env['omniauth.auth']
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :max_calories)
  end
end
