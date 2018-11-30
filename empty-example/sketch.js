let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;


let fitness = 0;

class impala{
	constructor(){
		this.x = width/2;
		this.y = height/2;
	}
	display(){
		fill(50, 100, 150, 200);
  		stroke(0, 0, 0);
  		triangle((this.x)-10,(this.y)+12, (this.x)+10, (this.y)+12,(this.x), (this.y)-8);
	}
	moverI(){
 		this.x -= 27;
 	}
 	moverD(){
 		this.x += 27;
 	}
 	verArriba(){
 		return true;
 	}
 	verAbajo(){
 		return true;
 	}
 	verDerecha(){
 		return true;
 	}
 	verIzquierda(){
 		return true;
 	}
 	beber(){
 		return true;
 	}
}

class leon{
	constructor(){
		let x =floor(random(0,8))
		switch(x){
			case 1:
				this.x=27/2;
				this.y=27/2;
				break;
			case 2:
				this.x=width/2;
				this.y=27/2;
				break;
			case 3:
				this.x=width-27/2;
				this.y=27/2;
				break;
			case 4:
				this.x=27/2;
				this.y=width/2;
				break;
			case 5:
				this.x=width-27/2;
				this.y=width/2;
				break;
			case 6:
				this.x=27/2;
				this.y=width-27/2;
				break;
			case 7:
				this.x=width/2;
				this.y=width-27/2;
				break;
			case 27/2:
				this.x=width-27/2;
				this.y=width-27/2;
				break;
			default:
				this.x=width/2;
				this.y=width/2;
				break;
		}
	}
	display() {
  		fill(0,0,0);
  		stroke(255,255,255);
  		ellipse(this.x,this.y, 15,15);
  	}

 	moverI(){
 		this.x -= 27;
 	}
 	moverD(){
 		this.x += 27;
 	}
 	bajar(){
 		this.y += 27;
 	}
 	subir(){
 		this.y -= 27;
 	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function setup() {
	createCanvas(513, 513);
	lionel = new leon();
	l2 = new leon();
	bambi = new impala();
}

function draw() {
	background(255);
	//For (var BEGIN; END; INTERVAL){
	//DO SOMETHING }
	for (var x = 0; x < width; x += width / 19) {
		for (var y = 0; y < height; y += height / 19) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
	//líneas de visión
	stroke(255,0,0);
	line(0,0,513,513)
	line(0,513,513,0)
	
	//río
	fill(0,0,255,200)
	stroke(0,0,255)
	rect(width/2+69, height/2-13, -138, -83);


  	//impala
  	bambi.display();

  	//movimientos de lionel
  	if(lionel.x < 25 || lionel.x > 475 || lionel.y > 475 || lionel.y < 25){ //está en algún borde
  		console.log('borde');
  		if(lionel.x < 25){ //izquierda
  			if(lionel.y < 25){ //arriba
  				//movimientos abajo derecha
  				if(random(0,100)<50){
  					lionel.moverD();
  				}else{
  					lionel.bajar();
  				}
  			}else{ //no arriba
  				if(lionel.y > 475){
  					//movimientos arriba derecha
  					if(random(0,100)<50){
  						lionel.subir();
  					}else{
  						lionel.moverD();
  					}
  				}else{
  					//movimientos arriba abajo
  					if(random(0,100)<33.3){
  						lionel.subir();
  					}else{
  						if(random(1,100)<50){
  							lionel.moverD();
  						}else{
  							lionel.bajar();
  						}
  					}
  				}
  			}
  		}else{
  			if(lionel.y < 25){
  				//movimientos abajo izquierda
  				if(random(0,100)<50){
  					lionel.bajar();
  				}else{
  					lionel.moverI();
  				}
  			}else{
  				if(lionel.y > 475){
  					//movimientos arriba izquierda
  					if(random(0,100)<50){
  						lionel.subir();
  					}else{
  						lionel.moverI();
  					}
  				}else{
  					//movimientos arriba abajo
  					if(random(0,100)<33.3){
  						lionel.subir();
  					}else{
  						if(random(0,100)<50){
  							lionel.moverI();
  						}else{
  							lionel.bajar();
  						}
  					}
  				}
  			}
  		}
  	}else{ //no está en ningún borde -> movimiento aleatorio
  		console.log('ningún borde');
  		switch(floor(random(0,4))){
  			case 1:
  				lionel.moverI();
  				break;
  			case 2: 
  				lionel.moverD();
  				break;
  			case 3:
  				lionel.subir();
  				break;
  			default: 
  				lionel.bajar();
  				break;
  		}
  	}


  	fitness++; //contador de movimientos
  	console.log(lionel.x + ','+ lionel.y);
  	lionel.display();

  	//momento en que lionel caza a bambi
  	if(lionel.x == bambi.x && lionel.y == bambi.y){
  		console.log('grr!');
  		console.log('Fitness: ' + fitness);
  		noLoop();
  	}

  	sleep(10); //para realentizar el paso de ciclos

  	
	
}