const StaggKettle = require("stagg-ekg-plus");

let Service;
let Characteristic;

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-stagg-ekg-plus', 'StaggEkG+', StaggEKGAccessory);
}

class StaggEKGAccessory {
  constructor(log, config) {
    this.log = log;
    this.stagg = StaggKettle(config.macAddress);
    this.active = false;
  }

  getServices() {
    const accessoryInformationService = new Service.AccessoryInformation();
    accessoryInformationService.setCharacteristic(
      Characteristic.Manufacturer,
      "Nick Hayward"
    );

    const switchService = new Service.Switch();
    switchService
      .getCharacteristic(Characteristic.On)
      .on("get", this.getOn.bind(this))
      .on("set", this.setOn.bind(this));

    return [accessoryInformationService, switchService];
  }

  getOn(callback) {
    callback(null, this.active);
  }

  async setOn(value, callback) {
    const humanState = value ? "on" : "off";
    this.log(`Turning ${humanState}...`);

    try {
      const action = value ? this.stagg.turnOn : this.stagg.turnOff;
      await action();
      this.active = value;
      this.log(`Turned ${humanState}`);
      callback();
    } catch (error) {
      this.log(`Failed turning ${humanState}`);
      callback(`Failed turning ${humanState}`);
    }
  }
}
