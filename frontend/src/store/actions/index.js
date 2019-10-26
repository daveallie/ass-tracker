import { indexBy } from "lodash";

export const populateAssets = assets => {
  const data = Array.isArray(assets)
    ? indexBy(assets, a => a.id.toString())
    : assets;

  return {
    type: "POPULATE_ASSETS",
    data,
  };
};
