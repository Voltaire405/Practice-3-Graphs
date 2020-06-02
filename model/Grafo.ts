class Grafo{
    private inci: number[][];

    constructor(matrizIncidencia:number[][]){
        this.inci=matrizIncidencia;
    }

    public getInci(): number[][] {
        return this.inci;
    }
    public setInci(value: number[][]) {
        this.inci = value;
    }

    public numeroVertices():number{
        let vertices=this.inci.length-1;
        return vertices;
    }

    public numeroLados():number{
        let lados=this.inci[0].length-1;
        return lados;
    }

    


    /**
     * Devuelve un arreglo de arreglos en el que cada arreglo en la 
     * primera posición tiene la longitud de la trayectoria n. 
     * en las siguientes n posiciones tiene los vertices por los que pasa la 
     * trayectoria, en la siguiente posición un 1 o 0 dependiendo de si es una
     * trayectoria simple y en la ultima posición un 1 o 0 dependiendo de si 
     * tiene ciclo 
     * @param vertice1 
     * @param vertice2 
     */
    public trayectorias(vertice1: number, vertice2:number):number[][]{
        let trayectoriasTotales:number[][]=[];
        let verticesRepetidos= Array<number>(this.numeroVertices()).fill(0);
        let trayectoria:number[]=[];

        trayectoria.push(vertice1);
        this.calcularTrayectorias(vertice1, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);


        /*for(let i=0; i<trayectoriasTotales.length; i++){

            let n=trayectoriasTotales[i].length;
            trayectoriasTotales[i].unshift(n);
            //this.trayectoriaSimple(trayectoriasTotales);
        }*/
        
        //console.log(trayectoriasTotales);
        return trayectoriasTotales;
        
    }

    private calcularTrayectorias(vertice1:number, vertice2:number, trayectoriasTotales: number[][],
        verticesRepetidos:number[], trayectoria:number[]):void{
        
        verticesRepetidos[vertice1-1]=1;

        if(vertice1==vertice2){
            console.log(trayectoria)
            trayectoriasTotales.push(trayectoria);

            trayectoria.pop();
            verticesRepetidos[vertice1-1]=0
            return;
        }

        for(let j=1; j<=this.numeroLados(); j++){
            if(this.inci[vertice1][j]!=1){
                for(let i=1; i<=this.numeroVertices(); i++){
                    if(this.inci[i][j]!=-1){
                        if(!verticesRepetidos[i-1]){
                          trayectoria.push(i);
                          this.calcularTrayectorias(i, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);
                          trayectoria.pop();
                        }
                    }
                }
            }
        }
    }

    /*
    
    private _calcularTrayectorias(vertice1:number, vertice2:number, trayectoriasTotales: number[][],
        verticesRepetidos:number[], trayectoria:number[]):void{
        
        verticesRepetidos[vertice1-1]=1;

        if(vertice1==vertice2){
            console.log(trayectoria);
            trayectoriasTotales.push(trayectoria);
            verticesRepetidos[vertice1-1]=0;
            //console.log(trayectoriasTotales[trayectoriasTotales.length-1]);
            return;
        }

        for(let j=1; j<=this.numeroLados(); j++){
            if(this.inci[vertice1][j]!=1){
                for(let i=1; i<=this.numeroVertices(); i++){
                    if(this.inci[i][j]!=-1){
                        if(!verticesRepetidos[i-1]){
                          trayectoria.push(i);
                          this.calcularTrayectorias(i, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);
                          trayectoria.pop();
                        }
                    }
                }
            }
        }
    }

    private trayectoriaSimple(trayectorias:number[][]):void{
        let simple=1;
        for(let i=0; i<trayectorias.length; i++){
            for(let j=1; j<=trayectorias[i][0]; j++){
                let x=trayectorias[i][j];
                if(trayectorias[i].indexOf(x)!= trayectorias[i].lastIndexOf(x))simple=0;
            }
            trayectorias[i].push(simple);
        }
    }*/

    /**
     * Determina si son adyacentes dos vertices ingresados como parametros
     * retorna true si son adyacentes, false de lo contrario
     * @param vertice1 numero del primer vertice que se va a evaluar
     * @param vertice2 numero del segundo vertice que se va a evaluar
     * @returns {boolean}  booleano que indica si son adyacentes o no
     */
    public adyacentes(vertice1:number, vertice2:number):boolean{
        let adyacentes: boolean=false;
        for(let i=1; i<=this.numeroLados(); i++){
            if(this.inci[vertice1][i]!=2 && this.inci[vertice1][i]!=0){
                if(this.inci[vertice2][i]!=2 && this.inci[vertice2][i]!=0){
                    adyacentes=true;
                    break;
                }
            }
        }

        return adyacentes;
    }

    public fuertementeConectado():boolean{
        let respuesta:boolean=false;
        //to do : metodo para validar si el grafo es fuertemente conectado

        return respuesta;
    }

    /**
     * calcula el grado saliente de un vertice que recibe como parametro
     * @param vertice vertice para el cual se que calculará el grado saiente
     * @returns numero que representa el grado saliente del vertice
     */
    public gradoEntrante(vertice:number):number{
        let grado: number=0;
        for(let i=1; i<=this.numeroLados(); i++){
            if(this.inci[vertice][i]==-1 || this.inci[vertice][i]==2){
                grado++;
            }
        }

        return grado;
    }

    /**
     * calcula el grado saliente de un vertice que recibe como parametro
     * @param vertice vertice para el cual se calculará el grado saliente
     * @returns numero que representa el grado saliente del vertice
     */
    public gradoSaliente(vertice:number):number{
        let grado: number=0;
        for(let i=1; i<=this.numeroLados(); i++){
            if(this.inci[vertice][i]==1 || this.inci[vertice][i]==2){
                grado++;
            }
        }

        return grado;
    }

    /**
     * Calcula el recorrido BFS en el grafo
     * @returns arreglo de numeros en los que cada indice representa el vertice
     * por el que se pasará en el recorrido
     */
    public BFS():number[]{
        let recorrido:number[]=[];
        let cola=[];
        let vertice=3;
        let visitado= Array<number>(this.numeroVertices()).fill(0);

        visitado[vertice-1]=1;
        cola.push(vertice);
        let n=cola.length;
        while(n!=0){
            vertice=cola[0];
            recorrido.push(vertice);
            cola.shift();
            for(let j=1; j<=this.numeroLados(); j++){
                if(this.inci[vertice][j]!=0){
                    for(let i=1; i<=this.numeroVertices(); i++){
                        if(this.inci[i][j]!=0 && i!=vertice){
                            if(visitado[i-1]==0){
                                visitado[i-1]=1;
                                cola.push(i);
                            }
                        }
                    }
                }
            }
            n=cola.length;
        }
        return recorrido;
    }

    private recorridoDFS(vertice:number, visitado:number[], recorrido:number[]):void{
        visitado[vertice-1]=1;
        recorrido.push(vertice);

        for(let j=1; j<=this.numeroLados(); j++){
            if(this.inci[vertice][j]!=0){
                for(let i=1; i<=this.numeroVertices(); i++){
                    if(this.inci[i][j]!=0 && i!=vertice){
                        if(visitado[i-1]==0){
                            this.recorridoDFS(i, visitado, recorrido);
                        }
                    }
                }
            }
        }

    }

    /**
     * Calcula el recorrido DFS en el grafo
     * @returns arreglo de numeros en el que cada indice representa cada vertice
     * por el que se pasará en el recorrido
     */
    public DFS():number[]{
        let vertice=3;
        let visitado= Array<number>(this.numeroVertices()).fill(0);
        let recorrido:number[]=[];
        this.recorridoDFS(vertice, visitado, recorrido);
    
        return recorrido;
    }

}