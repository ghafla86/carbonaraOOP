'use strict';
// function Shop(name, address) {
// 	this.name = name;
// 	this.address = address;
// 	this.shoppingCart = [];
// }

// Shop.prototype.addToCart = function (name, price) {
// 	this.shoppingCart.push(name, price);
// };

// function Pharmacy(name, address) {
// 	Shop.call(this, name, address);
// }

// const apteka = new Pharmacy('apteka', 'sienkiewicza');
// const szop = new Shop('apteka', 'sienkiewicza');

// szop.addToCart('elo', 'lolo');

// console.log(Pharmacy);

/* 
klasa dla:
1. wyciagania danych z inputa
2. budowy boxa z taskiem
3. akcji na buttony w boxie
4. edycji taska
 */

class InputData {
	constructor(inputSelector, btnSelector) {
		// this.inputValue = '';
		this.input = document.querySelector(inputSelector);
		this.btn = document.querySelector(btnSelector);
		this.btn.addEventListener('click', this.setInputValue.bind(this));
		this.btn.addEventListener('click', this.getInputValue.bind(this));
	}
	getInputValue() {
		// console.log(this.inputValue);
		return this.inputValue;
	}
	setInputValue() {
		// console.log(this.input.value);
		this.inputValue = this.input.value;
		console.log('oky');
	}

	// getInputValue() bedzie przekazywalo dane z inputa do boxa
}

const inputData = new InputData('.todo__header-input', '.todo__header-btn');
// const editInputData = new InputData('.todo__edit-input', '.done');
console.log(inputData);

class NewBox {
	constructor(container, boxNmbr, inputData) {
		const rootBox = this.createRootBox(boxNmbr);
		this.createSpan(rootBox, inputData);
		this.createButtons(rootBox);
		this.placeBoxInContainer(container, rootBox);
	}

	createRootBox(boxNmbr) {
		const rootBox = document.createElement('div');
		rootBox.classList.add('todo__body-box');
		rootBox.setAttribute('data-box', boxNmbr);
		return rootBox;
	}

	createSpan(rootBox, inputData) {
		const span = document.createElement('span');
		span.classList.add('todo__body-box-span');
		span.textContent = inputData;
		rootBox.append(span);
	}

	createButtons(rootBox) {
		console.log(this.createButton);
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

const btnIcons = {
	doneIcon: `<i class='fa-solid fa-check'></i>`,
	editIcon: `<i class='fa-solid fa-book-open'>`,
	deleteIcon: `<i class='fa-solid fa-xmark'></i>`,
};
// icony bedzie mozna exportowac z osobnego pliku

const newBox = new NewBox('.todo__body', 1);
