let pushBtn = document.querySelector('#push');
let newInput = document.querySelector('.new-task input');
let tasks__inner = document.querySelector('.tasks__inner');
let doTask = document.querySelector('.do');
let progressTask = document.querySelector('.progress');
let doneTask = document.querySelector('.done');

let tasks = [];
let doTasks = [];
let progressTasks = [];
let donetTasks = [];
let tmpTask = {};
let loader = document.querySelector('.loader');

window.onload = () => {
	checkEmptyTasks();
	getData();
	console.log(tasks);
	pushBtn.addEventListener('click', () => {
		if (newInput.value == '') {
			alert('Будь ласка введіть справу');
		} else {
			addTasks();
			checkEmptyTasks();
			newInput.value = '';
		}
	});
};

const addTasks = () => {
	let cusId = Date.now();
	let dateOne = new Date().toLocaleDateString('en-GB');
	let tmp = {
		id: cusId,
		name: newInput.value,
		date: dateOne,
		status: 'do',
	};
	tasks.push(tmp);
	doTasks.push(tmp);
	getHtmlData(tmp);
	toProgress();
	delTask();
	toDone();
	tmp = {};
	localStorage.setItem('tasks', JSON.stringify(tasks));
	checkEmptyTasks();
};

const delTask = () => {
	let delBtn = document.querySelectorAll('.delete');
	delBtn.forEach(item => {
		item.addEventListener('click', event => {
			try {
				let tmpId = event.target.id;
				tasks = tasks.filter(e => e.id != tmpId);
				item.parentNode.remove();
				console.log('remove tasks', tasks);
				localStorage.clear();
				localStorage.setItem('tasks', JSON.stringify(tasks));
				doTasks = tasks.filter(e => e.status == 'do');
				progressTasks = tasks.filter(e => e.status == 'progress');
				donetTasks = tasks.filter(e => e.status == 'done');
				toProgress();
				toDone();
				checkEmptyTasks();
			} catch (e) {
				alert(e);
			}
		});
	});
};

const toProgress = item => {
	let toProgressBtn = document.querySelectorAll('.to-progress');
	toProgressBtn.forEach(item => {
		item.addEventListener('click', event => {
			try {
				console.log('click');
				let tmpId = event.target.id;
				tmpTask = tasks.filter(e => e.id == tmpId);
				tmpTask[0].status = 'progress';
				tasks = tasks.filter(e => e.id != tmpId);
				tasks.push(tmpTask[0]);
				item.parentNode.remove();
				localStorage.clear();
				localStorage.setItem('tasks', JSON.stringify(tasks));
				doTasks = tasks.filter(e => e.status == 'do');
				progressTasks = tasks.filter(e => e.status == 'progress');
				donetTasks = tasks.filter(e => e.status == 'done');
				checkEmptyTasks();
				getHtmlData(tmpTask[0]);
				delTask();
				toDone();
				tmpTask = {};
			} catch (e) {
				alert(e);
			}
		});
	});
};

const toDone = () => {
	let toProgressBtn = document.querySelectorAll('.to-done');
	toProgressBtn.forEach(item => {
		item.addEventListener('click', event => {
			try {
				console.log(1);
				let tmpId = event.target.id;
				console.log(tmpId);
				tmpTask = tasks.filter(e => e.id == tmpId);
				tmpTask[0].status = 'done';
				console.log(tmpTask[0]);
				tasks = tasks.filter(e => e.id != tmpId);
				tasks.push(tmpTask[0]);
				getHtmlData(tmpTask[0]);
				tmpTask = {};
				item.parentNode.remove();
				localStorage.clear();
				localStorage.setItem('tasks', JSON.stringify(tasks));
				doTasks = tasks.filter(e => e.status == 'do');
				progressTasks = tasks.filter(e => e.status == 'progress');
				donetTasks = tasks.filter(e => e.status == 'done');
				checkEmptyTasks();
				toProgress();
				delTask();
			} catch (e) {
				alert(e);
			}
		});
	});
};

const checkEmptyTasks = () => {
	let noMsg = document.getElementById('no-msg');
	loader.style.display = 'flex';
	if (tasks.length > 0) {
		loader.style.display = 'none';
		noMsg.style.display = 'none';
		tasks__inner.style.display = 'block';
	} else {
		loader.style.display = 'none';
		noMsg.style.display = 'block';
		tasks__inner.style.display = 'none';
	}
	if (doTasks.length > 0) {
		doTask.style.display = 'block';
	} else {
		doTask.style.display = 'none';
	}
	if (progressTasks.length > 0) {
		progressTask.style.display = 'block';
	} else {
		console.log(progressTasks.length);
		progressTask.style.display = 'none';
	}
	if (donetTasks.length > 0) {
		doneTask.style.display = 'block';
	} else {
		doneTask.style.display = 'none';
	}
};

const getData = item => {
	if (localStorage.getItem('tasks')) {
		try {
			loader.style.display = 'none';
			tasks = JSON.parse(localStorage.getItem('tasks'));
			tasks.forEach(event => {
				console.log(1);
				getHtmlData(event);
			});
			doTasks = tasks.filter(e => e.status == 'do');
			progressTasks = tasks.filter(e => e.status == 'progress');
			donetTasks = tasks.filter(e => e.status == 'done');
			toProgress();
			delTask();
			toDone();
			checkEmptyTasks();
		} catch (e) {
			loader.style.display = 'none';
			console.log(e);
		}
	}
};
const getHtmlData = value => {
	if (value.status == 'do') {
		document.querySelector('.tasks .' + value.status + '').innerHTML += `
		<div class="task">
		<span > ${value.name}</span>
		<span class="date">${value.date}</span>
		<button  id="${value.id}" class="to-progress"> <i class="fa fa-play"></i></button>
		<button  id="${value.id}" class="delete"> <i  class="fa fa-trash-alt"></i></button>
	</div>`;
	} else if (value.status == 'progress') {
		document.querySelector('.tasks .' + value.status + '').innerHTML += `
		<div class="task">
		<span > ${value.name}</span>
		<span class="date">${value.date}</span>
		<button  id="${value.id}" class="to-done"> <i class="fa fa-check-double"></i></button>
		<button  id="${value.id}" class="delete"> <i  class="fa fa-trash-alt"></i></button>
	</div>`;
	} else if (value.status == 'done') {
		document.querySelector('.tasks .' + value.status + '').innerHTML += `
		<div class="task">
		<span > ${value.name}</span>
		<span class="date">${value.date}</span>
		<button  id="${value.id}" class="delete"> <i  class="fa fa-trash-alt"></i></button>
	</div>`;
	}
};
