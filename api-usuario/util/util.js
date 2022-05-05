"use strict";

var re = /(?:\.([^.]+))?$/;

exports.getExt = (filename) => {
  return "." + re.exec(filename)[1];
};

exports.updateOrCreate = async (model, where, newItem, t) => {
  const foundItem = await model.findOne({ where, transaction: t });
  if (!foundItem) {
    const item = await model.create(newItem, { transaction: t });
    return { item, created: true };
  }
  const item = await model.update(newItem, { where, transaction: t });
  return { item, created: false };
};

exports.getPagination = (query_size, query_page) => {
  var limit = undefined;
  var offset = undefined;
  if (query_size != null) {
    const page_size = query_size;
    const page = query_page || 1;
    const skip = (page - 1) * page_size;
    limit = page_size / 1;
    offset = skip;
  }
  return { limit, offset };
};

exports.closestLocation = (targetLocation, locationsData) => {
  function vectorDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(location1, location2) {
    var dx = location1.latitude - location2.latitude,
      dy = location1.longitude - location2.longitude;
    return vectorDistance(dx, dy);
  }

  return locationsData.reduce(function (prev, curr) {
    var prevDistance = locationDistance(targetLocation, prev.dataValues),
      currDistance = locationDistance(targetLocation, curr.dataValues);
    return prevDistance < currDistance ? prev && prev : curr;
  });
};
