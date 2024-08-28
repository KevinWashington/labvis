let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//----CLASSES FORMAS--------------------------------------------

class Circulo {
    constructor(raio, centroX, centroY) {
        this.raio = raio;
        this.centroX = centroX;
        this.centroY = centroY;
    }

    static gerarCirculosAleatorios(quantidade, maxRaio, maxX, maxY) {
        const circulos = [];
        //GERANDO VALORES ALEATORIOS PARA AS FORMAS
        for (let i = 0; i < quantidade; i++) {
            const raio = Math.floor(Math.random() * maxRaio) + 1;
            const centroX = Math.floor(Math.random() * maxX);
            const centroY = Math.floor(Math.random() * maxY);
            const circulo = new Circulo(raio, centroX, centroY);
            circulos.push(circulo);
        }
        return circulos;
    }
}

class Retangulo {
    constructor(altura, largura, pontoX, pontoY) {
        this.altura = altura;
        this.largura = largura;
        this.pontoX = pontoX;
        this.pontoY = pontoY;
    }

    static gerarRetanguloAleatorios(quantidade, maxTam, maxX, maxY) {
        const retangulos = [];

        //GERANDO VALORES ALEATORIOS PARA AS FORMAS
        for (let i = 0; i < quantidade; i++) {
            const largura = Math.floor(Math.random() * maxTam) + 1;
            const altura = Math.floor(Math.random() * maxTam);
            const pontoX = Math.floor(Math.random() * maxX);
            const pontoY = Math.floor(Math.random() * maxY);
            const retangulo = new Retangulo(altura, largura, pontoX, pontoY);
            retangulos.push(retangulo);
        }

        return retangulos;
    }
}

class Triangulo {
    constructor(raio, centroX, centroY) {
        this.raio = raio;
        this.centroX = centroX;
        this.centroY = centroY;
        this.lado = (this.raio)*Math.sqrt(3)
    }

    static gerarTriangulosAleatorios(quantidade, maxLado, maxX, maxY) {
        const triangulos = [];

        //GERANDO VALORES ALEATORIOS PARA AS FORMAS
        for (let i = 0; i < quantidade; i++) {
            const raio = Math.floor(Math.random() * maxLado) + 1;
            const centroX = Math.floor(Math.random() * maxX);
            const centroY = Math.floor(Math.random() * maxY);
            const triangulo = new Triangulo(raio, centroX, centroY);
            triangulos.push(triangulo);
        }

        return triangulos;
    }
}

//---- FUNCOES ------------------------------------------

function gerarFormas(){
    let quantidadeCir = document.querySelector("#quantCir").value;  // Número de círculos a serem gerados
    let quantidadeRet = document.querySelector("#quantRet").value;  // Número de Retangulos a serem gerados
    let quantidadeTri = document.querySelector("#quantTri").value;  // Número de Retangulos a serem gerados

    //utilizando as funcoes de cada classe, retorna um objeto com os elementos 

    let circulosAleatorios = Circulo.gerarCirculosAleatorios(quantidadeCir, maxTam, maxX, maxY);
    let retangulosAleatorios = Retangulo.gerarRetanguloAleatorios(quantidadeRet, maxTam, maxX, maxY);
    let trianguloAleatorios = Triangulo.gerarTriangulosAleatorios(quantidadeTri, maxTam, maxX, maxY);

    return [circulosAleatorios, retangulosAleatorios, trianguloAleatorios]
}

function draw() { //Funcao que verifica os filtros e desenha os circulos gerados
    clear()
    if (canvas.getContext) { // Só inicializa se o navegador suportar canvas
        if(filterCir.checked){ 
            circulosGerados.forEach((circulo) => {
                ctx.beginPath();

                ctx.arc(circulo.centroX, circulo.centroY, circulo.raio, 0, Math.PI * 2, true); // Círculo 
                
                ctx.strokeStyle = document.querySelector("#corCir").value;
                ctx.fillStyle = document.querySelector("#corCir").value;
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            });  
        }
        if(filterRet.checked){ 
            retangulosGerados.forEach((retangulo) => {
                ctx.beginPath()
                ctx.fillStyle = document.querySelector("#corRet").value;
                ctx.strokeStyle = document.querySelector("#corRet").value;

                ctx.fillRect(retangulo.pontoX, retangulo.pontoY, retangulo.largura, retangulo.altura) //Retangulo
                
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            });   
        }
        if(filterTri.checked){ 
            trianguloGerados.forEach((triangulo) => {
                ctx.beginPath()
                ctx.fillStyle = document.querySelector("#corTri").value;
                ctx.strokeStyle = document.querySelector("#corTri").value;
                
                //O triangulo é formado a partir de um circulo, sendo o triangulo equilatero inscrito
                ctx.moveTo(triangulo.centroX, triangulo.centroY-triangulo.raio); //ponto superio
                ctx.lineTo(triangulo.centroX+((triangulo.lado)/2), triangulo.centroY+(triangulo.raio/2)); //ponto direito
                ctx.lineTo(triangulo.centroX-(triangulo.lado/2), triangulo.centroY+(triangulo.raio/2)); //ponto esquerdo
                
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            });   
        }
    }
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpa o quadro
    ctx.beginPath()
    //--- GERANDO AS LINHAS ---
    for (let x = 0; x <= 600; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 600);
    }
    
    // Desenha as linhas horizontais
    for (let y = 0; y <= 600; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(600, y);
    }
    // Desenha as linhas no canvas
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
    ctx.closePath()
}

//---- BOTOES --------------------------------------------

document.getElementById('generate').addEventListener('click', ()=>{[circulosGerados, retangulosGerados, trianguloGerados] = gerarFormas(); draw();}, false); // Ao gerar, cria novas formas e desenha no grafico.
document.getElementById('clear').addEventListener('click', clear, false);

//---- FILTRO --------------------------------------------

let filterCir = document.querySelector("#circulo")
filterCir.addEventListener('change', ()=>{
    draw()
});

let filterRet = document.querySelector("#retangulos")
filterRet.addEventListener('change', ()=>{
    draw()
});

let filterTri = document.querySelector("#triangulos")
filterTri.addEventListener('change', ()=>{
    draw()
});

const maxTam = 100;    // Raio máximo para os círculos
const maxX = document.querySelector("#canvas").width;      // Valor máximo para a coordenada X do centro
const maxY = document.querySelector("#canvas").height;      // Valor máximo para a coordenada Y do centro


let [circulosGerados, retangulosGerados, trianguloGerados] = gerarFormas()





