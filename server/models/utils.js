export const updateDocBuilder = ({ formatData } = {}) => {
  return function(data) {
    if (formatData) {
      data = formatData(data);
    }

    Object.keys(data).forEach(key => (this[key] = data[key]));

    return this;
  };
};

export const updateTimeWhenSave = function(next) {
  this.updated_at = Date.now();
  next();
};
