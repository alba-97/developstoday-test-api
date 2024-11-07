const DateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatDate = (date) => DateFormatter.format(new Date(date));

displayUsers();

function displayUsers() {
  Http.get("/api/users/all")
    .then((resp) => resp.json())
    .then((resp) => {
      let allUsersTemplate = document.getElementById("all-users-template"),
        allUsersTemplateHtml = allUsersTemplate.innerHTML,
        template = Handlebars.compile(allUsersTemplateHtml);
      let allUsersAnchor = document.getElementById("all-users-anchor");
      allUsersAnchor.innerHTML = template({
        users: resp.users.map((user) => ({
          ...user,
          createdFormatted: formatDate(user.created),
        })),
      });
    });
}

document.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    let ele = event.target;
    if (ele.matches("#add-user-btn")) {
      addUser();
    } else if (ele.matches(".edit-user-btn")) {
      showEditView(ele.parentNode.parentNode);
    } else if (ele.matches(".cancel-edit-btn")) {
      cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches(".submit-edit-btn")) {
      submitEdit(ele);
    } else if (ele.matches(".delete-user-btn")) {
      deleteUser(ele);
    }
  },
  false
);

function addUser() {
  let nameInput = document.getElementById("name-input");
  let emailInput = document.getElementById("email-input");
  let data = {
    user: {
      id: -1,
      name: nameInput.value,
      email: emailInput.value,
      created: new Date(),
    },
  };
  Http.post("/api/users/add", data).then(() => {
    nameInput.value = "";
    emailInput.value = "";
    displayUsers();
  });
}

function showEditView(userEle) {
  let normalView = userEle.getElementsByClassName("normal-view")[0];
  let editView = userEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "none";
  editView.style.display = "block";
}

function cancelEdit(userEle) {
  let normalView = userEle.getElementsByClassName("normal-view")[0];
  let editView = userEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "block";
  editView.style.display = "none";
}

function submitEdit(ele) {
  let userEle = ele.parentNode.parentNode;
  let nameInput = userEle.getElementsByClassName("name-edit-input")[0];
  let emailInput = userEle.getElementsByClassName("email-edit-input")[0];
  let id = ele.getAttribute("data-user-id");
  let created = ele.getAttribute("data-user-created");
  console.log(ele, created);
  let data = {
    user: {
      id: Number(id),
      name: nameInput.value,
      email: emailInput.value,
      created: new Date(created),
    },
  };
  Http.put("/api/users/update", data).then(() => displayUsers());
}

function deleteUser(ele) {
  let id = ele.getAttribute("data-user-id");
  Http.delete("/api/users/delete/" + id).then(() => displayUsers());
}
