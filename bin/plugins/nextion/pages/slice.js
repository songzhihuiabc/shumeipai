"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var Slice = function (_abstract) {
  _inherits(Slice, _abstract);

  function Slice(screenManager) {
    _classCallCheck(this, Slice);

    var _this = _possibleConstructorReturn(this, (Slice.__proto__ || Object.getPrototypeOf(Slice)).call(this, screenManager));

    _this.mark = -1;
    return _this;
  }

  _createClass(Slice, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.setScreen("slice");

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status) {
        var slicer;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.nanoDLP.getSlicer().catch(function (e) {});

              case 2:
                slicer = _context2.sent;

                console.log(slicer.running, slicer.percentage, status.SlicingPlateID);

                if (!(slicer.layerID < slicer.layerCount)) {
                  _context2.next = 16;
                  break;
                }

                if (!(slicer.percentage >= 96)) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 8;
                return this.changePage("plates");

              case 8:
                _context2.next = 14;
                break;

              case 10:
                _context2.next = 12;
                return this.setScreen("slice");

              case 12:
                _context2.next = 14;
                return this.setValue("j1", slicer.percentage);

              case 14:
                _context2.next = 19;
                break;

              case 16:
                if (!(slicer.percentage > this.mark && this.mark > 0)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 19;
                return this.changePage("plates");

              case 19:
                if (slicer.percentage < 100) {
                  this.mark = slicer.percentage;
                }

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return Slice;
}(_abstract3.default);

exports.default = Slice;