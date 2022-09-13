const searchPhone = async () => {
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  inputField.value = "";

  if (searchText == "") {
    toggleError("block");
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
  }
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  if (phones.length == 0) {
    toggleError("block");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div onClick="phoneDetails('${phone.slug}')" class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
            </p>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
    toggleError("none");
  });
};

const toggleError = (displayStyle) => {
  document.getElementById("error-field").style.display = displayStyle;
};

const phoneDetails = async (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (details) => {
  console.log(details);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.textContent = "";
  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("card");
  detailsDiv.style.width = "25rem";
  detailsDiv.innerHTML = `
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${details.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Memory: ${details?.mainFeatures?.memory}</li>
      <li class="list-group-item">Chipset: ${details?.mainFeatures?.chipSet}</li>
      <li class="list-group-item">Display: ${details?.mainFeatures?.displaySize}</li>
    </ul>
  `;
  detailsContainer.appendChild(detailsDiv);
};
