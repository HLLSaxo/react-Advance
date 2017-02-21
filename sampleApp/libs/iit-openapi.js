/*
 *  iit-shared-js 3.0.0
 */
; (function (global, $) {
	"use strict";

	var iit_utils_object, iit_utils_enum, iit_utils_function, iit_utils_string, iit_micro_emitter, iit_log, iit_utils_fetch, iit_price_formatting_modern_fractions_character, iit_number_formatting_format, iit_price_formatting_format, iit_price_formatting_parse, iit_number_formatting_parse, iit_number_formatting_short_format, iit_number_formatting_number_formatting, iit_price_formatting_valid_characters, iit_price_formatting_price_formatting, iit_price_formatting_format_options, iit_openapi_batch_util, iit_openapi_transport_core, iit_openapi_transport_auth, iit_openapi_transport_queue, iit_openapi_transport_batch, iit_openapi_streaming_subscription, iit_openapi_streaming_heartbeater, iit_openapi_streaming_orphan_finder, iit_openapi_streaming_streaming, iit_openapi_packagejs;
iit_utils_object = function (exports) {
  exports.__esModule = true;
  /**
   * @module iit/utils/object
   * @ignore
   */
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
  * @namespace iit.utils.object
  */
  /**
  * Extends an object with another, following the same syntax as `$.extend` - see {@link http://api.jquery.com/jquery.extend/}.
  * @alias iit.utils.object.extend
  * @param {boolean} deep - If the argument list begins true the object will be deep copied.
  * @param {...object} objects - Merges properties from later objects on to the first object.
  * @static
  */
  function extend() {
    // optimized extend
    // speed tested - http://jsperf.com/jquery-extend-vs-custom
    var deep = arguments[0] === true;
    var l = arguments.length;
    var i = deep ? 1 : 0;
    var result = arguments[i++] || {};
    for (var current, val; i < l; i++) {
      current = arguments[i];
      for (var prop in current) {
        if (current.hasOwnProperty(prop)) {
          val = current[prop];
          if (!deep || typeof val !== 'object') {
            result[prop] = val;
          } else {
            if (typeof val !== typeof result[prop] || Array.isArray(val) !== Array.isArray(result[prop])) {
              result[prop] = Array.isArray(val) ? [] : {};
            }
            extend(true, result[prop], val);
          }
        }
      }
    }
    return result;
  }
  //-- Export section --
  exports.extend = extend;
  return exports;
}({});
iit_utils_enum = function (exports, _object) {
  exports.__esModule = true;
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
   * @namespace iit.utils.enum
   */
  /**
   * Converts from a comma separated object or an array of strings to an object with each string being the property name.
   * @alias iit.utils.enum.toObject
   * @param {Array.<string>|string|Object} values
   * @returns {Object}
   * @example
   * var enumUtils = require("iit/utils/enum");	// AMD
   * var enumUtils = iit.utils.enum;				// Namespaces
   * var obj = enumUtils.toObject("DeciPips,Percentage");
   * if (obj.DeciPips) {
   *     assert("We should reach here");
   * }
   * var otherFormats = enumUtils.toObject(["DeciPips", "Percentage"]);
   */
  function toObject(values) {
    if (Array.isArray(values)) {
      var _obj = {};
      for (var i = 0, l = values.length; i < l; i++) {
        var value = values[i];
        if (value) {
          _obj[value] = true;
        }
      }
      return _obj;
    }
    if (typeof values !== 'string') {
      return values;
    }
    var obj = {};
    var valueList = values.split(',');
    for (var i = 0, l = valueList.length; i < l; i++) {
      var value = valueList[i].trim();
      if (value) {
        obj[value] = true;
      }
    }
    return obj;
  }
  /**
   * Makes an enum definition.
   * @alias iit.utils.enum.makeDefinition
   * @param {Array} values
   * @returns {Object}
   * @example
   * var enum = enumUtils.makeDefinition(["Percentage", "DeciPips"]);
   * // enum =
   * //     {
   * //     "Percentage": "Percentage",
   * //     "DeciPips": "DeciPips"
   * //     }
   */
  function makeDefinition(values) {
    var enumDefinition = {};
    for (var i = 0, l = values.length; i < l; i++) {
      enumDefinition[values[i]] = values[i];
    }
    Object.freeze(enumDefinition);
    return enumDefinition;
  }
  /**
   * Produces the union of two enumerations.
   * @param {Array.<string>|string|Object} enumA
   * @param {Array.<string>|string|Object} enumB
   * @returns {Object}
   * @example
   * var enum = enumUtils.union("Percentage", { DeciPips: true });
   * // enum == { Percentage: true, DeciPips: true }
   */
  function union(enumA, enumB) {
    enumA = toObject(enumA);
    enumB = toObject(enumB);
    return _object.extend({}, enumA, enumB);
  }
  /**
   * Returns an enumeration of items in enumA that are not in enumB.
   * @param {Array.<string>|string|Object} enumA
   * @param {Array.<string>|string|Object} enumB
   * @returns {Object}
   * @example
   * var enum = enumUtils.union("Percentage,DeciPips", { DeciPips: true });
   * // enum == { Percentage: true }
   */
  function exclusion(enumA, enumB) {
    enumA = toObject(enumA);
    enumB = toObject(enumB);
    var enumResult = {};
    for (var value in enumA) {
      if (enumA.hasOwnProperty(value) && enumA[value] && (!enumB.hasOwnProperty(value) || !enumB[value])) {
        enumResult[value] = true;
      }
    }
    return enumResult;
  }
  /**
   * Converts an object representation of an enumeration to a string
   * @param {Object} enumA
   * @returns {String}
   * @example
   * var str = enumUtils.union({ DeciPips: true, Percentage: true });
   * // str == "DeciPips, Percentage"
   */
  function toString(enumA) {
    var items = [];
    for (var key in enumA) {
      if (enumA.hasOwnProperty(key) && enumA[key]) {
        items.push(key);
      }
    }
    return items.join(', ');
  }
  //-- Export section --
  exports.toObject = toObject;
  exports.makeDefinition = makeDefinition;
  exports.exclusion = exclusion;
  exports.union = union;
  exports.toString = toString;
  return exports;
}({}, iit_utils_object);
iit_utils_function = function (exports) {
  exports.__esModule = true;
  /**
   * @module iit/utils/function
   * @ignore
   */
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
  * @namespace iit.utils.function
  */
  /**
  * Schedules a micro-task to run after breaking the current call stack - See {@link https://github.com/kriskowal/asap} and {@link https://github.com/YuzuJS/setImmediate}.
  * @function
  * @alias iit.utils.function.nextTick
  * @static
  * @param {function} func - The function to run after code has been broken out of.
  */
  var nextTick;
  // Borrowed from Q JS lib
  // https://github.com/kriskowal/q/blob/v1/q.js#L169
  // use the fastest possible means to execute a task in a future turn
  // of the event loop.
  if (typeof setImmediate === 'function') {
    // https://github.com/NobleJS/setImmediate
    exports.nextTick = nextTick = function (func) {
      // IE11 throws "invalid calling object" if re-assigned, so we have to wrap
      setImmediate(func);
    };
  } else if (typeof MessageChannel !== 'undefined') {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    // linked list of tasks (single, with head node)
    var head = {}, tail = head;
    channel.port1.onmessage = function () {
      head = head.next;
      var task = head.task;
      delete head.task;
      task();
    };
    exports.nextTick = nextTick = function (task) {
      tail = tail.next = { task: task };
      channel.port2.postMessage(0);
    };
  } else {
    // default to the "old browsers" implementation
    // 2nd argument optional http://stackoverflow.com/questions/2723610/settimeoutfun-with-a-single-argument-timeout-not-specified
    exports.nextTick = nextTick = setTimeout;
  }
  //-- Export section --
  exports.nextTick = nextTick;
  return exports;
}({});
iit_utils_string = function (exports) {
  exports.__esModule = true;
  /**
  * @module iit/utils/string
  * @ignore
  */
  //-- Local variables section --
  var formatRx = /\{([^{]+?)\}/g;
  //-- Local methods section --
  //-- Exported methods section --
  /**
  * @namespace iit.utils.string
  */
  /**
  * Formats text with arguments.
  * @alias iit.utils.string.format
  * @param {string} sTemplate
  * @param {(Object|...string)} args - Accepts either an object with keys or the arguments will be indexed.
  * @returns {string}
  */
  function format(sTemplate, args) {
    if (typeof args !== 'object')
      args = Array.prototype.slice.call(arguments, 1);
    return sTemplate.replace(formatRx, function (capture, p1) {
      return args[p1] !== undefined ? args[p1] : '{' + p1 + '}';
    });
  }
  /**
  * Returns true if the string starts with the needle.
  * @alias iit.utils.string.startsWith
  * @param {string} haystack
  * @param {string} needle
  * @param {boolean} [isCaseSensitive=true] - Whether it is case sensitive. Use false to make insensitive.
  * @returns {boolean}
  */
  function startsWith(haystack, needle, isCaseSensitive) {
    if (isCaseSensitive === false) {
      haystack = haystack.toLowerCase();
      needle = needle.toLowerCase();
    }
    return haystack.lastIndexOf(needle, 0) === 0;
  }
  /**
  * Returns true if the string ends with the needle.
  * @alias iit.utils.string.endsWith
  * @param {string} haystack
  * @param {string} needle
  * @param {boolean} [isCaseSensitive=true] - Whether it is case sensitive. Use false to make insensitive.
  * @returns {boolean}
  */
  function endsWith(haystack, needle, isCaseSensitive) {
    if (isCaseSensitive === false) {
      haystack = haystack.toLowerCase();
      needle = needle.toLowerCase();
    }
    return haystack.lastIndexOf(needle) === haystack.length - needle.length;
  }
  /**
  * Creates a new string that has the input string in a number of times
  * @param {string} s - The string to repeat
  * @param {number} count - The number of times to repeat
  * @example
  * var out = multiply("*", 2);
  * // out === "**"
  */
  function multiply(s, count) {
    var res = '', i;
    for (i = 0; i < count; i++) {
      res = res + s;
    }
    return res;
  }
  /**
  * Pads the left side of a string with a character
  * @param {string} value - The string to pad
  * @param {number} length - The required output length
  * @param {string} padChar - The character to use for padding
  * @example
  * var out = padLeft("1", 3, "0");
  * // out === "001"
  */
  function padLeft(value, length, padChar) {
    if (length <= value.length) {
      return value;
    }
    return multiply(padChar, length - value.length) + value;
  }
  /**
  * Creates a new GUID.
  * @alias iit.utils.string.createGUID
  * @returns {string} A GUID.
  */
  function createGUID() {
    /* global crypto */
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues !== 'undefined') {
      // If we have a cryptographically secure PRNG, use that
      // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
      var buf = new Uint16Array(8);
      crypto.getRandomValues(buf);
      var S4 = function (num) {
        var ret = num.toString(16);
        while (ret.length < 4) {
          ret = '0' + ret;
        }
        return ret;
      };
      return S4(buf[0]) + S4(buf[1]) + '-' + S4(buf[2]) + '-' + S4(buf[3]) + '-' + S4(buf[4]) + '-' + S4(buf[5]) + S4(buf[6]) + S4(buf[7]);
    } else {
      // Otherwise, just use Math.random
      // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
  }
  /**
  * Formats text with arguments for a URL. All data arguments are uri encoded.
  * @alias iit.utils.string.formatUrl
  * @param {string} urlTemplate
  * @param {(Object|...string)} templateArgs - Accepts either an object with keys or the arguments will be indexed.
  * @param {Object} [queryParams] - query params as an object that will be added to the URL e.g. {a:1} => ?a=1
  * @returns {string}
  */
  function formatUrl(urlTemplate, templateArgs, queryParams) {
    var url;
    if (templateArgs) {
      var urlEncodedTemplateArgs = {};
      for (var arg in templateArgs) {
        if (templateArgs.hasOwnProperty(arg)) {
          urlEncodedTemplateArgs[arg] = encodeURIComponent(templateArgs[arg]);
        }
      }
      url = format(urlTemplate, urlEncodedTemplateArgs);
    } else {
      url = urlTemplate;
    }
    if (queryParams) {
      var firstQueryParam = url.indexOf('?') < 0;
      for (var queryParamKey in queryParams) {
        if (queryParams.hasOwnProperty(queryParamKey) && queryParams[queryParamKey] != null) {
          url += (firstQueryParam ? '?' : '&') + queryParamKey + '=' + encodeURIComponent(queryParams[queryParamKey]);
          firstQueryParam = false;
        }
      }
    }
    return url;
  }
  //-- Export section --
  exports.format = format;
  exports.formatUrl = formatUrl;
  exports.startsWith = startsWith;
  exports.endsWith = endsWith;
  exports.multiply = multiply;
  exports.padLeft = padLeft;
  exports.createGUID = createGUID;
  return exports;
}({});
iit_micro_emitter = function (exports) {
  function mixinEmitter(target) {
    var subscribers = {};
    if (target.on || target.off || target.trigger) {
      throw new Error('Mixing in would hide existing implementations of on/off/trigger');
    }
    target.on = function (eventType, onFunction, that) {
      if (!eventType) {
        throw new Error('on method requires an eventType - have you typo\'d ?');
      }
      if (!onFunction) {
        throw new Error('Subscribing without a function to call');
      }
      var eventSubscribers = subscribers[eventType];
      if (!eventSubscribers) {
        eventSubscribers = subscribers[eventType] = [];
      }
      eventSubscribers.push({
        onFunction: onFunction,
        that: that
      });
    };
    target.off = function (eventType, onFunction, that) {
      if (eventType) {
        var eventSubscribers = subscribers[eventType];
        if (eventSubscribers) {
          for (var i = eventSubscribers.length - 1, subscriber = undefined; subscriber = eventSubscribers[i]; i--) {
            if ((!onFunction || subscriber.onFunction === onFunction) && (!subscriber.that || subscriber.that === that)) {
              eventSubscribers.splice(i, 1);
            }
          }
          if (eventSubscribers.length === 0) {
            delete subscribers[eventType];
          }
        }
      } else {
        for (eventType in subscribers) {
          if (subscribers.hasOwnProperty(eventType)) {
            target.off(eventType, onFunction, that);
          }
        }
      }
    };
    target.trigger = function (eventType) {
      var eventSubscribers = subscribers[eventType];
      if (eventSubscribers) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = eventSubscribers.length - 1, subscriber = undefined; subscriber = eventSubscribers[i]; i--) {
          subscriber.onFunction.apply(subscriber.that, args);
        }
      }
    };
  }
  //-- Export section --
  exports = { mixinTo: mixinEmitter };
  return exports;
}({});
iit_log = function (exports, _microEmitter) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
   * The Shared JS Log. use it to log or listen to log messages.
   * Use the {@link MicroEmitter} mixed into log to listen for log messages.
   * When using namespaces, access with `iit.log`.
   * @module iit/log
   * @ignore
   */
  var _emitter = _interopRequire(_microEmitter);
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
   * The shared js log, which allows posting messages and listening to them.
   * @namespace iit.log
   * @mixes MicroEmitter
   * @example
   * // to log
   * log.warn("Area", "Warning... such and so...", { data: context});
   *
   * // to listen to all logs on the console
   * log.on(log.DEBUG, console.debug.bind(console));
   * log.on(log.INFO, console.info.bind(console));
   * log.on(log.WARN, console.info.bind(console));
   * log.on(log.ERROR, console.error.bind(console));
   */
  var log = {};
  /**
   * The Debug event constant.
   * @alias iit.log.DEBUG
   */
  log.DEBUG = 'debug';
  /**
   * The info event constant.
   * @alias iit.log.INFO
   */
  log.INFO = 'info';
  /**
   * The warn event constant.
   * @alias iit.log.WARN
   */
  log.WARN = 'warn';
  /**
   * the error event constant.
   * @alias iit.log.ERROR
   */
  log.ERROR = 'error';
  _emitter.mixinTo(log);
  /**
   * @function
   * @alias iit.log.debug
   * @param {string} area - The area of the code e.g. "Streaming" or "TransportBatch".
   * @param {string} message - The error message e.g. "Something has gone wrong".
   * @param {Object|string} [data] - Data associated with the event.
   */
  log.debug = log.trigger.bind(log, log.DEBUG);
  /**
   * @function
   * @alias iit.log.info
   * @param {string} area - The area of the code e.g. "Streaming" or "TransportBatch".
   * @param {string} message - The error message e.g. "Something has gone wrong".
   * @param {Object|string} [data] - Data associated with the event.
   */
  log.info = log.trigger.bind(log, log.INFO);
  /**
   * @function
   * @alias iit.log.warn
   * @param {string} area - The area of the code e.g. "Streaming" or "TransportBatch".
   * @param {string} message - The error message e.g. "Something has gone wrong".
   * @param {Object|string} [data] - Data associated with the event.
   */
  log.warn = log.trigger.bind(log, log.WARN);
  /**
   * @function
   * @alias iit.log.error
   * @param {string} area - The area of the code e.g. "Streaming" or "TransportBatch".
   * @param {string} message - The error message e.g. "Something has gone wrong".
   * @param {Object|string} [data] - Data associated with the event.
   */
  log.error = log.trigger.bind(log, log.ERROR);
  //-- Export section --
  exports = log;
  return exports;
}({}, iit_micro_emitter);
iit_utils_fetch = function (exports, _log) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
   * @module iit/utils/fetch
   * @ignore
   */
  var _log2 = _interopRequire(_log);
  //-- Local variables section --
  var LOG_AREA = 'Fetch';
  /**
  * Follows the jQuery way of cache breaking - start with the current time and add 1 per request, meaning you would have to do more than 1000 per second
  * for 2 numbers to repeat across sessions.
  */
  var cacheBreakNum = Date.now();
  //-- Local methods section --
  /**
  * returns a rejected promise with the reason being the first argument
  * Can be used in a promise then to convert from a resolved promise to a rejected one
  */
  function rejectPromise(arg) {
    return Promise.reject(arg);
  }
  /**
  * Returns a rejected promise, needed to keep the promise rejected.
  * @param result
  */
  function convertFetchReject(result) {
    _log2.warn(LOG_AREA, 'Failed request', result);
    return convertFetchResponse(result).then(rejectPromise);
  }
  /**
  * Converts the fetch response and returns either a resolved or rejected Promise.
  * @param result
  */
  function convertFetchSuccess(result) {
    // See also the same logic applied to the batch response
    if ((result.status < 200 || result.status > 299) && result.status !== 304) {
      _log2.warn(LOG_AREA, 'non-200-299,304 http response', result);
      return convertFetchResponse(result).then(rejectPromise);
    }
    return convertFetchResponse(result);
  }
  /**
  * Parses the json or gets the text from the response as required.
  * @param result
  * @returns {Promise}
  */
  function convertFetchResponse(result) {
    var contentType = result && result.headers && result.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') > -1) {
      return result.text().then(function (text) {
        try {
          return {
            response: JSON.parse(text),
            status: result.status
          };
        } catch (e) {
          _log2.error(LOG_AREA, 'Received a JSON response from OpenApi that could not be parsed', {
            text: text,
            response: result
          });
          return {
            response: text,
            status: result.status
          };
        }
      });
    } else if (contentType && contentType.indexOf('multipart/mixed') > -1) {
      return result.text().then(function (text) {
        return {
          response: text,
          status: result.status
        };
      });
    }
    return Promise.resolve({ status: result.status });
  }
  //-- Exported methods section --
  /**
  * @namespace iit.utils
  */
  /**
  * Performs a fetch and processes the response.
  * All non 200 responses are converted to rejections. The body can be an object and will be JSON.stringified and the right header added.
  * All responses that contain JSON are converted to objects.
  * @function
  * @alias iit.utils.fetch
  * @param {string} method - The http method.
  * @param {string} url - The url to fetch.
  * @param {Object} [options]
  * @param {string} [options.body] - The body of the request. If this is an object it is converted to JSON and the appropriate content-type header added.
  * @param {Object} [options.headers] - Object of header key to header value.
  * @param {boolean} [options.cache] - Whether or not to cache.
  * @param {string} [options.credentials="include"] - Whether cookies will be included. Will default to true unless overridden.
  * 							"omit" is currently the fetch default {@link https://fetch.spec.whatwg.org/#concept-request-credentials-mode} and means none will be included.
  * 							"same-origin" will include the cookies if on the same domain (this is the XmlHttpRequest default)
  * 							"include" will always include the cookies.
  * @return {Promise<{ status: number, response: Object|String },{ status: number, response: Object|String }|Error>}
  */
  function localFetch(method, url, options) {
    var body = options && options.body;
    var headers = options && options.headers || {};
    var cache = options && options.cache;
    var credentials = options && options.credentials;
    var useXHttpMethodOverride = options && options.useXHttpMethodOverride;
    if (!credentials) {
      //credentials = 'include';
    }
    // encode objects. Batch calls come through as strings.
    if (body && typeof body === 'object') {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json; charset=UTF-8';
    }
    if (useXHttpMethodOverride && (method === 'PUT' || method === 'DELETE' || method === 'PATCH')) {
      headers['X-HTTP-Method-Override'] = method;
      method = 'POST';
    }
    if (cache === false) {
      if (method === 'GET') {
        var cacheBreak = String(cacheBreakNum++);
        url += (url.indexOf('?') > 0 ? '&_=' : '?_=') + cacheBreak;
      }
      // http://stackoverflow.com/questions/12796318/prevent-ios-6-from-caching-ajax-post-requests
      // iOS6 prevent cache
      headers['Cache-Control'] = 'no-cache';
    }
    return fetch(url, {
      headers: headers,
      method: method,
      body: body,
      credentials: credentials
    }).then(convertFetchSuccess, convertFetchReject);
  }
  //-- Export section --
  exports = localFetch;
  return exports;
}({}, iit_log);
iit_price_formatting_modern_fractions_character = function (exports) {
  exports.__esModule = true;
  /**
   * @module iit/price-formatting/modern-fractions-character
   * @ignore
   */
  //-- Local variables section --
  var modernFractionsSeparator = '\'';
  //US T-Bond/T-Note future decimal separator (104'16.5)
  var altModernFractionsSeparator = '"';
  //For the people using ' as thousand separator
  //-- Local methods section --
  //-- Exported methods section --
  function getModernFractionsSeparator(numberFormatting) {
    var separator = modernFractionsSeparator;
    if (numberFormatting.groupSeparator === modernFractionsSeparator) {
      separator = altModernFractionsSeparator;
    }
    return separator;
  }
  //-- Export section --
  exports.getModernFractionsSeparator = getModernFractionsSeparator;
  return exports;
}({});
iit_number_formatting_format = function (exports) {
  function formatNegativeNumber(str, options) {
    return options.negativePattern.replace('{0}', str);
  }
  /**
  * expands the number of decimals and introduces decimal groups.
  * @param number
  * @param precision
  * @param groupSizes
  * @param sep
  * @param decimalChar
  */
  function expandNumber(number, precision, groupSizes, sep, decimalChar) {
    var curSize = groupSizes[0], curGroupIndex = 1, numberString = String(number), decimalIndex = numberString.indexOf('.'), right = '', i;
    if (decimalIndex > 0) {
      right = numberString.slice(decimalIndex + 1);
      numberString = numberString.slice(0, decimalIndex);
    }
    if (precision > 0) {
      var rightDifference = right.length - precision;
      if (rightDifference > 0) {
        right = right.slice(0, precision);
      } else if (rightDifference < 0) {
        var absRightDifference = Math.abs(rightDifference);
        for (i = absRightDifference - 1; i >= 0; i--) {
          right += '0';
        }
      }
      right = decimalChar + right;
    } else {
      right = '';
    }
    var stringIndex = numberString.length - 1;
    var ret = '';
    while (stringIndex >= 0) {
      if (curSize === 0 || curSize > stringIndex) {
        if (ret.length > 0) {
          return numberString.slice(0, stringIndex + 1) + sep + ret + right;
        }
        return numberString.slice(0, stringIndex + 1) + right;
      }
      if (ret.length > 0) {
        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
      } else {
        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
      }
      stringIndex -= curSize;
      if (curGroupIndex < groupSizes.length) {
        curSize = groupSizes[curGroupIndex];
        curGroupIndex++;
      }
    }
    return numberString.slice(0, stringIndex + 1) + sep + ret + right;
  }
  //-- Exported methods section --
  function formatNumber(inputNumber, decimals, options) {
    if (isNaN(inputNumber) || inputNumber === null || inputNumber === '') {
      return '';
    }
    // Does AwayFromZero rounding as per C# - see MidpointRound.AwayFromZero
    // When a number is halfway between two others, it is rounded toward the nearest number that is away from zero.
    // We do this by rounding the absolute number, so it always goes away from zero.
    var factor = Math.pow(10, decimals);
    var absoluteNumber = Math.abs(inputNumber);
    absoluteNumber = Math.round(absoluteNumber * factor) / factor;
    var formattedNumber = expandNumber(Math.abs(absoluteNumber), decimals, options.groupSizes, options.groupSeparator, options.decimalSeparator);
    // if the original is negative and it hasn't been rounded to 0
    if (inputNumber < 0 && absoluteNumber !== 0) {
      formattedNumber = formatNegativeNumber(formattedNumber, options);
    }
    return formattedNumber;
  }
  //-- Export section --
  exports = formatNumber;
  return exports;
}({});
iit_price_formatting_format = function (exports, _utilsEnum, _modernFractionsCharacter, _numberFormattingFormat, _utilsString) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  var _formatNumber = _interopRequire(_numberFormattingFormat);
  //-- Local variables section --
  var NO_BREAK_SPACE = '\xA0';
  //-- Local methods section --
  function getFirstAndPipsParts(price, parts, numberFormatting) {
    var minSize = price.indexOf(numberFormatting.decimalSeparator) < 0 ? 2 : 3;
    if (price.length > minSize) {
      var pc = 2;
      parts.Pips = price.substr(price.length - pc, pc);
      if (parts.Pips.indexOf(numberFormatting.decimalSeparator) >= 0) {
        pc = 3;
        parts.Pips = price.substr(price.length - pc, pc);
      }
      parts.First = price.substr(0, price.length - pc);
    } else {
      parts.First = price;
      parts.Pips = '';
    }
  }
  function formatPricePartsFraction(parts, numberFormatting, value, decimals, formatFlags, numeratorDecimals) {
    var minDecimals = 0, maxDecimals = 8;
    if (formatFlags.ModernFractions) {
      minDecimals = 5;
      maxDecimals = 7;
    }
    decimals = Math.max(minDecimals, Math.min(maxDecimals, decimals));
    var denominator = 1 << Math.min(8, decimals);
    var integerPart = Math.floor(value);
    var fractionalPart = value - integerPart;
    var numerator = fractionalPart * denominator;
    numeratorDecimals = numeratorDecimals || 0;
    if (formatFlags.NoRounding) {
      numeratorDecimals = Math.max(numberFormatting.getActualDecimals(numerator), numeratorDecimals);
    } else {
      // now round it to the resolution.
      // we could also just assume it is in the right resolution e.g. rounded to the tick size
      var resolution = 1 << numeratorDecimals;
      numerator = Math.round(numerator * resolution) / resolution;
    }
    var numeratorText = _formatNumber(numerator, numeratorDecimals, numberFormatting);
    var denominatorText = _formatNumber(denominator, 0, numberFormatting);
    var fractionalPartText = '';
    //Not really pips - just fractional part string
    if (denominatorText === numeratorText) {
      numeratorText = '0';
      denominator = 0;
      integerPart += 1;
    }
    var first = _formatNumber(integerPart, 0, numberFormatting);
    if (formatFlags.ModernFractions) {
      //Special futures format
      var separator = _modernFractionsCharacter.getModernFractionsSeparator(numberFormatting);
      var padSize = undefined;
      if (numeratorDecimals === 0) {
        padSize = 2;  //two 'integer' numerator digits
      } else {
        padSize = numeratorDecimals + 3;  //two digits + seperator + all the decimal bits
      }
      fractionalPartText = separator + _utilsString.padLeft(numeratorText, padSize, '0');
    } else if (numeratorText === '0' && !formatFlags.IncludeZeroFractions) {
      if (formatFlags.AdjustFractions) {
        //# spaces = Separator + #d spaces + fraction slash space + #n spaces
        fractionalPartText = _utilsString.multiply(NO_BREAK_SPACE, 1 + 2 * denominatorText.length + 1);
      }
    } else {
      if (formatFlags.AdjustFractions && numeratorText.length < denominatorText.length) {
        numeratorText = _utilsString.padLeft(numeratorText, denominatorText.length, NO_BREAK_SPACE);
      }
      //use NO-BREAK SPACE to separate fraction
      fractionalPartText = NO_BREAK_SPACE + numeratorText + '/' + denominatorText;
    }
    parts.First = first;
    parts.Pips = fractionalPartText;
    parts.DeciPips = '';
  }
  function formatPricePartsDecimals(parts, numberFormatting, value, decimals, formatFlags) {
    var actualDecimals;
    if (formatFlags.Percentage && formatFlags.NoRounding) {
      throw new Error('No rounding is not supported on percentage');
    }
    if (formatFlags.NoRounding) {
      actualDecimals = numberFormatting.getActualDecimals(value);
      if (actualDecimals <= decimals) {
        formatFlags.NoRounding = false;
      }
    }
    if (formatFlags.Percentage) {
      parts.First = _formatNumber(value * 100, decimals, numberFormatting) + ' %';
    } else if (formatFlags.NoRounding || !formatFlags.AllowDecimalPips && !formatFlags.DeciPipsFraction) {
      getFirstAndPipsParts(_formatNumber(value, formatFlags.NoRounding ? actualDecimals : decimals, numberFormatting), parts, numberFormatting);
    } else {
      var extra = decimals + 1;
      var fullPrice = _formatNumber(value, extra, numberFormatting);
      //basePart may contain a decimal separator that may or may not need to be removed
      var basePart = fullPrice.substr(0, fullPrice.length - 1);
      var deciPipsPart = fullPrice.substr(fullPrice.length - 1, 1);
      if (formatFlags.AllowDecimalPips) {
        if (!formatFlags.DeciPipsSpaceSeparator && !formatFlags.DeciPipsDecimalSeparator) {
          if (_utilsString.endsWith(basePart, numberFormatting.decimalSeparator)) {
            basePart = basePart.substr(0, basePart.length - 1);
            deciPipsPart = numberFormatting.decimalSeparator + deciPipsPart;
          }
        } else {
          if (formatFlags.DeciPipsDecimalSeparator) {
            if (_utilsString.endsWith(basePart, numberFormatting.decimalSeparator)) {
              basePart = basePart.substr(0, basePart.length - 1);
              deciPipsPart = numberFormatting.decimalSeparator + deciPipsPart;
            } else {
              deciPipsPart = numberFormatting.decimalSeparator + deciPipsPart;
            }
          } else {
            //SpaceSeparator
            if (_utilsString.endsWith(basePart, numberFormatting.decimalSeparator)) {
              basePart = basePart.substr(0, basePart.length - 1);
              deciPipsPart = numberFormatting.decimalSeparator + deciPipsPart;
            } else {
              deciPipsPart = NO_BREAK_SPACE + deciPipsPart;
            }
          }
        }
      } else {
        //Fraction
        var deciPipsIsFractionalPart = false;
        if (_utilsString.endsWith(basePart, numberFormatting.decimalSeparator)) {
          basePart = basePart.substr(0, basePart.length - 1);
          deciPipsIsFractionalPart = true;
        }
        if (deciPipsPart === '5') {
          deciPipsPart = '\xBD';
          deciPipsIsFractionalPart = false;
        } else if (formatFlags.DeciPipsSpaceForZero && deciPipsPart === '0') {
          deciPipsPart = NO_BREAK_SPACE;
          deciPipsIsFractionalPart = false;
        }
        if (formatFlags.DeciPipsSpaceSeparator) {
          deciPipsPart = NO_BREAK_SPACE + deciPipsPart;
        } else if (deciPipsIsFractionalPart) {
          deciPipsPart = numberFormatting.decimalSeparator + deciPipsPart;
        }
      }
      getFirstAndPipsParts(basePart, parts, numberFormatting);
      parts.DeciPips = deciPipsPart;
    }
  }
  /**
  * Formats a number to an object of price parts
  * @param numberFormatting
  * @param value
  * @param decimals
  * @param formatFlags
  * @param numeratorDecimals
  * @returns {PriceParts}
  */
  function formatPriceParts(numberFormatting, value, decimals, formatFlags, numeratorDecimals) {
    var parts = {
      Pre: '',
      Post: '',
      First: '',
      Pips: '',
      DeciPips: ''
    };
    if (isNaN(value)) {
      parts.First = '-';
      return parts;
    }
    var isNegative = value < 0;
    value = Math.abs(value);
    if (formatFlags.ModernFractions || formatFlags.Fractions) {
      formatPricePartsFraction(parts, numberFormatting, value, decimals, formatFlags, numeratorDecimals);
    } else {
      formatPricePartsDecimals(parts, numberFormatting, value, decimals, formatFlags);
    }
    if (isNegative) {
      parts.Post = numberFormatting.negativePost;
      parts.Pre = numberFormatting.negativePre;
    }
    return parts;
  }
  //-- Exported methods section --
  /**
  * Formats a price value with the specified options.
  * @param {NumberFormatting} numberFormatting
  * @param {number} value - The price value to format.
  * @param {number} decimals
  * @param {string|Object.<string, boolean>} [formatFlags="None"] - Indicates if the price also include half-pips (decimal pips), and which format should be used.
  * @param {number} [numeratorDecimals=0] - In the case of Fractions or ModernFractions, this is the number of decimals on the fraction numerator
  * @returns {PriceParts} An object containing the formatted price.
  */
  function formatPrice(numberFormatting, value, decimals, formatFlags, numeratorDecimals) {
    if (formatFlags) {
      formatFlags = _utilsEnum.toObject(formatFlags);
    } else {
      formatFlags = { None: true };
    }
    if (typeof decimals !== 'number') {
      throw new Error('Decimals are required in price formatting functions');
    }
    if (decimals < 0) {
      throw new Error('This library supports the openapi format specification, so fractions are done with positive decimals and the Fractions or ModernFractions flag');
    }
    var parts = formatPriceParts(numberFormatting, value, decimals, formatFlags, numeratorDecimals);
    return parts;
  }
  //-- Export section --
  exports = formatPrice;
  return exports;
}({}, iit_utils_enum, iit_price_formatting_modern_fractions_character, iit_number_formatting_format, iit_utils_string);
iit_price_formatting_parse = function (exports, _utilsEnum, _modernFractionsCharacter) {
  var divisionChars = [
    '/',
    '\u2044',
    '\u2215'
  ];
  var fractionChars = [
    '\xBC',
    '\xBD',
    '\xBE',
    '\u2153',
    '\u2154',
    '\u2155',
    '\u2156',
    '\u2157',
    '\u2158',
    '\u2159',
    '\u215A',
    '\u215B',
    '\u215C',
    '\u215D',
    '\u215E'
  ];
  var fractionCharsValues = [
    1 / 4,
    1 / 2,
    3 / 4,
    1 / 3,
    2 / 3,
    1 / 5,
    2 / 5,
    3 / 5,
    4 / 5,
    1 / 6,
    5 / 6,
    1 / 8,
    3 / 8,
    5 / 8,
    7 / 8
  ];
  //-- Local methods section --
  /**
  * Returns the index in the haystack of the string that contains needle e.g.
  * @param {string} needle
  * @param {Array.<string>} haystack
  * @returns {string}
  * @example
  * indexOfArray("b", ["apple", "bannana"]) === 1;
  * indexOfArray("p", ["apple", "bannana"]) === 0;
  * indexOfArray("z", ["apple", "bannana"]) === -1;
  */
  function indexOfArray(needle, haystack) {
    var i, index;
    for (i = 0; i < haystack.length; i++) {
      index = needle.indexOf(haystack[i]);
      if (index > -1) {
        return index;
      }
    }
    return -1;
  }
  /**
  * Finds the fractional part of a price formatted with negative decimals.
  * e.g. 1 234 31 / 64
  * ->   1234 31/64
  * So the last whitespace before the last digit(s) before the fractional char.
  * @param value
  */
  function findFractionalPart(value) {
    var index = -1;
    var divIndex = indexOfArray(value, divisionChars);
    if (divIndex > 0) {
      //-1 not found, 0 means nothing before
      index = divIndex - 1;
      var foundDigit = false;
      while (index >= 0) {
        if (foundDigit && isNaN(parseInt(value.substring(index, index + 1), 10))) {
          break;
        } else if (!isNaN(value.substring(index, index + 1))) {
          foundDigit = true;
        }
        --index;
      }
      if (foundDigit && index < 0) {
        index = 0;
      }
    } else {
      index = indexOfArray(value, fractionChars);
    }
    return index;
  }
  function parseDecimalprice(numberFormatting, s, formatFlags) {
    if (formatFlags.Percentage) {
      s = s.replace(/\s*%\s*$/, '');
    }
    if (!formatFlags.DeciPipsSpaceSeparator && !formatFlags.DeciPipsDecimalSeparator && !formatFlags.DeciPipsFraction) {
      var result = numberFormatting.parse(s);
      if (formatFlags.Percentage) {
        result = result / 100;
      }
      return result;
    }
    return 0;
  }
  function parseFractionalPrice(numberFormatting, s, formatFlags, decimals) {
    var result;
    if (formatFlags.ModernFractions) {
      // special futures
      var separator = _modernFractionsCharacter.getModernFractionsSeparator(numberFormatting);
      var denominator = 1 << decimals;
      var pipIndex = s.indexOf(separator);
      if (pipIndex !== -1) {
        var integerPart = s.substring(0, pipIndex).trim();
        if (integerPart.length > 0) {
          result = numberFormatting.parse(integerPart);
        } else {
          result = 0;
        }
        if (pipIndex + 1 < s.length) {
          var pipPart = numberFormatting.parse(s.substring(pipIndex + 1).trim());
          if (pipPart < denominator) {
            result = result += pipPart / denominator;
          } else {
            result = 0;
          }
        }
      } else {
        result = numberFormatting.parse(s);
      }
    } else {
      var fracIndex = findFractionalPart(s);
      if (fracIndex !== -1 && fracIndex < s.length) {
        var integerPart = s.substring(0, fracIndex).trim();
        result = integerPart.length > 0 ? numberFormatting.parse(integerPart) : 0;
        var fractionalPart = s.substring(fracIndex).trim();
        var isVulgarFraction = false;
        if (fractionalPart.length === 1) {
          var vulgarIndex = fractionChars.indexOf(fractionalPart);
          if (vulgarIndex >= 0) {
            result += fractionCharsValues[vulgarIndex];
            isVulgarFraction = true;
          }
        }
        if (!isVulgarFraction) {
          var divIndex = indexOfArray(fractionalPart, divisionChars);
          if (divIndex !== -1 && divIndex < fractionalPart.length) {
            var numeratorPart = fractionalPart.substring(0, divIndex).trim();
            var denominatorPart = fractionalPart.substring(divIndex + 1).trim();
            var numeratorParsed = parseFloat(numeratorPart);
            var denominatorParsed = parseFloat(denominatorPart);
            if (numeratorParsed < denominatorParsed) {
              var frac = numeratorParsed / denominatorParsed;
              if (result >= 0) {
                result += frac;
              } else {
                result -= frac;
              }
            } else {
              result = 0;
            }
          } else {
            result = 0;
          }
        }
      } else {
        result = parseInt(s, 10);
      }
    }
    return result;
  }
  //-- Exported methods section --
  /**
  * From IitClientStation/Parsing.cs TryParsePrice().
  * Parses a text string to a price value.
  * @param numberFormatting
  * @param str
  * @param decimals
  * @param formatFlags
  * @returns {number} The passed value, 0 if not parsed.
  */
  function parsePrice(numberFormatting, str, decimals, formatFlags) {
    if (str == null) {
      return NaN;
    }
    if (formatFlags) {
      formatFlags = _utilsEnum.toObject(formatFlags);
    } else {
      formatFlags = { None: true };
    }
    if (decimals < 0) {
      throw new Error('This library supports the openapi format specification, so fractions are done with positive decimals and the Fractions or ModernFractions flag');
    }
    var s = String(str).trim();
    //TrimLeadingNumberGroupSeparator
    if (s.substr(0, 1) === numberFormatting.groupSeparator) {
      if (s.length > numberFormatting.groupSeparator.length) {
        s = s.substring(numberFormatting.groupSeparator.length);
      }
    }
    if (!s) {
      //null, undefined, ""
      return 0;
    }
    try {
      if (formatFlags.ModernFractions || formatFlags.Fractions) {
        return parseFractionalPrice(numberFormatting, s, formatFlags, decimals);
      } else {
        return parseDecimalprice(numberFormatting, s, formatFlags);
      }
    } catch (e) {
      return 0;
    }
  }
  //-- Export section --
  exports = parsePrice;
  return exports;
}({}, iit_utils_enum, iit_price_formatting_modern_fractions_character);
iit_number_formatting_parse = function (exports, _utilsString) {
  var NO_BREAK_SPACE_REGEX = /\u00A0/g;
  //-- Local methods section --
  function parseNumberNegativePattern(value, options, tryFallback) {
    var pre = options.negativePre.replace(NO_BREAK_SPACE_REGEX, ' ');
    var post = options.negativePost.replace(NO_BREAK_SPACE_REGEX, ' ');
    value = value.replace(NO_BREAK_SPACE_REGEX, ' ');
    if (_utilsString.startsWith(value, pre) && _utilsString.endsWith(value, post)) {
      return [
        '-',
        value.substr(pre.length, value.length - (pre.length + post.length))
      ];
    }
    if (tryFallback && _utilsString.startsWith(value, '-')) {
      return [
        '-',
        value.substr(1)
      ];
    }
    return [
      '',
      value
    ];
  }
  //-- Exported methods section --
  function parseNumber(value, options) {
    if (value == null) {
      return NaN;
    }
    value = value.trim();
    var signInfo = parseNumberNegativePattern(value, options, true);
    var sign = signInfo[0];
    var num = signInfo[1];
    if (sign === '') {
      sign = '+';
    }
    var exponent;
    var intAndFraction;
    var exponentPos = num.indexOf('e');
    if (exponentPos < 0) {
      exponentPos = num.indexOf('E');
    }
    if (exponentPos < 0) {
      intAndFraction = num;
      exponent = null;
    } else {
      intAndFraction = num.substr(0, exponentPos);
      exponent = num.substr(exponentPos + 1);
    }
    var integer;
    var fraction;
    var decimalPos = intAndFraction.indexOf(options.decimalSeparator);
    if (decimalPos < 0) {
      integer = intAndFraction;
      fraction = null;
    } else {
      integer = intAndFraction.substr(0, decimalPos);
      fraction = intAndFraction.substr(decimalPos + options.decimalSeparator.length);
    }
    integer = integer.split(options.groupSeparator).join('');
    var altNumGroupSeparator = options.groupSeparator.replace(NO_BREAK_SPACE_REGEX, ' ');
    if (options.groupSeparator !== altNumGroupSeparator) {
      integer = integer.split(altNumGroupSeparator).join('');
    }
    var p = sign + integer;
    if (fraction !== null) {
      p += '.' + fraction;
    }
    if (exponent !== null) {
      var expSignInfo = parseNumberNegativePattern(exponent, options);
      if (expSignInfo[0] === '') {
        expSignInfo[0] = '+';
      }
      p += 'e' + expSignInfo[0] + expSignInfo[1];
    }
    if (p.match(/^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/)) {
      return parseFloat(p);
    }
    return NaN;
  }
  //-- Export section --
  exports = parseNumber;
  return exports;
}({}, iit_utils_string);
iit_number_formatting_short_format = function (exports, _format) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
  * @module iit/number-formatting/short-format
  * @ignore
  */
  var _formatNumber = _interopRequire(_format);
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
  * Converts from a number to a string like "1k" or "100m".
  * @param num
  * @param options
  * @returns {string} Returns 0 when dates are equal. -1 when date1 less than date2. 1 when date1 greater than date2.
  */
  function shortFormat(num, options) {
    var numberSize = String(num).length,
      // Unfortunately Logs are too inaccurate - Math.round(Math.log(num) / Math.LN10)
      boundary;
    if (numberSize >= 5) {
      //bigger than 10,000
      boundary = Math.pow(10, numberSize) - Math.pow(10, numberSize - 3) / 2;
      //e.g. 100,000 -> 9,9950 - closer to 100k than 99.9k
      if (num >= boundary) {
        numberSize++;
      }
    }
    if (numberSize >= 7) {
      // > 999500
      return _formatNumber(num / 1000000, 2 - (numberSize - 7), options) + 'm';
    }
    if (numberSize >= 5) {
      // > 9995 => 10.2k
      return _formatNumber(num / 1000, 2 - (numberSize - 4), options) + 'k';
    }
    return _formatNumber(num, 0, options);
  }
  //-- Export section --
  exports = shortFormat;
  return exports;
}({}, iit_number_formatting_format);
iit_number_formatting_number_formatting = function (exports, _format, _parse, _shortFormat, _utilsObject) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
   * @module iit/number-formatting/number-formatting
   * @ignore
   */
  var _formatNumber = _interopRequire(_format);
  var _parseNumber = _interopRequire(_parse);
  var _shortFormat2 = _interopRequire(_shortFormat);
  //-- Local variables section --
  var defaultOptions = {
    groupSizes: [3],
    groupSeparator: ',',
    decimalSeparator: '.',
    negativePattern: '-{0}'
  };
  var numberOfZerosRx = /0+$/;
  //-- Local methods section --
  //-- Exported methods section --
  /**
   * A class which does number formatting and parsing.
   * @class
   * @alias iit.NumberFormatting
   * @param {Object} [options] - Number locale options.
   * @param {Array.<number>} [options.groupSizes=[3]] - The group sizes for the number. E.g. [3] would be thousands seperator and produce 123.456.789,00 where as [2,3] would be "12.34.56.789,00".
   * @param {string} [options.groupSeparator=","] - The character used for group separation E.g. '.' in Danish.
   * @param {string} [options.decimalSeparator="."] - The character used for decimal searation E.g.',' in Danish.
   * @param {string} [options.negativePattern="-{0}"] - The negative pattern to use with '{0}' as the placeholder for the non-negative number.
   */
  function NumberFormatting(options) {
    _utilsObject.extend(this, defaultOptions, options);
    this.negativePre = this.negativePattern.substr(0, this.negativePattern.indexOf('{'));
    this.negativePost = this.negativePattern.substr(this.negativePattern.indexOf('}') + 1);
  }
  /**
   * Parses a localised string into a number.
   * @param {string} value - The number to parse.
   * @returns {number} parsed value
   */
  NumberFormatting.prototype.parse = function (value) {
    return _parseNumber(value, this);
  };
  /**
   * Formats a number into a localised string.
   * @param {number} num - The number to format.
   * @param {number} [decimals] - The number of decimals to display after the decimal point.
   *                              If undefined then the number is formatted with however many decimal places it needs to display the number (upto 8).
   * @returns {string}
   */
  NumberFormatting.prototype.format = function (num, decimals) {
    if (decimals === undefined || decimals === null) {
      decimals = this.getActualDecimals(num);
    }
    return _formatNumber(num, decimals, this);
  };
  /**
   * Formats the number without rounding. e.g. 1.12 formatted with 1 decimal place is "1.12".
   * @param {number} num - The number to format
   * @param {number} [minDecimals] - The minimum number of decimals to display after the decimal point.
   * @param {number} [maxDecimals] - The maximum number of decimals to display after the decimal point.
   * @returns {string}
   */
  NumberFormatting.prototype.formatNoRounding = function (num, minDecimals, maxDecimals) {
    if (!minDecimals) {
      minDecimals = 0;
    }
    if (!maxDecimals) {
      maxDecimals = 8;
    }
    return _formatNumber(num, Math.min(maxDecimals, Math.max(minDecimals, this.getActualDecimals(num))), this);
  };
  /**
   * Formats a number into a short format, e.g. 10.000 becomes 10k.
   * @param {number} number
   * @returns {string}
   */
  NumberFormatting.prototype.shortFormat = function (number) {
    return _shortFormat2(number, this);
  };
  /**
   * Returns the actual number of decimals that a number has.
   * @param number
   * @returns {number}
   */
  NumberFormatting.prototype.getActualDecimals = function (number) {
    number = Math.abs(number);
    return (number - Math.floor(number)).toFixed(8).substring(2, 10).replace(numberOfZerosRx, '').length;
  };
  //-- Export section --
  exports = NumberFormatting;
  return exports;
}({}, iit_number_formatting_format, iit_number_formatting_parse, iit_number_formatting_short_format, iit_utils_object);
iit_price_formatting_valid_characters = function (exports, _utilsObject, _modernFractionsCharacter) {
  exports.__esModule = true;
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
  * Returns characters valid for entering prices.
  * @param {NumberFormatting} numberFormatting
  * @param {{integer: boolean, negative: boolean, price: boolean, numbers: boolean}} includeScenarios - The scenarios to get prices for.
  * @returns {string}
  */
  function getValidPriceCharacters(numberFormatting, includeScenarios) {
    var characters;
    if (!includeScenarios) {
      includeScenarios = {};
    }
    characters = numberFormatting.groupSeparator;
    if (characters.charCodeAt(0) === 160) {
      // if non breaking space
      characters += ' ';  // add normal space
    }
    if (!includeScenarios.integer) {
      characters += numberFormatting.decimalSeparator;
    }
    if (includeScenarios.negative) {
      characters += numberFormatting.negativePattern.replace('{0}', '');
    }
    if (includeScenarios.price) {
      characters += _modernFractionsCharacter.getModernFractionsSeparator(numberFormatting) + ' /' + String.fromCharCode(160);
    }
    if (includeScenarios.numbers !== false) {
      characters += '0123456789';
    }
    return characters;
  }
  /**
  * Returns regex for validating characters for entering prices.
  * @param {NumberFormatting} numberFormatting
  * @param {{integer: boolean, negative: boolean, price: boolean, numbers: boolean}} includeScenarios - The scenarios to get prices for.
  * @returns {RegExp}
  */
  function getValidPriceRegex(numberFormatting, includeScenarios) {
    var valid, regex = '', i;
    valid = getValidPriceCharacters(numberFormatting, _utilsObject.extend({}, includeScenarios || {}, { numbers: false }));
    for (i = 0; i < valid.length; i++) {
      regex += '\\x' + valid.charCodeAt(i).toString(16);
    }
    return new RegExp('^[\\d' + regex + ']+$');
  }
  //-- Export section --
  exports.getValidPriceCharacters = getValidPriceCharacters;
  exports.getValidPriceRegex = getValidPriceRegex;
  return exports;
}({}, iit_utils_object, iit_price_formatting_modern_fractions_character);
iit_price_formatting_price_formatting = function (exports, _format, _parse, _numberFormattingNumberFormatting, _utilsString, _validCharacters, _modernFractionsCharacter) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
  * This module defines the Prices class.
  * @module iit/price-formatting/price-formatting
  * @ignore
  */
  var _formatPrice = _interopRequire(_format);
  var _parsePrice = _interopRequire(_parse);
  var _NumberFormatting = _interopRequire(_numberFormattingNumberFormatting);
  //-- Local variables section --
  //-- Local methods section --
  //-- Exported methods section --
  /**
   * Constructs a new PriceFormatting instance that can be used to format and parse prices.
   * @class
   * @alias iit.PriceFormatting
   * @param {Object} [numberOptions] - See {@link iit.Numbers} for possible number options.
   * @example
   * var priceFormatting = new iit.PriceFormatting({decimalSeparator: ','});
   * var formattedPrice = priceFormatting.format(1.23, 2);
   */
  function PriceFormatting(numberOptions) {
    this.numberFormatting = new _NumberFormatting(numberOptions);
  }
  /**
   * Formats a number as a price string.
   * @param {number} value - Number to format.
   * @param {number} decimals  - The number of decimal places to display.
   * @param {string|Object.<string, boolean>} formatFlags - The format flags to use when formatting - see {@link iit.priceFormatOptions}.
   * @param {number} [numeratorDecimals=0] - The number of decimal places of the numerator in the case of fractions and modern fractions.
   * @returns {string} The formatting string.
   */
  PriceFormatting.prototype.format = function (value, decimals, formatFlags, numeratorDecimals) {
    var parts = _formatPrice(this.numberFormatting, value, decimals, formatFlags, numeratorDecimals);
    return parts.Pre + parts.First + parts.Pips + parts.DeciPips + parts.Post;
  };
  /**
   * An object representing a price that has been split up into parts.
   * @typedef {Object} iit.PriceParts
   * @property {string} Pre - Anything appearing before the price, like the negative symbol "-".
   * @property {string} Post - Anything appearing after the price, like in some cultures the negative symbol "-".
   * @property {string} First - The first part of the price, e.g. "1.98".
   * @property {string} Pips - The pips for the price, if present e.g. "76".
   * @property {string} DeciPips - The deci-pips for the price if present e.g. "7".
   */
  /**
   * Formats a number as price parts.
   * @param {number} value - Number to format.
   * @param {number} decimals - The number of decimal places to display.
   * @param {string|Object.<string, boolean>} formatFlags - The format flags to use when formatting - see {@link iit.priceFormatOptions}.
   * @param {number} [numeratorDecimals=0] - The number of decimal places of the numerator in the case of fractions and modern fractions.
   * @returns {iit.PriceParts} formatted price parts.
   */
  PriceFormatting.prototype.formatPriceParts = function (value, decimals, formatFlags, numeratorDecimals) {
    return _formatPrice(this.numberFormatting, value, decimals, formatFlags, numeratorDecimals);
  };
  /**
   * Formats a number using a template.
   * @param {number} value - Number to format.
   * @param {number} decimals - The number of decimal places to display.
   * @param {string|Object.<string, boolean>} formatFlags - The format flags to use when formatting - see {@link iit.priceFormatOptions}.
   * @param {number} [numeratorDecimals=0] - The number of decimal places of the numerator in the case of fractions and modern fractions.
   * @param {string} [templateStr="{Pre}{First}{Pips}<small>{DeciPips}</small>{Post}"] - The template string to use.
   * @returns {string} A formatted string.
   */
  PriceFormatting.prototype.formatTemplated = function (value, decimals, formatFlags, numeratorDecimals, templateStr) {
    if (!templateStr) {
      templateStr = '{Pre}{First}{Pips}<small>{DeciPips}</small>{Post}';
    }
    var parts = _formatPrice(this.numberFormatting, value, decimals, formatFlags, numeratorDecimals);
    return _utilsString.format(templateStr, parts);
  };
  /**
   * Parses a string into a number.
   * @param {string} str - The number to parse.
   * @param {number} decimals - The number of decimals.
   * @param {string|Object.<string, boolean>} formatFlags - The format flags to use when parsing - see {@link iit.priceFormatOptions}.
   * @returns {number}
   */
  PriceFormatting.prototype.parse = function (str, decimals, formatFlags) {
    return _parsePrice(this.numberFormatting, str, decimals, formatFlags);
  };
  /**
   * Returns characters valid for entering prices.
   * @param {{integer: boolean, negative: boolean, price: boolean, numbers: boolean}} includeScenarios - The scenarios to get prices for.
   * @returns {string}
   */
  PriceFormatting.prototype.getValidPriceCharacters = function (includeScenarios) {
    return _validCharacters.getValidPriceCharacters(this.numberFormatting, includeScenarios);
  };
  /**
   * Returns regex for validating characters for entering prices.
   * @param {{integer: boolean, negative: boolean, price: boolean, numbers: boolean}} includeScenarios - The scenarios to get prices for.
   * @returns {RegExp}
   */
  PriceFormatting.prototype.getValidPriceRegex = function (includeScenarios) {
    return _validCharacters.getValidPriceRegex(this.numberFormatting, includeScenarios);
  };
  /**
   * Returns the character that should be used as the modern fractions seperator
   * @returns {String}
   */
  PriceFormatting.prototype.getModernFractionsSeparator = function () {
    return _modernFractionsCharacter.getModernFractionsSeparator(this.numberFormatting);
  };
  //-- Export section --
  exports = PriceFormatting;
  return exports;
}({}, iit_price_formatting_format, iit_price_formatting_parse, iit_number_formatting_number_formatting, iit_utils_string, iit_price_formatting_valid_characters, iit_price_formatting_modern_fractions_character);
iit_price_formatting_format_options = function (exports, _utilsEnum) {
  var PriceFormatOptions = _utilsEnum.makeDefinition([
    /** @member {string} iit.priceFormatOptions.None - Use only specified (number of decimals/fraction size).*/
    'None',
    /** @member {string} iit.priceFormatOptions.AdjustFractions - Pad fractional formats with spaces, e.g. "7/128" -> "  7/128"
     Only used with fractional formats (decimals &lt; 0).*/
    'AdjustFractions',
    /** @member {string} iit.priceFormatOptions.IncludeZeroFractions - Include fractions that are zero, e.g. "42" -&gt; "42 0/8"
     Only used with fractional formats (decimals &lt; 0). */
    'IncludeZeroFractions',
    /** @member {string} iit.priceFormatOptions.ModernFractions - Special US Bonds futures fractional format (1/32s without nominator).
    1/32 fractional (decimals: -5) or with 1/2 or 1/4 of 1/32 extra precison (decimals: -6, -7)
    e.g. 102.9140625 == 102 29/32 + 1/128 -&gt; "102'29.25"
    Only used with fractional formats (decimals &lt; 0).*/
    'ModernFractions',
    /** @member {string} iit.priceFormatOptions.Percentage - Show as a percentage. */
    'Percentage',
    /** @member {string} iit.priceFormatOptions.Fractions - Show as a fraction */
    'Fractions',
    //CONSIDER: Adding support for using normal spaces instead of no-break spaces
    //NormalSpaces
    /** @member {string} iit.priceFormatOptions.AllowDecimalPips - Use digits for deci/half-pips. */
    'AllowDecimalPips',
    /** @member {string} iit.priceFormatOptions.DeciPipsSpaceSeparator - Use a space as separator between pips and deci-pips. */
    'DeciPipsSpaceSeparator',
    /** @member {string} iit.priceFormatOptions.DeciPipsDecimalSeparator - Use culture specific decimal separator as separator.
     Only used with AllowDecimalPips. */
    'DeciPipsDecimalSeparator',
    /** @member {string} iit.priceFormatOptions.DeciPipsFraction - Use '1/2' fraction character for half-pips. */
    'DeciPipsFraction',
    /** @member {string} iit.priceFormatOptions.DeciPipsSpaceForZero - Use a space instead of zero.
     Only used with DeciPipsFraction. */
    'DeciPipsSpaceForZero',
    /** @member {string} iit.priceFormatOptions.NoRounding - Indicates that no rounding should be done - that decimals should be treated as a max decimals. */
    'NoRounding'
  ]);
  // The following are currently unused, but as open api expands, they may be required in the future.
  // They are aggregate definitions
  /* DeciPipsFractionOrSpace Use '1/2' or ' ' (no-break Space) for half-pips. */
  //"DeciPipsFractionOrSpace": [PriceFormatOptions.DeciPipsFraction, PriceFormatOptions.DeciPipsSpaceForZero],
  /* AllowDecimalPipsWithSpaceSeparator Use digits for deci-pips with a (non-break) space as separator between pips and deci-pips. */
  //"AllowDecimalPipsWithSpaceSeparator": [PriceFormatOptions.DeciPipsSpaceSeparator, PriceFormatOptions.AllowDecimalPips],
  /* AllowDecimalPipsWithDecimalSeparator Use digits for deci-pips with a decimal separator between pips and deci-pips. */
  //"AllowDecimalPipsWithDecimalSeparator": [PriceFormatOptions.DeciPipsDecimalSeparator, PriceFormatOptions.AllowDecimalPips]
  //-- Export section --
  exports = PriceFormatOptions;
  return exports;
}({}, iit_utils_enum);
iit_openapi_batch_util = function (exports, _log) {
  exports.__esModule = true;
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
  * @module iit/openapi/batch-util
  * @ignore
  */
  var _log2 = _interopRequire(_log);
  //-- Local variables section --
  var requestRx = /X-Request-Id: ([0-9]+)/;
  var httpCodeRx = /HTTP\/1.1 ([0-9]+)/;
  var LOG_AREA = 'batch';
  //-- Local methods section --
  //-- Exported methods section --
  /**
  * Utilities to build and parse batch requests
  * @namespace iit.openapi.batchUtil
  */
  /**
  * Parses the response from a batch call.
  * @name iit.openapi.batchUtil.parse
  * @param {string} responseText
  * @returns {Array.<{status:string, response: Object}>} An array of responses, in the position of the response id's.
  */
  function parse(responseText) {
    if (!responseText) {
      throw new Error('Required Parameter: responseText in batch parse');
    }
    var lines = responseText.split('\r\n');
    var responseBoundary = lines[0];
    var currentData = null;
    var requestId = null;
    var responseData = [];
    for (var i = 0, l = lines.length; i < l; i++) {
      var line = lines[i];
      if (line.length) {
        if (!responseData[requestId]) {
          requestId = line.match(requestRx);
          if (requestId) {
            requestId = parseInt(requestId[1], 10);
            responseData[requestId] = {};
          }
        }
        if (line.indexOf(responseBoundary) === 0) {
          if (currentData) {
            requestId = requestId === null ? responseData.length : requestId;
            responseData[requestId] = currentData;
          }
          requestId = null;
          currentData = {};
        } else if (currentData) {
          if (!currentData.status) {
            var statusMatch = line.match(httpCodeRx);
            if (statusMatch) {
              // change the status to be a number to match fetch
              currentData.status = Number(statusMatch[1]);
            }
          } else if (!currentData.response) {
            var firstCharacter = line.charAt(0);
            if (firstCharacter === '{' || firstCharacter === '[') {
              try {
                currentData.response = JSON.parse(line);
              } catch (ex) {
                _log2.warning(LOG_AREA, 'Unexpected exception parsing json. Ignoring.', ex);
              }
            }
          }
        }
      }
    }
    return responseData;
  }
  /**
  * Builds up a string of the data for a batch request.
  * @name iit.openapi.batchUtil.build
  * @param {Array.<{method: string, headers: ?Object.<string, string>, url: string, data: ?string}>} subRequests - The sub requests of the batch.
  * @param {string} boundary - The boundary identifier. This should be a GUID.
  * @param {string} authToken - The authentication token.
  * @param {string} host - The host of the sender.
  */
  function build(subRequests, boundary, authToken, host) {
    if (!subRequests || !boundary || !authToken || !host) {
      throw new Error('Missing required parameters: batch build requires all 4 parameters');
    }
    var body = [];
    for (var i = 0, l = subRequests.length; i < l; i++) {
      var request = subRequests[i];
      var method = request.method.toUpperCase();
      body.push('--' + boundary);
      body.push('Content-Type: application/http; msgtype=request', '');
      body.push(method + ' ' + request.url + ' HTTP/1.1');
      body.push('X-Request-Id: ' + i);
      if (request.headers) {
        for (var header in request.headers) {
          if (request.headers.hasOwnProperty(header)) {
            body.push(header + ': ' + request.headers[header]);
          }
        }
      }
      body.push('Authorization' + ': ' + authToken);
      /* Don't care about content type for requests that have no body. */
      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        body.push('Content-Type: application/json; charset=utf-8');
      }
      body.push('Host: ' + host, '');
      body.push(request.data || '');
    }
    body.push('--' + boundary + '--', '');
    return body.join('\r\n');
  }
  //-- Export section --
  exports.parse = parse;
  exports.build = build;
  return exports;
}({}, iit_log);
iit_openapi_transport_core = function (exports, _utilsString, _utilsFetch) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  var _fetch = _interopRequire(_utilsFetch);
  //-- Local variables section --
  var DEFAULT_CACHE = true;
  //-- Local methods section --
  /**
   * Creates a transport call method (e.g. get/post/put/delete).
   * @param method
   */
  function generateTransportCall(method) {
    return function (serviceGroup, urlTemplate, templateArgs, options) {
      var url, body;
      var headers = {};
      var cache = this.defaultCache;
      var queryParams;
      if (!serviceGroup || !urlTemplate) {
        throw new Error('Transport calls require a service group and a URL');
      }
      if (options) {
        if (options.headers) {
          headers = options.headers;
        }
        body = options.body;
        if (typeof options.cache === 'boolean') {
          cache = options.cache;
        }
        queryParams = options.queryParams;
      }
      url = _utilsString.formatUrl(urlTemplate, templateArgs, queryParams);
      if (this.language) {
        if (!headers.Language) {
          headers.Language = this.language;
        }
      }
      return this.fetch(method, this.baseUrl + '/' + serviceGroup + '/' + url, {
        body: body,
        headers: headers,
        cache: cache,
        useXHttpMethodOverride: this.useXHttpMethodOverride
      });
    };
  }
  //-- Exported methods section --
  /**
   * Handles core transport to the openapi rest service. This is little more than a thin layer on top of fetch, adding
   * cache breaking, language header adding and a convenient mechanism for making transport calls.
   * @class
   * @alias iit.openapi.TransportCore
   * @param {string} baseUrl - The base url used for all open api requests. This should be an absolute URL.
   * @param {object} [options]
   * @param {string} [options.language] - The language sent as a header if not overridden.
   * @param {boolean} [options.defaultCache=true] - Sets the default caching behaviour if not overridden on a call.
   */
  function Transport(baseUrl, options) {
    if (!baseUrl) {
      throw new Error('Missing required parameter: baseUrl');
    }
    this.baseUrl = baseUrl;
    this.language = options && options.language;
    this.defaultCache = options && typeof options.defaultCache === 'boolean' ? options.defaultCache : DEFAULT_CACHE;
  }
  /**
   * Does a get request against open api.
   * @function
   * @param {string} serviceGroup - The servicegroup to make the call on
   * @param {string} urlTemplate - The url path template which follows on from the serviceGroup to describe the path for the request.
   * @param {Object} [templateArgs] - An object containing fields matched to the template.
   * @param {Object} [options]
   * @param {Object.<string:string>} [options.headers] - A object map of headers, header key to header value
   * @param {boolean} [options.cache] - Override the default cache setting for this call.
   * 						If cache is false then a cache control "nocache" header will be added.
   * 						If cache is false and the method is get then a cache breaker will be added to the url.
   * @param {Object.<string:string>} [options.queryParams] - An object map of query params which will be added to
   *						the URL.
   * @returns {Promise} - A promise which will be resolved when a 2xx response is received, otherwise it will be failed.
   * 					  The result in the case of success will be an object with a status (number) and a response property
   * 					  which will be an object if the call returned with json, otherwise it will be text.
   * 					  In the case of failure, there may be no result or there may be a result with a status or
   * 					  there may be a result with status and a response, depending on what went wrong.
   * @example
   * // The call
   * var promise = transport.get("root", "path/to/{accountKey}", { accountKey: "123" }, {
   * 						headers: { "my-header": "header-value" },
   *	 					cache: false,
   *						queryParams: {a: b}});
   *
   * // makes a call to path/to/123?a=b
   * // success
   * promise.then(function(result) {
   * 		console.log("The status is " + Number(result.status));
   * 		console.log("My result is ...");
   *		console.dir(result.response);
   * });
   *
   * // failure
   * promise.catch(function(result) {
   * 		if (result) {
   * 			if (result.status) {
   * 				console.log("a call was made but returned status " + Number(result.status));
   * 				if (result.response) {
   * 					console.log("Open API's response was...");
   * 					console.dir(result.response);
   * 				}
   *	 		} else {
   *	 			console.log("result could be an exception");
   *	 		}
   * 		} else {
   * 			console.log("an unknown error occurred");
   * 		}
   * });
   */
  Transport.prototype.get = generateTransportCall('GET');
  /**
   * Does a put request against open api.
   * @function
   * @param {string} serviceGroup - The servicegroup to make the call on
   * @param {string} urlTemplate - The url path template which follows on from the serviceGroup to describe the path for the request.
   * @param {Object} [templateArgs] - An object containing fields matched to the template.
   * @param {Object} [options]
   * @param {Object.<string:string>} [options.headers] - A object map of headers, header key to header value
   * @param {Object|string} [options.body] - The body to send in the request. If it is an object it will be json.stringified.
   * @param {boolean} [options.cache] - Override the default cache setting for this call.
   * 						If cache is false then a cache control "nocache" header will be added.
   * 						If cache is false and the method is get then a cache breaker will be added to the url.
   * @param {Object.<string:string>} [options.queryParams] - An object map of query params which will be added to
   *						the URL.
   * @returns {Promise} - A promise which will be resolved when a 2xx response is received, otherwise it will be failed.
   * 					  The result in the case of success will be an object with a status (number) and a response property
   * 					  which will be an object if the call returned with json, otherwise it will be text.
   * 					  In the case of failure, there may be no result or there may be a result with a status or
   * 					  there may be a result with status and a response, depending on what went wrong.
   * @example
   * // The call
   * var promise = transport.put("root", "path/to/{accountKey}", { accountKey: "123" }, {
   * 						headers: { "my-header": "header-value" },
   * 						body: { "thing": "to-put" },
   *	 					cache: false,
   *						queryParams: {a: b}});
   *
   * // makes a call to path/to/123?a=b
   * // success
   * promise.then(function(result) {
   * 		console.log("The status is " + Number(result.status));
   * 		console.log("My result is ...");
   *		console.dir(result.response);
   * });
   *
   * // failure
   * promise.catch(function(result) {
   * 		if (result) {
   * 			if (result.status) {
   * 				console.log("a call was made but returned status " + Number(result.status));
   * 				if (result.response) {
   * 					console.log("Open API's response was...");
   * 					console.dir(result.response);
   * 				}
   *	 		} else {
   *	 			console.log("result could be an exception");
   *	 		}
   * 		} else {
   * 			console.log("an unknown error occurred");
   * 		}
   * });
   */
  Transport.prototype.put = generateTransportCall('PUT');
  /**
   * Does a delete request against open api.
   * @function
   * @param {string} serviceGroup - The servicegroup to make the call on
   * @param {string} urlTemplate - The url path template which follows on from the serviceGroup to describe the path for the request.
   * @param {Object} [templateArgs] - An object containing fields matched to the template.
   * @param {Object} [options]
   * @param {Object.<string:string>} [options.headers] - A object map of headers, header key to header value
   * @param {boolean} [options.cache] - Override the default cache setting for this call.
   * 						If cache is false then a cache control "nocache" header will be added.
   * 						If cache is false and the method is get then a cache breaker will be added to the url.
   * @param {Object.<string:string>} [options.queryParams] - An object map of query params which will be added to
   *						the URL.
   * @returns {Promise} - A promise which will be resolved when a 2xx response is received, otherwise it will be failed.
   * 					  The result in the case of success will be an object with a status (number) and a response property
   * 					  which will be an object if the call returned with json, otherwise it will be text.
   * 					  In the case of failure, there may be no result or there may be a result with a status or
   * 					  there may be a result with status and a response, depending on what went wrong.
   * @example
   * // The call
   * var promise = transport.delete("root", "path/to/{accountKey}", { accountKey: "123" }, {
   * 						headers: { "my-header": "header-value" },
   *	 					cache: false,
   *						queryParams: {a: b}});
   *
   * // makes a call to path/to/123?a=b
   * // success
   * promise.then(function(result) {
   * 		console.log("The status is " + Number(result.status));
   * 		console.log("My result is ...");
   *		console.dir(result.response);
   * });
   *
   * // failure
   * promise.catch(function(result) {
   * 		if (result) {
   * 			if (result.status) {
   * 				console.log("a call was made but returned status " + Number(result.status));
   * 				if (result.response) {
   * 					console.log("Open API's response was...");
   * 					console.dir(result.response);
   * 				}
   *	 		} else {
   *	 			console.log("result could be an exception");
   *	 		}
   * 		} else {
   * 			console.log("an unknown error occurred");
   * 		}
   * });
   */
  Transport.prototype.delete = generateTransportCall('DELETE');
  /**
   * Does a post request against open api.
   * @function
   * @param {string} serviceGroup - The servicegroup to make the call on
   * @param {string} urlTemplate - The url path template which follows on from the serviceGroup to describe the path for the request.
   * @param {Object} [templateArgs] - An object containing fields matched to the template.
   * @param {Object} [options]
   * @param {Object.<string:string>} [options.headers] - A object map of headers, header key to header value
   * @param {Object|string} [options.body] - The body to send in the request. If it is an object it will be json.stringified.
   * @param {boolean} [options.cache] - Override the default cache setting for this call.
   * 						If cache is false then a cache control "nocache" header will be added.
   * 						If cache is false and the method is get then a cache breaker will be added to the url.
   * @param {Object.<string:string>} [options.queryParams] - An object map of query params which will be added to
   *						the URL.
   * @returns {Promise} - A promise which will be resolved when a 2xx response is received, otherwise it will be failed.
   * 					  The result in the case of success will be an object with a status (number) and a response property
   * 					  which will be an object if the call returned with json, otherwise it will be text.
   * 					  In the case of failure, there may be no result or there may be a result with a status or
   * 					  there may be a result with status and a response, depending on what went wrong.
   * @example
   * // The call
   * var promise = transport.post("root", "path/to/{accountKey}", { accountKey: "123" }, {
   * 						headers: { "my-header": "header-value" },
   * 						body: { "thing": "to-post" },
   *	 					cache: false,
   *						queryParams: {a: b}});
   *
   * // makes a call to path/to/123?a=b
   * // success
   * promise.then(function(result) {
   * 		console.log("The status is " + Number(result.status));
   * 		console.log("My result is ...");
   *		console.dir(result.response);
   * });
   *
   * // failure
   * promise.catch(function(result) {
   * 		if (result) {
   * 			if (result.status) {
   * 				console.log("a call was made but returned status " + Number(result.status));
   * 				if (result.response) {
   * 					console.log("Open API's response was...");
   * 					console.dir(result.response);
   * 				}
   *	 		} else {
   *	 			console.log("result could be an exception");
   *	 		}
   * 		} else {
   * 			console.log("an unknown error occurred");
   * 		}
   * });
   */
  Transport.prototype.post = generateTransportCall('POST');
  /**
   * Does a patch request against open api.
   * @function
   * @param {string} serviceGroup - The servicegroup to make the call on
   * @param {string} urlTemplate - The url path template which follows on from the serviceGroup to describe the path for the request.
   * @param {Object} [templateArgs] - An object containing fields matched to the template.
   * @param {Object} [options]
   * @param {Object.<string:string>} [options.headers] - A object map of headers, header key to header value
   * @param {Object|string} [options.body] - The body to send in the request. If it is an object it will be json.stringified.
   * @param {boolean} [options.cache] - Override the default cache setting for this call.
   * 						If cache is false then a cache control "nocache" header will be added.
   * 						If cache is false and the method is get then a cache breaker will be added to the url.
   * @param {Object.<string:string>} [options.queryParams] - An object map of query params which will be added to
   *						the URL.
   * @returns {Promise}  - A promise which will be resolved when a 2xx response is received, otherwise it will be failed.
   * 					  The result in the case of success will be an object with a status (number) and a response property
   * 					  which will be an object if the call returned with json, otherwise it will be text.
   * 					  In the case of failure, there may be no result or there may be a result with a status or
   * 					  there may be a result with status and a response, depending on what went wrong.
   * @example
   * // The call
   * var promise = transport.patch("root", "path/to/{accountKey}", { accountKey: "123" }, {
   * 						headers: { "my-header": "header-value" },
   * 						body: { "thing": "to-patch" },
   *	 					cache: false,
   *						queryParams: {a: b}});
   *
   * // makes a call to path/to/123?a=b
   * // success
   * promise.then(function(result) {
   * 		console.log("The status is " + Number(result.status));
   * 		console.log("My result is ...");
   *		console.dir(result.response);
   * });
   *
   * // failure
   * promise.catch(function(result) {
   * 		if (result) {
   * 			if (result.status) {
   * 				console.log("a call was made but returned status " + Number(result.status));
   * 				if (result.response) {
   * 					console.log("Open API's response was...");
   * 					console.dir(result.response);
   * 				}
   *	 		} else {
   *	 			console.log("result could be an exception");
   *	 		}
   * 		} else {
   * 			console.log("an unknown error occurred");
   * 		}
   * });
   */
  Transport.prototype.patch = generateTransportCall('PATCH');
  /**
   * Sets whether to replace put/patch/delete calls with a post that has
   * a X-HTTP-Method-Override header
   * @param {boolean} useXHttpMethodOverride
   */
  Transport.prototype.setUseXHttpMethodOverride = function (useXHttpMethodOverride) {
    this.useXHttpMethodOverride = useXHttpMethodOverride;
  };
  /**
   * Performs a fetch and processes the response.
   * @deprecated Use {@link iit.utils.fetch}
   */
  Transport.prototype.fetch = _fetch;
  /**
   * dispose anything.
   */
  Transport.prototype.dispose = function () {
  };
  //-- Export section --
  exports = Transport;
  return exports;
}({}, iit_utils_string, iit_utils_fetch);
iit_openapi_transport_auth = function (exports, _core, _microEmitter, _log, _utilsString) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
  * @module iit/openapi/transport/auth
  * @ignore
  */
  //-- Local variables section --
  var _TransportCore = _interopRequire(_core);
  var _emitter = _interopRequire(_microEmitter);
  var _log2 = _interopRequire(_log);
  var LOG_AREA = 'TransportAuth';
  var DEFAULT_RETRY_DELAY_MS = 1000;
  var DEFAULT_MAX_RETRY_COUNT = 5;
  var DEFAULT_TOKEN_REFRESH_METHOD = 'POST';
  var DEFAULT_TOKEN_REFRESH_PROPERTY_NAME_TOKEN = 'token';
  var DEFAULT_TOKEN_REFRESH_PROPERTY_NAME_EXPIRES = 'expiry';
  var DEFAULT_TOKEN_REFRESH_MARGIN_MS = 0;
  var DEFAULT_TOKEN_REFRESH_CREDDENTIALS = "include";
  var TOKEN_BEARER = 'Bearer ';
  var STATE_WAITING = 1;
  var STATE_REFRESHING = 2;
  //-- Local methods section --
  /**
  * Returns the absolute timestamp of the expiry based on the current date and time.
  * @param {number|string} relativeExpiry - The time in seconds until the token expires.
  */
  function toAbsoluteTokenExpiry(relativeExpiry) {
    relativeExpiry = parseInt(relativeExpiry, 10);
    return new Date().getTime() + relativeExpiry * 1000;
  }
  /**
  * Triggered when the token has changed.
  * @param token
  * @param expiry
  */
  function onTokenChanged(token, expiry) {
    var elapse = expiry - new Date().getTime();
    // If in the past try anyway to refresh token - page can have reload and normallly we have some margin for refreshing the token server side
    if (elapse <= 0) {
      this.isAuthorised = false;
      this.refreshOpenApiToken();
    } else {
      elapse -= this.tokenRefreshMarginMs;
      if (elapse < 0) {
        _log2.warn(LOG_AREA, 'token has changed, but expiry is less than the token refresh margin.', {
          expiry: expiry,
          tokenRefreshMarginMs: this.tokenRefreshMarginMs
        });
        elapse = 0;
      }
      this.isAuthorised = true;
      this.tokenRefreshTimer = setTimeout(this.refreshOpenApiToken.bind(this), elapse);
    }
  }
  function onApiTokenReceived(result) {
    this.state = STATE_WAITING;
    this.retries = 0;
    if (!result.response || !result.response[this.tokenRefreshPropertyNameToken]) {
      _log2.warn(LOG_AREA, 'Token refresh succeeded but no new token was present in response', result);
      return;
    }
    var token = result.response[this.tokenRefreshPropertyNameToken];
    var expiry = toAbsoluteTokenExpiry(result.response[this.tokenRefreshPropertyNameExpires]);
    this.auth.set(token, expiry);
    this.trigger(this.EVENT_TOKEN_RECEIVED, token, expiry);
  }
  function onApiTokenReceiveFail(result) {
    this.state = STATE_WAITING;
    _log2.warn(LOG_AREA, 'Token refresh failed', result);
    this.trigger(this.EVENT_TOKEN_REFRESH_FAILED);
    if (this.retries < this.maxRetryCount) {
      this.retries++;
      this.tokenRefreshTimer = setTimeout(this.refreshOpenApiToken.bind(this), this.retryDelayMs);
    }
  }
  function getToken(url) {
    this.state = STATE_REFRESHING;
    var headers = this.tokenRefreshHeaders || {};
    headers['Content-Type'] = headers['Content-Type'] || 'JSON';
    this.transport.fetch(this.tokenRefreshMethod, url, {
      headers: headers,
      cache: false,
      credentials: this.tokenRefreshCredentials
      //credentials: 'include'
    }).then(onApiTokenReceived.bind(this), onApiTokenReceiveFail.bind(this));
  }
  function Auth(initialToken, initialExpiry, onChange) {
    function addBearer(newToken) {
      if (newToken && !_utilsString.startsWith(newToken, TOKEN_BEARER, false)) {
        newToken = TOKEN_BEARER + newToken;
      }
      return newToken;
    }
    var token = addBearer(initialToken);
    var expiry = initialExpiry;
    this.getToken = function () {
      return token;
    };
    this.getExpiry = function () {
      return expiry;
    };
    this.set = function (newToken, newExpiry) {
      token = addBearer(newToken);
      expiry = newExpiry;
      onChange(token, expiry);
    };
  }
  function makeTransportMethod(method) {
    return function (serviceGroup, urlTemplate, templateArgs, options) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Authorization = this.auth.getToken();
      return this.transport[method](serviceGroup, urlTemplate, templateArgs, options).catch(onTransportError.bind(this));
    };
  }
  function onTransportError(result) {
    if (result && result.status === 401) {
      if (this.auth.getExpiry() > Date.now()) {
        // we received an auth failed before the expiry time
        _log2.info(LOG_AREA, 'Call failed due to authentication.', result);
        this.onTokenInvalid();
      } else {
        _log2.info(LOG_AREA, 'Received an auth error, auth is now expired.', result);
      }
    }
    return Promise.reject(result);
  }
  //-- Exported methods section --
  /**
  * This class builds on top of {@link iit.openapi.TransportCore} and adds authentication management. You need only construct one or the other,
  * they automatically wrap each other. All of the options from the {@link iit.openapi.TransportCore} constructor are valid here as well.
  * For authentication management, this class will wait until just before the authentication expires (see tokenRefreshMarginMs) and will refresh the token
  * generating an event which is picked up by some of the other Transports.
  * @class
  * @alias iit.openapi.TransportAuth
  * @param {string} baseUrl - The base url used for all open api requests. This should be an absolute URL.
  * @param {Object} [options] - Options for auth and for the core transport. See Transport.
  * @param {string} [options.language] - The language sent as a header if not overridden.
  * @param {boolean} [options.defaultCache=true] - Sets the default caching behaviour if not overridden on a call.
  * @param {string} [options.tokenRefreshUrl] - The url for refreshing the token.
  * @param {Object.<string, string>} [options.tokenRefreshHeaders] - Any headers to be included in the token refresh call. It should be the same format as other calls.
  * 						The object key names are the header names and the values the header values.
  * @param {string} [options.tokenRefreshMethod="POST"] - The http method for refreshing the token e.g. "POST" or "GET" etc.
  * @param {number} [options.tokenRefreshMarginMs=0] - The number of ms that the refresh call should be done early. e.g. if this is 1000 it will be refreshed 1000 ms before the token expires.
  * @param {string} [options.tokenRefreshPropertyNameToken="token"] - The property name of the token after doing a refresh.
  * @param {string} [options.tokenRefreshPropertyNameExpires="expires"] - The property name of the relative expiry after doing a refresh.
  * @param {string} [options.token] - The token to use for authentication.
  * @param {string|number} [options.expiry] - The expiry of that token, assumed to be absolute.
  * @param {number} [options.retryDelayMs] - The delay before retrying auth
  * @param {number} [options.maxRetryCount] - The maximum number of times to retry the auth url
  */
  function TransportAuth(baseUrl, options) {
    this.tokenRefreshUrl = options && options.tokenRefreshUrl;
    this.tokenRefreshHeaders = options && options.tokenRefreshHeaders;
    this.tokenRefreshMethod = options && options.tokenRefreshMethod || DEFAULT_TOKEN_REFRESH_METHOD;
    this.tokenRefreshCredentials = options && options.tokenRefreshCredentials || DEFAULT_TOKEN_REFRESH_CREDDENTIALS;
    this.tokenRefreshPropertyNameToken = options && options.tokenRefreshPropertyNameToken || DEFAULT_TOKEN_REFRESH_PROPERTY_NAME_TOKEN;
    this.tokenRefreshPropertyNameExpires = options && options.tokenRefreshPropertyNameExpires || DEFAULT_TOKEN_REFRESH_PROPERTY_NAME_EXPIRES;
    this.tokenRefreshMarginMs = options && options.tokenRefreshMarginMs || DEFAULT_TOKEN_REFRESH_MARGIN_MS;
    this.retryDelayMs = options && options.retryDelayMs || DEFAULT_RETRY_DELAY_MS;
    this.maxRetryCount = options && options.maxRetryCount || DEFAULT_MAX_RETRY_COUNT;
    this.transport = new _TransportCore(baseUrl, options);
    this.state = STATE_WAITING;
    this.retries = 0;
    var token = options && options.token || null;
    var expiry = options && options.expiry || 0;
    if (expiry === 0) {
      expiry = toAbsoluteTokenExpiry(expiry);
    }
    if (!token && !this.tokenRefreshUrl) {
      throw new Error('No token supplied and no way to get it');
    }
    this.auth = new Auth(token, expiry, onTokenChanged.bind(this));
    onTokenChanged.call(this, token, expiry);
  }
  _emitter.mixinTo(TransportAuth.prototype);
  /**
  * Type of event that occurs when the token is refreshing.
  */
  TransportAuth.prototype.EVENT_TOKEN_REFRESH = 'tokenRefresh';
  /**
  * Type of event that occurs when the token is received.
  */
  TransportAuth.prototype.EVENT_TOKEN_RECEIVED = 'tokenReceived';
  /**
  * Type of event that occurs when the token refresh fails.
  */
  TransportAuth.prototype.EVENT_TOKEN_REFRESH_FAILED = 'tokenRefreshFailed';
  /**
  * Performs a authenticated get request.
  * @see {@link iit.openapi.TransportCore#get}
  * @function
  */
  TransportAuth.prototype.get = makeTransportMethod('get');
  /**
  * Performs a authenticated put request.
  * @see {@link iit.openapi.TransportCore#put}
  * @function
  */
  TransportAuth.prototype.put = makeTransportMethod('put');
  /**
  * Performs a authenticated post request.
  * @see {@link iit.openapi.TransportCore#post}
  * @function
  */
  TransportAuth.prototype.post = makeTransportMethod('post');
  /**
  * Performs a authenticated delete request.
  * @see {@link iit.openapi.TransportCore#delete}
  * @function
  */
  TransportAuth.prototype.delete = makeTransportMethod('delete');
  /**
  * Performs a authenticated delete request.
  * @see {@link iit.openapi.TransportCore#patch}
  * @function
  */
  TransportAuth.prototype.patch = makeTransportMethod('patch');
  /**
  * Forces a refresh of the open api token
  * This will refresh even if a refresh is already in progress, so only call this if you need a forced refresh.
  * See also {@link TransportAuth.onTokenInvalid}.
  */
  TransportAuth.prototype.refreshOpenApiToken = function () {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }
    this.trigger(this.EVENT_TOKEN_REFRESH);
    if (this.tokenRefreshUrl) {
      getToken.call(this, this.tokenRefreshUrl);
    }
  };
  /**
  * Tells transport auth that the token is invalid and it should immediatly try to refresh if it isn't already
  */
  TransportAuth.prototype.onTokenInvalid = function () {
    if (this.state & STATE_WAITING && this.retries === 0 && this.maxRetryCount > 0) {
      _log2.error(LOG_AREA, 'Token is invalid, refresh has not been attempted (may still be valid or timeout not fired).');
      this.refreshOpenApiToken();
    } else {
      _log2.info(LOG_AREA, 'Token invalid, currently trying to refresh.');
    }
  };
  /**
  * Stops the transport from refreshing the token.
  */
  TransportAuth.prototype.dispose = function () {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }
    this.transport.dispose();
  };
  //-- Export section --
  exports = TransportAuth;
  return exports;
}({}, iit_openapi_transport_core, iit_micro_emitter, iit_log, iit_utils_string);
iit_openapi_transport_queue = function (exports) {
  function transportMethod(method) {
    return function () {
      var _this = this;
      if (!this.isQueueing) {
        // checking expiry every time so that if device goes to sleep and is woken then
        // we intercept a call about to be made and then do not have to cope with the 401 responses
        if (this.transportAuth && this.transportAuth.auth.getExpiry() < Date.now()) {
          this.isQueueing = true;
          this.transportAuth.onTokenInvalid();
        }
      }
      var transportCallArguments = arguments;
      return new Promise(function (resolve, reject) {
        var queueItem = {
          method: method,
          args: transportCallArguments,
          serviceGroup: transportCallArguments[0],
          urlTemplate: transportCallArguments[1],
          urlArgs: transportCallArguments[2],
          options: transportCallArguments[3],
          resolve: resolve,
          reject: reject
        };
        if (_this.isQueueing) {
          _this.addToQueue(queueItem);
        } else {
          _this.runQueueItem(queueItem);
        }
      });
    };
  }
  function tryEmptyQueue() {
    if (this.waitForPromises.length === 0 && (!this.transportAuth || this.transportAuth.auth.getExpiry() > Date.now())) {
      this.isQueueing = false;
      this.emptyQueue();
    }
  }
  function onWaitForPromiseResolved(promise) {
    this.waitForPromises.splice(this.waitForPromises.indexOf(promise), 1);
    tryEmptyQueue.call(this);
  }
  function authTokenReceived() {
    tryEmptyQueue.call(this);
  }
  //-- Exported methods section --
  /**
  * TransportQueue wraps a transport class to allow the queueing of transport calls, so that all calls can be paused until after a particular event.
  * 1. This coordinates with authentication so that calls are queued whilst not authenticated
  * 2. The ability to wait for a promise to complete see {@link iit.openapi.TransportQueue#waitFor}. The old library had an option initLoadBalancerCookies which did
  *    two calls to isalive before allowing any other calls through. This can be implemented with this class.
  * 3. It serves as a base class for auto batching, which by its nature queues calls.
  * @class
  * @alias iit.openapi.TransportQueue
  * @param {iit.openapi.TransportAuth|iit.openapi.TransportBatch|iit.openapi.TransportCore|iit.openapi.TransportQueue} transport - The transport to wrap.
  * @param {iit.openapi.TransportAuth} [transportAuth] - Provides the relevant TransportAuth. If given then calls will be queued whilst the auth is expired.
  * 											If not given then calls will continue even when the authentication is not expired and no 401 calls will be handled.
  */
  function TransportQueue(transport, transportAuth) {
    if (!transport) {
      throw new Error('Missing required parameter: transport in TransportQueue');
    }
    this.isQueueing = false;
    if (transportAuth) {
      this.transportAuth = transportAuth;
      if (transportAuth.auth.getExpiry() < Date.now()) {
        this.isQueueing = true;
      }
      //subscribe to listen for authentication changes that might trigger auth to be valid and the queue to empty
      this.transportAuth.on(this.transportAuth.EVENT_TOKEN_RECEIVED, authTokenReceived, this);
    }
    this.queue = [];
    this.transport = transport;
    this.waitForPromises = [];
  }
  /**
  * Performs a queued get request.
  * @see {@link iit.openapi.TransportCore#get}
  * @function
  */
  TransportQueue.prototype.get = transportMethod('get');
  /**
  * Performs a queued post request.
  * @see {@link iit.openapi.TransportCore#post}
  * @function
  */
  TransportQueue.prototype.post = transportMethod('post');
  /**
  * Performs a queued put request.
  * @see {@link iit.openapi.TransportCore#put}
  * @function
  */
  TransportQueue.prototype.put = transportMethod('put');
  /**
  * Performs a queued delete request.
  * @see {@link iit.openapi.TransportCore#delete}
  * @function
  */
  TransportQueue.prototype.delete = transportMethod('delete');
  /**
  * Performs a queued patch request.
  * @see {@link iit.openapi.TransportCore#patch}
  * @function
  */
  TransportQueue.prototype.patch = transportMethod('patch');
  /**
  * Waits for a promise to finish before allowing the queue to continue.
  * @param promise
  */
  TransportQueue.prototype.waitFor = function (promise) {
    this.waitForPromises.push(promise);
    this.isQueueing = true;
    promise.then(onWaitForPromiseResolved.bind(this, promise));
  };
  /**
  * @protected
  */
  TransportQueue.prototype.emptyQueue = function () {
    for (var i = 0, item; item = this.queue[i]; i++) {
      this.runQueueItem(item);
    }
    this.queue.length = 0;
  };
  /**
  * @protected
  * @param item
  */
  TransportQueue.prototype.runQueueItem = function (item) {
    this.transport[item.method].apply(this.transport, item.args).then(function () {
      item.resolve.apply(null, arguments);
    }.bind(this), function (result) {
      if (this.transportAuth && result && result.status === 401) {
        this.isQueueing = true;
        this.addToQueue(item);
        return;
      }
      item.reject.apply(null, arguments);
    }.bind(this));
  };
  /**
  * @protected
  * @param item
  */
  TransportQueue.prototype.addToQueue = function (item) {
    this.queue.push(item);
  };
  /**
  * Disposes the transport queue and removes any pending items.
  */
  TransportQueue.prototype.dispose = function () {
    this.queue.length = 0;
    if (this.transportAuth) {
      this.transportAuth.off(this.transportAuth.EVENT_TOKEN_RECEIVED, authTokenReceived, this);
    }
    this.transport.dispose();
  };
  //-- Export section --
  exports = TransportQueue;
  return exports;
}({});
iit_openapi_transport_batch = function (exports, _queue, _utilsFunction, _utilsString, _batchUtil, _log) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
  * @module iit/openapi/transport/batch
  * @ignore
  */
  //-- Local variables section --
  var _TransportQueue = _interopRequire(_queue);
  var _log2 = _interopRequire(_log);
  var reUrl = /((https?:)?\/\/)?[^\/]+(.*)/i;
  var LOG_AREA = 'TransportBatch';
  //-- Local methods section --
  function emptyQueueIntoServiceGroups() {
    var serviceGroupMap = {};
    for (var i = 0, item = undefined; item = this.queue[i]; i++) {
      var serviceGroup = item.serviceGroup;
      var serviceGroupList = serviceGroupMap[serviceGroup];
      if (!serviceGroupList) {
        serviceGroupList = serviceGroupMap[serviceGroup] = [];
      }
      serviceGroupList.push(item);
    }
    this.queue.length = 0;
    return serviceGroupMap;
  }
  function batchCallFailure(callList, batchResponse) {
    _log2.error(LOG_AREA, 'Batch request failed', batchResponse);
    for (var i = 0, call = undefined; call = callList[i]; i++) {
      // pass on the batch response so that if a batch responds with a 401,
      // and queue is before batch, queue will auto retry
      call.reject(batchResponse);
    }
  }
  function batchCallSuccess(callList, batchResult) {
    var results = _batchUtil.parse(batchResult.response);
    for (var i = 0, call = undefined; call = callList[i]; i++) {
      var result = results[i];
      if (result) {
        // decide in the same way as transport whether the call succeeded
        if ((result.status < 200 || result.status > 299) && result.status !== 304) {
          call.reject(result);
        } else {
          call.resolve(result);
        }
      } else {
        _log2.error(LOG_AREA, 'A batch response was missing', {
          index: i,
          batchResponse: batchResult
        });
        call.reject();
      }
    }
  }
  /**
  * Runs a batch call for a number of sub calls
  * @param {string} serviceGroup
  * @param {Array.<{method: string, args:Array}>} callList
  */
  function runBatchCall(serviceGroup, callList) {
    var subRequests = [];
    var authToken;
    for (var i = 0, call = undefined; call = callList[i]; i++) {
      var headers = call.options && call.options.headers;
      if (headers && headers.Authentication) {
        authToken = headers.Authentication;
        var newHeaders = {};
        for (var header in headers) {
          if (header !== 'Authentication') {
            newHeaders[header] = headers[header];
          }
        }
        headers = newHeaders;
      }
      var body = call.options && call.options.body;
      if (typeof body !== 'string') {
        body = JSON.stringify(body);
      }
      subRequests.push({
        method: call.method,
        headers: headers,
        url: this.basePath + serviceGroup + '/' + _utilsString.formatUrl(call.urlTemplate, call.urlArgs, call.options && call.options.queryParams),
        data: body
      });
    }
    if (!authToken) {
      authToken = this.authProvider.getToken();
    }
    var boundary = _utilsString.createGUID();
    var content = _batchUtil.build(subRequests, boundary, authToken, this.host);
    this.transport.post(serviceGroup, 'batch', null, {
      headers: { 'Content-Type': 'multipart/mixed; boundary="' + boundary + '"' },
      body: content,
      cache: false
    }).then(batchCallSuccess.bind(this, callList)).catch(batchCallFailure.bind(this, callList));
  }
  //-- Exported methods section --
  /**
  * Creates a wrapper around transport to provide auto-batching functionality. If you use the default of 0ms then this transport will join
  * together all calls that happen inside the current call stack and join them into a batch call.
  * @class
  * @alias iit.openapi.TransportBatch
  * @param {Transport} transport - Instance of the transport class to wrap.
  * @param {string} baseUrl - Base URL for batch requests. This should be an absolute URL.
  * @param {{getToken:function}} [authProvider] - Optional instance of an auth provider, such as TransportAuth.auth, used to add authentication to each batch item.
  * @param {Object} [options]
  * @param {number} [options.timeoutMs=0] - Timeout after starting to que items before sending a batch request.
  * @param {string} [options.host=global.location.host] - The host to use in the batch request. If not set defaults to global.location.host.
  */
  function TransportBatch(transport, baseUrl, authProvider, options) {
    _TransportQueue.call(this, transport);
    if (!baseUrl) {
      throw new Error('Missing required parameter: baseUrl in TransportBatch');
    }
    var splitBaseUrl = baseUrl.match(reUrl);
    if (!splitBaseUrl) {
      // the regular expression will match anything but "" and "/"
      throw new Error('baseUrl is not valid - unable to extract path');
    }
    var basePath = splitBaseUrl[3] || '/';
    if (basePath[basePath.length - 1] !== '/') {
      basePath += '/';
    }
    this.basePath = basePath;
    if (options && options.host) {
      this.host = options.host;
    } else {
      /* jshint -W067 */
      var global = (0, eval)('this');
      // get the global object in a way that works within strict mode
      this.host = global.location.host;
    }
    this.authProvider = authProvider;
    this.timeoutMs = options && options.timeoutMs || 0;
    this.isQueueing = true;
  }
  TransportBatch.prototype = Object.create(_TransportQueue.prototype, {
    constructor: {
      value: TransportBatch,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  /**
  * @private
  * @param item
  */
  TransportBatch.prototype.addToQueue = function (item) {
    _TransportQueue.prototype.addToQueue.call(this, item);
    if (!this.nextTickTimer || this.timeoutMs > 0) {
      if (this.timeoutMs === 0) {
        this.nextTickTimer = true;
        _utilsFunction.nextTick(this.runBatches.bind(this));
      } else {
        if (this.nextTickTimer) {
          clearTimeout(this.nextTickTimer);
        }
        this.nextTickTimer = setTimeout(this.runBatches.bind(this), this.timeoutMs);
      }
    }
  };
  /**
  * @private
  * @param item
  */
  TransportBatch.prototype.runBatches = function () {
    this.nextTickTimer = false;
    var serviceGroupMap = emptyQueueIntoServiceGroups.call(this);
    var serviceGroups = Object.keys(serviceGroupMap);
    for (var i = 0, l = serviceGroups.length; i < l; i++) {
      var serviceGroupList = serviceGroupMap[serviceGroups[i]];
      if (serviceGroupList.length === 1) {
        this.runQueueItem(serviceGroupList[0]);
      } else {
        runBatchCall.call(this, serviceGroups[i], serviceGroupList);
      }
    }
  };
  //-- Export section --
  exports = TransportBatch;
  return exports;
}({}, iit_openapi_transport_queue, iit_utils_function, iit_utils_string, iit_openapi_batch_util, iit_log);
iit_openapi_streaming_subscription = function (exports, _utilsObject, _log) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  var _log2 = _interopRequire(_log);
  //-- Local variables section --
  /**
  * The static counter to generate unique reference id's.
  */
  var referenceIdCounter = 0;
  var STATE_SUBSCRIBE_REQUESTED = 1;
  var STATE_SUBSCRIBED = 2;
  var STATE_UNSUBSCRIBE_REQUESTED = 4;
  var STATE_UNSUBSCRIBED = 8;
  var STATE_TAG_UNSUBSCRIBE_REQUESTED = 16;
  var TRANSITIONING_STATES = STATE_SUBSCRIBE_REQUESTED | STATE_UNSUBSCRIBE_REQUESTED | STATE_TAG_UNSUBSCRIBE_REQUESTED;
  var ACTION_SUBSCRIBE = 32;
  var ACTION_UNSUBSCRIBE = 64;
  var DEFAULT_REFRESH_RATE_MS = 1000;
  var MIN_REFRESH_RATE_MS = 100;
  var LOG_AREA = 'Subscription';
  //-- Local methods section --
  /**
  * Call to actually do a subscribe.
  */
  function subscribe() {
    // capture the reference id so we can tell in the response whether it is the latest call
    // was using createGUID to create the reference id, but the old library just does this, which is simpler
    var referenceId = String(referenceIdCounter++);
    this.referenceId = referenceId;
    // reset any updates before subscribed
    this.updatesBeforeSubscribed = null;
    var data = _utilsObject.extend({}, this.subscriptionData, {
      ContextId: this.streamingContextId,
      ReferenceId: this.referenceId
    });
    _log2.debug(LOG_AREA, 'starting..', {
      serviceGroup: this.serviceGroup,
      url: this.url
    });
    this.currentState = STATE_SUBSCRIBE_REQUESTED;
    this.transport.post(this.serviceGroup, this.url + '/active', null, { body: data}).then(onSubscribeSuccess.bind(this, referenceId)).catch(onSubscribeError.bind(this, referenceId));
  }
  /**
  * Does an actual unsubscribe.
  */
  function unsubscribe() {
    this.currentState = STATE_UNSUBSCRIBE_REQUESTED;
    // capture the reference id so we can tell in the response whether it is the latest call
    var referenceId = this.referenceId;
    this.transport.delete(this.serviceGroup, this.url + '/{contextId}/{referenceId}', {
      contextId: this.streamingContextId,
      referenceId: this.referenceId
    }).then(onUnsubscribeSuccess.bind(this, referenceId)).catch(onUnsubscribeError.bind(this, referenceId));
  }
  /**
  * Queues or performs an action based on the curent state.
  * @param action
  */
  function tryPerformAction(action) {
    if (!this.connectionAvailable || TRANSITIONING_STATES & this.currentState) {
      this.nextAction = action;
    } else {
      performAction.call(this, action);
    }
  }
  /**
  * Callback for when the subscription is ready to perform the next action.
  */
  function onReadyToPerformNextAction() {
    if (!this.connectionAvailable) {
      return;
    }
    if (this.nextAction) {
      performAction.call(this, this.nextAction);
    }
  }
  /**
  * Performs an action to a subscription based on the current state.
  * @param action
  */
  function performAction(action) {
    switch (action) {
    case ACTION_SUBSCRIBE:
      switch (this.currentState) {
      case STATE_SUBSCRIBED:
        break;
      case STATE_UNSUBSCRIBED:
        subscribe.call(this);
        break;
      default:
        _log2.error(LOG_AREA, 'unanticipated state', {
          state: this.currentState,
          action: action
        });
      }
      break;
    case ACTION_UNSUBSCRIBE:
      switch (this.currentState) {
      case STATE_SUBSCRIBED:
        unsubscribe.call(this);
        break;
      case STATE_UNSUBSCRIBED:
        break;
      default:
        _log2.error(LOG_AREA, 'unanticipated state', {
          state: this.currentState,
          action: action
        });
      }
      break;
    default:
      throw new Error('unrecognised action ' + action);
    }
    this.nextAction = null;
  }
  /**
  * Handles the response to the initial REST request that creates the subscription.
  * {Object} result
  * {string} result.State The current state (Active/Suspended)
  * {string} result.Format The media type (RFC 2046), of the serialized data updates that are streamed to the client.
  * {string} result.ContextId The streaming context id that this response is associated with.
  * {number=0} result.InactivityTimeout The time (in seconds) that the client should accept the subscription to be inactive before considering it invalid.
  * {number=0} result.RefreshRate Actual refresh rate assigned to the subscription according to the customers SLA.
  * {Object} result.Snapshot Snapshot of the current data available
  * {string} result.Tag Client specified tag assigned to the subscription, if specified in the request.
  */
  function onSubscribeSuccess(referenceId, result) {
    var responseData = result.response;
    if (referenceId !== this.referenceId) {
      _log2.warn(LOG_AREA, 'Received an Ok subscribe response for subscribing a subscription that has afterwards been reset - ignoring');
      // we could send the contextId as well an attempt a unsubscribe, but its hard to guess what could lead to this.
      // - (reset by disconnect/reconnect from streaming) we started subscribing, then web sockets was disconnected, but the server doesn't know it yet
      //   - in this case the contextId should be changed and the server will drop the old session soon. we won't receive updates
      // - (reset by streaming control message) we started subscribing, then we get a web socket reset event before the rest server responded
      //   - in this case the contextId should be the same and the server itself has told us the subscription is dead
      // - (reset by heartbeat lapse) - this indicates a bug in the library since this shouldn't happen
      //   - in this case the contextId should be the same and we will probably get messages that cannot be matched to a subscription
      return;
    }
    this.currentState = STATE_SUBSCRIBED;
    this.inactivityTimeout = responseData.InactivityTimeout || 0;
    if (this.inactivityTimeout === 0) {
      _log2.warn(LOG_AREA, 'inactivity timeout is 0 - interpretting as never timeout. Remove warning if normal.', result);
    }
    onActivity.call(this);
    if (this.onSubscriptionCreated) {
      this.onSubscriptionCreated();
    }
    // do not fire events if we are waiting to unsubscribe
    if (this.nextAction !== ACTION_UNSUBSCRIBE) {
      // the Snaphost property can be a single value, or have an array of items within a Data property
      //var snapshotData = responseData.Snapshot.Data || responseData.Snapshot;
      this.onUpdate(responseData.Snapshot, this.UPDATE_TYPE_SNAPSHOT);
      if (this.updatesBeforeSubscribed) {
        for (var i = 0, updateMsg = undefined; updateMsg = this.updatesBeforeSubscribed[i]; i++) {
          this.onStreamingData(updateMsg);
        }
      }
    }
    this.updatesBeforeSubscribed = null;
    onReadyToPerformNextAction.call(this);
  }
  /**
  * Called when a subscribe errors
  * @param response
  */
  function onSubscribeError(referenceId, response) {
    if (referenceId !== this.referenceId) {
      _log2.debug(LOG_AREA, 'Received an error response for subscribing a subscription that has afterwards been reset - ignoring');
      return;
    }
    this.currentState = STATE_UNSUBSCRIBED;
    _log2.error(LOG_AREA, 'An error occurred subscribing', {
      response: response,
      url: this.url
    });
    // if we are unsubscribed, do not fire the error handler
    if (this.nextAction !== ACTION_UNSUBSCRIBE) {
      if (this.onError) {
        this.onError(response);
      }
    }
    onReadyToPerformNextAction.call(this);
  }
  /**
  * Called after subscribe is successful
  * @param referenceId
  * @param response
  */
  function onUnsubscribeSuccess(referenceId, response) {
    if (referenceId !== this.referenceId) {
      _log2.debug(LOG_AREA, 'Received an error response for subscribing a subscription that has afterwards been reset - ignoring');
      // we were unsubscribing when reset and the unsubscribe succeeded
      // return because we may have been asked to subscribe after resetting
      return;
    }
    this.currentState = STATE_UNSUBSCRIBED;
    onReadyToPerformNextAction.call(this);
  }
  /**
  * Called when a unsubscribe errors
  * @param response
  */
  function onUnsubscribeError(referenceId, response) {
    if (referenceId !== this.referenceId) {
      _log2.error(LOG_AREA, 'Received an error response for unsubscribing a subscription that has afterwards been reset - ignoring');
      return;
    }
    this.currentState = STATE_UNSUBSCRIBED;
    _log2.error(LOG_AREA, 'An error occurred unsubscribing', {
      response: response,
      url: this.url
    });
    onReadyToPerformNextAction.call(this);
  }
  /**
  * Resets the subscription activity
  */
  function onActivity() {
    this.latestActivity = new Date().getTime();
  }
  //-- Exported methods section --
  /**
  * A subscription to a resource, which streams updates.
  *
  * This class should not be constructed directly, it should instead be created via the
  * {@link iit.openapi.Streaming#createSubscription} factory method.
  *
  * @class
  * @alias iit.openapi.StreamingSubscription
  */
  function Subscription(streamingContextId, transport, serviceGroup, url, subscriptionArgs, onSubscriptionCreated, onUpdate, onError) {
    /**
     * The streaming context id identifies the particular streaming connection that this subscription will use
     * @private
     */
    this.streamingContextId = streamingContextId;
    this.transport = transport;
    this.serviceGroup = serviceGroup;
    this.url = url;
    this.onUpdate = onUpdate;
    this.onError = onError;
    this.onSubscriptionCreated = onSubscriptionCreated;
    this.subscriptionData = _utilsObject.extend({}, subscriptionArgs);
    if (!this.subscriptionData.RefreshRate) {
      this.subscriptionData.RefreshRate = DEFAULT_REFRESH_RATE_MS;
    } else {
      if (this.subscriptionData.RefreshRate < MIN_REFRESH_RATE_MS) {
        _log2.warn(LOG_AREA, 'Low refresh rate. This has been rounded up to the minimum.', { minimumRate: MIN_REFRESH_RATE_MS });
        this.subscriptionData.RefreshRate = MIN_REFRESH_RATE_MS;
      }
    }
    this.tag = subscriptionArgs.Tag;
    this.connectionAvailable = true;
    this.currentState = STATE_UNSUBSCRIBED;
  }
  Subscription.prototype.UPDATE_TYPE_SNAPSHOT = 1;
  Subscription.prototype.UPDATE_TYPE_DELTA = 2;
  /**
  * Defines the name of the property on data used to indicate that the data item is a deletion, rather than a
  * insertion / update.
  * @type {string}
  */
  Subscription.prototype.OPENAPI_DELETE_PROPERTY = '__meta_deleted';
  /**
  * This assumes the subscription is dead and subscribes again. If unsubscribed or awaiting a unsubscription, this is ignored.
  * It should be used in the case of errors, such as the subscription becoming orphaned and when the server asks us to reset a subscription.
  * @private
  */
  Subscription.prototype.reset = function () {
    switch (this.currentState) {
    case STATE_UNSUBSCRIBED:
    case STATE_TAG_UNSUBSCRIBE_REQUESTED:
    case STATE_UNSUBSCRIBE_REQUESTED:
      // do not do anything if we are on our way to unsubscribed unless the next action would be to subscribe
      if (this.nextAction & ACTION_SUBSCRIBE) {
        break;
      }
      return;
    case STATE_SUBSCRIBE_REQUESTED:
      // we could have been in the process of subscribing when disconnected. we would need to subscribe with a new streamingContextId
      break;
    case STATE_SUBSCRIBED:
      break;
    default:
      _log2.error(LOG_AREA, 'reset was called but subscription is in an unknown state');
      return;
    }
    this.nextAction = null;
    // do not unsubscribe because a reset happens when the existing subscription is broken
    //  * on a new connection (new context id, subscription will be cleaned up)
    //  * server reset instruction (server is telling us subscription is broken)
    //  * subscription is orphaned (meaning subscription is dead).
    // set the state to unsubscribed, since that is what we are now assuming
    this.currentState = STATE_UNSUBSCRIBED;
    // subscribe... because the state is unsubscribed this will go ahead unless the connection is unavailable
    this.onSubscribe();
  };
  /**
  * Try to subscribe.
  * @private
  */
  Subscription.prototype.onSubscribe = function () {
    tryPerformAction.call(this, ACTION_SUBSCRIBE);
  };
  /**
  * Try to unsubscribe.
  * @private
  */
  Subscription.prototype.onUnsubscribe = function () {
    tryPerformAction.call(this, ACTION_UNSUBSCRIBE);
  };
  /**
  * Tell the subscription that the connection is unavailable.
  * @private
  */
  Subscription.prototype.onConnectionUnavailable = function () {
    this.connectionAvailable = false;
  };
  /**
  * Tell the subscription that the connection is available and it can perform any queued action.
  * @private
  */
  Subscription.prototype.onConnectionAvailable = function () {
    this.connectionAvailable = true;
    onReadyToPerformNextAction.call(this);
  };
  /**
  * Handles the 'data' event raised by Streaming.
  * @private
  */
  Subscription.prototype.onStreamingData = function (message) {
    onActivity.call(this);
    switch (this.currentState) {
    // if we are unsubscribed or trying to unsubscribe then ignore the data
    case STATE_UNSUBSCRIBE_REQUESTED:
    case STATE_TAG_UNSUBSCRIBE_REQUESTED:
      return;
    case STATE_UNSUBSCRIBED:
      _log2.warn(LOG_AREA, 'Received data for a subscription that was unsubscribed', message);
      return;
    // we received a delta before we got initial data
    case STATE_SUBSCRIBE_REQUESTED:
      this.updatesBeforeSubscribed = this.updatesBeforeSubscribed || [];
      this.updatesBeforeSubscribed.push(message);
      return;
    // the normal state, go ahead
    case STATE_SUBSCRIBED:
      break;
    default:
      _log2.error(LOG_AREA, 'unanticipated state', this.currentState);
    }
    //var data = message.Data || message;
    try {
      this.onUpdate(message, this.UPDATE_TYPE_DELTA);
    } catch (error) {
      _log2.error(LOG_AREA, 'exception occurred sending data update', error);
    }
  };
  /**
  * Handles a heartbeat from the server.
  * @private
  */
  Subscription.prototype.onHeartbeat = function () {
    onActivity.call(this);
  };
  /**
  * Returns the time in ms till the subscription would be orphaned.
  * @param now - The current time as a reference (e.g. Date.now()).
  * @private
  */
  Subscription.prototype.timeTillOrphaned = function (now) {
    // this works because there are no suspended and resume states.
    // once subscribed, orphan finder will be notified.
    if (!this.connectionAvailable || this.currentState !== STATE_SUBSCRIBED || this.inactivityTimeout === 0) {
      return Infinity;
    }
    // Follows the same pattern as the old library, not giving any grace period for receiving a heartbeat
    // if it was required, it could be added on here
    var diff = now - this.latestActivity;
    return this.inactivityTimeout * 1000 - diff;
  };
  //-- Export section --
  exports = Subscription;
  return exports;
}({}, iit_utils_object, iit_log);
iit_openapi_streaming_heartbeater = function (exports, _log) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
   * This schedules a heartbeat to the Open API rest service in order to keep the streaming subscription alive.
   * @module iit/openapi/streaming/heartbeater
   * @ignore
   */
  var _log2 = _interopRequire(_log);
  //-- Local variables section --
  var DEFAULT_RETRIES = 5;
  var DEFAULT_RETRY_DELAY_SECONDS = 2;
  var LOG_AREA = 'StreamingHeartbeater';
  //-- Local methods section --
  function scheduleNextHeartbeat(timeInSeconds) {
    if (this.enabled) {
      this.timer = setTimeout(heartbeat.bind(this), timeInSeconds * 1000);
    }
  }
  function heartbeat() {
    var _this = this;
    this.transport.put('root', 'subscriptions/keepalive/{contextId}', { contextId: this.contextId }).then(function (result) {
      _this.failedHeartbeats = 0;
      scheduleNextHeartbeat.call(_this, result.response.NextKeepAlive);
    }).catch(function (result) {
      _this.failedHeartbeats++;
      if (_this.failedHeartbeats > _this.retries) {
        _log2.error(LOG_AREA, 'Failed to heartbeat more than the max number of retries', result);
        return;
      }
      _log2.warn(LOG_AREA, 'Failed to heartbeat, retrying', result);
      scheduleNextHeartbeat.call(_this, _this.retryDelay);
    });
  }
  //-- Exported methods section --
  function StreamingHeartbeater(transport, options) {
    if (!transport) {
      throw new Error('Missing required parameter: transport in streaming heartbeater');
    }
    this.transport = transport;
    this.retries = options && options.retries || DEFAULT_RETRIES;
    this.retryDelay = options && options.retryDelay || DEFAULT_RETRY_DELAY_SECONDS;
    this.enabled = false;
  }
  StreamingHeartbeater.prototype.start = function (contextId) {
    if (!contextId) {
      throw new Error('Missing required parameter: contextId in streaming heartbeater');
    }
    this.contextId = contextId;
    this.enabled = true;
    this.failedHeartbeats = 0;
    _log2.debug(LOG_AREA, 'Starting heartbeater');
    heartbeat.call(this);
  };
  StreamingHeartbeater.prototype.stop = function () {
    _log2.debug(LOG_AREA, 'Stopping heartbeater');
    clearTimeout(this.timer);
    this.enabled = false;
  };
  //-- Export section --
  exports = StreamingHeartbeater;
  return exports;
}({}, iit_log);
iit_openapi_streaming_orphan_finder = function (exports, _log) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
   * Finds subscriptions that have become orphaned. This only happens if an open api server goes down, but it requires that the orphaned subscription is restarted.
   * A simpler implementation would be to have a setTimeout/clearTimeout onActivity in each subscription, but this class was abstracted for performance in order to reduce
   * the number of setTimeouts/clearTimeouts - with any number of subscriptions at the smallest refresh interval, with millions of updates per second, this class only
   * checks subscriptions when a new one is started and then once per second overall.
   *
   * @module iit/openapi/streaming/orphan finder
   * @ignore
   */
  var _log2 = _interopRequire(_log);
  //-- Local variables section --
  var LOG_AREA = 'StreamingOrphanFinder';
  var DEFAULT_START_DELAY = 1000;
  var MAX_UPDATE_DELAY = 5000;
  //-- Local methods section --
  function onUpdateTimeout() {
    this.nextUpdateTimeoutId = null;
    this.update();
  }
  //-- Exported methods section --
  function StreamingOrphanFinder(subscriptions, onOrphanFound, startDelay) {
    if (!subscriptions || !onOrphanFound) {
      throw new Error('Missing required parameters: subscription or onOrphanFound in streaming orphan finder');
    }
    this.subscriptions = subscriptions;
    this.nextUpdateTime = Infinity;
    this.onOrphanFound = onOrphanFound;
    // delay to avoid orphaning subscriptions when just connected before heartbeats that are queued up get to us
    this.startDelay = startDelay || DEFAULT_START_DELAY;
    this.enabled = false;
  }
  /**
  * Starts the orphan-finder.
  * It will delay reporting orphans for a set amount of time
  */
  StreamingOrphanFinder.prototype.start = function () {
    this.enabled = true;
    this.minCheckTime = Date.now() + this.startDelay;
    this.update();
  };
  StreamingOrphanFinder.prototype.stop = function () {
    if (this.nextUpdateTimeoutId) {
      clearTimeout(this.nextUpdateTimeoutId);
      this.nextUpdateTimeoutId = null;
      this.nextUpdateTime = Infinity;
    }
    this.enabled = false;
  };
  StreamingOrphanFinder.prototype.update = function () {
    if (!this.enabled) {
      return;
    }
    var now = Date.now(), oldNextUpdateIn = this.nextUpdateTime - now,
      // old next Update In
      newNextUpdateIn = Infinity,
      // new oldNextUpdateIn
      foundNextUpdate = false, orphanedSubscriptions = [];
    // if this update is running very late then the chances are the phone is in background mode
    // or has just come out of it. If so, we delay checking
    if (oldNextUpdateIn < -MAX_UPDATE_DELAY) {
      _log2.warn(LOG_AREA, 'update occurred much later than requested, assuming wake from sleep and will retry', oldNextUpdateIn);
      this.minCheckTime = now + this.startDelay;
      this.nextUpdateTimeoutId = setTimeout(onUpdateTimeout.bind(this), this.startDelay);
      this.nextUpdateTime = now + this.startDelay;
      return;
    }
    for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
      var timeTillOrphaned = subscription.timeTillOrphaned(now);
      if (timeTillOrphaned <= 0) {
        orphanedSubscriptions.push(subscription);
      } else if (timeTillOrphaned < newNextUpdateIn) {
        foundNextUpdate = true;
        newNextUpdateIn = timeTillOrphaned;
      }
    }
    // if we are still in the period between starting and the startDelay
    if (this.minCheckTime > now) {
      var startDelayEndsIn = this.minCheckTime - now;
      // we want to delay doing anything in case we just re-connected and the heartbeats are queued
      if (orphanedSubscriptions.length) {
        // if we were going to orphan a subscription, delay until the startDelay period is over
        orphanedSubscriptions.length = 0;
        newNextUpdateIn = startDelayEndsIn;
        foundNextUpdate = true;
      } else if (startDelayEndsIn > newNextUpdateIn) {
        // we weren't going to orphan anything, but if the next update is planned before the end of the start delay
        // then postpone it to the start delay
        newNextUpdateIn = startDelayEndsIn;
      }
    }
    for (var i = 0, subscription = undefined; subscription = orphanedSubscriptions[i]; i++) {
      this.onOrphanFound(subscription);
    }
    if (oldNextUpdateIn === newNextUpdateIn) {
      return;
    }
    if (this.nextUpdateTimeoutId) {
      clearTimeout(this.nextUpdateTimeoutId);
      this.nextUpdateTimeoutId = null;
    }
    if (foundNextUpdate) {
      this.nextUpdateTimeoutId = setTimeout(onUpdateTimeout.bind(this), newNextUpdateIn);
    }
    // use now even though it may be out of date in order that multiple updates for roughly the same time do not clear/set timeouts
    // if there was a difference in time, then the next time this was called that difference would be detected as a shorter timeout
    // and it would be rescheduled. To improve this, get time again and change oldNextUpdateIn by the difference.
    this.nextUpdateTime = now + newNextUpdateIn;
  };
  //-- Export section --
  exports = StreamingOrphanFinder;
  return exports;
}({}, iit_log);
iit_openapi_streaming_streaming = function (exports, _microEmitter, _subscription, _heartbeater, _orphanFinder, _log, _utilsString) {
  var _Streaming$prototype$READABLE_CONNECTION_STATE_MAP;
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  /**
  * @module iit/openapi/streaming/streaming
  * @ignore
  */
  var _emitter = _interopRequire(_microEmitter);
  var _Subscription = _interopRequire(_subscription);
  var _StreamingHeartbeater = _interopRequire(_heartbeater);
  var _StreamingOrphanFinder = _interopRequire(_orphanFinder);
  var _log2 = _interopRequire(_log);
  //-- Local variables section --
  var OPENAPI_CONTROL_MESSAGE_PREFIX = '_';
  var OPENAPI_CONTROL_MESSAGE_HEARTBEAT = '_heartbeat';
  var OPENAPI_CONTROL_MESSAGE_RESET_SUBSCRIPTIONS = '_resetsubscriptions';
  var DEFAULT_CONNECT_RETRY_DELAY = 1000;
  var LOG_AREA = 'Streaming';
  //-- Local methods section --
  /**
  * initializes the SignalR connection, and starts handling streaming events.
  *
  * This method initiates a SignalR connection. The Streaming connection.
  * starts in an Initialising state, transitions to Started when the SignalR connection starts
  * then follows the SignalR state model.
  */
  function init() {
    setNewContextId.call(this);
    var connection = $.connection(this.connectionUrl);
    connection.log = onSignalRLog;
    this.connection = connection;
    updateConnectionQuery.call(this);
    connection.stateChanged(onConnectionStateChanged.bind(this));
    connection.received(onReceived.bind(this));
    connection.error(onConnectionError.bind(this));
    connection.connectionSlow(onConnectionSlow.bind(this));
    // start the process (first argument can be options e.g. connection.start({ transport: 'longPolling' }, callback)
    connection.start({ waitForPageLoad: false }, onConnectionStarted.bind(this));
  }
  /**
  * Reconnects the streaming socket when it is disconnected
  */
  function reconnect() {
    if (this.connectionState !== this.CONNECTION_STATE_DISCONNECTED) {
      throw new Error('Only call reconnect on a disconnected streaming connection');
    }
    setNewContextId.call(this);
    updateConnectionQuery.call(this);
    this.reconnecting = true;
    this.connection.start(onConnectionStarted.bind(this));
  }
  function setNewContextId() {
    // context id must be 10 characters or less.
    // using the recommended technique for generating a context id
    // from https://wiki/display/OpenAPI/Open+API+Streaming
    var now = new Date();
    var midnight = new Date(now.toDateString());
    var msSinceMidnight = now - midnight;
    var randomNumber = Math.floor(Math.random() * 100);
    var contextId = _utilsString.padLeft(String(msSinceMidnight), 8, '0') + _utilsString.padLeft(String(randomNumber), 2, '0');
    this.contextId = contextId;
    for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
      subscription.streamingContextId = contextId;
    }
  }
  /**
  * Retries the connection after a time
  */
  function retryConnection() {
    setTimeout(reconnect.bind(this), this.retryDelay);
  }
  /**
  * maps from the signalR connection state to the ConnectionState Enum
  */
  function mapConnectionState(state) {
    var connectionState;
    switch (state) {
    case $.signalR.connectionState.connecting:
      connectionState = this.CONNECTION_STATE_CONNECTING;
      break;
    case $.signalR.connectionState.connected:
      connectionState = this.CONNECTION_STATE_CONNECTED;
      break;
    case $.signalR.connectionState.disconnected:
      connectionState = this.CONNECTION_STATE_DISCONNECTED;
      break;
    case $.signalR.connectionState.reconnecting:
      connectionState = this.CONNECTION_STATE_RECONNECTING;
      break;
    default:
      _log2.warn(LOG_AREA, 'unrecognised state', state);
      break;
    }
    return connectionState;
  }
  /**
  * handles connection state changed event from signalR
  */
  function onConnectionStateChanged(change) {
    this.connectionState = mapConnectionState.call(this, change.newState);
    var signalRTransport = this.connection.transport;
    _log2.info(LOG_AREA, 'Connection state changed to ', {
      changedTo: this.READABLE_CONNECTION_STATE_MAP[this.connectionState],
      mechanism: signalRTransport && signalRTransport.name
    });
    this.trigger(this.EVENT_CONNECTION_STATE_CHANGED, this.connectionState);
    if (this.disposed) {
      return;
    }
    switch (this.connectionState) {
    case this.CONNECTION_STATE_DISCONNECTED:
      _log2.error(LOG_AREA, 'connection disconnected');
      this.heartbeater.stop();
      this.orphanFinder.stop();
      // tell all subscriptions not to do anything
      // it doesn't matter if they do (they will be reset and either forget the unsubscribe or start a new subscribe),
      // but it is a waste of network
      for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
        subscription.onConnectionUnavailable();
      }
      retryConnection.call(this);
      break;
    case this.CONNECTION_STATE_RECONNECTING:
      updateConnectionQuery.call(this);
      this.heartbeater.stop();
      this.orphanFinder.stop();
      break;
    case this.CONNECTION_STATE_CONNECTED:
      // if *we* are reconnecting (as opposed to signal-r reconnecting, which we do not need to handle specially)
      if (this.reconnecting) {
        resetAllSubscriptions.call(this);
        this.reconnecting = false;
      }
      for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
        subscription.onConnectionAvailable();
      }
      this.heartbeater.start(this.contextId);
      this.orphanFinder.start();
      break;
    }
  }
  /**
  * handles the signalR connect start callback
  */
  function onConnectionStarted(change) {
    // sometimes the started gets called after connected, sometimes before
    if (this.connectionState === this.CONNECTION_STATE_INITIALIZING) {
      this.connectionState = this.CONNECTION_STATE_STARTED;
    }
    _log2.info(LOG_AREA, 'Connection started');
    this.trigger(this.EVENT_CONNECTION_STATE_CHANGED, this.connectionState);
  }
  /**
  * handles the connection received event from SignalR
  * @param updates
  */
  function onReceived(updates) {
    if (!updates) {
      _log2.warn(LOG_AREA, 'onReceived called with no data', updates);
      return;
    }
    for (var i = 0, update = undefined; update = updates[i]; i++) {
      try {
        if (update.ReferenceId[0] === OPENAPI_CONTROL_MESSAGE_PREFIX) {
          handleControlMessage.call(this, update);
        } else {
          sendDataUpdateToSubscribers.call(this, update);
        }
      } catch (error) {
        _log2.error(LOG_AREA, 'Error occurred in onReceived procssing update', {
          error: error,
          update: update
        });
      }
    }
  }
  /**
  * Finds a subscription by referenceId or returns undefined if not found
  * @param {string} referenceId
  */
  function findSubscriptionByReferenceId(referenceId) {
    for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
      if (subscription.referenceId === referenceId) {
        return subscription;
      }
    }
  }
  /**
  * Sends an update to a subscription by finding it and calling its callback
  * @param update
  */
  function sendDataUpdateToSubscribers(update) {
    var subscription = findSubscriptionByReferenceId.call(this, update.ReferenceId);
    if (subscription) {
      subscription.onStreamingData(update);
    } else {
      _log2.warn(LOG_AREA, 'Data update does not match a subscription', update);
    }
  }
  /**
  * Handles a control message on the streaming connection
  * @param {Object} message From open-api
  */
  function handleControlMessage(message) {
    switch (message.ReferenceId) {
    case OPENAPI_CONTROL_MESSAGE_HEARTBEAT:
      fireHeartbeats.call(this, message.Heartbeats);
      break;
    case OPENAPI_CONTROL_MESSAGE_RESET_SUBSCRIPTIONS:
      resetSubscriptions.call(this, message.TargetReferenceIds);
      break;
    default:
      _log2.warn(LOG_AREA, 'Unrecognised control message', message);
      break;
    }
  }
  /**
  * fires heartbeats to relevant subscriptions
  * @param {Array.<{OriginatingReferenceId: string, Reason: string}>} heartbeatList
  */
  function fireHeartbeats(heartbeatList) {
    _log2.debug(LOG_AREA, 'heartbeats received', heartbeatList);
    for (var i = 0, heartbeat = undefined; heartbeat = heartbeatList[i]; i++) {
      var subscription = findSubscriptionByReferenceId.call(this, heartbeat.OriginatingReferenceId);
      if (subscription) {
        subscription.onHeartbeat();
      } else {
        _log2.warn(LOG_AREA, 'heartbeat received for non-found subscription', heartbeat);
      }
    }
  }
  /**
  * Resets all subscriptions
  */
  function resetAllSubscriptions() {
    _log2.warn(LOG_AREA, 'Resetting all subscriptions');
    for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
      subscription.reset();
    }
  }
  /**
  * Resets a particular subscription
  * @param {Array.<string>} referenceIdList
  */
  function resetSubscriptions(referenceIdList) {
    if (!referenceIdList) {
      resetAllSubscriptions.call(this);
      return;
    }
    _log2.debug(LOG_AREA, 'Resetting subscriptions', referenceIdList);
    for (var i = 0, referenceId = undefined; referenceId = referenceIdList[i]; i++) {
      var subscription = findSubscriptionByReferenceId.call(this, referenceId);
      if (subscription) {
        subscription.reset();
      } else {
        _log2.warn(LOG_AREA, 'couldn\'t find subscription to reset', referenceId);
      }
    }
  }
  /**
  * handles the connection slow event from SignalR. Happens when a keep-alive is missed.
  */
  function onConnectionSlow() {
    _log2.info(LOG_AREA, 'connection is slow');
    this.trigger(this.EVENT_CONNECTION_SLOW);
  }
  /**
  * handles a signal-r error
  * This occurs when data cannot be sent, or cannot be received or something unknown goes wrong.
  * signal-r attempts to keep the subscription and if it doesn't we will get the normal failed events
  */
  function onConnectionError(errorDetail) {
    _log2.error(LOG_AREA, 'connection error', errorDetail);
  }
  /**
  * Overrides the signalr log in order to channel log messages into our logger
  * @param message
  */
  function onSignalRLog(message) {
    _log2.debug('SignalR', message);
  }
  /**
  * Updates the connection query string
  */
  function updateConnectionQuery() {
    this.connection.qs = 'authorization=' + encodeURIComponent(this.authProvider.getToken()) + '&context=' + encodeURIComponent(this.contextId);
  }
  /**
  * Called when a subscription is created
  * updates the orphan finder to look for that subscription
  */
  function onSubscriptionCreated() {
    this.orphanFinder.update();
  }
  /**
  * Called when an orphan is found - resets that subscription
  * @param subscription
  */
  function onOrphanFound(subscription) {
    _log2.warn(LOG_AREA, 'Subscription has become orphaned - resetting', subscription);
    subscription.reset();
  }
  //-- Exported methods section --
  /**
  * Manages subscriptions to the Open API streaming service.
  * Once created this will immediately attempt to start the streaming service
  *
  * @class
  * @alias iit.openapi.Streaming
  * @mixes MicroEmitter
  * @param {Transport} transport - The transport to use for subscribing/unsubscribing.
  * @param {string} baseUrl - The base URL with which to connect. /streaming/connection will be appended to it.
  * @param {Object} authProvider - An object with the method getToken on it.
  * @param {Object} [options] - The configuration options for the streaming connection
  * @param {number} [options.connectRetryDelay=1000] - The delay in milliseconds to wait before attempting a new connect after signal-r has disconnected
  */
  function Streaming(transport, baseUrl, authProvider, options) {
    this.connectionState = this.CONNECTION_STATE_INITIALIZING;
    this.connectionUrl = baseUrl + '/streaming/connection';
    this.authProvider = authProvider;
    this.transport = transport;
    this.subscriptions = [];
    if (options && typeof options.connectRetryDelay === 'number') {
      this.retryDelay = options.connectRetryDelay;
    } else {
      this.retryDelay = DEFAULT_CONNECT_RETRY_DELAY;
    }
    this.orphanFinder = new _StreamingOrphanFinder(this.subscriptions, onOrphanFound.bind(this));
    this.heartbeater = new _StreamingHeartbeater(this.transport);
    init.call(this);
  }
  _emitter.mixinTo(Streaming.prototype);
  /**
  * Event that occurs when the connection state changes.
  */
  Streaming.prototype.EVENT_CONNECTION_STATE_CHANGED = 'connectionStateChanged';
  /**
  * Event that occurs when the connection is slow.
  */
  Streaming.prototype.EVENT_CONNECTION_SLOW = 'connectionSlow';
  /**
  * Streaming has been created but has not yet started the connection.
  */
  Streaming.prototype.CONNECTION_STATE_INITIALIZING = 1;
  /**
  * The connection has been started but signal-r may not yet be connecting.
  */
  Streaming.prototype.CONNECTION_STATE_STARTED = 2;
  /**
  * signal-r is trying to connect. The previous state was CONNECTION_STATE_STARTED or CONNECTION_STATE_DISCONNECTED.
  */
  Streaming.prototype.CONNECTION_STATE_CONNECTING = 4;
  /**
  * signal-r is connected and everything is good.
  */
  Streaming.prototype.CONNECTION_STATE_CONNECTED = 8;
  /**
  * signal-r is reconnecting. The previous state was CONNECTION_STATE_CONNECTING.
  * We are current not connected, but might recover without having to reset.
  */
  Streaming.prototype.CONNECTION_STATE_RECONNECTING = 16;
  /**
  * signal-r is disconnected. Streaming may attempt to connect again.
  */
  Streaming.prototype.CONNECTION_STATE_DISCONNECTED = 32;
  Streaming.prototype.READABLE_CONNECTION_STATE_MAP = (_Streaming$prototype$READABLE_CONNECTION_STATE_MAP = {}, _Streaming$prototype$READABLE_CONNECTION_STATE_MAP[Streaming.prototype.CONNECTION_STATE_INITIALIZING] = 'Initializing', _Streaming$prototype$READABLE_CONNECTION_STATE_MAP[Streaming.prototype.CONNECTION_STATE_STARTED] = 'Started', _Streaming$prototype$READABLE_CONNECTION_STATE_MAP[Streaming.prototype.CONNECTION_STATE_CONNECTING] = 'Connecting', _Streaming$prototype$READABLE_CONNECTION_STATE_MAP[Streaming.prototype.CONNECTION_STATE_CONNECTED] = 'Connected', _Streaming$prototype$READABLE_CONNECTION_STATE_MAP[Streaming.prototype.CONNECTION_STATE_RECONNECTING] = 'Reconnecting', _Streaming$prototype$READABLE_CONNECTION_STATE_MAP[Streaming.prototype.CONNECTION_STATE_DISCONNECTED] = 'Disconnected', _Streaming$prototype$READABLE_CONNECTION_STATE_MAP);
  /**
  * Constructs a new subscription to the given resource.
  *
  * @param {string} serviceGroup - The service group e.g. 'trade'
  * @param {string} url - The name of the resource to subscribe to, e.g. '/v1/infoprices/subscriptions'.
  * @param {object} subscriptionArgs - Arguments that detail the subscription.
  * @param {number} [subscriptionArgs.RefreshRate=1000] - The data refresh rate (passed to OpenAPI).
  * @param {string} [subscriptionArgs.Tag] - The tag for the subscription (passed to OpenAPI).
  * @param {string} [subscriptionArgs.Format] - The format for the subscription (passed to OpenAPI).
  * @param {object} [subscriptionArgs.Arguments] - The subscription arguments (passed to OpenAPI).
  * @param {function} onUpdate - A callback function that is invoked when an initial snapshot or update is received.
  *                              The first argument will be the data received and the second argument will either be
  *                              subscription.UPDATE_TYPE_DELTA or subscription.UPDATE_TYPE_SNAPSHOT
  * @param {function} onError - A callback function that is invoked when an error occurs.
  * @returns {iit.openapi.StreamingSubscription} A subscription object.
  */
  Streaming.prototype.createSubscription = function (serviceGroup, url, subscriptionArgs, onUpdate, onError) {
    var subscription = new _Subscription(this.contextId, this.transport, serviceGroup, url, subscriptionArgs, onSubscriptionCreated.bind(this), onUpdate, onError);
    this.subscriptions.push(subscription);
    // set the subscription to connection unavailable, the subscription will then subscribe when the connection becomes available.
    if (this.connectionState !== this.CONNECTION_STATE_CONNECTED) {
      subscription.onConnectionUnavailable();
    }
    subscription.onSubscribe();
    return subscription;
  };
  /**
  * Makes a subscription start
  *
  * @param {iit.openapi.StreamingSubscription} subscription - The subscription to start.
  */
  Streaming.prototype.subscribe = function (subscription) {
    subscription.onSubscribe();
  };
  /**
  * Makes a subscription stop (can be restarted). See {@link iit.openapi.Streaming#disposeSubscription} for permanently stopping a subscription.
  *
  * @param {iit.openapi.StreamingSubscription} subscription - The subscription to stop.
  */
  Streaming.prototype.unsubscribe = function (subscription) {
    subscription.onUnsubscribe();
  };
  /**
  * Disposes a subscription permanently. It will be stopped and not be able to be started.
  *
  * @param {iit.openapi.StreamingSubscription} subscription - The subscription to stop and remove.
  */
  Streaming.prototype.disposeSubscription = function (subscription) {
    subscription.onUnsubscribe();
    var indexOfSubscription = this.subscriptions.indexOf(subscription);
    if (indexOfSubscription >= 0) {
      this.subscriptions.splice(indexOfSubscription, 1);
    }
  };
  /**
  * This disconnects the current socket. We will follow normal reconnection logic to try and restore the connection.
  * It *will not* stop the subscription (see dispose for that). It is useful for testing reconnect logic works or for resetting all subscriptions.
  */
  Streaming.prototype.disconnect = function () {
    this.connection.stop();
  };
  /**
  * Shuts down streaming.
  */
  Streaming.prototype.dispose = function () {
    this.disposed = true;
    this.heartbeater.stop();
    this.orphanFinder.stop();
    for (var i = 0, subscription = undefined; subscription = this.subscriptions[i]; i++) {
      subscription.onUnsubscribe();
    }
    this.subscriptions.length = 0;
    this.disconnect();
  };
  //Streaming.prototype.unsubscribeByTag = function() {
  // todo this function
  // per service group
  //   are we already doing a tag operation?
  //     clear any subscriptions nextOperations
  //     record this tag operation as the next one to do.
  //   else are any subscriptions transitioning?
  //     do individually
  //   else send as tag
  //     tell each subscription it is transitioning
  //     when response confirmed..
  //       are we waiting on a tag operation?
  //         are any subscriptions awaiting individual actions?
  //           those that are not awaiting individual, schedule individual equalling next tag operation
  //         else none are awaiting individual actions
  //           tell each subscription it is transitioning
  //           perform next tag operation
  //           return early
  //       tell each subscription it is transitioned to x and allow it to do the next action if it has one
  // todo other functions
  //      detect a new subscription for a tag that is currently being transitioned?
  //      await end of current operation and subscribe before rest of processing above
  //};
  //-- Export section --
  exports = Streaming;
  return exports;
}({}, iit_micro_emitter, iit_openapi_streaming_subscription, iit_openapi_streaming_heartbeater, iit_openapi_streaming_orphan_finder, iit_log, iit_utils_string);
iit_openapi_packagejs = function (exports, _iitUtilsEnum, _iitUtilsFunction, _iitUtilsObject, _iitUtilsString, _iitUtilsFetch, _iitPriceFormattingPriceFormatting, _iitPriceFormattingFormatOptions, _iitNumberFormattingNumberFormatting, _iitLog, _iitMicroEmitter, _iitOpenapiBatchUtil, _iitOpenapiTransportCore, _iitOpenapiTransportAuth, _iitOpenapiTransportBatch, _iitOpenapiTransportQueue, _iitOpenapiStreamingStreaming, _iitOpenapiStreamingHeartbeater, _iitOpenapiStreamingOrphanFinder, _iitOpenapiStreamingSubscription) {
  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  }
  var _utils_fetch = _interopRequire(_iitUtilsFetch);
  exports = {
    log: _iitLog,
    microEmitter: _iitMicroEmitter,
    NumberFormatting: _iitNumberFormattingNumberFormatting,
    PriceFormatting: _iitPriceFormattingPriceFormatting,
    priceFormatOptions: _iitPriceFormattingFormatOptions,
    openapi: {
      batch: _iitOpenapiBatchUtil,
      TransportCore: _iitOpenapiTransportCore,
      TransportAuth: _iitOpenapiTransportAuth,
      TransportBatch: _iitOpenapiTransportBatch,
      TransportQueue: _iitOpenapiTransportQueue,
      Streaming: _iitOpenapiStreamingStreaming,
      // privates exposed for testing
      _StreamingHeartbeater: _iitOpenapiStreamingHeartbeater,
      _StreamingOrphanFinder: _iitOpenapiStreamingOrphanFinder,
      _StreamingSubscription: _iitOpenapiStreamingSubscription
    },
    utils: {
      'enum': _iitUtilsEnum,
      'function': _iitUtilsFunction,
      'object': _iitUtilsObject,
      'string': _iitUtilsString,
      fetch: _utils_fetch
    }
  };
  return exports;
}({}, iit_utils_enum, iit_utils_function, iit_utils_object, iit_utils_string, iit_utils_fetch, iit_price_formatting_price_formatting, iit_price_formatting_format_options, iit_number_formatting_number_formatting, iit_log, iit_micro_emitter, iit_openapi_batch_util, iit_openapi_transport_core, iit_openapi_transport_auth, iit_openapi_transport_batch, iit_openapi_transport_queue, iit_openapi_streaming_streaming, iit_openapi_streaming_heartbeater, iit_openapi_streaming_orphan_finder, iit_openapi_streaming_subscription);

	// umd definition. First check if requirejs is running
	if (typeof define === "function" && define.amd) {
		define([], function () { return iit_openapi_packagejs; });
	}
	else { // otherwise we expose globally
		global["iit"] = iit_openapi_packagejs;
	}
}(this, window.$));
