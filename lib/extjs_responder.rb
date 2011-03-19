# Always respond with record(s) in interest.
class ExtjsResponder < ActionController::Responder

  def api_behavior(error)
    raise error unless resourceful?
    if valid_method?
      display ext_data, ext_options
    else
      head :bad_request
    end
  end

  private

  def valid_method?
    get? or put? or post? or delete?
  end

  def ext_data
    result = { success: true, errors: [] }
    if resource.respond_to?(:to_a)
      result.merge!(root => resource)
      result.merge!(total: resource_class.count)
    else
      result.merge!(success: false, errors: resource.errors.full_messages) if has_errors?
      result.merge!(root => [resource])
    end
    result
  end

  def root
    resource_class.name.underscore.pluralize.to_sym
  end

  def resource_class
    [resource].flatten(1).first.class
  end

  def ext_options
    case
    when post? && !has_errors?; { status: :created, location: api_location }
    when (post? || put?) && has_errors?; { status: :unprocessable_entity }
    else; {}
    end
  end

end
