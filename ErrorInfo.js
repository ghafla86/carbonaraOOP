export class ErrorInfo {
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
