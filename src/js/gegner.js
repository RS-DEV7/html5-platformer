class Gegner {
	// Größe der Bounding Box
	breite = 25 ;
	hoehe = 25 ;

	// Koordinaten für die Mitte der Bounding Box
	posX = 0 ;
	posY = 0 ;

	// Werte für die Bewegung der Figur
	geschwindigkeit = 1.5 ;
	fall = 0 ;
	gravitation = 500 ;
	boden = true ;

	// Zugriff auf das richtige Frame im Spritesheet
	// spinne = null ;
	frame = 0 ;
	animation = 0 ;
	interval = 0 ;
	spalten = 3 ;
	batLinks = false ;
	batRechts = true ;
	

    constructor( startX, startY ) {
		this.posX = startX  ;
		this.posY = startY  ;
		this.bat = document.getElementById('Gegner') ;
    }

    anzeigen(dauer) {
		// Bewegungen veranlassen:
		
		// Passenden Bereich aus dem Gesamtlevel kopieren
		let stift = ausschnitt.getContext('2d') ;

		

		// Aktuellen Ausschnitt auf dem Spielfeld anzeigen:
		
		
		stift.drawImage(bat, (this.frame * this.breite), (this.animation * this.hoehe), (this.breite), (this.hoehe), 
								this.posX, this.posY,(this.breite), (this.hoehe)) ;
		
								
								
		
		
    }
	aktualisieren( dauer ) {
			// Spieler bewegen
			this.bewegen( dauer ) ;

			// Spieler animieren
			this.animieren( dauer ) ;

			// Spielsituation anzeigen
			this.anzeigen(dauer) ;

	}
	

    animieren( dauer ) {

		this.interval += dauer ; // Seit dem letzten Framewechsel vergangene Zeit
		if( this.interval > 1/5 ) { // Animationsrate von über 20 fps
			if( this.batLinks ) this.animation = 1 ;
			if( this.batRechts ) this.animation = 0 ;
			this.frame = ++this.frame % this.spalten ; 
			this.interval = 0 ;
			
			
			// if( this.batRechts ) this.animation = 1 ;
			// if( this.batLinks ) this.animation = 0 ;
			// this.frame = ++this.frame % this.spalten ; 
			// this.interval = 0 ;
		}
    }

	bewegen( dauer ) {
		
		if(this.posX > 700){
			this.batLinks = true ;
			this.batRechts = false ;
			this.geschwindigkeit *= -1 ;			
		}
		if(this.posX < 350){
			this.batLinks = false ;
			this.batRechts = true ;
			this.geschwindigkeit *= -1 ;
			
		} 
		this.posX += this.geschwindigkeit ;
		
	}
	
	
}
