const Service = require("../models/services.model");

class Services {
  static async getAllServices(id) {
    const services = await Service.find({ userID: id });
    return services;
  }

  static async addService(id) {
    for (let i = 0; i < 2; i++) {
      const categories = ["water", "power", "phone", "internet"];
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      let company;
      if (category === "water") {
        company = "AYA";
      } else if (category === "power") {
        company = "CNFL";
      } else if (category === "internet") {
        company = "ICE";
      } else {
        company = "KOLBI";
      }

      const amount = Math.floor(Math.random() * 99999);
      const isPaid = false;

      const service = new Service({
        userID: id,
        category,
        company,
        amount,
        isPaid,
      });

      await service.save();
    }
  }

  static async updateService(id, newData) {
    const updatedService = await Service.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });

    return updatedService;
  }
}

module.exports = Services;
