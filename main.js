let feed = document.getElementById("posts");

let user = document.querySelector("input");
let content = document.querySelector("textarea");
let submit = document.getElementById("submit");

const database = firebase.database().ref();


submit.onclick = updateDB;
database.on("child_added",displayPost);

function updateDB() {
    date = new Date();

    const value = {
        name: user.value,
        time: {
            month: date.getMonth(),
            day: date.getDate(),
            year: date.getFullYear()
        },
        text: content.value
    }

    content.value = "";

    database.push(value);
}

function displayPost(rowData) {
    let data = rowData.val();
    t = data.time;

    let post = document.createElement("div"); post.className = "post"; post.id = `${data.text}`;

    let heading = document.createElement("div"); heading.className = "header";

    let author = document.createElement("h3");
    let timeOfPost = document.createElement("p"); timeOfPost.className = "date";
    let del = document.createElement("button"); del.className = "delete";
    let x = document.createElement("img");
    let contents = document.createElement("p");

    author.innerHTML = data.name;
    timeOfPost.innerHTML = `${t.month}/${t.day}/${t.year}`;
    x.src = "assets/x.png"; del.appendChild(x); 
    contents.innerHTML = data.text;

    del.onclick = function() {
        firebase.database().ref(rowData.key).remove();
        post.remove();
    }

    feed.insertBefore(post,feed.firstElementChild);

    heading.appendChild(author);
    heading.appendChild(timeOfPost);
    heading.appendChild(del);

    post.appendChild(heading);
    post.appendChild(contents);
}

