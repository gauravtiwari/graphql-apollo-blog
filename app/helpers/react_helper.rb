module ReactHelper
  def react_component(name, props = {}, options = {})
    if options[:prerender]
      block = Proc.new{ concat server_render(name, props) }
    end

    react_component_index = next_react_component_index

    html_options = options.reverse_merge(:data => {})

    html_options[:data].tap do |data|
      data[:react_component] = true
      data[:react_component_name] = name
      data[:react_component_props] = (props.is_a?(String) ? props : props.to_json)
    end

    html_options.merge!({id: "react-component-#{react_component_index}"})

    # remove internally used properties so they aren't rendered to DOM
    html_options.except!(:tag, :prerender)

    content_tag(:div, '', html_options, &block)
  end

  def next_react_component_index
    @react_component_index ||= -1
    @react_component_index += 1
  end


  def props_string(props)
    props.is_a?(String) ? props : props.to_json
  end

  def server_render(component_name, props)
    @context = ExecJS.compile(Rails.application.assets["server-bundle.js"].to_s)
    js_code = <<-JS
    (function() {
      var props = #{props_string(props)};
      return reactComponent.serverRenderReactComponent({
        name: '#{component_name}',
        props: props
      });
    })()
    JS
    @context.eval(js_code).html_safe
  end
end
