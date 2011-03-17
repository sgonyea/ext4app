class UsersController < ApplicationController

  respond_to :json

  # GET /users.json
  def index
    respond_to do |format|
      format.json do
        order = (params[:sort] ? JSON.parse(params[:sort]) : []).map{|sort|'%{property} %{direction}' % sort.symbolize_keys}
        users = User.order(order).offset(params[:start]).limit(params[:limit])
        respond_with(users: users, total: User.count, success: true)
      end
    end
  end

  # GET /users/1
  # GET /users/1.xml
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.json  { render :json => @user }
    end
  end

  # POST /users
  # POST /users.xml
  def create
    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.json  { render :json => @user, :status => :created, :location => @user }
      else
        format.json  { render :json => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /users/1.json
  def update
    user = User.find(params[:id])
    respond_to do |format|
      if user.update_attributes(params[:user])
        format.json  { render :json => { users: [user], success: true } }
#head :ok }
      else
        format.json  { render :json => user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:records][0][:id])
    @user.destroy

    respond_to do |format|
      format.json  { render :json => { users:[@user], success: true } }
    end
  end

  private

  def dump_response
    $stderr.puts(response.body)
  end
#  after_filter :dump_response

end
