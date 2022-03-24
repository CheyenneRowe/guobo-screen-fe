import yaml from 'js-yaml/dist/js-yaml';

function isObject(value) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}

export const getValue = (value) => {
    if (isObject(value)) {
        try {
            return yaml.safeDump(JSON.parse(JSON.stringify(value)), { noRefs: true });
        } catch (err) {
            console.error(err);
            return JSON.stringify(value, null, 2);
        }
    }
    return String(value);
};

export const getValueObj = (value) => {
    if (!isObject(value)) {
      try {
        return yaml.safeLoad(value);
      } catch (err) {}
    }
    return value;
  };
