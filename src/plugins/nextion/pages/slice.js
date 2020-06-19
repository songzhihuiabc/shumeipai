require("babel-polyfill");
import abstract from "./abstract.js";

export default class Slice extends abstract{
  constructor(screenManager){
    super(screenManager);
    this.mark = -1;
  }
  async init(options){
    await this.setScreen("slice");
  }

  async update(status){
    let slicer = await this.nanoDLP.getSlicer().catch((e) => {});
    console.log(slicer.running, slicer.percentage, status.SlicingPlateID)
    if (slicer.layerID < slicer.layerCount){
      if (slicer.percentage >= 96) {
        await this.changePage("plates");
      }else {
        await this.setScreen("slice");
        await this.setValue("j1", slicer.percentage);
      }
    }else{
      if (slicer.percentage > this.mark && this.mark > 0) {
        await this.changePage("plates");
      }
    }
    if (slicer.percentage < 100){
        this.mark = slicer.percentage;
    }
  }
}
