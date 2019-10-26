const assets = (state = {}, action) => {
  switch (action.type) {
    case "POPULATE_ASSETS":
      return action.data;
    default:
      return state;
  }
};

export default assets;
