webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _indexEs = __webpack_require__(2);

	var _indexEs2 = _interopRequireDefault(_indexEs);

	var _indexSecondEs = __webpack_require__(39);

	var _indexSecondEs2 = _interopRequireDefault(_indexSecondEs);

	var _showEs = __webpack_require__(40);

	var _showEs2 = _interopRequireDefault(_showEs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Setup a global app scope
	var app = window.app = global.app = {};

	// Expose components to global scope
	// ES6 imports
	app.IndexComponent = _indexEs2.default;
	app.IndexSecondComponent = _indexSecondEs2.default;
	app.ShowComponent = _showEs2.default;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(36);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IndexComponent = function (_React$Component) {
		_inherits(IndexComponent, _React$Component);

		function IndexComponent(props) {
			_classCallCheck(this, IndexComponent);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexComponent).call(this, props));

			_this._sendPing = _this._sendPing.bind(_this);
			_this._setupSubscription = _this._setupSubscription.bind(_this);
			_this.state = {
				message: props.message
			};
			return _this;
		}

		_createClass(IndexComponent, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				setTimeout(function () {
					_this2._sendPing();
				}, 5000);
				this._setupSubscription();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				App.EchoChannel.unsubscribe();
			}
		}, {
			key: '_setupSubscription',
			value: function _setupSubscription() {
				var EchoChannel = App.cable.subscriptions.create('EchoChannel', {
					received: function (data) {
						this.setState({ message: data.message });
					}.bind(this)
				});
				App.EchoChannel = EchoChannel;
			}
		}, {
			key: '_sendPing',
			value: function _sendPing() {
				_jquery2.default.get('/ping', function (data) {
					console.log("Pinging server...");
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'h2',
					null,
					'Echo Message: ',
					this.state.message
				);
			}
		}]);

		return IndexComponent;
	}(_react2.default.Component);

	module.exports = IndexComponent;

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IndexSecondComponent = function (_React$Component) {
		_inherits(IndexSecondComponent, _React$Component);

		function IndexSecondComponent(props) {
			_classCallCheck(this, IndexSecondComponent);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(IndexSecondComponent).call(this, props));
		}

		_createClass(IndexSecondComponent, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'h2',
					null,
					'Echo Message: ',
					this.props.message
				);
			}
		}]);

		return IndexSecondComponent;
	}(_react2.default.Component);

	module.exports = IndexSecondComponent;

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShowComponent = function (_React$Component) {
		_inherits(ShowComponent, _React$Component);

		function ShowComponent(props) {
			_classCallCheck(this, ShowComponent);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowComponent).call(this, props));
		}

		_createClass(ShowComponent, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'h2',
					null,
					'Echo Message: Ohay show page'
				);
			}
		}]);

		return ShowComponent;
	}(_react2.default.Component);

	module.exports = ShowComponent;

/***/ }

});