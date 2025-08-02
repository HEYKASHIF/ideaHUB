loadData();
let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", async () => {
  let userName = document.getElementById("username").value;
  let idea = document.getElementById("idea").value;
  if (!userName || !idea) {
    alert("idea and userName should be filled before submitting!!");
    return;
  }

  let Idea = {
    userName: document.getElementById("username").value,
    idea: document.getElementById("idea").value,
    like: 1,
  };
  let res = await fetch(
    "https://ideahubdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/ideas.json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Idea),
    }
  );
  document.getElementById("username").value = "";
  document.getElementById("idea").value = "";
  loadData();
  let data = await res.json();
  console.log(data.status);
});

async function loadData() {
  let posts = await fetch(
    "https://ideahubdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/ideas.json"
  );
  let data = await posts.json();
  let dataArr = Object.entries(data).map(([id, post]) => ({ id, ...post }));
  let postsBox = document.getElementById("posts");
  postsBox.innerHTML = "";
  dataArr.forEach((post) => {
    let postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
        <h4>${post.userName}</h4>
        <hr />
        <p>${post.idea}</p>
        <hr />
        <button onclick="likePost('${post.id}')"  value="${post.id}" id="like-btn">❤️ ${post.like}</button>
        <button onclick="deletePost('${post.id}')" id="delete-btn" >delete</button>
    `;

    postsBox.appendChild(postCard);
  });
}

async function deletePost(postID) {
  console.log(postID);
  let res = await fetch(
    `https://ideahubdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/ideas/${postID}.json`,
    {
      method: "DELETE",
    }
  );
  let data = await res.json();
  console.log(data);
  loadData();
}

async function likePost(postID) {
  console.log(postID);
  let post = await fetch(
    `https://ideahubdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/ideas/${postID}.json`
  );
  let data = await post.json();
  let likes = data.like;
  let res = await fetch(
    `https://ideahubdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/ideas/${postID}.json`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: likes + 1 }),
    }
  );
  resDATA = await res.json();
  console.log(resDATA);
  loadData();
}
