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

var PrintingHome = function (_abstract) {
  _inherits(PrintingHome, _abstract);

  function PrintingHome(screenManager) {
    _classCallCheck(this, PrintingHome);

    var _this = _possibleConstructorReturn(this, (PrintingHome.__proto__ || Object.getPrototypeOf(PrintingHome)).call(this, screenManager));

    _this.layerID = -1;
    _this.isPause = null;
    return _this;
  }

  _createClass(PrintingHome, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(options && options.confirmResult && options.confirmResult)) {
                  _context.next = 10;
                  break;
                }

                _context.t0 = options.confirmType;
                _context.next = _context.t0 === "pause" ? 5 : _context.t0 === "stop" ? 7 : 10;
                break;

              case 5:
                this.nanoDLP.pause();
                // this.changePage("home");
                return _context.abrupt("break", 10);

              case 7:
                this.nanoDLP.stop();
                this.changePage("plates");
                return _context.abrupt("break", 10);

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t1 = _context["catch"](0);

                console.log("error", _context.t1);

              case 15:

                this.addListener("click_b8", function (e) {
                  _this2.nanoDLP.unpause();
                });

                this.addListener("click_b7", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to pause\r printing?\rIt will pause after the current\rlayer completed.",
                    confirmType: "pause",
                    returnPage: "printingHome"
                  });
                });

                this.addListener("click_b6", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed.",
                    confirmType: "stop",
                    returnPage: "printingHome"
                  });
                });

                this.addListener("click_b9", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed.",
                    confirmType: "stop",
                    returnPage: "printingHome"
                  });
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status, log) {
        var remaining_time, total_time, image;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (status.Printing) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this.changePage("plates"));

              case 2:
                if (!(this.isPause == null || this.isPause !== status.Paused)) {
                  _context2.next = 21;
                  break;
                }

                this.isPause = status.Paused;

                console.log("isPause:", this.isPause);

                if (!this.isPause) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 8;
                return this.setScreen("printingPause");

              case 8:
                _context2.next = 12;
                break;

              case 10:
                _context2.next = 12;
                return this.setScreen("printing");

              case 12:
                _context2.next = 14;
                return this.nextion.getValue("t12.x");

              case 14:
                this.imageX = _context2.sent;
                _context2.next = 17;
                return this.nextion.getValue("t12.y");

              case 17:
                this.imageY = _context2.sent;
                _context2.next = 20;
                return this.nextion.getValue("t12.w");

              case 20:
                this.imageWidth = _context2.sent;

              case 21:
                _context2.next = 23;
                return this.setText("t6", this.isPause ? "Paused" : "Printing");

              case 23:
                remaining_time = Math.round((status.LayersCount - status.LayerID) * status.LayerTime / 1000000000 / 60);
                total_time = Math.round(status.LayersCount * status.LayerTime / 1000000000 / 60);
                _context2.next = 27;
                return this.setText("t0", status.LayerID + "/" + status.LayersCount);

              case 27:
                _context2.next = 29;
                return this.setText("t3", status.LayerID);

              case 29:
                _context2.next = 31;
                return this.setText("t8", status.LayersCount);

              case 31:
                _context2.next = 33;
                return this.setValue("j2", Math.floor(status.LayerID / status.LayersCount * 100));

              case 33:
                _context2.next = 35;
                return this.setText("t10", total_time - remaining_time + " of " + total_time + "min");

              case 35:
                _context2.next = 37;
                return this.setText("t4", total_time - remaining_time);

              case 37:
                _context2.next = 39;
                return this.setText("t9", total_time);

              case 39:
                _context2.next = 41;
                return this.setText("t1", status.Path);

              case 41:
                if (!(this.history.layer != status.LayerID)) {
                  _context2.next = 50;
                  break;
                }

                this.history.layer = status.LayerID;
                console.log("setImage", this.history.layer);
                _context2.next = 46;
                return this.nanoDLP.getCurrentPlateLayer(status.PlateID, status.LayerID);

              case 46:
                image = _context2.sent;

                if (this.enabled) console.log(image, this.imageX, this.imageY, this.imageWidth);
                _context2.next = 50;
                return this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(function (e) {
                  return console.error(e);
                });

              case 50:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return PrintingHome;
}(_abstract3.default);

exports.default = PrintingHome;