class ExtjsResponder < ActionController::Responder

  def api_behavior(error)
    raise error unless resourceful?

    unless valid_method?
      head :bad_request
      return
    end

    options = {}
    case
    when post?
      if has_errors?
        options.merge!(:status => :unprocessable_entity)
      else
        options.merge!(:status => :created, :location => api_location)
      end
    when put?
      if has_errors?
        options.merge!(:status => :unprocessable_entity)
      end
    end

    display ext_data, options
  end

  private

  def resource_class
    [resource].flatten(1).first.class
  end

  def root
    resource_class.name.downcase.pluralize
  end

  def ext_data
    if resource.respond_to?(:to_a)
      { root => resource, :total => resource_class.count, :success => !has_errors? }
    else
      { root => [resource], :success => !has_errors? }
    end
  end

  def valid_method?
    get? or put? or post? or delete?
  end

end
