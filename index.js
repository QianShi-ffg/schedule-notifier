const notifier = require('node-notifier');
const schedule = require('node-schedule');

notifier.notify('Message');
const scheduleCronstyle = () => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('0 0,30 9-20 * * 1-5', () => {
    console.log('scheduleCronstyle:' + new Date());

    // Object
    notifier.notify({
      title: '我的通知',
      message: '久坐提醒!'
    });
  });
}

scheduleCronstyle();
// String
