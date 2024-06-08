let boxes, nbrs, out, outColor;
let valueBoxes = []; // Un arreglo vacío que probablemente se llenará con valores en algún momento.
let tokens;
let choiceBet = 1;
let account = 1000;
let tempAccount = 1000; //Representan el saldo de la cuenta del jugador.
let even = 0;
let odd = 0;
let red = 0;
let black = 0;
let outRow = 0;
let row1 = 0;
let row2 = 0;
let row3 = 0;
let select1_12 = 0;
let select1_18 = 0;
let select13_24 = 0;
let select19_36 = 0;
let select25_36 = 0; 
let currentlyBet = 0;
let run = false;

const randomFloor = (max=1, min=0) => Math.floor(Math.random() * (max - min) + min); // función de utilidad para generar un número entero aleatorio dentro

const accountUpDate = () => compte.innerText = account + " $";

const betUpDate = () => valBet.innerText = currentlyBet + " $";

const openInfo = () => info.style.display = "block"; // muestra la ventana emergente estableciendo el estilo de visualización 

const closeInfo = () => info.style.display = "none"; // oculta la ventana emergente estableciendo el estilo de visualización en “none”.

const selectToken = (token) => {  // Función que se encarga de resaltar un token seleccionado

	// // Itero sobre todos los tokens y les aplico estilos CSS para resetearlos
	for(let i=0; i<tokens.length; i++){
		tokens[i].style.transform  = "scale(1)"; // Resetear escala
		tokens[i].style.fontSize = "0.6em"; // Resetear tamaño de fuente
		tokens[i].style.boxShadow  = "0 0 10px transparent"; // Resetear sombra
	}
	//  // Ahora aplico estilos CSS específicos al token seleccionado
	token.style.transform  = "scale(1.2)";  // AU 20%
	token.style.fontSize = "0.7em";  
	token.style.boxShadow  = "0 0 10px black"; 
};
// Función que se encarga de inicializar la aplicación
const init = () => {
	boxes = document.getElementsByClassName('box');
	nbrs = document.getElementsByClassName('nbr');
	tokens = document.getElementsByClassName('choicetoken');
	
	 // Itero sobre los elementos 'box' y...
	for(let a=0; a<boxes.length; a++){
		valueBoxes.push(document.getElementsByClassName('box')[a].innerText); 
		boxes[a].setAttribute("bet", 0);  // Establezco un atributo 'bet' con valor 0 en cada elemento
	}
	
	// Itero sobre los elementos 'nbr' y agrego un evento de clic a cada elemento
	for(let b=0; b<nbrs.length; b++){
		nbrs[b].addEventListener("click", function(){
			token(nbrs[b]);
		});
	}
	
	// Cuando se hace clic en un elemento 'nbr', llamo a la función token con el elemento como parámetro
	for(let c=0; c<tokens.length; c++){
		tokens[c].addEventListener("click", function(){
			selectToken(tokens[c])
		});
	}
	
	const numbers = [
		0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6,
		27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
		16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
		7, 28, 12, 35, 3, 26
	];
	
	const colors = numbers.reduce((acc, _, index) => {
		if(index === 0){
			acc.push("green")
		}
		else if(index % 2 === 1){
			acc.push("red");
		}
		else if(index % 2 === 0){
			acc.push("black");
		}
		return acc;
	}, []);
	
	const onSpinEnd = (result) => start(result);
	
	const roulette = new Roulette("canvas-container", numbers, colors, onSpinEnd);
	
	const spinBtn = document.getElementById("play");
		  spinBtn.onclick = roulette.spin; 
};
// Función que establece el valor de la apuesta según la opción seleccionada
const choiceToken = (val) => choiceBet = val == "all" ? account : val;

