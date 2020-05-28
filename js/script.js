window.addEventListener("DOMContentLoaded", function () {
	"use strict";
	let tab = document.querySelectorAll(".info-header-tab"),
		info = document.querySelector(".info-header"),
		tabContent = document.querySelectorAll(".info-tabcontent");

	function hideTabCintent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		}
	}
	hideTabCintent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		}
	}
	info.addEventListener("click", function (event) {
		let target = event.target;
		if (target && target.classList.contains("info-header-tab")) {
			for (let i = 0; i < tab.length; i++) {
				if (target === tab[i]) {
					hideTabCintent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	// Timer

	let deadline = "2020-05-29 10:10:30";

	function getTimeRamaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor(t / (1000 * 60 * 60));

		return {
			total: t,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds"),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRamaining(endtime),
				hourz = t.hours.toString(),
				minutez = t.minutes.toString(),
				secondz = t.seconds.toString();
			if (hourz.length === 1) {
				hours.textContent = "0" + t.hours;
			} else {
				hours.textContent = t.hours;
			}
			if (minutez.length === 1) {
				minutes.textContent = "0" + t.minutes;
			} else {
				minutes.textContent = t.minutes;
			}
			if (secondz.length === 1) {
				seconds.textContent = "0" + t.seconds;
			} else {
				seconds.textContent = t.seconds;
			}
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock("timer", deadline);

	//Modal

	let more = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		close = document.querySelector(".popup-close"),
		description = document.querySelectorAll(".description-btn");

	more.addEventListener("click", function () {
		overlay.style.display = "block";
		this.classList.add("more-splash");
		document.body.style.overflow = "hidden";
	});
	close.addEventListener("click", function () {
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = "";
	});
	for (let i = 0; i < description.length; i++) {
		description[i].addEventListener("click", function () {
			overlay.style.display = "block";
			this.classList.add("more-splash");
			document.body.style.overflow = "hidden";
		});
	}

	/// Form sending

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
});
