async function load_data(path) {
    // load data from url as json
    const response = await fetch(path);
    const data = response.json();
    return data;
}
const months =
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

async function build_bluesky_date_list() {
    const data = await load_data(url = "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=jonathanesperanza.com&limit=5&filter=posts_no_replies")
    const feed = data["feed"]
    const date_list = document.querySelector('.bluesky')
    for (let i = 0; i < feed.length; i++) {
        const raw_date = new Date(feed[i]["post"]["record"]["createdAt"])
        date = String(raw_date.getDate()).padStart(2, '0') + " " + months[raw_date.getMonth()] + " " + raw_date.getFullYear()
        const title = String(feed[i]["post"]["record"]["text"]).replace(/\n/g, " ")
        const uri = feed[i]["post"]["uri"]
        const li = document.createElement('li')
        const p = document.createElement('p')
        const a = document.createElement('a')
        a.classList.add('list-post-title')
        a.href = "https://bsky.app/profile/jonathanesperanza.com/post/" + uri
        a.innerText = title
        li.innerText = date
        li.appendChild(a)
        date_list.appendChild(li)
    }
}

build_bluesky_date_list()