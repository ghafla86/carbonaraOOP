const regLength = /^[\w\d\s]{1,20}$/;

export class CheckedInput {
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

// W checkInput() sprawdzam czy w spanach toDoBoxow jest juz nazwa ktora chcemy wpisac
// Jesli nazwy ze spanow nie sa rowne wpisywanej wartosci zwracamy true lub
// dodajemy do jakiejs zmiennej 1
// Zastanowic sie dalej jak ogarnac przekazywanie errorInfo? Czy zostawiamy w CheckedInput
// czy kleimy to razem gdzies indziej (sprawdzenie inputa i errorInfo)

// error trzeba gdzies 	pushowac bo jak dostane true w addTask
// to juz stworzy boxa. Error musi byc gdzies przechowany i pozniej
// wydobyty odpowiedni, tak aby zgadzał sie komunikat.
