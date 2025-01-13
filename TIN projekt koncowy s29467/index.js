document.addEventListener("DOMContentLoaded", () => {
	const menuData = [
		{ name: "Margherita", ingredients: "Mozzarella, tomato sauce, basil", medium: 8, large: 11 },
		{ name: "Meat", ingredients: "Beef, salami, portobello mushrooms, red onions", medium: 9, large: 12 },
		{ name: "Farmer's", ingredients: "Chicken, broccoli, tomatoes, pepper, corn", medium: 10, large: 13 },
		{ name: "Texas", ingredients: "BBQ sauce, bacon, red onions, corn", medium: 10, large: 13 },
		{ name: "PJTK", ingredients: "Ham, salami, red onions, portobello mushrooms, tomato, pepper", medium: 12, large: 15 }
	];

	const menuTableBody = document.querySelector("#menu-table tbody");
	const pizzaTypeSelect = document.getElementById("pizza-type");

	menuData.forEach((pizza) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${pizza.name}</td>
			<td>${pizza.ingredients}</td>
			<td>${pizza.medium}$</td>
			<td>${pizza.large}$</td>
		`;
		menuTableBody.appendChild(row);

		const option = document.createElement("option");
		option.value = pizza.name;
		option.textContent = pizza.name;
		pizzaTypeSelect.appendChild(option);
	});
});
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("pizza-order-form");
	const tableBody = document.querySelector("#order-table tbody");
	const totalPriceElement = document.getElementById("total-price");
	let orderCount = 0;

	const pizzaPrices = {
		Medium: {
			Margherita: 8,
			Meat: 9,
			"Farmer's": 10,
			Texas: 10,
			PJTK: 12
		},
		Large: {
			Margherita: 11,
			Meat: 12,
			"Farmer's": 13,
			Texas: 13,
			PJTK: 15
		}
	};

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const pizzaType = document.getElementById("pizza-type").value;
		const pizzaSize = document.getElementById("pizza-size").value;
		const pizzaQuantity = parseInt(document.getElementById("pizza-quantity").value);
		const customerName = document.getElementById("customer-name").value;

		if (tableBody.querySelector(".center")) {
			tableBody.innerHTML = "";
		}

		const pizzaPrice = pizzaPrices[pizzaSize][pizzaType] || 0;
		const orderPrice = pizzaPrice * pizzaQuantity;

		const row = document.createElement("tr");
		orderCount++;
		row.innerHTML = `
			<td>${orderCount}</td>
			<td>${pizzaType}</td>
			<td>${pizzaSize}</td>
			<td>${pizzaQuantity}</td>
			<td>${orderPrice}$</td>
			<td>${customerName}</td>
			<td><button class="delete-btn">Usuń</button></td>
		`;

		tableBody.appendChild(row);
		updateTotalPrice();

		row.querySelector(".delete-btn").addEventListener("click", () => {
			row.remove();
			updateTotalPrice();
			if (tableBody.children.length === 0) {
				tableBody.innerHTML = `<tr><td colspan="7" class="center">Brak zamówień</td></tr>`;
			}
		});

		form.reset();
	});

	function updateTotalPrice() {
		let totalPrice = 0;
		document.querySelectorAll("#order-table tbody tr").forEach((row) => {
			const priceCell = row.cells[4];
			if (priceCell) {
				const price = parseFloat(priceCell.textContent.replace("$", ""));
				totalPrice += price;
			}
		});
		totalPriceElement.textContent = `${totalPrice}$`;
	}
});