function form() {
	let message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы свами свяжемся!",
		failure: "Что-то пошло не так...",
	};

	let form = document.querySelector(".main-form"),
		contact = document.querySelector("#form"),
		input = document.getElementsByTagName("input"),
		statusMessage = document.createElement("div");
	statusMessage.classList.add("status");

	function sendForm(elem) {
		elem.addEventListener("submit", function (event) {
			event.preventDefault();
			elem.append(statusMessage);
			let formData = new FormData(elem);

			function postData(data) {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();

					request.open("POST", "server.php");

					request.setRequestHeader(
						"Content-Type",
						"application/application/json; charser=utf-8"
					);

					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve();
						} else if (
							request.readyState === 4 &&
							request.status == 200
						) {
							resolve();
						} else {
							reject();
						}
					};
					request.send(data);
				});
			}

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = "";
				}
			}

			postData(formData)
				.then(() => (statusMessage.innerHTML = message.loading))
				.then(() => (statusMessage.innerHTML = message.success))
				.catch(() => (statusMessage.innerHTML = message.failure))
				.finally(clearInput);
		});
	}

	sendForm(form);
	sendForm(contact);
}

module.exports = form;