// Función que se encarga de manejar la lógica de apuestas en una caja específica
const token = (box) => {
	if(!run){
		if(account>=choiceBet||choiceBet<0){
			let bet = parseInt(box.getAttribute("bet"));
			if(bet+choiceBet>=0){ // Verifico si la cuenta tiene suficiente saldo para realizar la apuesta
				bet+=choiceBet;
				box.setAttribute("bet", bet);
				
				if(bet>0){
					let newDiv = document.createElement("div");
					if(bet>99)newDiv.setAttribute("class", "token more100");
					else  newDiv.setAttribute("class", "token");   
					newDiv.textContent = bet;
					box.appendChild(newDiv); 
				}
				else{
					while (box.childNodes.length>1) {
						box.removeChild(box.lastChild);
					}
				}
				 // Actualizo el saldo disponible y la apuesta actual
				account-=choiceBet;
				currentlyBet+=choiceBet;
				accountUpDate();
				betUpDate(); 
			}
			else{
				while (box.childNodes.length>1) {
						box.removeChild(box.lastChild);
				}
				box.setAttribute("bet", 0);  // Restablezco el valor de la apuesta en la caja a 0
				account+=bet;// Devuelvo el saldo disponible y la apuesta actual a sus valores originales
				currentlyBet-=bet;
				accountUpDate();
				betUpDate(); 
			}
			
		}
		else if (account<choiceBet&&account>0&&choiceBet>0){
			let bet = parseInt(box.getAttribute("bet"));
			let newDiv2 = document.createElement("div");
			bet += choiceBet-(choiceBet-account);
			box.setAttribute("bet", bet);
			if(bet>99)newDiv2.setAttribute("class", "token more100");
			else  newDiv2.setAttribute("class", "token");   
			newDiv2.textContent = bet;
			box.appendChild(newDiv2);
			currentlyBet+= choiceBet-(choiceBet-account);
			account-=choiceBet-(choiceBet-account)
			accountUpDate();
			betUpDate(); 
		}
	}
};
// Función que maneja la apuesta en la opción "par o impar"
const evenOdd = (box, x) => {
	if(x==0)even+=choiceBet;
	if(x==1)odd+=choiceBet;
	token(box);
};
// Función que maneja la apuesta en la opción "rojo o negro"
const redBlack = (box, x) => {
	if(x=="red")red+=choiceBet;
	if(x=="black")black+=choiceBet;
	token(box);
};
// Función que maneja la apuesta en la opción "filas"
const rows = (box, x) => {
	if(x==1)row1+=choiceBet;
	if(x==2)row2+=choiceBet;
	if(x==3)row3+=choiceBet;
	token(box);
};
// Función que maneja la apuesta en la opción "selección de números"
const select = (box, min, max) => {
	if(min==1&&max==12)select1_12+=choiceBet;
	if(min==1&&max==18)select1_18+=choiceBet;
	if(min==13&&max==24)select13_24+=choiceBet;
	if(min==19&&max==36)select19_36+=choiceBet;
	if(min==25&&max==36)select25_36+=choiceBet;
	token(box);
};
// Función que se llama cuando el spin del ruleta termina
const start = (result) => {
	out = result
	check();
	output.innerText = out;
	output.style.backgroundColor = outColor;
	finish.style.display = "flex";
	setTimeout(function() { 
		finish.style.display = "none";
		accountUpDate();
		reinit();
		run = false;
	}, 3000);
	
};
// Función que verifica si hay ganadores en el spin del ruleta
const check = () => {
	for(let i=0; i<nbrs.length; i++){
		let bet = parseInt(nbrs[i].getAttribute("bet"));
		let nbr = parseInt(nbrs[i].getAttribute("nums"));
		if(out==nbr){
			account += 36*bet;
			outRow = parseInt(nbrs[i].getAttribute("row"));
			nbrs[i].style.backgroundColor = "blue";
			setTimeout(function() { 
				nbrs[i].style.backgroundColor = outColor;
			}, 3000);
		}
	}

	if(out%2==0)account = account + 2*even;
	else account += 2*odd;
	
	if(outColor=="red")account = account + 2*red;
	else account += 2*black;
	 // Verifico si el número ganador está en una fila específica
	if(outRow==1)account += 3*row1;
	if(outRow==2)account += 3*row2; 
	if(outRow==3)account += 3*row3;
	 // Verifico si el número ganador está en un rango específico
	if(out>=1&&out<=12)account += 3*select1_12;
	if(out>=1&&out<=18)account += 2*select1_18;
	if(out>=13&&out<=24)account += 3*select13_24;
	if(out>=19&&out<=36)account += 2*select19_36;
	if(out>=25&&out<=36)account += 3*select25_36;
	
	// Muestro el resultado final en el elemento finish
	if(account>=tempAccount-currentlyBet)finish.innerText = "WIN " + (account - (tempAccount - currentlyBet)) + " $";
	else finish.innerText = "WIN 0 $";
	if(currentlyBet<=0)finish.innerText = "Apueste sin miedo";
};

