"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _config = require("../../../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var Stats = function (_abstract) {
  _inherits(Stats, _abstract);

  function Stats(screenManager) {
    _classCallCheck(this, Stats);

    return _possibleConstructorReturn(this, (Stats.__proto__ || Object.getPrototypeOf(Stats)).call(this, screenManager));
  }

  _createClass(Stats, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var idxP;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                idxP = 0;
                _context.next = 3;
                return this.setScreen("slice");

              case 3:
                _context.next = 5;
                return this.nanoDLP.getProfiles();

              case 5:
                this.profiles = _context.sent;

                this.config = _config2.default.plugins.plates;

                this.addListener("click_b5", function (e) {
                  _this2.changePage("home");
                });

                this.addListener("click_b7", function (e) {
                  idxP = Math.abs((idxP - 1) % _this2.profiles.length);
                  _this2.setText("t6", _this2.profiles[idxP].ProfileID + ": " + _this2.profiles[idxP].Title);
                  _this2.setText("t1", _this2.profiles[idxP].SupportDepth);
                  _this2.setText("t2", _this2.profiles[idxP].SupportCureTime);
                  _this2.setText("t3", _this2.profiles[idxP].SupportLayerNumber);
                  _this2.setText("t4", _this2.profiles[idxP].CureTime);
                });

                this.addListener("click_b8", function (e) {
                  idxP = (idxP + 1) % _this2.profiles.length;
                  _this2.setText("t6", _this2.profiles[idxP].ProfileID + ": " + _this2.profiles[idxP].Title);
                  _this2.setText("t1", _this2.profiles[idxP].SupportDepth);
                  _this2.setText("t2", _this2.profiles[idxP].SupportCureTime);
                  _this2.setText("t3", _this2.profiles[idxP].SupportLayerNumber);
                  _this2.setText("t4", _this2.profiles[idxP].CureTime);
                });

                this.setText("t6", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
                this.setText("t1", this.profiles[idxP].SupportDepth);
                this.setText("t2", this.profiles[idxP].SupportCureTime);
                this.setText("t3", this.profiles[idxP].SupportLayerNumber);
                this.setText("t4", this.profiles[idxP].CureTime);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return Stats;
}(_abstract3.default);

exports.default = Stats;