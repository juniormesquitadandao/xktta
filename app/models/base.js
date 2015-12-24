var Xikitita = {window: this};

Object.defineProperty(Xikitita, 'init', {
  get: function(){
    this.models = {};
    this.inflection = { singular: {}, plural: {} };
    this.translations = {};
    this.validators = {};

    eval.call(this.window, "var I18n;");
    I18n = {
      locale: 'en',
      translate: function(path, params){
        var translation = path;
        var translations = Xikitita.translations[I18n.locale];
        path.split('.').forEach(function(key){
          translations = translations[key];
        });

        if(typeof translations  === 'string'){
          translation = translations;
          params = params || {};
          Object.keys(params).forEach(function(param) {
            translation = translation.replace(new RegExp('#{' + param + '}', 'ig'), params[param]);
          });
        }

        return translation;
      },
      localize: function(value, format){
        format = format || 'default';
        var formatted = value;

        if(typeof value === 'object' && value.constructor.name === 'Date'){
          formatted = Xikitita.translations[I18n.locale].date[format](value);
        }
        else if(typeof value === 'number' ){
          
          var functionFormat = Xikitita.translations[I18n.locale].integer[format];
          if(/\./.test(value)){
            functionFormat = Xikitita.translations[I18n.locale].decimal[format];
          }
          formatted = functionFormat(value);

        }
        else if(typeof value === 'boolean' ){
          formatted = Xikitita.translations[I18n.locale].logic[format](value);
        }

        return formatted;
      }
    }

    I18n.t = I18n.translate
    I18n.l = I18n.localize

    this.Validator('presence', 'blank', function(value, attrName, instance, options){
      return value !== null;
    });

    return this;
  }
});