// Función que reinicia el juego
const reinit = () => {
	for(var j=0; j<boxes.length; j++){
		while (boxes[j].firstChild) {
			boxes[j].removeChild(boxes[j].lastChild);
		}
		boxes[j].innerHTML = valueBoxes[j];
		boxes[j].setAttribute("bet", 0);
	}
	output.innerHTML = "?";
	output.style.backgroundColor = "green";
	currentlyBet = 0;
	even = odd = 0;
	red = black = 0;
	outRow = row1 = row2 = row3 = 0;
	select1_12 = select1_18 = select13_24 = select19_36 = select25_36 = 0;
	tempAccount = account;
	betUpDate();	
	
};
// Función que cancela el juego
const cancel = () => {
	if(!run){
		account += currentlyBet;    // Devuelvo el saldo disponible a su valor original
		accountUpDate();   // Actualizo el saldo disponible
		reinit();
	}
}
// Función constructora de la ruleta
function Roulette(containerId, options, colors, onSpinEnd){
	const container = document.getElementById(containerId); // Obtengo el contenedor del elemento con el id pasado como parámetro
	
	// Creo un elemento canvas y lo agrego al contenedor
	const canvas = document.createElement("canvas");
	canvas.width = 500;
	canvas.height = 500;
	
	container.appendChild(canvas);

	  // Variables para dibujar la ruleta
	let startAngle = 0;
	let arc = Math.PI / (options.length / 2);
	let spinTimeout = null;

	let spinAngleStart = 0;
	let spinArcStart = 10;
	let spinTime = 0;
	let spinTimeTotal = 0;

	let ctx;
  // Función para dibujar la ruleta
	this.drawRouletteWheel = () => {
		if (canvas.getContext) {
			var outsideRadius = 200;
			var textRadius = 160;
			var insideRadius = 80;

			ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, 500, 500);
			 // Establezco el estilo de dibujo
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			 // Establezco la fuente de texto
			ctx.font = 'bold 16px Helvetica, Arial';
			 // Itero sobre las opciones de la ruleta
			for (var i = 0; i < options.length; i++) {
				var angle = startAngle + i * arc;
				ctx.fillStyle = colors[i];
				 // Dibujo la opción
				ctx.beginPath();
				ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
				ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
				ctx.stroke();
				ctx.fill();
				 // Dibujo el texto de cada opción
				ctx.save();
				ctx.shadowOffsetX = -1;
				ctx.shadowOffsetY = -1;
				ctx.shadowBlur = 0;
				ctx.shadowColor = "rgb(220,220,220)";
				ctx.fillStyle = "white";
				ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
					250 + Math.sin(angle + arc / 2) * textRadius);
				ctx.rotate(angle + arc / 2 + Math.PI / 2);
				var text = options[i];
				ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
				ctx.restore();
			}

			//Dibujo la flecha de la ruleta
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
			ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
			ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
			ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
			ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
			ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
			ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
			ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
			ctx.fill();
		}
	}
	// Función que inicia el spin de la ruleta
	this.spin = () => {
		run = true;
		if(spinTimeout){
			return;
		}
		spinAngleStart = Math.random() * 10 + 10;  // Establezco el ángulo de inicio del spin
		spinTime = 0; // Establezco el tiempo de spin
		spinTimeTotal = Math.random() * 3 + 4 * 1000; // Establezco el tiempo total de spin
		this.rotateWheel();  // Llamo a la función rotateWheel para iniciar el spin
	}
	// Función que rota la ruleta
	this.rotateWheel = () => {
		spinTime += 30;   // Incremento el tiempo de spin
		if (spinTime >= spinTimeTotal) {
			this.stopRotateWheel();
			return;
		}
		let spinAngle = spinAngleStart - this.easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
		startAngle += (spinAngle * Math.PI / 180);
		this.drawRouletteWheel();
		// Establezco un timeout para llamar a la función rotateWheel nuevamente
  //spinTimeout = setTimeout(this.rotateWheel, 30);
		spinTimeout = requestAnimationFrame(this.rotateWheel);
	}
	// Función que detiene el spin de la ruleta
	this.stopRotateWheel = () => {
		cancelAnimationFrame(spinTimeout);
		//// Cancelo el timeout actual
		spinTimeout = null;
		let degrees = startAngle * 180 / Math.PI + 90;
		let arcd = arc * 180 / Math.PI;
		let index = Math.floor((360 - degrees % 360) / arcd);
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = colors[index];
		outColor = colors[index]
		ctx.arc(250, 250, 40, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.font = 'bold 35px Helvetica, Arial';
		let text = options[index]
		onSpinEnd && onSpinEnd(text);
		ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
		ctx.restore();
	}
	// Función de easing out para calcular el ángulo de rotación
	this.easeOut = (t, b, c, d) => {
		let ts = (t /= d) * t;
		let tc = ts * t;
		return b + c * (tc + -3 * ts + 3 * t);
	}
	// Dibujo la ruleta inicialmente
	this.drawRouletteWheel();
}
window.onload = init; // Inicializo la ruleta cuando se carga la página
