










function setConfigurations(volume , level) {
    localStorage.setItem( "volume",volume);
    localStorage.setItem( "level",level);

}


function  setHeightScore(score) {
    localStorage.setItem( "score",score);
}


function  getHeightScore() {
    return localStorage.getItem("score");
}





function getLevel() {
    return localStorage.getItem("level");
}


function getVolume() {
    return localStorage.getItem("volume");
}



