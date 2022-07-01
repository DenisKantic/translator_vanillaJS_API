import { countries } from "./languagecodes.js";

const translateFrom = document.querySelector(".translateFrom");
const translateTo = document.querySelector(".translateTo");
const buttonTranslate = document.querySelector(".button-translate");
const translateResult = document.querySelector(".translateResult");
const translateSearch = document.querySelector(".translateSearch");
const error = document.querySelector(".error");

for (let langCode in countries) {
	const option = document.createElement("option");
	option.value = langCode;
	option.textContent = countries[langCode];

	translateTo.appendChild(option.cloneNode(true));
	translateFrom.appendChild(option.cloneNode(true));
}

buttonTranslate.addEventListener("click", () => {
	const seach = translateSearch.value.trim();

	if (seach.length >= 1) {
		fetch(
			`https://api.mymemory.translated.net/get?q=${seach}&langpair=${translateFrom.value}|${translateTo.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				translateResult.textContent = data.responseData.translatedText;
			});
	} else {
		error.textContent =
			"please enter a text to translate and a language to translate to";
		setTimeout(() => {
			error.textContent = "";
		}, 2000);
	}
});
