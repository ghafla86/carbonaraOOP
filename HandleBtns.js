import { CheckedInput } from './CheckedInput.js';
import { ErrorInfo } from './ErrorInfo.js';

// const editTaskInputData = new InputData('.todo__edit-input', '.done');

export class HandleBtns {
	span;
	constructor(shadowBox, editMenu) {
		this.shadow = document.querySelector(shadowBox);
		this.editMenu = document.querySelector(editMenu);

		// this.newToDoBox = rootBox;
		// console.log(this.newToDoBox);
	}

	setToDoBoxListeners(rootBox, toDoBoxBtn) {
		const btns = rootBox.querySelectorAll(toDoBoxBtn);
		// console.log(boxes);

		btns.forEach((btn) => {
			if (btn.classList.contains('done') && !btn.classList.contains('btn-active')) {
				// console.log(btn);
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
		// console.log(editMenuBtns);
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
		// this.editErrorField.style.display = 'none';
		this.editMenu.classList.add('edit-menu-active');
		this.shadow.classList.add('shadow-active');
		const box = e.target.closest('.todo__body-box');
		const boxSpan = box.querySelector('span');
		// const spanDataNmbr = boxSpan.getAttribute('data-set');
		window.span = boxSpan;
		console.log(this.span);
		console.log(this);
		console.log('ok');
		const editInput = document.querySelector('.todo__edit-input');
		editInput.value = this.span.textContent;
		// this.spanNmbr = spanDataNmbr;
		// console.log('open edit');
	}

	changeTask(e) {
		const editInput = document.querySelector('.todo__edit-input');

		console.log(this);
		window.span.textContent = editInput.value;
		// console.log(this.spanNmbr);
		// const checkedInput = new CheckedInput(editInput.value, '.todo__body-box-span');
		// const checkedName = checkedInput.checkedName;
		// const checkedNameLength = checkedInput.checkedNameLength;

		// if (checkedName.flagNotDuplicated && checkedNameLength.flagLength) {
		// 	this.span.textContent = editInput.value;
		// 	this.closeToDoEditMenu();
		// } else if (!checkedName.flagNotDuplicated) {
		// 	const errorInfo = new ErrorInfo('.todo__edit-error', checkedName.error);
		// 	console.log('nok duplicated');
		// } else if (!checkedNameLength.flagLength) {
		// 	const errorInfo = new ErrorInfo('.todo__edit-error', checkedNameLength.error);
		// 	console.log('nok length');
		// }
		// console.log(this.span.getAttribute('data-set'));
		// console.log(this.span);
		// if(this.span)
		// this.closeToDoEditMenu();
		// editInput.value = '';
	}

	closeToDoEditMenu() {
		this.shadow.classList.remove('shadow-active');
		this.editMenu.classList.remove('edit-menu-active');

		// console.log('close');
	}

	deleteTask(e) {
		// console.log('delete');
		e.target.closest('.todo__body-box').remove();
	}
}

/* Klasa bedzie musiała:
1) zatwierdzac wykonanie zadania
	a) trzeba ustawic nasluchiwanie na przycisk, OK
	b) po nacisnieciu napis ma byc przekreslony OK
	
2) otwierać menu do zmiany 
	a) ustawic display:flex na klasie '.todo__edit-menu' aby menu bylo widoczne ok
	b) ustawic display:block na klasie '.todo_shadow' ok

	* ew. obslugiwac zmiane tresci zadania ok

3) usuwać zadanie ok

4) zmieniac tresc toDoTaska ok 
	a) powinna tez robic sprawdzenie poprawnosci wpisu(długosc, duplikacja, pusty)

*/
