class Spieler {
	// Größe der Bounding Box
	breite = 62 ;
	hoehe = 70 ;

	// Koordinaten für die Mitte der Bounding Box
	posX = 0 ;
	posY = 0 ;

	// Werte für die Bewegung der Figur
	geschwindigkeit = 200 ;
	fall = 0 ;
	sprung = 300 ;
	gravitation = 500 ;
	boden = false ;

	// Zugriff auf das richtige Frame im Spritesheet
	spritesheet = null ;
	frame = 0 ;
	animation = 0 ;
	interval = 0 ;
	spalten = 8 ;

	// Sound für den Sprung
	JumpSound ;

	// Spielerfolg, z.B. Punkte, Leben, Zeit
	items = 0 ;
	punkte = 0 ;
	leben = 100 ;

	// Cam Einstellung in Y-Richtung
	camYTarget = this.posY ;
	camY = this.posY ;
	camVertSpeed = 250 ;

	camX = this.posX ;

	remove = false ;
	
	
	// Konstruktor-Methode
	constructor( startX , startY ) {
		this.posX = startX ;
		this.posY = startY ;
		this.spritesheet = document.getElementById('Spritesheet') ;
		this.JumpSound = [] ;
		// Cam in Y-Richtung
		this.camY = startY ;
		this.camX = startX ;
	}
	
	anzeigen(dauer) {
		// Bewegungen veranlassen:
		// Neue x-Position im Level anhand der Steuerung und Framedauer berechnen
		// Passenden Bereich aus dem Gesamtlevel kopieren
		let stift = level.getContext('2d') ;
		
		
		// Falls der Spieler auf dem Boden steht...             
		// ...oder falls er tiefer fällt als er zuletzt stand:                
		if((this.boden) || (this.posY) && (this.boden == false)) {                 
			// Lege die Zielposition der Kamera auf der Y-Ebene fest:                     
			this.camYTarget = Math.round(this.posY - ((map.length * FELD) /3 )) ;                 
		}                 
		// Falls die Zielposition von jetzigen Y-Wert der Kamera abweicht...                 
		// ... bewege die Kamera in Richtung der Zielposition:                 
		if(this.camYTarget > this.camY) this.camY += Math.round(this.camVertSpeed * 1.8 * dauer) ;                 
		if(this.camYTarget < this.camY) this.camY -= Math.round(this.camVertSpeed * dauer) ;  
		// Den Kamerausschnitt innerhalb der vertikalen Grenzen belassen:
		if(this.camY < 0) this.camY = 0 ;
		if(this.camY > ((map.length * FELD) - (ausschnitt.height))) this.camY = ((map.length * FELD) - (ausschnitt.height)) ;

		if (this.posX <= (ausschnitt.width/2)) this.camX = 0;
		if (this.posX > (ausschnitt.width/2) && this.posX < ((map[0].length * FELD) - ausschnitt.width/2)) this.camX = (this.posX - ausschnitt.width/2);

		// Den Passenden Bereich aus dem Gesamtlevel kopieren:
		let bereich = stift.getImageData((this.camX),(this.camY),(ausschnitt.width), (ausschnitt.height)) ;

		// Aktuellen Ausschnitt auf dem Spielfeld anzeigen:
		stift = ausschnitt.getContext('2d') ;
		stift.putImageData(bereich, 0, 0, ) ;

		// Bounding box des Spielers anzeigen (Rechteck zeichnen):
		// stift.strokeStyle = '#ff00ff' ;
		// stift.strokeRect((ausschnitt.width/2), (this.posY - this.camY), (this.breite), (this.hoehe)) ;

		// Einzeichnen des richtigen Frames aus dem Spieler-Spritesheet:
		stift.drawImage(spritesheet, (this.frame * this.breite), (this.animation * this.hoehe), (this.breite), (this.hoehe), 
									(this.posX - this.camX), (this.posY - this.camY), (this.breite), (this.hoehe)) ;
	

	}
	
	aktualisieren( dauer ) {
			// Spieler bewegen
			this.bewegen( dauer ) ;

			// Spieler animieren
			this.animieren( dauer ) ;

			// Spielsituation anzeigen
			this.anzeigen(dauer) ;

			// Items sammeln
			this.nehmen('S') ;
			this.nehmen('Y') ;
			this.nehmen('V') ;
			this.nehmen('1') ;
			this.nehmen('2') ;
			this.nehmen('3') ;
			
		
			// Ziel erreicht?
			this.ende() ;
			this.ende2() ;
			this.ende3() ;
			this.ende4() ;
			this.ende5() ;
			//HUD aktualisierung
			// var schlüssel = document.getElementById("score");
			schluessel.innerHTML = ("Schlüssel: " + this.punkte);
			// console.log(this.punkte++)
		 
			// var leben = document.getElementById("health");
			// leben.innerHTML = ("Leben: " + leben + "%");
			    
	}

