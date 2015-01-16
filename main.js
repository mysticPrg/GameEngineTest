var key_def = {
	LEFT: 37,
	RIGHT: 39
};

var data = [
	{
		id: 'asdwqras214safr523',
		key: key_def.LEFT,
		func: 'move',
		args: ['Monster', 'left']
	},
	{
		id: 'asdwqras214safr523',
		key: key_def.LEFT,
		func: 'move',
		args: ['Sistar', 'left']
	},
	{
		id: 'asdwqras214safr523',
		key: key_def.RIGHT,
		func: 'move',
		args: ['Monster', 'right']
	}
];

var key_table = {};
var key_state = {};

function move(obj, direction) {
	console.log(obj + ' is move to ' + direction);
}

function init(data) {
	var i;
	for (i = 0; i < data.length; i++) {
		if (!key_table[data[i].key]) {
			key_table[data[i].key] = [];
		}
		key_table[data[i].key].push(data[i]);
	}

	key_init();
}

function key_init() {

	var k;
	for (k in key_def) {
		key_state[key_def[k]] = false;
	}

	$(document).on('keydown', function (e) {
		if (key_state[e.keyCode] !== undefined) {
			key_state[e.keyCode] = true;
		}
	});

	$(document).on('keyup', function (e) {
		if (key_state[e.keyCode] !== undefined) {
			key_state[e.keyCode] = false;
		}
	});
}

function key_proc(data) {
	var i, j;
	for (i = 0; i < data.length; i++) {
		if (key_state[data[i].key]) {
			window[data[i].func].apply(this, data[i].args);
		}
	}
}

function loop() {
	var k;
	var events;
	for (k in key_table) {
		events = key_table[k];

		if (events) {
			key_proc(events);
		}
	}
}

$(document).ready(function () {
	init(data);
	setInterval(loop, 33);
});