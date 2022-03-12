const API_TOKEN = 'e881dff458c747129b8dd12585bbc427';
const URL_MATCH_DAY = 'https://api.football-data.org/v2/competitions/PL/matches?matchday=';


const getResource = async (url) => {
    try{
        const res = await fetch(url, {
            headers: {
                'X-Auth-Token': API_TOKEN
            }  
        });
        return res.json();
    } catch (err){
        throw new Error(`!!!!!!!!!!!!! ${err}`)
    }
}

const getMatchesInfo = async(tour = 1) => {
    const result = await getResource(`${URL_MATCH_DAY}${tour}`);
    //console.log(result);
    return result;
}

const togglePreloader = () => {
    const preloader = document.querySelector('.wrap-preloader');
    preloader.classList.toggle('preloader-show');
}

const renderMatches = async () => {
    const currentTour = document.querySelector('#current-tour').value;
    togglePreloader();
    const dataMatches = await getMatchesInfo(currentTour);
    let containerMatches = document.querySelector('#list-matches');
    containerMatches.innerHTML = '';
    dataMatches.matches.forEach((matchItem) => {
        containerMatches.innerHTML += `
        <a href="#!" class="collection-item">
            <span class="badge">${matchItem.score.fullTime.awayTeam === null ?  '-' : matchItem.score.fullTime.awayTeam}</span>
            <span class="badge">${matchItem.score.fullTime.homeTeam === null ? '-' : matchItem.score.fullTime.homeTeam}</span>
            Home:${matchItem.homeTeam.name} -
            Away:${matchItem.awayTeam.name} </a>
        `;
    })
    //togglePreloade();
    setTimeout(togglePreloader, 500);
}

renderMatches();

document.querySelector('#current-tour').addEventListener('change', renderMatches);
//getMatchesInfo();

const getTopGoals = async(team) => {
    const URL_TOP_GOALS = `https://api.football-data.org/v2/competitions/${team}/scorers`
    const result = await getResource(`${URL_TOP_GOALS}`);
    console.log(result);
    return result;
}


const renderTopGoals = async (currentTeam) => {
    togglePreloader();
    const dataTopGoals = await getTopGoals(currentTeam);
    let containerTopGoals = document.querySelector('#list-matches');
    containerTopGoals.innerHTML = '';
    
    dataTopGoals.scorers.forEach((goalItem) => {
        containerTopGoals.innerHTML += `
        <li>Игрок: ${goalItem.player.name} - Количество голов: ${goalItem.numberOfGoals} </li>
        `
    })
    
    togglePreloader();
}

document.querySelector('#league-wrap').addEventListener('click', (event) => {
    let currentTeam;
    console.log(event.target.tagName);
    if(event.target.tagName === 'A'){
        currentTeam = event.target.dataset.league;
    }
    
    renderTopGoals(currentTeam);
    
})