	ende() {
		let spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
		if( map[ zeile ].charAt( spalte ) == 'Z' ) { // Falls Item-Buchstabe im aktuellen Feld steht
			starteLevel( levelNr++ ) ;
		}
	}
	ende2() {
		let spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
		if( map[ zeile ].charAt( spalte ) == 'X' ) { // Falls Item-Buchstabe im aktuellen Feld steht
			// starteLevel( levelNr++ ) ;
			window.location.href = './ende.html';		
		}
	}

	ende3() {
		let spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
		if( map[ zeile ].charAt( spalte ) == '4' ) { // Falls Item-Buchstabe im aktuellen Feld steht
			starteLevel( levelNr++ ) ;
		}
	}

	ende4() {
		let spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
		if( map[ zeile ].charAt( spalte ) == '5' ) { // Falls Item-Buchstabe im aktuellen Feld steht
			starteLevel( levelNr++ ) ;
		}
	}

	ende5() {
		let spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
		if( map[ zeile ].charAt( spalte ) == '6' ) { // Falls Item-Buchstabe im aktuellen Feld steht
			starteLevel( levelNr++ ) ;
		}
	}

	nehmen( item ) {
		var spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
		var zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
		if( map[ zeile ].charAt( spalte ) == item ) {
			let before = map[ zeile ].substring( 0, spalte ) ;
			let after = map[ zeile ].substring( spalte +1 ) ;
			map[ zeile ] = before +' '+ after ;
			level = zeichneLevel( map ) ;
			this.punkte++ ;
            console.log('Punkte: '+ this.punkte ) ;
			if (item == 'Y'){
				let before = map[15].substring(0,37) ;
				let after = map[15].substring(43)
				map[15] = before+'     '+after ;
				level = zeichneLevel(map) ;
				}
			if (item == 'V'){
				let before = map[12].substring(0,140) ;
				let after = map[12].substring(141)
				map[12] = before+'JJ'+after ;
				level = zeichneLevel(map) ;
				}
			if (item == 'S'){
				let before = map[20].substring(0,143) ;
				let after = map[20].substring(143)
				map[20] = before+'Z'+after ;
				level = zeichneLevel(map) ;
				}
			if (item == '1'){
				let before = map[20].substring(0,95) ;
				let after = map[20].substring(95)
				map[20] = before+'4'+after ;
				level = zeichneLevel(map) ;
				}
			if (item == '2'){
				let before = map[25].substring(0,158) ;
				let after = map[25].substring(158)
				map[25] = before+'5'+after ;
				level = zeichneLevel(map) ;
				}
			if (item == '3'){
				let before = map[16].substring(0,139) ;
				let after = map[16].substring(139)
				map[16] = before+'6'+after ;
				level = zeichneLevel(map) ;
				}
		}
	}

	// knopf( druecken ) {
	// 	var spalte = Math.floor( ( this.posX + this.breite *0.5 ) / FELD ) ;
	// 	var zeile = Math.floor( ( this.posY + this.hoehe *0.7 ) / FELD ) ;
	// 	if( map[ zeile ].charAt( spalte ) == druecken ) {
			
	// 		let before = map[ zeile ].substring( 0, spalte ) ;
	// 		let after = map[ zeile ].substring( spalte +1 ) ;
	// 		map[ zeile ] = before +' '+ after ;
	// 		level = zeichneLevel( map ) ;
	// 		remove = BLOCKER.splice (2,1) ;
            
	// 	}
		
	// }

	

	updateSound() {
		for (let i = 0; i < this.JumpSound.length; i++) {
			if (this.JumpSound[i].ended) {
				this.JumpSound.slice(i, 1);
			}			
		}
		
	}

