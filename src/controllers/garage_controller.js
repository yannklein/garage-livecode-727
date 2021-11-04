// DON'T CHANGE THIS LINE
const myBadAssGarage = "galyms-ultra-famous-garage";
if (myBadAssGarage) document.querySelector("#garage-name").innerText = myBadAssGarage.replace(/-/g, " ");
// //////////////////////

// Tips: use 'sjc' shortcut to build the controller
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'list', 'brand', 'model', 'owner', 'plate' ]

  connect() {
    console.log('Hello from garage_controller.js')
    console.log(this.listTarget)
    this.url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    this.getCars();
  }

  getCars() {
    fetch(this.url)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.showCars(data)
      })
  }

  showCars(cars) {
    this.listTarget.innerHTML = ""
    cars.forEach((car) => {
      this.listTarget.insertAdjacentHTML(
        "afterbegin",
        ` <div class="car">
            <div class="car-image">
              <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
            </div>
            <div class="car-info">
              <h4>${car.brand} ${car.model}</h4>
              <p><strong>Owner:</strong>${car.owner}</p>
              <p><strong>Plate:</strong>${car.plate}</p>
            </div>
          </div>`
      );
    });
  }
  createCar(event) {
    event.preventDefault();

    fetch(this.url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
          "brand": this.brandTarget.value,
          "model": this.modelTarget.value,
          "owner": this.ownerTarget.value,
          "plate": this.plateTarget.value
      })
      
    }).then(response => response.json())
    .then((data) => {
      console.log(data)
      this.getCars
    })
  };
}



// Show all the cars
// 1. Select cars-list DONE

// 2. fetch API (GET), get all the cars data DONE

// 3. populate the cars-list with cars cards

// Add a new car
// 1. Select button, the 4 inputs

// 2. listen to a click on button

// 3. POST request to the API with car data

// 4. reload the cars-list