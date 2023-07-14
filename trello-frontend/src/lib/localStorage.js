const local = {};

local.put = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  