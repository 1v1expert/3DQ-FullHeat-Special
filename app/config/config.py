# -*- coding: utf-8 -*-

PORT = 5001
cookie_secret = "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="
CONFIG = {
	"BaseUrl": "http://localhost:5000",
	"Login": "vladdos",
	"Password": "@WSX2wsx123",
	"Apikey": "5C761F424E5E46EE934DE9F683609B66"
}
translate_state = {
	"Operational": "Готов к печати",
	"Printing": "Идёт печать",
	"Paused": "Печать приостановлена",
	"Pausing": "В режиме паузы",
	"Error": "Ошибка",
	"Cancelling": "Печать отменена",
	"Offline": "Принтер отключен"
}
Definition = {
	"OffsetZ": {
		"StepChange": 0.05,
		"Command": "M206"
	},
	"Extrude": 5,
	"Target": 300
}
Temp = {
	"PLA": dict(Bed=70, Tool=200),
	"ABS": dict(Bed=70, Tool=200),
	"Default": dict(Bed=72, Tool=201),
}

buttons = {
	"OnPause": "M600",
	"CancPause": "M601",
	"OffsetZ": "M206",
	"General":
		[
			{
				"name": "Калибровка",
				"command": ["M206 Z0", "M666 X0 Y0 Z0", "G32", "G31", "G28", "G1 Z22.1 F2000", "G30 Y0", "M374", "M500", "G28"]
			},
			{
				"name": "M500",
				"command": "M500",
			}
		],
	"Aditional": []
}