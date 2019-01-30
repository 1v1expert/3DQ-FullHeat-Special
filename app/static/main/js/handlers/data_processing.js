/* Processing data module */
/* This file is part of the 3DPrinter Project

   __author__ = 'Sazonov Vladislav Sergeevich <1v1expert@gmail.com>'
   __copyright__ = 'Copyright (C) 2018 VLADDOS'
   __license__ = 'GNU General Public License v2 http://www.gnu.org/licenses/gpl2.html'
*/

var global = window || this;
global.global_state = null;

var UpdateTemps = function (temps) {
    "use strict";
    if (temps.bed){
        $('#pie_chart_3').find('.percents').text(temps.bed.actual);
        var tempbed = temps.bed.actual * 100 / temps.bed.target;
  		if (temps.bed.target === 0) {
            tempbed = temps.bed.actual * 100 / Definition.Target;
        }
  		$('#pie_chart_3').data('easyPieChart').update(tempbed);
  		$('#degres_3').text('/' + temps.bed.target + '°');
	}

	if (temps.tool0) {
        $('#pie_chart_1').find('.percents').text(temps.tool0.actual);
        var temptool = temps.tool0.actual * 100 / temps.tool0.target;
        if (temps.tool0.target === 0) {
            temptool = temps.tool0.actual * 100 / Definition.Target;
        }
        $('#pie_chart_1').data('easyPieChart').update(temptool);
        $('#degres_1').text('/' + temps.tool0.target + '°');
    }
  			//$('#pie_chart_1').find('.percent').text(response.temperature.tool0.actual);
};
function CancelPrint() {
    "use strict";
    $('#estimatedPrintTime').text('');
    $('#printTime').text('');
    $('#file_name').text('');
    $('#progress')
        .css('width', '0%')
        .html('');
}
function ShowTime(totalSeconds) {
    "use strict";
    this.totalSeconds = Number(totalSeconds);
    this.hours = Math.floor(this.totalSeconds / 3600);
    this.totalSeconds %= 3600;
    this.minutes = Math.floor(this.totalSeconds / 60);
    this.seconds = this.totalSeconds % 60;
    //return this.hours + ':' + this.minutes + ':' + this.seconds
}
ShowTime.prototype.toString = function() {
    "use strict";
    return this.hours + ':' + this.minutes + ':' + this.seconds;
};
var ShowPrintInfo = function (info) {
    "use strict";
    $('#estimatedPrintTime').text("Печатается: " + new ShowTime(info.progress.printTime).toString());
        //moment.unix(Number(info.progress.printTime)).utc().format('HH:mm:ss'));
    $('#printTime').text("Осталось: " + new ShowTime(info.progress.printTimeLeft).toString());
        //moment.unix(Number(info.progress.printTimeLeft)).utc().format('HHH:mm:ss'));
    $('#progress').html(Math.round(info.progress.completion) + '%');
    $('#progress').css('width', Math.round(info.progress.completion) + '%');
    $('#file_name').text("Файл: " + info.job.file.name);
    // name buttons
    $('#iconpause2').text(' Пауза#2');
    $('#iconpause').text(' Пауза#1');
};
function HandlerState(value) {
  "use strict";
  var state = value.state.text;
  var rus_state = (translate_state[state]) ? translate_state[state]: state;
  if (state === 'Printing') {
      ShowPrintInfo(value);
  }
  if (state === 'Pausing' || state === 'Paused') {
      $('#iconpause2').text(' Продолжить#2');
      $('#iconpause').text(' Продолжить#1');
  }
  if (state === global.global_state) {
      $('#status_print').text(rus_state);
  }
  else {
      Apps.Printer._state = state;
      $('#status_print').text(rus_state);
      PrinterState(rus_state);
      global.global_state = state;
      if (global.global_state === 'Printing' && state === 'Operational') {
          CancelPrint();
      }
  }
}
function CurrentEvent(value) {
    "use strict";
    if (value.temps.length){
        UpdateTemps(value.temps[0]);
    }
    if (value.state){
        HandlerState(value);
    }
    if (value.logs){
        Apps.logs.update(value);
    }
}

function ProcessingData(data) {
    "use strict";
    console.log(data);
    switch(data.event) {
        case 'event':
            switch (data.data.type){
                case 'PositionUpdate':
                    Apps._position.update(data.data);
                    break;
                case 'RegisteredMessageReceived':
                    Apps._offset_position.update(data.data);
                    break;
                case 'PrinterStateChanged':
                    Apps.Printer.MonitorState(data.data.payload.state_string);
                    break;
                case 'Disconnecting':
                    console.log('Disconnecting');
                    break;
                case 'Disconnected':
                    console.log('Disconnected');
                    break;
                default:
                    console.log("Untracked event - ", data);
            }
            break;
        case 'current':
            CurrentEvent(data.data);
            break;
        case 'history':
            Apps.logs.update(data.data);
        //case ''

    }
}