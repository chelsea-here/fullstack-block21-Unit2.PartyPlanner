let events = [];
const eventApi =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/events";
const eventList = document.querySelector("#eventList");
const eventForm = document.querySelector("#eventForm");

const render = () => {
  const html = events.map((event) => {
    return `<div>
        <h3>${event.name}</h3>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
        <button class="deleteBtn" id="${event.id}">Delete</button>
      </div>`;
  });
  eventList.innerHTML = html.join("");
};

const fetchEvents = async () => {
  try {
    const response = await fetch(eventApi);
    // console.log(response);
    const json = await response.json();
    // console.log(data);
    events = json.data;
    console.log(events);
    render();
  } catch {
    console.error(error.message);
  }
};

fetchEvents();

eventForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newEvent = {
    name: event.target.name.value,
    date: new Date(event.target.date.value),
    location: event.target.location.value,
    description: event.target.description.value,
  };
  try {
    const response = await fetch(`${eventApi}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await response.json();
    console.log(data);
    events.push(data.data);
    render();
  } catch (error) {
    console.error(error);
  }
});

eventList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.id;
    try {
      const response = await fetch(`${eventApi}/${id}`, {
        method: "DELETE",
      });
      e.target.parentElement.remove();
    } catch (error) {
      console.error(error.message);
    }
  }
});

// console.log(eventForm);
