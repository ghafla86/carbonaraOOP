const addTaskBtn = document.querySelector('.todo__header-btn');
const addTaskInput = document.querySelector('.todo__header-input');
const errorField = document.querySelector('.todo__body-error');
const addTaskInputData = new InputData('.todo__header-input', '.todo__header-btn');

const regLength = /^[\w\d\s]{1,20}$/;

class CheckedInput {
	constructor(inputDataValue, toDoNamesContainer) {
		const checkedName = this.checkInputName(toDoNamesContainer, inputDataValue);
		const checkedNameLength = this.checkNameLength(inputDataValue);

		return { checkedName, checkedNameLength };
	}

	checkInputName(toDoNamesContainer, inputDataValue) {
		const toDoSpans = document.querySelectorAll(toDoNamesContainer);
		let flagNotDuplicated;
		let error;
		if (!toDoSpans.length) {
			flagNotDuplicated = true;
		} else {
			toDoSpans.forEach((span) => {
				if (span.innerText === inputDataValue) {
					flagNotDuplicated = false;
					error = 'duplicated';
				} else flagNotDuplicated = true;
			});
		}

		return { flagNotDuplicated, error, toDoSpans };
	}

	checkNameLength(inputDataValue) {
		let flagLength;
		let error;
		if (inputDataValue === '') {
			flagLength = false;
			error = '';
		} else if (!regLength.test(inputDataValue)) {
			console.log(inputDataValue);
			flagLength = false;
			error = 'too long';

			console.log('ok');
		} else flagLength = true;

		return { flagLength, error };
	}
}

class NewBox {
	constructor(container, inputData, btnIcons) {
		const rootBox = this.createRootBox();
		this.createSpan(rootBox, inputData);
		this.createButtons(rootBox, btnIcons);
		this.placeBoxInContainer(container, rootBox);
		const boxesBtns = new HandleBtns('.todo__shadow', '.todo__edit-menu');

		boxesBtns.setToDoBoxListeners(rootBox, '.todo__body-box-btn');
		const editMenuBox = document.querySelector('.todo__edit-menu');

		if (!editMenuBox.classList.contains('btns-active')) {
			boxesBtns.setEditMenuListeners('.todo__edit-box-btn');
		}
	}

	createRootBox() {
		const rootBox = document.createElement('div');
		rootBox.classList.add('todo__body-box');
		return rootBox;
	}

	setAttributeNmbr(toDoSpans, spanNmbr) {
		const spans = document.querySelectorAll(toDoSpans);
		spans.forEach((span) => {
			span.setAttribute('data-set', spanNmbr);
			spanNmbr++;
		});
	}

	createSpan(rootBox, inputData) {
		const span = document.createElement('span');
		span.classList.add('todo__body-box-span');
		span.setAttribute('data-set', 1);
		span.textContent = inputData;
		rootBox.append(span);
	}

	createButtons(rootBox, btnIcons) {
		rootBox.append(this.createButton(btnIcons.doneIcon, 'done'));
		rootBox.append(this.createButton(btnIcons.editIcon, 'edit'));
		rootBox.append(this.createButton(btnIcons.deleteIcon, 'delete'));
	}

	createButton(btnIcon, btnClass) {
		const btn = document.createElement('button');
		btn.classList.add('todo__body-box-btn', btnClass);
		btn.innerHTML = btnIcon;
		return btn;
	}

	placeBoxInContainer(container, rootBox) {
		document.querySelector(container).append(rootBox);
	}
}

class HandleBtns {
	span;
	constructor(shadowBox, editMenu) {
		this.shadow = document.querySelector(shadowBox);
		this.editMenu = document.querySelector(editMenu);
	}

	setToDoBoxListeners(rootBox, toDoBoxBtn) {
		const btns = rootBox.querySelectorAll(toDoBoxBtn);

		btns.forEach((btn) => {
			if (btn.classList.contains('done') && !btn.classList.contains('btn-active')) {
				console.log('dupa');
				btn.classList.add('btn-active');
				btn.addEventListener('click', this.finishTask);
			} else if (btn.classList.contains('edit') && !btn.classList.contains('btn-active')) {
				btn.classList.add('btn-active');
				btn.addEventListener('click', (e) => this.openToDoEditMenu(e));
			} else if (btn.classList.contains('delete') && !btn.classList.contains('btn-active')) {
				btn.classList.add('btn-active');
				btn.addEventListener('click', this.deleteTask);
			}
		});
	}

