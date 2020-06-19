require("babel-polyfill");
import abstract from "./abstract.js";
import config from "../../../../config.json";
export default class Home extends abstract{


  constructor(screenManager){
    super(screenManager);
  }

  async init(options) {
      await this.setScreen("home");
      await this.setText("t0", "");

      if (options) {
          console.log("options", options);
          if (options.confirmResult) {
              if (options.confirmType === "shutdown") {
                  var exec = require('child_process').exec;
                  this.setScreen("progress");
                  this.setText("t0", "Shutdown in progress...");
                  exec('shutdown now', function (error, stdout, stderr) {
                  });
                  return _context.stop();
              }
          }
          if (options.confirmResult) {
              if (options.confirmType === "reboot") {
                  var exec = require('child_process').exec;
                  this.setScreen("progress");
                  this.setText("t0", "Reboot in progress...");
                  exec('shutdown -r now', function (error, stdout, stderr) {
                  });
                  return _context.stop();
              }
          }
      }

      this.addListener("click_b3", (e) => {
          this.changePage("settings");
      });



      this.addListener("click_b4", (e) => {
          this.changePage("confirm", {
              text: "Are you sure you want to shutdown?",
              confirmType: "shutdown",
              returnPage: "home"
          });
      });

      this.addListener("click_b5", (e) => {
          this.changePage("confirm", {
              text: "Are you sure you want to reboot?",
              confirmType: "reboot",
              returnPage: "home"
          });
      });
      this.addListener("click_b6", (e) => {
          this.changePage("ipqr", {
              text: "http://" + ip.address()
          });
      });

      this.config = config.plugins.timeout;
      var timestamp = Date.parse(new Date());
      var n = parseInt((this.config['timestamp'] - timestamp)/86400000);
      if (n > 0) {
          this.addListener("click_b1", (e) => {
              this.changePage("plates");
          });
          this.addListener("click_b7", (e) => {
              this.changePage("projector");
          });

          this.addListener("click_b8", (e) => {
              this.changePage("zAxis");
          });

          this.addListener("click_b9", (e) => {
              this.changePage("resin");
          });
          this.setText("t11", n);
      } else {
          this.setText("t11", 0);
      }
  }

}
