import { HandleBtns } from './HandleBtns.js';

export class NewBox {
	constructor(container, inputData, btnIcons) {
		const rootBox = this.createRootBox();
		this.createSpan(rootBox, inputData);
		this.createButtons(rootBox, btnIcons);
		this.placeBoxInContainer(container, rootBox);
		// console.log(rootBox);
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
		// rootBox.setAttribute('data-box', 1);
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
		// console.log(this.createButton);
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