	setEditMenuListeners(editMenuBtn) {
		const editMenuBtns = this.editMenu.querySelectorAll(editMenuBtn);
		this.editMenu.classList.add('btns-active');
		editMenuBtns.forEach((btn) => {
			if (btn.classList.contains('change')) {
				btn.addEventListener('click', () => {
					console.log(this);
					this.changeTask.apply(this);
				});
			} else if (btn.classList.contains('cancel')) {
				btn.addEventListener('click', () => this.closeToDoEditMenu());
			}
		});
	}

	finishTask(e) {
		const box = e.target.closest('.todo__body-box');
		const boxSpan = box.querySelector('span');
		boxSpan.classList.add('task-done');
	}

	openToDoEditMenu(e) {
		this.editMenu.classList.add('edit-menu-active');
		this.shadow.classList.add('shadow-active');
		const box = e.target.closest('.todo__body-box');
		const boxSpan = box.querySelector('span');
		this.span = boxSpan;
	}

	changeTask(e) {
		const editInput = document.querySelector('.todo__edit-input');

		this.span.textContent = editInput.value;
	}

	closeToDoEditMenu() {
		this.shadow.classList.remove('shadow-active');
		this.editMenu.classList.remove('edit-menu-active');
	}

	deleteTask(e) {
		e.target.closest('.todo__body-box').remove();
	}
}

const BtnIcons = {
	doneIcon: `<i class='fa-solid fa-check'></i>`,
	editIcon: `<i class='fa-solid fa-book-open'>`,
	deleteIcon: `<i class='fa-solid fa-xmark'></i>`,
};

class InputData {
	constructor(inputSelector, btnSelector) {
		this.input = document.querySelector(inputSelector);
		this.btn = document.querySelector(btnSelector);
		this.btn.addEventListener('click', this.getInputValue.bind(this));
	}

	getInputValue() {
		this.inputValue = this.input.value;
		return this.inputValue;
	}
}

class ErrorInfo {
	constructor(txtField, error) {
		const errorType = this.errorType(error);
		const errorField = this.fillErrorInfoField(txtField, errorType);
		// this.consoleLog(logMsg);
	}

	fillErrorInfoField(txtField, errorType) {
		const errorField = document.querySelector(txtField);
		errorField.innerHTML = errorType;
		errorField.style.display = 'block';
	}

	errorType(error) {
		switch (error) {
			case '':
				return 'Wpisz nazwę zadania.';
			case 'duplicated':
				return 'Taka nazwa zadania już istnieje. Wpisz inną.';
			case 'too long':
				return 'Nazwa zadania zbyt długa. Wpisz krótszą.';

			default:
				break;
		}
	}
}

const addTask = () => {
	const inputDataValue = addTaskInputData.getInputValue();
	const checkedInput = new CheckedInput(inputDataValue, '.todo__body-box-span');
	const checkedName = checkedInput.checkedName;
	const checkedNameLength = checkedInput.checkedNameLength;
	errorField.style.display = 'none';
	let spanNmbr = 1;

	if (checkedName.flagNotDuplicated && checkedNameLength.flagLength) {
		const newBox = new NewBox('.todo__body', inputDataValue, BtnIcons);
		newBox.setAttributeNmbr('.todo__body-box-span', spanNmbr);
	} else if (!checkedName.flagNotDuplicated) {
		const errorInfo = new ErrorInfo('.todo__body-error', checkedName.error);
		console.log('nok duplicated');
	} else if (!checkedNameLength.flagLength) {
		const errorInfo = new ErrorInfo('.todo__body-error', checkedNameLength.error);
		console.log('nok length');
	}
	addTaskInput.value = '';
};

addTaskBtn.addEventListener('click', addTask);
