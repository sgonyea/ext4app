require 'active_support/concern'
require 'extjs/json_responder'

module Extjs
  module ControllerConvention
    extend ActiveSupport::Concern

    included do
      respond_to :json
      self.responder = Extjs::JsonResponder
    end

    module InstanceMethods
      def order_from_params
        (params[:sort] ? JSON.parse(params[:sort]) : []).map{|sort|'%{property} %{direction}' % sort.symbolize_keys}
      end
    end
  end
end
