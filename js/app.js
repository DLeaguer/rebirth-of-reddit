console.log('javascript linked-up');

// css assets

function newElem(elem, myClass, parent, guts, attCss, attinfo){
  const newElement = document.createElement(elem);
  newElement.className = myClass;
  parent.appendChild(newElement);
  if(guts){
    newElement.innerHTML = guts;
  }
  if(attCss){
    newElement.setAttribute(attCss, attinfo);
  }
  if(attCss === 'video'){
    newElement.setAttribute('video', attinfo);
  }
  return newElement
}

let main = newElem('div', 'main', document.body);
let logo = newElem('img', 'logo', main, null, 'src', '../assets/logo.svg');
let plus = newElem('img', 'plus', main, null, 'src', '../assets/plus.png');
    plus.setAttribute('width', '30');
    plus.setAttribute('height', '30');
let navMain = newElem('nav', 'navMain', main);
let navUl = newElem('ul', 'navUl', navMain);

for (let i=0; i<3; i++) {
  let guts = {
    0: 'RANDOM',
    1: 'MY BOARDS',
    2: 'GET THE APP'
  }
  let navLi = newElem('btn', 'navLi', navUl, guts[i]);
  // navLi.type = 'none';
}

// GET api info

const url = "https://www.reddit.com/r/PuppySmiles.json";

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", url);
  oReq.send();
};

request(url, res => {
  console.log('res', res);
  console.log('json', JSON.parse(res.currentTarget.response).data.children);
  const data = JSON.parse(res.currentTarget.response).data.children;
  console.log("data", data);
  console.log('subreddit', data[0].data.subreddit);
  for (let i=0; i<data.length; i++){
    let info = data[i];
    console.log('title: ', info.data.title);
    console.log('url: ', info.data.url);

    let psMain = newElem('div', 'psMain', main);
    // let psVid = newElem('video', 'psVid', psMain, null, 'video', info.data.url);
    let bg = newElem('img', 'bg', psMain);
        psMain.style.backgroundImage = 'url("../assets/bg.jpg")';
    let psImgMain = newElem('div', 'psImgMain', psMain);
    let psImg = newElem('img', 'psImg', psImgMain, null, 'src', info.data.url);
        psImg.setAttribute('width', '200');
        psImg.setAttribute('height', '200');
    let psTitle = newElem('div', 'psTitle', psImgMain, info.data.title);
    let psCombo = newElem('div', 'psCombo', psImgMain);
    let psBy = newElem('div', 'psBy', psCombo, 'by '+info.data.author,+'');
    // let today = date();
    // console.log(today);
    // let ago = today - info.data.created;
    // let psDate = newElem('div', 'psDate', psCombo, '●  '+ago);
    let psComment = newElem('div', 'psComment', psCombo, '●  '+info.data.num_comments+' comments');

  }

});

// request(url, res => {
//   let ps = document.createElement()
//   ps.setAttribute(JSON.parse(res.currentTarget.response).data.children[0].data.url);
// })

// request('https://myotherrequest.com', res => {
//   //blah blah
// })