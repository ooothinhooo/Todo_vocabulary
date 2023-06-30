
function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items) {
  let todoItems = [];
  items.forEach((item, index) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (index % 2 == 0) {
      todoItem.style.background = "#164B60";
    } else {
      todoItem.style.background = "#435B66";
    }
    // let color = getRandomColor();
    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");

    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    // checkMark.innerHTML = '<img src="assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
      console.log(item);
      var msg = new SpeechSynthesisUtterance();
      msg.volume = 1; // âm lượng (1 - 10)
      msg.rate = 0.9; // tốc độ nói (0.1 - 10)
      msg.pitch = -1; // độ cao (0 - 2)
      msg.lang = "en-VN"; // set ngôn ngữ
      // ở đây mình chọn tiếng anh giọng nam
      msg.text = item?.text; // nội dung
      speechSynthesis.speak(msg); // có đủ rồi nói thôi
      const x = translateWord(item.text);
      //   translateWord(item.text).then(console.log); // Xin chào
    });
    checkContainer.appendChild(checkMark);

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    // let ngunghia = translateWord("hello");
    todoText.innerText = `${item.text}`;

    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }
    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItems.push(todoItem);
  });
  document.querySelector(".todo-items").replaceChildren(...todoItems);
}

function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  let newItem = db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
}

function markCompleted(id) {
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().status == "active") {
        item.update({
          status: "completed",
        });
      } else {
        item.update({
          status: "active",
        });
      }
    }
  });
}

getItems();

function getRandomColor() {
  var letters = "0123456789F";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  //   console.log(color);
  return color;
}

function translateWord(word) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=" +
      encodeURI(word),
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var translation = response[0][0][0];
        console.log(translation);
      //   return translation;
      Toastify({
        text: `${translation}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };
  xhr.send();
  //   return xhr;
}
async function translateWord(word) {
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURI(
      word
    )}`
  );
  const data = await res.json();
  const ngunghia = data[0][0][0];
  Toastify({
    text: `${ngunghia}`,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
//   return data[0][0][0];
}

// translateWord("hello").then(); // Xin chào

// translateWord("hello");

// console.log(x);
