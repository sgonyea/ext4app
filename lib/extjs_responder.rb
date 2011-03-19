# Always respond with record(s) in interest.
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
        options.merge!(status: :unprocessable_entity)
      else
        options.merge!(status: :created, location: api_location)
      end
    when put?
      if has_errors?
        options.merge!(status: :unprocessable_entity)
      end
    end

    display ext_data, options
  end

  private

  def resource_class
    [resource].flatten(1).first.class
  end

  def root
    resource_class.name.downcase.pluralize.to_sym
  end

  def ext_data
    result = { success: true, errors: [] }
    if resource.respond_to?(:to_a)
      result.merge!(root => resource)
      result.merge!(total: resource_class.count)
    else
      result.merge!(success: false, errors: resource.errors.full_messages) if has_errors?
      result[root] = [resource]
    end
    result
  end

  def valid_method?
    get? or put? or post? or delete?
  end

end
