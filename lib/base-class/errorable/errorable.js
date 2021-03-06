angular
  .module('BaseClass')
  .factory('BCErrorable', [function() {
    return function Errorable() {
      var _errors = {};

      privateVariable(_errors, 'add', function add(fieldName, errorMessage) {
        if (_.isUndefined(_errors[fieldName])) _errors[fieldName] = [];
        if (!_.include(_errors[fieldName], errorMessage)) {
          _errors[fieldName].push(errorMessage);
          _errors.count++;
        }
      });

      privateVariable(_errors, 'clear', function clear(fieldName, message) {
        if (!_.isUndefined(message)) {
          removeErrorForField(fieldName, message);
        } else {
          var toClear = [];

          if (_.isArray(fieldName))     toClear = fieldName;
          if (_.isString(fieldName))    toClear.push(fieldName);
          if (_.isUndefined(fieldName)) toClear = _.keys(_errors);

          _.each(toClear, function(field) { removeAllErrorsForField(field); });
        }
      });

      privateVariable(_errors, 'countFor', function countFor(fieldName) {
        if (_.isUndefined(fieldName)) return _errors.count;
        return _errors[fieldName] ? _errors[fieldName].length : 0;
      });

      function removeAllErrorsForField(field) {
        delete _errors[field];
        _errors.count--;
      }

      function removeErrorForField(field, message) {
        if (_.include(_errors[field], message)) {
          _.pull(_errors[field], message);
          _errors.count--;
          if (_errors[field].length === 0) delete _errors[field];
        }
      }

      privateVariable(_errors, 'count', 0);

      this.__$errors = _errors;
    }
  }]);
