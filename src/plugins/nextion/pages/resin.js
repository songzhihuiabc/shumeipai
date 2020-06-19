require("babel-polyfill");
import abstract from "./abstract.js";
import request from "request-promise-native";
import config from "../../../../config.json";

export default class Stats extends abstract{

  constructor(screenManager){
    super(screenManager)
  }

  async init(){
    var idxP = 0;
    await this.setScreen("resin");
    this.profiles = await this.nanoDLP.getProfiles();
    this.config = config.plugins.plates;

    this.addListener("click_b5", (e)=>{
      this.changePage("home");
    });

    this.addListener("click_b7", (e)=>{
      idxP = Math.abs((idxP - 1) % this.profiles.length);
      this.setText("t6", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
      this.setText("t1",  this.profiles[idxP].SupportDepth);
      this.setText("t2",  this.profiles[idxP].SupportCureTime);
      this.setText("t3",  this.profiles[idxP].SupportLayerNumber);
      this.setText("t4",  this.profiles[idxP].CureTime);
    });

    this.addListener("click_b8", (e)=>{
      idxP = (idxP + 1) % this.profiles.length;
      this.setText("t6", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
      this.setText("t1",  this.profiles[idxP].SupportDepth);
      this.setText("t2",  this.profiles[idxP].SupportCureTime);
      this.setText("t3",  this.profiles[idxP].SupportLayerNumber);
      this.setText("t4",  this.profiles[idxP].CureTime);
    });

    this.setText("t6", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
    this.setText("t1",  this.profiles[idxP].SupportDepth);
    this.setText("t2",  this.profiles[idxP].SupportCureTime);
    this.setText("t3",  this.profiles[idxP].SupportLayerNumber);
    this.setText("t4",  this.profiles[idxP].CureTime);
  }

  async update(status){
    // this.setText("t1", status.proc);
    // this.setText("t2", status.mem);
    // this.setText("t5", Math.ceil(parseInt(status.temp))+"°C");

    // this.nextion.addToWaveForm(3, 0, parseInt(status.proc));
    // this.nextion.addToWaveForm(5, 0, parseInt(status.mem));
    // this.nextion.addToWaveForm(6, 0, Math.ceil(parseInt(status.temp)));
  }
}
