class UsersController < ApplicationController
  def new
    @user = User.new
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
        render :new
      end
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @user}
    end
  end

  def current_user
    @user = User.find(session[:user_id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @user}
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.id == session[:user_id]
      @user.update(user_params)
      if @user && @user.save
        redirect_to user_path(@user)
      else
        flash[:notice] = "Something went wrong when editing this profile."
        render :new
      end
    else
      flash[:notice] = "You can't edit another user's profile."
      redirect_to user_path(@user)
    end
  end


  private

  def auth
    request.env['omniauth.auth']
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :max_calories)
  end
end
