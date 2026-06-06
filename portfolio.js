const form = document.querySelector("#project-form");
const tableBody = document.querySelector("#projects-table-body");
const statusBox = document.querySelector("#form-status");
const projectCount = document.querySelector("#project-count");

const fields = {
  name: document.querySelector("#project-name"),
  description: document.querySelector("#project-description"),
  projectUrl: document.querySelector("#project-url"),
  technology: document.querySelector("#project-tech"),
  imageUrl: document.querySelector("#project-image"),
  date: document.querySelector("#project-date")
};

let addedProjects = 0;

function setError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  input.setAttribute("aria-invalid", "true");
  error.textContent = message;
}

function clearError(input) {
  const error = document.querySelector(`#${input.id}-error`);
  input.removeAttribute("aria-invalid");
  error.textContent = "";
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function validateForm() {
  let isValid = true;

  Object.values(fields).forEach(clearError);
  statusBox.textContent = "";

  if (fields.name.value.trim().length < 3) {
    setError(fields.name, "Project name must have at least 3 characters.");
    isValid = false;
  }

  if (fields.description.value.trim().length < 20) {
    setError(fields.description, "Description must have at least 20 characters.");
    isValid = false;
  }

  if (!isValidUrl(fields.projectUrl.value.trim())) {
    setError(fields.projectUrl, "Enter a valid project URL starting with http:// or https://.");
    isValid = false;
  }

  if (fields.technology.value === "") {
    setError(fields.technology, "Choose the main technology for the project.");
    isValid = false;
  }

  if (fields.imageUrl.value.trim() !== "" && !isValidUrl(fields.imageUrl.value.trim())) {
    setError(fields.imageUrl, "Enter a valid image URL or leave this field empty.");
    isValid = false;
  }

  if (fields.date.value === "") {
    setError(fields.date, "Choose a completion date.");
    isValid = false;
  }

  if (!isValid) {
    statusBox.textContent = "Please fix the highlighted fields before adding the project.";
  }

  return isValid;
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function addProjectToTable(project) {
  const emptyRow = tableBody.querySelector(".empty-row");
  if (emptyRow) {
    emptyRow.remove();
  }

  const row = document.createElement("tr");
  row.classList.add("added-row");

  const nameHeader = document.createElement("th");
  nameHeader.scope = "row";
  nameHeader.textContent = project.name;
  row.appendChild(nameHeader);

  row.appendChild(createCell(project.description));

  const urlCell = document.createElement("td");
  const link = document.createElement("a");
  link.href = project.projectUrl;
  link.textContent = "Open project";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  urlCell.appendChild(link);
  row.appendChild(urlCell);

  row.appendChild(createCell(project.technology));

  const imageCell = document.createElement("td");
  const image = document.createElement("img");
  image.src = project.imageUrl || "assets/profile-placeholder.png";
  image.alt = `Thumbnail for ${project.name}`;
  image.className = "project-thumb";
  image.loading = "lazy";
  imageCell.appendChild(image);
  row.appendChild(imageCell);

  row.appendChild(createCell(project.date));

  const fragment = document.createDocumentFragment();
  fragment.appendChild(row);
  tableBody.appendChild(fragment);

  addedProjects += 1;
  projectCount.textContent = addedProjects;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  const project = {
    name: fields.name.value.trim(),
    description: fields.description.value.trim(),
    projectUrl: fields.projectUrl.value.trim(),
    technology: fields.technology.value,
    imageUrl: fields.imageUrl.value.trim(),
    date: fields.date.value
  };

  addProjectToTable(project);
  statusBox.textContent = "Project added successfully.";
  form.reset();
  Object.values(fields).forEach(clearError);
  fields.name.focus();
});

form.addEventListener("reset", function () {
  Object.values(fields).forEach(clearError);
  statusBox.textContent = "Form reset.";
});
