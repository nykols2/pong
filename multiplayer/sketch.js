console.log("Pong no JS - By Nykol")

//estrutura da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 25;
let raioBolinha = diametroBolinha / 2;

//deslocamento da bolinha
let deslocamentoXBolinha = 6
let deslocamentoYBolinha = 6

//estrutura da raquete 
let xRaquete = 5;
let yRaquete = 155;
let comprimentoRaquete = 10;
let alturaRaquete = 90;


//estrutura da raquete oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 155;
let deslocamentoYOponente;

//placar 
let pontosJogador = 0;
let pontosOponente = 0;

//sons
let raquetada;
let ponto;
let trilhasonora;
let derrota;
let vitoria;

function preload(){
  trilha = loadSound ("trilha.mp3");
  raquetada = loadSound ("raquetada.mp3");
  ponto = loadSound ("ponto.mp3");
    derrota = loadSound ("derrota.mp3");
  vitoria = loadSound ("vitoria.mp3");
  
}




let colisao = false;


function setup() {
  createCanvas(600, 400);
  
  trilha.loop();
}

function draw() {
  background(0);
  stroke (0);
  
  mostrarBolinha();
  deslocamentoBolinha();
  limitacaoColisãoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente)
  deslocarMinhaRaquete();
  colisaoRaquete();
  colisaoLibrarie(xRaquete, yRaquete)
  colisaoLibrarie(xRaqueteOponente, yRaqueteOponente)
  deslocarRaqueteOponente();
  placar();
  marcarPontos();
  bolinhaNaoFicaPresa();
  max5Pontos();

  
  
}






function mostrarBolinha() {
  
  fill (color (65,105,225))
  circle(xBolinha, yBolinha, diametroBolinha);
  
}

function deslocamentoBolinha(){
  
    xBolinha = xBolinha + deslocamentoXBolinha;
   yBolinha = yBolinha + deslocamentoYBolinha;
  
}

function limitacaoColisãoBorda(){
  
  if (xBolinha + raioBolinha > 600 || xBolinha - raioBolinha < 0 )
  { deslocamentoXBolinha = deslocamentoXBolinha * -1;  }
  
  if (yBolinha + raioBolinha > 400 || yBolinha - raioBolinha < 0 )
  { deslocamentoYBolinha = deslocamentoYBolinha * -1;  }
  
}

function mostrarRaquete(x, y){
  
  fill (color (255,140,0))
  rect (x, y, comprimentoRaquete, alturaRaquete);
  
}


function deslocarMinhaRaquete(){
  
      if (keyIsDown(87)){ yRaquete = yRaquete - 4  }
  
      if (keyIsDown(83)){ yRaquete = yRaquete + 4  }
  
}

function colisaoRaquete(){ 

  if (xBolinha - raioBolinha < xRaquete + comprimentoRaquete && 
      yBolinha - raioBolinha < yRaquete + alturaRaquete && 
      yBolinha + raioBolinha > yRaquete)
  { deslocamentoXBolinha = deslocamentoXBolinha * -1   
   
    raquetada.play();
  }
  
}

function colisaoLibrarie(x, y){
  
  colisao = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  
  if (colisao){deslocamentoXBolinha = deslocamentoXBolinha * -1
              
       raquetada.play();       
              }
  
}

function deslocarRaqueteOponente(){
  
    if (keyIsDown(38)){ yRaqueteOponente = yRaqueteOponente - 4  }
  
    if (keyIsDown(40)){ yRaqueteOponente = yRaqueteOponente + 4  }
  
}


function placar(){
  textSize (18)
  textAlign (CENTER)
  
  stroke (255)
  fill (color (255,140,0))
  rect (238, 10, 40, 20)
  rect (320, 10, 40, 20)
  
  fill (255)
  text(pontosJogador, 258, 26);
  text(pontosOponente, 340, 26)
  
  
}

function marcarPontos(){
  if (xBolinha > 587){ pontosJogador = pontosJogador + 1; ponto.play (); }
  
  if (xBolinha < 13){ pontosOponente = pontosOponente + 1; ponto.play (); }
}




function bolinhaNaoFicaPresa(){
    if (xBolinha - raioBolinha < 1){
    xBolinha = 20
    }
  
      if (xBolinha + raioBolinha > 597.8){
    xBolinha = 570
    }
  
}



//max 5 pontos

function max5Pontos(){
  
  if (pontosJogador > 4)
 { trilha.stop(); deslocamentoXBolinha = 0;  deslocamentoYBolinha = 0; xBolinha = 300; yBolinha = 200; vitoria.play() ; pontosJogador = 0 ; pontosOponente = 0 ; setTimeout(function a() {
    location.reload() }, 1400); }
  
  if (pontosOponente > 4)
 { trilha.stop(); deslocamentoXBolinha = 0;  deslocamentoYBolinha = 0; xBolinha = 300; yBolinha = 200; derrota.play() ; pontosJogador = 0 ; pontosOponente = 0 ; setTimeout(function a() {
    location.reload() }, 1400); 
}
  
}



