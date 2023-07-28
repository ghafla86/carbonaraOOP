export class InputData {
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
