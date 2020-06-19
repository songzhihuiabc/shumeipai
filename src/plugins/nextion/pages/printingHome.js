require("babel-polyfill");

import abstract from "./abstract.js";

export default class PrintingHome extends abstract{
  constructor(screenManager){
    super(screenManager);
    this.layerID = -1;
    this.isPause = null;
  }

  async init(options){
    try {
      if(options && options.confirmResult && options.confirmResult){
        switch (options.confirmType) {
          case "pause":
          this.nanoDLP.pause();
          // this.changePage("home");
          break;

          case "stop":
          this.nanoDLP.stop();
          this.changePage("plates");
          break;
        }
      }
    } catch (e) {
      console.log("error", e);
    }

    this.addListener("click_b8", (e)=>{
      this.nanoDLP.unpause();
    });


    this.addListener("click_b7", (e)=>{
      this.changePage("confirm", {
        text:"Are you sure you want to pause\r printing?\rIt will pause after the current\rlayer completed."
        , confirmType: "pause"
        , returnPage: "printingHome"
      })
    });

    this.addListener("click_b6", (e)=>{
      this.changePage("confirm", {
        text:"Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed."
        , confirmType: "stop"
        , returnPage: "printingHome"
      });
    });

    this.addListener("click_b9", (e)=>{
      this.changePage("confirm", {
        text:"Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed."
        , confirmType: "stop"
        , returnPage: "printingHome"
      });
    });
  }

  async update(status, log){
    if(!status.Printing){
      return this.changePage("plates");
    }

    if(this.isPause == null || this.isPause !== status.Paused){
        this.isPause = status.Paused;

        console.log("isPause:", this.isPause)

        if(this.isPause)
          await this.setScreen("printingPause");
        else
          await this.setScreen("printing");

        this.imageX = await this.nextion.getValue("t12.x");
        this.imageY = await this.nextion.getValue("t12.y");
        this.imageWidth = await this.nextion.getValue("t12.w");

    }

    await this.setText("t6", this.isPause?"Paused":"Printing");

    var remaining_time = Math.round((status.LayersCount-status.LayerID)*status.LayerTime/1000000000/60);
    var total_time = Math.round(status.LayersCount*status.LayerTime/1000000000/60);

    await this.setText("t0", status.LayerID+"/"+status.LayersCount);
    await this.setText("t3", status.LayerID);
    await this.setText("t8", status.LayersCount);
    await this.setValue("j2", Math.floor((status.LayerID/status.LayersCount)*100));
    await this.setText("t10", total_time - remaining_time+" of "+total_time+"min");
    await this.setText("t4", total_time - remaining_time);
    await this.setText("t9", total_time);
    await this.setText("t1", status.Path);
    //await this.setText("t7", status.Path)

    if(this.history.layer != status.LayerID){
      this.history.layer = status.LayerID;
      console.log("setImage", this.history.layer);
      let image = await this.nanoDLP.getCurrentPlateLayer(status.PlateID, status.LayerID)
      if(this.enabled)
        console.log(image, this.imageX, this.imageY, this.imageWidth)
        await this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(e => console.error(e));
    }
  }
}
