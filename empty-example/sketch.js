let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

let distanciaImpala = 27;
let distanciaLeon = 27;
let decisionesLeon = [100];
let decisionesImpala = [100];


let fitness = 0;

class impala{
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.huir = false;
	}
	display(){
		fill(50, 100, 150, 200);
  		stroke(0, 0, 0);
  		triangle((this.x)-10,(this.y)+12, (this.x)+10, (this.y)+12,(this.x), (this.y)-8);
	}
	moverI(distanciaImpala){
 		this.x -= distanciaImpala;
 	}
 	moverD(distanciaImpala){
 		this.x += distanciaImpala;
 	}
 	verArriba(){
    fill(255,0,0,90);
    beginShape();
    vertex(0,0);
    vertex(width/2,height/2);
    vertex(width,0);
    endShape(CLOSE);
  }
 	verDerecha(){
 		fill(255,0,0,90);
    beginShape();
    vertex(width,0);
    vertex(width/2,height/2);
    vertex(width,height);
    endShape(CLOSE);
 	}
 	verIzquierda(){
 		fill(255,0,0,90);
    beginShape();
    vertex(0,0);
    vertex(width/2,height/2);
    vertex(0,height);
    endShape(CLOSE);
 	}
 	beber(){
    return true;
 	}
  evaluarIzquierda(lionel){
    if (lionel.x<=width/2){
      if(lionel.y<=height/2){
        if(lionel.x<=lionel.y && lionel.escondido == false){          
					return true;
        }
      }
      else{
        if(lionel.x<=abs(lionel.y-height) && lionel.escondido == false){
					return true;
        }
      }
    }
    return false;
  }
  evaluarDerecha(lionel){
    if (lionel.x>=width/2){
      if(lionel.y<=height/2){
        if(lionel.y<=lionel.x && lionel.escondido == false){          
					return true;
        }
      }
      else{
        if(lionel.x>=lionel.y && lionel.escondido == false){          
					return true;
        }
      }
    }
    return false;
  }
  evaluarArriba(lionel){
    if (lionel.y<=height/2){
      if(lionel.x<=width/2){
        if(lionel.y<=lionel.x && lionel.escondido == false){          
					return true;
        }
      }
      else{
        if(lionel.y<=abs(lionel.x-width) && lionel.escondido == false){          
					return true;
        }
      }
    }
    return false;
  }
}

class leon{
	constructor(){
    this.escondido = false;
    this.ataca = false;
		let x =floor(random(0,8))
		switch(x){
			case 1:
				this.x=13.5;
				this.y=13.5;
				break;
			case 2:
				this.x=width/2;
				this.y=13.5;
				break;
			case 3:
				this.x=width-27/2;
				this.y=13.5;
				break;
			case 4:
				this.x=13.5;
				this.y=width/2;
				break;
			case 5:
				this.x=width-27/2;
				this.y=width/2;
				break;
			case 6:
				this.x=13.5;
				this.y=width-27/2;
				break;
			case 7:
				this.x=width/2;
				this.y=width-27/2;
				break;
			case 0:
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

 	moverI(distanciaLeon){
    if(this.x - distanciaLeon >= 0){
      this.x -= distanciaLeon;
    }
    else
      this.x += distanciaLeon;   
 	}
 	moverD(distanciaLeon){
 		  if(this.x + distanciaLeon <= width){
      this.x += distanciaLeon;
    }
    else
      this.x -= distanciaLeon;   
  }
 	bajar(distanciaLeon){
 		  if(this.y + distanciaLeon >= height){
      this.y -= distanciaLeon;
    }
    else
      this.y += distanciaLeon;   
  }
 	subir(distanciaLeon){
 		if(this.y - distanciaLeon <= 0){
      this.y += distanciaLeon;
    }
    else
      this.y -= distanciaLeon;   
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
  frameRate(5);
}

function draw() {
	background(250);
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
    lionel.display(); 

    LionelMueve(lionel); 		

  	fitness++; //contador de movimientos
  	//console.log(lionel.x + ','+ lionel.y);
    BambiEvaluar(bambi, lionel);
		if(bambi.huir == true){
			BambiHuye(bambi);
		}
    else{
    BambiVe(bambi);
  }

  	//momento en que lionel caza a bambi
  	if(dist(lionel.x,lionel.y,bambi.x,bambi.y)<=27 || (bambi.x <= 0 || bambi.x >width+15)){
  		console.log('grr!');
  		console.log('Fitness: ' + fitness);
  		noLoop();
      console.log(decisionesLeon);
      console.log(decisionesImpala);
  	}


  	//sleep(100); //para realentizar el paso de ciclos

}

//Bambi ve hacia todos lados ALV
function BambiVe(bambi){
  let x = floor(random(0,4));
switch(x){
		case 1:
			bambi.verArriba();
			if(bambi.evaluarArriba(lionel)){
				bambi.huir = true;
				console.log(bambi.huir);
			}
			else {
				bambi.huir = false;
			}
			break;
		case 2:
			bambi.verIzquierda();
			if(bambi.evaluarIzquierda(lionel)){
			bambi.huir = true;
			console.log(bambi.huir);
		}
		else {
			bambi.huir = false;
		}
			break;
		case 3:
			bambi.verDerecha();
			if(bambi.evaluarDerecha(lionel)){
			bambi.huir = true;
			console.log(bambi.huir);
		}
		else {
			bambi.huir = false;
		}
			break;
		default:
			if(bambi.beber()){
				bambi.huir = false;
				console.log(bambi.huir);
			}
			else {
				bambi.huir = false;
			}
			break;
	}
  decisionesImpala.push(x);
}

function BambiEvaluar(bambi, lionel){
  if (dist(bambi.x,bambi.y,lionel.x,lionel.y)<=81)
    bambi.huir=true;
  if(lionel.ataca == true)
    bambi.huir=true;
}

function BambiHuye(bambi){
	bambi.moverD(distanciaImpala);
	distanciaImpala += 27;
}

function LionelMueve(lionel){
  if (lionel.ataca == false){
    let x = floor(random(0,6))
    switch(x){
        case 0:
          lionel.moverI(distanciaLeon);
          lionel.escondido = false;
          break;
        case 1:
          lionel.moverD(distanciaLeon);
          lionel.escondido = false;
          break;
        case 2:
          lionel.subir(distanciaLeon);
          lionel.escondido = false;
          break;
        case 3:
          lionel.escondido = false;
          lionel.bajar(distanciaLeon);
          break;
        case 4:
          lionel.ataca = true;
          console.log("ataca");
          distanciaLeon += 27 
          break;
        case 5:
          lionel.escondido = true
          console.log("escondido");
          break;
      }
      decisionesLeon.push(x);
  }
  else{
    let x = floor(random(0,4))
    switch(x){
        case 0:
          lionel.moverI(distanciaLeon);
          lionel.escondido = false;
          break;
        case 1:
          lionel.moverD(distanciaLeon);
          lionel.escondido = false;
          break;
        case 2:
          lionel.subir(distanciaLeon);
          lionel.escondido = false;
          break;
        case 3:
          lionel.escondido = false;
          lionel.bajar(distanciaLeon)
          break;
      }
      decisionesLeon.push(x);
  }
}
