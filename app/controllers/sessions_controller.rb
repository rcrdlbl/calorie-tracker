class SessionsController < ApplicationController
  def new
  end

  def create
    if auth
      user = User.find_or_create_by(uid: auth['uid']) do |u|
        u.name = auth['info']['name']
        u.email = auth['info']['email']
      end
      redirect_to user_path(user)
    else
      user = User.find_by(email: params[:user][:email])
      if user && user.authenticate(params[:user][:password])
        session[:user_id] = user.id
        redirect_to user_path(user)
      else
        flash[:notice] = "Something went wrong signing in. Maybe your password is misspelled?"
        redirect_to '/login'
      end
    end
  end

  def destroy
    session.delete(:user_id) unless session[:user_id].nil?
    redirect_to '/'
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
