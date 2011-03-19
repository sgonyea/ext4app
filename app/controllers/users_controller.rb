require 'extjs_responder'

class UsersController < ApplicationController

  respond_to :json
  self.responder = ExtjsResponder

  # GET /users.json
  def index
    order = (params[:sort] ? JSON.parse(params[:sort]) : []).map{|sort|'%{property} %{direction}' % sort.symbolize_keys}
    users = User.order(order).offset(params[:start]).limit(params[:limit])
    respond_with(users)
  end

  # GET /users/1.json
  def show
    user = User.find(params[:id])
    respond_with(user)
  end

  # POST /users.json
  def create
    user = User.new(params[:user])
    user.save
    respond_with(user)
  end

  # PUT /users/1.json
  def update
    user = User.find(params[:id])
    user.update_attributes(params[:user])
    respond_with(user)
  end

  # DELETE /users/1.json
  def destroy
    user = User.find(params[:id])
    user.destroy
    respond_with(user)
  end

  def dump_body
    Rails.logger.debug('  Headers: ' + response.headers.inspect)
    Rails.logger.debug('  Payload: ' + response.body)
  end
  after_filter :dump_body
end
