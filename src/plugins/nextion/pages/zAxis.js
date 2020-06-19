require("babel-polyfill");
import abstract from "./abstract.js";
import config from "/home/pi/touchscreen-for-nanodlp-master/zAxis.json";

export default class ZAxis extends abstract{

  constructor(screenManager){
    super(screenManager);
    this.currentButton = 8;
  }

  async init(options){
    await this.setScreen("zAxis");
    let data = this.nanoDLP.getZAxisHt();
    config.CurrentzAxisHeight = data;

    let fs = require("fs");
    if(options){
      if(options.confirmResult && options.confirmType === "SetAxisHeight") {
        let data0 = options.data0;
        config.zAxisZeroLevel = data0;
        fs.writeFile('/home/pi/touchscreen-for-nanodlp-master/zAxis.json',JSON.stringify(config),'utf8',function(err){
          if(err) {
            console.log('保存当前Z轴高度出错了，错误是：'+err);
          }
        });
      }
    }

    this.addListener("click_b16", (e)=>{
      fs.writeFile('/home/pi/touchscreen-for-nanodlp-master/zAxis.json',JSON.stringify(config),'utf8',function(err){
        if(err) {
          console.log('保存当前Z轴高度出错了，错误是：'+err);
        }
      });
      this.changePage("home");
    });

    //置顶
    this.addListener("click_b23", (e)=>{
      this.nanoDLP.setGcode({gcode: 'G1 Z200'});
    });

    //置底
    this.addListener("click_b24", (e)=>{
      let ZeroLevel = config.zAxisZeroLevel;
      this.nanoDLP.setGcode({gcode: `G1 Z${ZeroLevel}`});
    });

    //设置零位
    this.addListener("click_b4", (e)=>{
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
        let zHeight = config.CurrentzAxisHeight;
        this.changePage("confirm", {
          text: "您是否确定要设置当前高度为零位?\r\r当前Z轴高度:"+zHeight,
          confirmType: "SetAxisHeight",
          data0: zHeight,
          returnPage: "zAxis"
        });
      });

    });

    //向上10mm
    this.addListener("click_b25", (e)=>{
      let zHeight = config.CurrentzAxisHeight;
      if(zHeight < 190) {
        let drift = zHeight + 10;
        config.CurrentzAxisHeight=drift;
        this.nanoDLP.setGcode({gcode: `G1 Z${drift}`});
      }else {
        config.CurrentzAxisHeight=200;
        this.nanoDLP.setGcode({gcode: 'G1 Z200'});
      }
    });
    //向上1mm
    this.addListener("click_b26", (e)=>{
      let zHeight = config.CurrentzAxisHeight;
      if(zHeight < 199) {
        let drift = zHeight + 1;
        config.CurrentzAxisHeight=drift;
        this.nanoDLP.setGcode({gcode: `G1 Z${drift}`});
      }else {
        config.CurrentzAxisHeight=200;
        this.nanoDLP.setGcode({gcode: 'G1 Z200'});
      }

    });
    //向上0.1mm
    this.addListener("click_b27", (e)=>{
      let zHeight = config.CurrentzAxisHeight;
      let drift = zHeight + 0.1;
      config.CurrentzAxisHeight=drift;
      this.nanoDLP.setGcode({gcode: `G1 Z${drift}`});
    });

    //向下10mm
    this.addListener("click_b28", (e)=>{
      let zHeight = config.CurrentzAxisHeight;
      let zAxisZeroLevel = config.zAxisZeroLevel;
      let drift = zHeight - 10;
      if(zAxisZeroLevel < drift ) {
        config.CurrentzAxisHeight=drift;
        this.nanoDLP.setGcode({gcode: `G1 Z${drift}`});
      } else {
        config.CurrentzAxisHeight=zAxisZeroLevel;
        this.nanoDLP.setGcode({gcode: `G1 Z${zAxisZeroLevel}`});
      }
    });

    //向下1mm
    this.addListener("click_b29", (e)=>{
        let zHeight = config.CurrentzAxisHeight;
        let zAxisZeroLevel = config.zAxisZeroLevel;
        let drift = zHeight - 1;
        if(zAxisZeroLevel < drift ) {
          config.CurrentzAxisHeight=drift;
          this.nanoDLP.setGcode({gcode: `G1 Z${drift}`});
        } else {
          config.CurrentzAxisHeight=zAxisZeroLevel;
          this.nanoDLP.setGcode({gcode: `G1 Z${zAxisZeroLevel}`});
        }
    });

    //向下0.1mm
    this.addListener("click_b30", (e)=>{
      let zHeight = config.CurrentzAxisHeight;
      let drift = zHeight - 0.1;
      config.CurrentzAxisHeight=drift;
      this.nanoDLP.setGcode({gcode: `G1 Z${drift}`});
    });
  }

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
}