	blockade( pixelX, pixelY, karte ) {
		let b = new Object() ;
		// Berechne Spalte links und rechts
		b.spalteLinks = Math.floor( pixelX / FELD ) ;
		b.spalteRechts = Math.floor( ( pixelX + this.breite) / FELD ) ;
		// Berechne Zeile oben und unten
		b.zeileOben = Math.floor( pixelY / FELD ) ;
		b.zeileUnten = Math.floor( (pixelY + this.hoehe) / FELD ) ;
		// Berechne die Map-Zeichen der Ecken des Spielers
		let zeichenLO = karte[ b.zeileOben ].charAt( b.spalteLinks ) ;
		let zeichenLU = karte[ b.zeileUnten ].charAt( b.spalteLinks ) ;
		let zeichenRO = karte[ b.zeileOben ].charAt( b.spalteRechts ) ;
		let zeichenRU = karte[ b.zeileUnten ].charAt( b.spalteRechts ) ;		
		// Kriterium: Kommt das Zeichen aus der Map im String der BLOCKER vor?
		b.links = 	( BLOCKER.indexOf( zeichenLO ) >= 0 ) ||
					( BLOCKER.indexOf( zeichenLU ) >= 0 ) ;
		b.rechts = 	( BLOCKER.indexOf( zeichenRO ) >= 0 ) ||
					( BLOCKER.indexOf( zeichenRU ) >= 0 ) ;
		b.oben = 	( BLOCKER.indexOf( zeichenLO ) >= 0 ) ||
					( BLOCKER.indexOf( zeichenRO ) >= 0 ) ;
		b.unten = 	( BLOCKER.indexOf( zeichenLU ) >= 0 ) ||
					( BLOCKER.indexOf( zeichenRU ) >= 0 ) ;
		// Easy Mode
		b.dead = (DEATH.indexOf(zeichenLO) >= 0) || (DEATH.indexOf(zeichenLU) >= 0) || (DEATH.indexOf(zeichenRO) >= 0) || (DEATH.indexOf(zeichenRU) >= 0);
		return b ;
	}
	
	bewegen( dauer ) {
		let kollision = this.blockade(this.posX, this.posY, map) ;
		if( kollision.dead ) {
			window.location.reload() ;			
		}
		if( steuerung.links ) {
			this.posX -= this.geschwindigkeit * dauer ;
			// Kollision kontrollieren
			let kollision = this.blockade( this.posX, this.posY, map ) ;
			// Bei Kollision links den Spieler an die rechte Feldkante versetzen
			if( kollision.links ) {
				this.posX = FELD * kollision.spalteLinks + FELD ;
			}
			
		}
		if( steuerung.rechts ) {
			this.posX += this.geschwindigkeit * dauer ;
			// Kollision kontrollieren
			let kollision = this.blockade( this.posX, this.posY, map ) ;
			// Bei Kollision links den Spieler an die rechte Feldkante versetzen
			if( kollision.rechts ) {
				this.posX = FELD * kollision.spalteRechts - this.breite -1 ;
			}
			
		}
		if( this.boden ) { // Spieler bewegt sich auf Plattform / Boden
			if( steuerung.sprung ) {
				this.fall = -this.sprung ;
				this.boden = false ;

				let buffer = new Audio("../media/av/jump.mp3");
					
				
				this.JumpSound.push(buffer);
				this.JumpSound[this.JumpSound.length - 1].volume = 0.3;
				this.JumpSound[this.JumpSound.length - 1].play();
				
			}
			let kollision = this.blockade( this.posX, this.posY +1 , map ) ;
			if( ! kollision.unten ) { // Falls kein Boden unter Füßen beginnt Fallbewegung
				this.fall = this.gravitation * dauer ;
				this.boden = false ;
			}
			
		} else { // Spieler befindet sich im Fall
			this.fall += this.gravitation * dauer ;
			this.posY += this.fall * dauer ;
			// Kollision kontrollieren
			let kollision = this.blockade( this.posX, this.posY, map ) ;
			// Bei Landung Boden auf true
			if( this.fall > 0 && kollision.unten ) { // Spieler landet auf Plattform / Boden
				// Spieler-Unterkante auf Plattform-Oberkante stellen
				this.posY = FELD * kollision.zeileUnten - this.hoehe -1 ;
				// Fall beenden
				this.fall = 0 ;
				this.boden = true ;
			}
			if( this.fall < 0 && kollision.oben ) { // Spieler stößt oben mit Kopf an
				// Kopf unter die Plattform setzen
				this.posY = FELD * kollision.zeileOben + FELD ;
				this.fall = 0 ;
			}
			
		}
	}

	animieren( dauer ) {
		this.interval += dauer/3.5 ; // Seit dem letzten Framewechsel vergangene Zeit
		if( this.interval > 1/60 ) { // Animationsrate von über 20 fps
			if( steuerung.links ) this.animation = 1 ;
			if( steuerung.rechts ) this.animation = 0 ;
			if( steuerung.links != steuerung.rechts ) this.frame = ++this.frame % this.spalten ; 
			this.interval = 0 ;
		}
	}

	
}