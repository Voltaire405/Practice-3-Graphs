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

    /*
    public _trayectorias(vertice1: number, vertice2:number):void{
        let trayectoriasTotales:number[][]=[];
        let verticesRepetidos= Array<number>(this.numeroVertices()).fill(0);
        let trayectoriasParciales=this.calcularTrayectorias(vertice1, vertice2, trayectoriasTotales, verticesRepetidos);
        
    }

    private _calcularTrayectorias(vertice1:number, vertice2:number, trayectoriasTotales: number[][],
        verticesRepetidos:number[]):number[][]{
        if(verticesRepetidos[vertice1]<2){
            trayectoriasTotales.push([vertice1]);
            for(let j=1; j<=this.numeroLados(); j++){
                if(this.inci[vertice1][j]!=0){
                    //trayectorias=this.calcularTrayectorias(vertice1);
                }
                switch(this.inci[vertice1][j]){
                    case 1:
                        let trayectoria=[];
                        let i=1;
                        for(; i<this.numeroVertices(); i++){
                            if(this.inci[i][j]==-1)break;
                        }
                        if(i==vertice2)
                        break;
                }
    
            }

        }
        

        let trayectorias:number[][]=trayectoriasTotales;
        return trayectorias;
    }
    */

    public trayectorias(vertice1: number, vertice2:number):number[][]{
        let trayectoriasTotales:number[][]=[];
        let verticesRepetidos= Array<number>(this.numeroVertices()).fill(0);
        let trayectoria:number[]=[];
        trayectoriasTotales=this.calcularTrayectorias(vertice1, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);

        return trayectoriasTotales;
        
    }

    private calcularTrayectorias(vertice1:number, vertice2:number, trayectoriasTotales: number[][],
        verticesRepetidos:number[], trayectoria:number[]):number[][]{
        
        verticesRepetidos[vertice1]=1;

        if(vertice1==vertice2){
            trayectoriasTotales.push(trayectoria);
            verticesRepetidos[vertice1]=0;
            console.log(trayectoria);
            return trayectoriasTotales
        }

        for(let j=1; j<=this.numeroLados(); j++){
            if(this.inci[vertice1][j]!=1){
                for(let i=1; i<=this.numeroVertices(); i++){
                    if(this.inci[i][j]!=0){
                        if(!verticesRepetidos[i]){
                          trayectoria.push(i);
                          this.calcularTrayectorias(i, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);
                          trayectoria.pop();
                        }
                    }
                }
            }
        }

        //verticesRepetidos[vertice1]=0;
        return trayectoriasTotales;
    }

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

    public gradoEntrante(vertice:number):number{
        let grado: number=0;
        for(let i=1; i<=this.numeroLados(); i++){
            if(this.inci[vertice][i]==-1 || this.inci[vertice][i]==2){
                grado++;
            }
        }

        return grado;
    }

    public gradoSaliente(vertice:number):number{
        let grado: number=0;
        for(let i=1; i<=this.numeroLados(); i++){
            if(this.inci[vertice][i]==1 || this.inci[vertice][i]==2){
                grado++;
            }
        }

        return grado;
    }

    public BFS(vertice:number):number[]{
        let recorrido:number[]=[];
        //to do: crear recorrido

        return recorrido;
    }

    public DFS(vertice:number):number[]{
        let recorrido:number[]=[];
        //to do: crear recorrido

        return recorrido;
    }

}