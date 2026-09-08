const addRowBtns = document.querySelectorAll(".add-row");
let removeRowBtns = document.querySelectorAll(".icon-btn");
const outputTextArea = document.getElementById("jsonOutput");
const downloadButton = document.getElementById("downloadBtn");

addRowBtns.forEach((button) => {
	button.addEventListener("click", () => {
		const listGroupElement = button.closest(".list-group");
		const listItemsElement = listGroupElement.querySelector(".list-items");

		const newRow = document.createElement("li");
		newRow.classList.add("list-item");
		newRow.innerHTML = `					
					<input type="text" class="list-input" placeholder="Değer girin" />
					<button type="button" class="icon-btn">&times;</button>
                `;

		listItemsElement.appendChild(newRow);
		removeRowBtns = document.querySelectorAll(".icon-btn");
	});
});

document.querySelectorAll(".list-items").forEach((listItem) => {
	listItem.addEventListener("click", (event) => {
		if (event.target.classList.contains("icon-btn")) {
			const item = event.target.parentElement;
			item.remove();
		}
	});
});

const form = document.getElementById("projectForm");

function getListInputs(selector) {
	const newArray = [...document.querySelector(selector).querySelectorAll(".list-input")].map((e) => {
		return e.value;
	});
	return newArray;
}

let data;

form.addEventListener("submit", (e) => {
	{
		e.preventDefault();

		data = {
			projeID: form.elements["projeID"].value,
			heroSection: {
				heroTag: form.elements[`heroSection.heroTag`].value,
				heroTitle: form.elements["heroSection.heroTitle"].value,
				heroTitleEm: form.elements["heroSection.heroTitleEm"].value,
				heroSubText: form.elements["heroSection.heroSubText"].value,
				heroMetaTags: getListInputs(".hero-meta-tags"),
			},
			projectStrip: {
				doorType: form.elements["projectStrip.doorType"].value,
				qty: form.elements["projectStrip.qty"].value,
				year: form.elements["projectStrip.year"].value,
				location: form.elements["projectStrip.location"].value,
			},
			projectOverview: {
				overViewTitle: {
					titleTop: form.elements["projectOverview.overViewTitle.titleTop"].value,
					titleBottom: form.elements["projectOverview.overViewTitle.titleBottom"].value,
				},
				overviewParagraphs: getListInputs(".overviewParagraphs"),
			},
			cs: {
				challenge: {
					text: form.elements["cs.challenge.text"].value,
					challangeList: getListInputs(".challengeList"),
				},
				solution: {
					text: form.elements["cs.solution.text"].value,
					solutionList: getListInputs(".solutionList"),
				},
			},
			projectGallery: [
				"fotoğraf link 1",
				"fotoğraf link 2",
				"fotoğraf link 3",
				"fotoğraf link 4",
				"fotoğraf link 5",
				"fotoğraf link 6",
			],
			technicalSpecifications: {
				doorModal: form.elements["technicalSpecifications.doorModal"].value,
				openingSpeed: form.elements["technicalSpecifications.openingSpeed"].value,
				closingSpeed: form.elements["technicalSpecifications.closingSpeed"].value,
				clearOpening: form.elements["technicalSpecifications.clearOpening"].value,
				windResistance: form.elements["technicalSpecifications.windResistance"].value,
				windResistacurtainnce: form.elements["technicalSpecifications.curtain"].value,
				automation: form.elements["technicalSpecifications.automation"].value,
			},
			similarProjects: getListInputs(".similarProjects"),
		};

		document.getElementById("outputWrap").classList.add("show");

		outputTextArea.value = JSON.stringify(data, null, 2);
	}
});

downloadButton.addEventListener("click", () => {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
	var downloadAnchorNode = document.createElement("a");
	downloadAnchorNode.setAttribute("href", dataStr);
	downloadAnchorNode.setAttribute("download", data.projeID + ".json");
	document.body.appendChild(downloadAnchorNode);
	downloadAnchorNode.click();
	downloadAnchorNode.remove();

	var driveAnchorNode = document.createElement("a");
	driveAnchorNode.setAttribute("href", "https://drive.google.com/drive/folders/1cWwiF_yBO6Nli49Dcvo7e71EHtZcnqAh");
	driveAnchorNode.setAttribute("target", "_blank");
	driveAnchorNode.setAttribute("rel", "noopener");
	document.body.appendChild(driveAnchorNode);
	driveAnchorNode.click();
	driveAnchorNode.remove();
});
