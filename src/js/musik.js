const musikListe = [
    "../media/av/level1_background.mp3",
    "../media/av/level1_background.mp3",
    "../media/av/level1_background.mp3",
    "../media/av/wind.mp3",
    "../media/av/level3.mp3",
  ];
  
  let musik = null;

  function spieleMusikVideo() {
    if (musik !== null) {
        musik.pause();
    }

    /*musik = new Audio("../media/av/");
    musik.loop = true;
    musik.volume = 1.0;
    musik.play();*/
  }
  
  function spieleMusik(level) {

    if (musik !== null) {
      musik.pause();
    }
    musik = new Audio(musikListe[level - 1]);
    musik.loop = true;
    musik.play();
    musik.volume = 0.6 ;

    console.log("Play: " + level + "Music: ");
    console.log(musik);
  }