(async () => {
  const characters = await fetch('https://api.genshin.dev/characters');
  const json = await characters.json();
  const dataCharacters = []; 
  for(character of json ) {
    const data = await fetch(`https://api.genshin.dev/characters/${character}`);
    const dataJson = await data.json();
    dataCharacters.push(dataJson);
  }
  
  handleRenderCharacters(dataCharacters);
})()

function handleRenderCharacters (dataCharacters) {
  const carousel = document.querySelector('.carousel');

  dataCharacters.map((characterInfo) => {
    let { name, affiliation, vision, weapon, birthday, constellation, description } = characterInfo;
    if(name === 'Aloy') return;
    if(name === 'Traveler') birthday = 'unknown';
    const desc = description.length > 300 ? description.slice(0, 301) + '...' : description
    const cardClass = name === 'Thoma' ? 'card-thoma' : '';
    let cardClassCustom = '';
    return carousel.innerHTML += (
      `
        <div class="card card-${vision.toLowerCase()} ${cardClass}">
        <div class="card-heading">
          <h2 class="title">${name}</h2>
          <p class="description">${desc}</p>
        </div>
        <div class="card-body">
          <div class="vision">
            <h6>Vision</h6>
            <p>${vision}</p>
          </div>
          <div class="weapon">
            <h6>Wepon</h6>
            <p>${weapon}</p>
          </div>
          <div class="affiliation">
            <h6>affiliation</h6>
            <p>${affiliation}</p>
          </div>
          <div class="constellation">
            <h6>Constellation</h6>
            <p>${constellation}</p>
          </div>
          <div class="birthday">
            <h6>Birthday</h6>
            <p>${birthday.replace('-','/').replace('-','/')}</p>
          </div>
          <img src="./src/images/${name.toLowerCase().replace(' ', '-')}.png" alt="">
        </div>
      ` 
    );
  });
}