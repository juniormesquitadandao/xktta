##Dowload

[1.0.1](https://rawgit.com/juniormesquitadandao/xktta/1.0.1/xktta.js "1.0.1")

or

[1.0.1.min](https://rawgit.com/juniormesquitadandao/xktta/1.0.1/xktta.min.js "1.0.1.min")

or

```html
<script src="https://rawgit.com/juniormesquitadandao/xktta/1.0.1/xktta.js"></script>

<script src="https://rawgit.com/juniormesquitadandao/xktta/1.0.1/xktta.min.js"></script>
```

or

```shell
bower install xktta --save-dev
```

or

```shell
npm install xktta --save-dev
```

##How to only Javascript
[application.js](https://github.com/juniormesquitadandao/xktta/blob/gh-pages/use-case/javascript/application.js "application.js")

[Example](http://juniormesquitadandao.github.io/xktta/use-case/javascript "Example")

[Source](https://github.com/juniormesquitadandao/xktta/blob/gh-pages/use-case/javascript "Source")

##How to with Angular
[application.js](https://github.com/juniormesquitadandao/xktta/blob/gh-pages/use-case/angular/application.js "application.js")

[Example](http://juniormesquitadandao.github.io/xktta/use-case/angular "Example")

[Source](https://github.com/juniormesquitadandao/xktta/blob/gh-pages/use-case/angular "Source")

##What's it?
Implementing Internationalization and Validation with Javascript. Based on the ebook Eloquent Javascript 2nd edition and Rails
```js
Xktta
  .init
  .Inflection(function(){
    irregular('singularWord', 'pluralWord');
  })
  //I18n: create as you like
  .I18n('locale', {
  })
  .I18n('otherLocale', {
  })
  //Validator: create as you like
  .Validator('CustomValidator', function(value, attrName, object, options){
  })
  //Class: create as you like
  .Class('ClassName', function(){
    attrAccessor('id');
  })
  .Class('OtherClassName', function(){
    attrAccessor('id', 'className');
  });

var className = new ClassName();
var otherClassName = new OtherClassName();
I18n.translate('path.subPath');
I18n.localize(new Date());
'singularWord'.pluralize;
[].isEmpty;
{}.toJson;
'{}'.asJson;
'#{first} #{last}'.interpolate({first: 'First', last: 'Last'});
```
##Use cases
#####Customer
######Design
```yml
Custormer:
  id: attribute
  name: attribute, required
  lastName: attribute, required
  document: attribute, required
  street: attribute, minimum 8 characters, maximum 16 characters
  district: attribute, minimum 8 characters, maximum 16 characters
  phone: attribute, minimum 9 digits
  user: hasOne association, persisted
  fullName: object method, '#{name} #{lastName}'
  className: class method, class name 
```
######Implementation
```js
Xktta
  .Class('Customer', function(){
    attrAccessor('id', 'name', 'lastName', 'document', 'street', 'district', 'phone', 'user');

    validatesPresenceOf('name', 'lastName');
    validates('document', {
      presence: true
    });
    validatesLengthOf('street', 'district', {
      in: [8, 16],
      allowNull: true}
    );
    validates('phone', { 
      presence: true,
      length: {
        minimum: 9
      }
    });
    validate('user', function(){
      return {
        success: object.user && typeof object.user.id === 'number',
        fail: {
          messageName: 'newRecord'
        }
      };
    });

    def('fullName', function(){
      return '#{name} #{lastName}'.interpolate(object);
    });

    defClass('className', function(){
      return __class__.name;
    });
  });
```
######How to
```js
var customer = new Customer();
```
[more](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/spec/models/xktta_spec.js#L503-L594 "Mocha Test Case")
#####User
######Design
```yml
User:
  id: attribute
  email: attribute, required
  custormer_id: attribute
  persona_id: attribute, required
  customer: belongsTo association
  persona: belongsTo association
```
######Implementation
```js
Xktta
  .Class('User', function(){
    attrAccessor('id', 'email', 'customer', 'persona');

    validatesPresenceOf('email', 'persona_id');
  });
```
######How to
```js
var user = new User();
```
[more](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/spec/models/xktta_spec.js#L596-L667 "Mocha Test Case")
#####Persona
######Design
```yml
Persona:
  id: attribute
  name: attribute, required
  users: hasMany association
```
######Implementation
```js
Xktta
  .Class('Persona', function(){
    attrAccessor('id', 'name', 'users');
    validatesPresenceOf('name');
  });
```
######How to
```js
var persona = new Persona();
```
[more](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/spec/models/xktta_spec.js#L669-L731 "Mocha Test Case")

##It works for you too?
#####Prepare
```js
Xktta
  .init
```
#####Setting up internal communication of lib
You must set the number of flection of the names of their classes to the lib be able to relate members and collections.
```js
  .Inflection(function(){
    irregular('fish', 'fish');
    irregular('person', 'people');
  })
```
You can verifying calling the following methods on String objects:
```js
'person'.pluralize;
'people'.singularize;
```

#####Nationalizing the output to client
You must set the output data for each language supported by your application. 
```js
  .I18n('en', {
  })
  .I18n('pt-BR', {
  })
```
> **I18n methods:**
> 
> - **locale=** set locale
> - **locale** return actual locale
> - **translate('path.sub_path',{})** return string by path 
> - **t(object ,{})** alias to translate method
> - **localize(object ,{})** convert object to string
> - **l(object ,{})** alias to localize method

######Nationalizing
You must choose one of the languages ​​supported by your application.
```js
I18n.locale = 'en';
```

######Nationalizing date
You must set expressions to convert data to string using an external library  or the following options.

> **Date Options:**
> 
> - **%a** convert to abbreviation day name
> - **%A** convert to day name
> - **%b** convert to abbreviation month name
> - **%B** convert to month name
> - **%d** convert to day number
> - **%m** convert to month number
> - **%Y** convert to year number

```js
    date: {
      formats: {
        default: '%Y-%m-%d',
        long: '%B %d, %Y',
        short: '%b %d',
        custom: function(value){
          return 'use external lib to format date';
        }
      }
    }
```
Now you can use the convert date objects to string according to the set language.
```js
var date = new Date();

I18n.localize(date);
I18n.localize(date, {format: 'short'});
I18n.localize(date, {format: 'custom'});
I18n.l(date);

date.localize();
date.l({format: 'long'});
```

######Nationalizing time
You must set expressions to convert time to string using an external library  or the following options.

> **Date Options:**
> 
> - **%h** convert to hour (12h)
> - **%H** convert to hour (24h)
> - **%M** convert to minute
> - **%S** convert to second
> - **%p** convert to meridiem (am/pm)
> - **%z** convert to zone

```js
    time: {
      am: 'am',
      formats: {
        default: '%H:%M:%S %z',
        long: '%H:%M',
        meridiem: '%h:%M:%S %p %z',
        meridiemLong: '%h:%M %p',
        custom: function(value){
          return 'use external lib to format time';
        }
      },
      pm: 'pm'
    }
```
Now you can use the convert time objects to string according to the set language.
```js
var time = new Date();

I18n.localize(time, {dateType: 'time'});
I18n.localize(time, {dateType: 'time', format: 'meridiem'});
I18n.localize(time, {dateType: 'time', format: 'custom'});
I18n.l(time, {dateType: 'time'});

time.localize({dateType: 'time'});
time.l({dateType: 'time', format: 'long'});
```

######Nationalizing datetime
You must set expressions to convert datetime to string using an external library or the following options.

> **Date Options:**
> 
> - **%a** convert to abbreviation day name
> - **%A** convert to day name
> - **%b** convert to abbreviation month name
> - **%B** convert to month name
> - **%d** convert to day number
> - **%m** convert to month number
> - **%Y** convert to year number
> - **%h** convert to hour (12h)
> - **%H** convert to hour (24h)
> - **%M** convert to minute
> - **%S** convert to second
> - **%p** convert to meridiem (am/pm)
> - **%z** convert to zone

```js
    datetime: {
      am: 'am',
      formats: {
        default: '%a, %d %b %Y %H:%M:%S %z',
        long: '%B %d, %Y %H:%M',
        short: '%d %b %H:%M',
        custom: function(value){
          return 'use external lib to format datetime';
        }
      },
      pm: 'pm'
    }
```
Now you can use the convert datetime objects to string according to the set language.
```js
var datetime = new Date();

I18n.localize(datetime, {dateType: 'datetime'});
I18n.localize(datetime, {dateType: 'datetime', format: 'meridiem'});
I18n.localize(datetime, {dateType: 'datetime', format: 'custom'});
I18n.l(datetime, {dateType: 'datetime'});

datetime.localize({dateType: 'datetime'});
datetime.l({dateType: 'datetime', format: 'long'});
```

######Nationalizing integer
You must set expressions to convert integer to string using an external library.
```js
    integer: {
      formats: {
        default: function(value){
          return 'use external lib to format integer';
        }
        other: function(value){
          return 'use external lib to other format integer';
        }
      }
    }
```
Now you can use the convert integer objects to string according to the set language.
```js
var integer = 9;

I18n.localize(integer);
I18n.l(integer, {format: 'other'});

integer.localize({format: 'other'});
integer.l();
```

######Nationalizing decimal
You must set expressions to convert decimal to string using an external library.
```js
    decimal: {
      formats: {
        default: function(value){
          return 'use external lib to format decimal';
        }
        other: function(value){
          return 'use external lib to other format decimal';
        }
      }
    }
```
Now you can use the convert decimal objects to string according to the set language.
```js
var decimal = 9.99;

I18n.localize(decimal, {forceDecimal: true});
I18n.l(decimal, {forceDecimal: true, format: 'other'});

decimal.localize({forceDecimal: true, format: 'other'});
decimal.l({forceDecimal: true});
```

######Nationalizing logic
You must set expressions to convert logic to string using an external library.
```js
    logic: {
      formats: {
        default: {
          true: 'No',
          false: 'Yes'
        },
        other: {
          true: 'NOT',
          false: 'OK'
        }
      }
    }
```
Now you can use the convert logic objects to string according to the set language.
```js
var logic = true;

I18n.localize(logic);
I18n.l(logic, {format: 'other'});

logic.localize({format: 'other'});
logic.l();
```

######Nationalizing message
You must set expressions to convert message to string.
```js
    messages: {
      one: 'Message One',
      two: 'Message Two'
      other: 'Message Other to %{name}'
    }
```
Now you can use the convert message objects to string according to the set language.
```js
I18n.translate('messages.one');
I18n.t('messages.two');

I18n.translate('messages.other', {name: 'Name'});
I18n.t('messages.other', {name: 'Name'});
```

> - [see code](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/app/models/i18n.js "code")
> - [see test](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/spec/models/i18n_spec.js "test")

######Building classes
You must build your classes using this function.
```js
  .Class('Stub', function(){
    attrAccessor('id', 'one', 'two');

    validatesLengthOf('one', {in: [1, 10]});
    validatesLengthOf('two', {is: 5});

    def('full', function(){
      return '#{one #{two}'.interpolate(object);
    });

    defClass('className', function(){
      return __class__.name;
    });
  })
  .Class('Stub2', function(){
    attrAccessor('ident');  
  })
```
Now you can build and use your objects.
```js
var stub2 = new Stub();
stub2.ident;
stub2.ident = 10;

var stub = new Stub();
stub.id;
stub.id = 10;
stub.one;
stub.one = 11;
stub.two;
stub.one = 3;

stub.isValid;
stub.errors;
stub.errors.messages;
stub.errors.full_messages;

var stub = new Stub({two: 3});
stub.changes;
stub.changes_id;
stub.changes_one;
stub.changes_two;

stub.changed;
stub.changed_id;
stub.changed_one;
stub.changed_two;

stub.reset;

stub.full();
Stub.className();

stub.toJson;
stub.asJson;
```

> - [see code](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/app/models/class.js "code")
> - [see test](https://github.com/juniormesquitadandao/xktta/blob/1.0.1/spec/models/class_spec.js "test")