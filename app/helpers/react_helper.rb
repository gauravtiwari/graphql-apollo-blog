module ReactHelper
  GLOBAL_WRAPPER = <<-JS
        var global = global || this;
        var self = self || this;
        var window = window || this;
      JS

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

  def execjs_timer_polyfills
    <<-JS
function getStackTrace () {
var stack;
try {
throw new Error('');
}
catch (error) {
stack = error.stack || '';
}
stack = stack.split('\\n').map(function (line) { return line.trim(); });
return stack.splice(stack[0] == 'Error' ? 2 : 1);
}
function setInterval() {
#{undefined_for_exec_js_logging('setInterval')}
}
function setTimeout() {
#{undefined_for_exec_js_logging('setTimeout')}
}
function clearTimeout() {
#{undefined_for_exec_js_logging('clearTimeout')}
}
    JS
  end

  def undefined_for_exec_js_logging(function_name)
    ""
  end

  def console_polyfill
          <<-JS
var console = { history: [] };
['error', 'log', 'info', 'warn'].forEach(function (level) {
  console[level] = function () {
    var argArray = Array.prototype.slice.call(arguments);
    if (argArray.length > 0) {
      argArray[0] = '[SERVER] ' + argArray[0];
    }
    console.history.push({level: level, arguments: argArray});
  };
});
          JS
  end

  def server_render(component_name, props)
    bundle_js_code = Rails.application.assets["server-bundle.js"].to_s
    base_js_code = <<-JS
#{console_polyfill}
#{execjs_timer_polyfills}
#{bundle_js_code};
        JS
    @context = ExecJS.compile(base_js_code + GLOBAL_WRAPPER +  base_js_code)
    js_code = <<-JS
    (function() {
      var props = #{props_string(props)};
      return reactComponent.serverRenderReactComponent({
        name: '#{component_name}',
        props: props
      });
    })()
    JS
    puts @context.eval(js_code).inspect
  end
end
