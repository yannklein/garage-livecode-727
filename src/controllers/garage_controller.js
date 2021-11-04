// DON'T CHANGE THIS LINE
const myBadAssGarage = "yanns-yarn-barn";
if (myBadAssGarage) document.querySelector("#garage-name").innerText = myBadAssGarage.replace(/-/g, " ");
// //////////////////////

import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'brand', 'model', 'plate', 'owner', 'carList' ]

  connect() {
    console.log('Hello from garage_controller.js')
    this.url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    this.showCars();
  }

  addCar(event) {
    event.preventDefault()
    const car = {
      brand: this.brandTarget.value,
      model: this.modelTarget.value,
      plate: this.plateTarget.value,
      owner: this.ownerTarget.value
    }
    fetch(this.url, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(car)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      this.showCars();
    })
  }

  showCars() {
    console.log("Car list!")
    fetch(this.url)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.displayCarList(data);
      })
  }

  displayCarList(cars) {
    this.carListTarget.innerHTML = ""
    cars.forEach((car) => {
      this.carListTarget.insertAdjacentHTML(
        "beforeend",
        `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong>${car.owner}</p>
            <p><strong>Plate:</strong>${car.plate}</p>
          </div>
        </div>
        `
      )
    })
  }
}

// 1 Define targets in the HTML  form + button and car list
// 2 Define action to add car to garage
// 3 retrieve cars information from API (database)
// 4 display each card with individual car info
