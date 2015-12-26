var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('I18n', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        date: {
          abbrDayNames: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ],
          abbrMonthNames: [
            null,
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          dayNames: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          formats: {
            default: '%Y-%m-%d',
            long: '%B %d, %Y',
            short: '%b %d'
          },
          monthNames: [
            null,
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          order: [
            'year',
            'month',
            'day'
          ]
        },
        time: {
          am: 'am',
          formats: {
            default: '%H:%M:%S %z',
            long: '%H:%M',
            meridiem: '%h:%M:%S %p %z',
            meridiemLong: '%h:%M %p',
          },
          pm: 'pm'
        },
        dateTime: {
          am: 'am',
          formats: {
            default: '%a, %d %b %Y %H:%M:%S %z',
            long: '%B %d, %Y %H:%M',
            short: '%d %b %H:%M'
          },
          pm: 'pm'
        },
        integer: {
          formats: {
            default: function(value){
              return '9,999,999';
            }, 
            customer: function(value){
              return '9,999,999 Customers';
            } 
          }
        },  
        decimal: {
          formats: {
            default: function(value){
              return '999.99';
            }, 
            currency: function(value){
              return '$ 999.99';
            }            
          }
        },  
        logic: {
          formats: {
            default: function(value){
              return 'yes';
            }, 
            up: function(value){
              return 'YES';
            }            
          }
        },
        parentPath: {
          childPath: 'message %{name}'   
        }
      })
      .I18n('en-US', {
        date: {
          formats: {
            default: '%Y %m %d', 
            year: '%Y YEAR'
          }
        },  
        integer: {
          formats: {
            default: function(value){
              return '9 999 999';
            }, 
            customer: function(value){
              return '9 999 999 Customers';
            }            
          }
        },  
        decimal: {
          formats: {
            default: function(value){
              return '999.99 USD';
            }, 
            currency: function(value){
              return '$ 999.99 USD';
            }            
          }
        },  
        logic: {
          formats: {
            default: function(value){
              return 'yes USD';
            }, 
            up: function(value){
              return 'YES USD';
            }
          }
        },  
        time: {
          am: 'am',
          pm: 'pm'
        },
        parentPath: {
          childPath: '%{name} message'   
        }
      });
  });

  it('#locale', function () {
    expect(I18n.locale).to.be('en');

    I18n.locale = 'en-US';
    expect(I18n.locale).to.be('en-US');
  });

  it('#translate', function () {
    I18n.locale = 'en';

    expect(I18n.translate('parentPath')).to.be('parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('message %{name}');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('message Name');

    I18n.locale = 'en-US';

    expect(I18n.translate('parentPath')).to.be('parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('%{name} message');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('Name message');
  });

  it('#localize', function () {
    var myDateBirth = new Date('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');
    var integer = 9999999;
    var decimal = 999.99;
    var logic = true;

    I18n.locale = 'en';

    expect(I18n.localize(myDateBirth)).to.be('1988-08-18');
    expect(I18n.localize(myDateBirth, {format: 'long'})).to.be('August 18, 1988');
    expect(I18n.localize(myDateBirth, {format: 'short'})).to.be('Aug 18');

    expect(I18n.localize(myDateBirth, {dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'long'})).to.be('18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');

    expect(I18n.localize(myDateBirth, {dateType: 'dateTime'})).to.be('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'dateTime', format: 'long'})).to.be('August 18, 1988 18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'dateTime', format: 'short'})).to.be('18 Aug 18:00');

    expect(I18n.localize(integer)).to.be('9,999,999');
    expect(I18n.localize(integer, 'customer')).to.be('9,999,999 Customers');
    expect(I18n.localize(decimal)).to.be('999.99');
    expect(I18n.localize(decimal, 'currency')).to.be('$ 999.99');
    expect(I18n.localize(logic)).to.be('yes');
    expect(I18n.localize(logic, 'up')).to.be('YES');


    I18n.locale = 'en-US';

    expect(I18n.localize(date)).to.be('2015 01 01');
    expect(I18n.localize(integer)).to.be('9 999 999');
    expect(I18n.localize(integer, 'customer')).to.be('9 999 999 Customers');
    expect(I18n.localize(decimal)).to.be('999.99 USD');
    expect(I18n.localize(decimal, 'currency')).to.be('$ 999.99 USD');
    expect(I18n.localize(logic)).to.be('yes USD');
    expect(I18n.localize(logic, 'up')).to.be('YES USD');
  });

  it('#t', function () {
    expect(I18n.t.toString()).to.be(I18n.translate.toString());
  });

  it('#l', function () {
    expect(I18n.l.toString()).to.be(I18n.localize.toString());
  });

});