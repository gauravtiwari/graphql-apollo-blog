const Environment = () => {
  return {
    development: $('meta[name="env"]').attr('env') === "development",
    production: $('meta[name="env"]').attr('env') === "production"
  };
};

module.exports = Environment;
