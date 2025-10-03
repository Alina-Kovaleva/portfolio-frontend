const setModernSassApi = (rules = []) => {
  for (const rule of rules) {
    if (rule.oneOf) {
      setModernSassApi(rule.oneOf);
    }

    if (!rule.use) continue;

    const loaders = Array.isArray(rule.use) ? rule.use : [rule.use];

    for (const loader of loaders) {
      if (typeof loader === "string") continue;
      if (!loader || !loader.loader) continue;
      if (!loader.loader.includes("sass-loader")) continue;

      loader.options = loader.options || {};
      loader.options.api = "modern";
    }
  }
};

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      setModernSassApi(webpackConfig.module?.rules);
      return webpackConfig;
    },
  },
};
