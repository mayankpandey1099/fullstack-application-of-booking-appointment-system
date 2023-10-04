const apiUrl = "http://127.0.0.1:3000"; // Replace with the correct URL for your Node.js server

const form = document.getElementById("appointmentForm");
const userList = document.getElementById("userList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone_no: formData.get("phone_no"),
  };

  try {
    const response = await fetch(`${apiUrl}/api/user`, {
      // Use apiUrl here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      form.reset();
      fetchUserList();
    } else {
      console.error("Error submitting form:", response.statusText);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
});

function fetchUserList() {
  userList.innerHTML = "";
  fetch(`${apiUrl}/api/users`) // Use apiUrl here
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const userItem = document.createElement("div");
        userItem.innerHTML = `
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
          <p>Phone Number: ${user.phone_no}</p>
          <button onclick="deleteUser(${user.id})">Delete</button>
        `;
        userList.appendChild(userItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });
}

function deleteUser(userId) {
  fetch(`${apiUrl}/api/user/${userId}`, {
    // Use apiUrl here
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        fetchUserList();
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

fetchUserList();
