const APIURL = 'https://api.github.com/users/'
const main = document.querySelector('#main');
const form = document.querySelector('form')



async function getUser(username){
    try{
  const { data } = await axios(APIURL + username)
showProfile(data);
getRepo(username);
}catch(err){
if(err.response.status== 404){
    createErrorCard('No profile with this username')
}
}



}

async function getRepo(username){
    try{
  const { data } = await axios(APIURL + username + '/repos')
showRepo(data);
  
}catch(err){

    createErrorCard('No repo');

}



}

function showProfile(user){


    
    const showThings = 
     `<div class="card"><div>
    <img src="${user.avatar_url}" alt="">
</div>
<div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
        <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
    </ul>
    <div id="repos">
       
    </div>
</div></div>`

main.innerHTML = showThings;
}

 function createErrorCard(msg){
const cardHTML = `
<div class="card">
<h1>${msg}</h1>
</div>`
main.innerHTML = cardHTML;
 }


form.addEventListener('submit',(e)=>{
e.preventDefault();
const user = search.value;

if(user){
    getUser(user);
}
})

function showRepo(repos){
    const reposEl = document.querySelector('#repos');
    repos.forEach(repo => {
const repoEl = document.createElement('a');
repoEl.classList.add('repos');
repoEl.href = repo.html_url;
repoEl.target = '_blank'
repoEl.innerText = repo.name

reposEl.appendChild(repoEl);
    })
}