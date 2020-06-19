"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _zAxis = require("/home/pi/touchscreen-for-nanodlp-master/zAxis.json");

var _zAxis2 = _interopRequireDefault(_zAxis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var ZAxis = function (_abstract) {
  _inherits(ZAxis, _abstract);

  function ZAxis(screenManager) {
    _classCallCheck(this, ZAxis);

    var _this = _possibleConstructorReturn(this, (ZAxis.__proto__ || Object.getPrototypeOf(ZAxis)).call(this, screenManager));

    _this.currentButton = 8;
    return _this;
  }

  _createClass(ZAxis, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        var data, fs, data0;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.setScreen("zAxis");

              case 2:
                data = this.nanoDLP.getZAxisHt();

                _zAxis2.default.CurrentzAxisHeight = data;

                fs = require("fs");

                if (options) {
                  if (options.confirmResult && options.confirmType === "SetAxisHeight") {
                    data0 = options.data0;

                    _zAxis2.default.zAxisZeroLevel = data0;
                    fs.writeFile('/home/pi/touchscreen-for-nanodlp-master/zAxis.json', JSON.stringify(_zAxis2.default), 'utf8', function (err) {
                      if (err) {
                        console.log('保存当前Z轴高度出错了，错误是：' + err);
                      }
                    });
                  }
                }

                this.addListener("click_b16", function (e) {
                  fs.writeFile('/home/pi/touchscreen-for-nanodlp-master/zAxis.json', JSON.stringify(_zAxis2.default), 'utf8', function (err) {
                    if (err) {
                      console.log('保存当前Z轴高度出错了，错误是：' + err);
                    }
                  });
                  _this2.changePage("home");
                });

                //置顶
                this.addListener("click_b23", function (e) {
                  _this2.nanoDLP.setGcode({ gcode: 'G1 Z200' });
                });

                //置底
                this.addListener("click_b24", function (e) {
                  var ZeroLevel = _zAxis2.default.zAxisZeroLevel;
                  _this2.nanoDLP.setGcode({ gcode: "G1 Z" + ZeroLevel });
                });

                //设置零位
                this.addListener("click_b4", function (e) {
                  // let zHeight = config.CurrentzAxisHeight;
                  // config.zAxisZeroLevel = zHeight;
                  // fs.writeFile('/home/pi/touchscreen-for-nanodlp-master/zAxis.json',JSON.stringify(config),'utf8',function(err){
                  //   if(err)
                  //     console.log('设置零位出错了，错误是：'+err);
                  //   else
                  //     console.log('设置零位成功', config);
                  // });

                  data.then(function (r) {
                    //let zHeight = r["current-height-mm"];
                    var zHeight = _zAxis2.default.CurrentzAxisHeight;
                    this.changePage("confirm", {
                      text: "您是否确定要设置当前高度为零位?\r\r当前Z轴高度:" + zHeight,
                      confirmType: "SetAxisHeight",
                      data0: zHeight,
                      returnPage: "zAxis"
                    });
                  });
                });

                //向上10mm
                this.addListener("click_b25", function (e) {
                  var zHeight = _zAxis2.default.CurrentzAxisHeight;
                  if (zHeight < 190) {
                    var drift = zHeight + 10;
                    _zAxis2.default.CurrentzAxisHeight = drift;
                    _this2.nanoDLP.setGcode({ gcode: "G1 Z" + drift });
                  } else {
                    _zAxis2.default.CurrentzAxisHeight = 200;
                    _this2.nanoDLP.setGcode({ gcode: 'G1 Z200' });
                  }
                });
                //向上1mm
                this.addListener("click_b26", function (e) {
                  var zHeight = _zAxis2.default.CurrentzAxisHeight;
                  if (zHeight < 199) {
                    var drift = zHeight + 1;
                    _zAxis2.default.CurrentzAxisHeight = drift;
                    _this2.nanoDLP.setGcode({ gcode: "G1 Z" + drift });
                  } else {
                    _zAxis2.default.CurrentzAxisHeight = 200;
                    _this2.nanoDLP.setGcode({ gcode: 'G1 Z200' });
                  }
                });
                //向上0.1mm
                this.addListener("click_b27", function (e) {
                  var zHeight = _zAxis2.default.CurrentzAxisHeight;
                  var drift = zHeight + 0.1;
                  _zAxis2.default.CurrentzAxisHeight = drift;
                  _this2.nanoDLP.setGcode({ gcode: "G1 Z" + drift });
                });

                //向下10mm
                this.addListener("click_b28", function (e) {
                  var zHeight = _zAxis2.default.CurrentzAxisHeight;
                  var zAxisZeroLevel = _zAxis2.default.zAxisZeroLevel;
                  var drift = zHeight - 10;
                  if (zAxisZeroLevel < drift) {
                    _zAxis2.default.CurrentzAxisHeight = drift;
                    _this2.nanoDLP.setGcode({ gcode: "G1 Z" + drift });
                  } else {
                    _zAxis2.default.CurrentzAxisHeight = zAxisZeroLevel;
                    _this2.nanoDLP.setGcode({ gcode: "G1 Z" + zAxisZeroLevel });
                  }
                });

                //向下1mm
                this.addListener("click_b29", function (e) {
                  var zHeight = _zAxis2.default.CurrentzAxisHeight;
                  var zAxisZeroLevel = _zAxis2.default.zAxisZeroLevel;
                  var drift = zHeight - 1;
                  if (zAxisZeroLevel < drift) {
                    _zAxis2.default.CurrentzAxisHeight = drift;
                    _this2.nanoDLP.setGcode({ gcode: "G1 Z" + drift });
                  } else {
                    _zAxis2.default.CurrentzAxisHeight = zAxisZeroLevel;
                    _this2.nanoDLP.setGcode({ gcode: "G1 Z" + zAxisZeroLevel });
                  }
                });

                //向下0.1mm
                this.addListener("click_b30", function (e) {
                  var zHeight = _zAxis2.default.CurrentzAxisHeight;
                  var drift = zHeight - 0.1;
                  _zAxis2.default.CurrentzAxisHeight = drift;
                  _this2.nanoDLP.setGcode({ gcode: "G1 Z" + drift });
                });

              case 16:
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

    /**
    async update(status){
      if(!this.setup){
        this.setup = await this.nanoDLP.getSetup();
      }
       let currentMm = status.CurrentHeight/((360/this.setup.MotorDegree*this.setup.MicroStep)/this.setup.LeadscrewPitch);
      let total = this.setup.ZAxisHeight/((360/this.setup.MotorDegree*this.setup.MicroStep)/this.setup.LeadscrewPitch);
      this.currentMm = currentMm;
      await this.setText("t0", currentMm+"mm");
      await this.setText("t1", total+"mm");
    }
     */

  }]);

  return ZAxis;
}(_abstract3.default);

exports.default = ZAxis;