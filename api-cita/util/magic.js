const enum_ = require("./enum");

exports.ResponseService = (code, message, data = {}, extra = {}) => {
  return { status: { code: code, message: message }, data: data, extra: extra };
};

exports.ResponseServiceMobile = (status, message, data = {}) => {
  return { status: status, message: message, data: data };
};

exports.LogSuccess = (msg) => {
  console.log(enum_.GREEN_LOG, msg);
};

exports.LogInfo = (msg) => {
  console.log(enum_.CYAN_LOG, msg);
};

exports.LogWarning = (msg) => {
  console.log(enum_.YELLOW_LOG, msg);
};

exports.LogDanger = (msg) => {
  console.log(enum_.RED_LOG, msg);
};
