import { NewBox } from './NewBox.js';
import { BtnIcons } from './btnIcons.js';
import { CheckedInput } from './CheckedInput.js';
import { ErrorInfo } from './ErrorInfo.js';
import { InputData } from './InputData.js';

/* 
klasa dla:
1. wyciagania danych z inputa ok
2. budowy boxa z taskiem ok
3. akcji na buttony w boxie
4. edycji taska
5. jakie errory?? ok
	a> brak nazwy
	b> nazwa zadania juz istnieje
	c> za długa nazwa zadania
 */

const addTaskBtn = document.querySelector('.todo__header-btn');
const addTaskInput = document.querySelector('.todo__header-input');
const errorField = document.querySelector('.todo__body-error');
const addTaskInputData = new InputData('.todo__header-input', '.todo__header-btn');
// const closeBtn = document.querySelector('.cancel');
// const shadow = document.querySelector('.todo__shadow');
// const editMenu = document.querySelector('.todo__edit-menu');

// const closeMenu = () => {
// 	shadow.classList.remove('shadow-active');
// 	editMenu.classList.remove('edit-menu-active');
// };

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
// closeBtn.addEventListener('click', closeMenu);

// const box = document.querySelector('.todo__body-box');

// const finishTask = (e) => {
// 	e.stopPropagation();
// 	console.log(e.target);
// 	if (e.target === ) {

// 	}
// };

// box.addEventListener('click', finishTask);
