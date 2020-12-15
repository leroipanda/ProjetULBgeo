


class PointGeo {
        constructor( _x ,_y ){
            this.x = _x ;
            this.y = _y ;
            //console.log(this.x , this.y )
            this.vector = null;


        }
        draw(p5){
            this.vector = p5.createVector(this.x, this.y);
            p5.strokeWeight(10);
            p5.point(this.vector);
            p5.strokeWeight(4);
        }
        static GetAngle(A, B, C) {
            const AB = new PointGeo(B.x - A.x, B.y - A.y);
            const AC = new PointGeo(C.x - A.x, C.y - A.y);

            return Math.atan2(AB.x * AC.x + AB.y * AC.y, AB.y * AC.x - AB.x * AC.y);
        }



    }

    //class which represent a triangle
class TriangleGeo {
        constructor( _pt1 , _pt2 , _pt3){
            this.pt1 = _pt1 ;
            this.pt2 = _pt2 ;
            this.pt3 = _pt3 ;
            //this.printOrientation();
        }

        draw(p5){
            p5.strokeWeight(0);
            p5.triangle( this.pt1.x , this.pt1.y ,this.pt2.x , this.pt2.y ,this.pt3.x ,this.pt3.y) ;
            p5.strokeWeight(2);
        }

        static orientation (pt1 , pt2, pt3) {



            return pt2.x * pt3.y - pt2.y * pt3.x
                - pt1.x * pt3.y + pt1.y * pt3.x
                +pt1.x * pt2.y - pt1.y * pt2.x ;

        }

        getOrientation(){

            return TriangleGeo.orientation(this.pt1 ,this.pt2 , this.pt3);
        }

        printOrientation(){
            const a = this.getOrientation() ;
            if(a > 0 ){
                console.log("right");
            }
            else if(a == 0 ){
                console.log("alignes" );
            }
            else{
                console.log("left") ;
            }
        }

        ptInside(pt ){
            // on creer 3 triange formée des sommet du triangle et du point à tester
            const t1 = new TriangleGeo(this.pt1 , this.pt2 , pt) ;
            const t2 = new TriangleGeo(this.pt2 , this.pt3 , pt) ;
            const t3 = new TriangleGeo(this.pt3 , this.pt1 , pt ) ;
            //console.log("t1" , t1.getOrientation()  );
            //console.log("t2" , t2.getOrientation() );
            //console.log("t3" , t3.getOrientation() )

            if(  (t1.getOrientation() > 0 && t2.getOrientation() > 0 && t3.getOrientation() > 0 )
                || (t1.getOrientation() < 0 && t2.getOrientation() < 0 && t3.getOrientation() < 0 ) ){
                return true ;
            }
            else{
                return false;
            }



        }
    }

    //class which represent a line
class DroiteGeo{
        static maxX = 803 ;
        static minX = -3 ;
        static facteur = 2500 ;
        constructor(_pt1 , _pt2, graph  ) {
            this.pt1 = _pt1 ;
            this.pt2 = _pt2 ;
            this.graph = graph ;
            //calcule du coefficient directeur
           /* var coef ;
            console.log(this.pt2.x  , this.pt1.x) ;
            if(this.pt2.x - this.pt1.x ==! 0){
                coef = (this.pt2.y - this.pt1.y ) / (this.pt2.x - this.pt1.x );
            }
            else{
                coef =0 ;
            }*/
           const coef =  (this.pt2.y - this.pt1.y ) / (this.pt2.x  - this.pt1.x + 0.01 );

            const b = this.pt1.y - coef * this.pt1.x;
            this.a =coef ;
            this.b = b ;






        }

        getIntersectionWithBorder(){
            const ptEloigne1 = new PointGeo( DroiteGeo.minX , this.a * DroiteGeo.minX  + this.b );
            const ptEloigne2 = new PointGeo( DroiteGeo.maxX , this.a * DroiteGeo.maxX  + this.b );


            //focntion utilise po
            function isInedgeLooked(edgeLooked , edges){
                for (let i = 0 ; i <edgeLooked.length ; i++ ){
                    if(  (edgeLooked[i].start ===edges.start && edgeLooked[i].end ===edges.end ) || (edgeLooked[i].end ===edges.start && edgeLooked[i].start ===edges.end )   ){
                        return true ;
                    }
                }
                return false ;
            }




            //console.log("debut");
            //on obtient la premier intersection
            const intersectionBorder = this.graph.isAnIntersectionOfBorder(ptEloigne1 ,ptEloigne2) ;// deux points normalement

            let poly =  intersectionBorder[0][0 ].getEdge(intersectionBorder[0][0 ] , intersectionBorder[0][1 ]).polyGoneAssocie ;
            //console.log( intersectionBorder );
            //const borderID =  intersectionBorder[0][0 ].getEdge(intersectionBorder[0][0 ] , intersectionBorder[0][1 ]).getNextPolygone().id
            //console.log("border id :" , intersectionBorder[0][0 ].getEdge(intersectionBorder[0][0 ] , intersectionBorder[0][1 ]).getNextPolygone().id) ;

            //console.log("first polygone id : " , poly.id) ;
            //console.log("firts poly", poly) ;
            let fin = false ;
            const listPolyVisite = [];
            const listeIntersection = [] ;
            //var listeIntersection = [ [intersectionBorder[0][0 ] , intersectionBorder[0][1 ] ] ] ;
            //var intersect = graph.isAnIntersectionWithEdge( graph.border[0].getEdge( graph.border[1] , graph.border[0]  )  ,ptEloigne1 ,ptEloigne2 );
            const NextPoly = [];
            const edgeLooked = [] ;
            while(!fin) {

                //console.log("poly actuel :", poly) ;
                const intersect = this.graph.isAnInersectionWithAPolygone(poly, ptEloigne1, ptEloigne2); //graph.listPolygone[0]

                listPolyVisite.push(poly);
                //console.log("poly visite :" ,listPolyVisite) ;

                let included = 0 ;
                //console.log("intesection :",intersect);
                intersect.forEach(e => {
                    const p = e[0].getEdge(e[1], e[0]).polyGoneAssocie  ;
                    //console.log("polygone en contacte:" , p.id);
                    if (listPolyVisite.includes(p ) ) {    //listPolyVisite.includes(p )
                       //console.log("included") ;
                        included++ ;
                        //do nothing ears
                    } else {
                        NextPoly.push( e[0].getEdge(e[0], e[1]).getNextPolygone()  );
                        //console.log("Collision avec un polygone inconnue" ,e[0].getEdge(e[0], e[1]).getNextPolygone() .id ) ;
                        //listeIntersection.push( [e[0] , e[1] ]);


                    }
                    if( !isInedgeLooked(edgeLooked , e[0].getEdge(e[0], e[1])  ) ){ //on regarde si on a un cote intersection n'a pas encore était rajouter .
                        //console.log("nouveaux edges");
                        listeIntersection.push( [e[0] , e[1] ]);
                        edgeLooked.push(e[0].getEdge(e[0], e[1])) ;

                    }



                });
                //console.log("next poly :",NextPoly) ;
                if (included === intersect.length && NextPoly.length === 0) {

                    fin =true   ;
                }
                poly = NextPoly.pop();
            }
            //var last = listeIntersection[ listeIntersection.length -1 ] ;
            /*if(last[0].getEdge(last[0], last[1]).polyGoneAssocie.id  === borderID  ){
                listeIntersection.push([  intersectionBorder[1][0 ] , intersectionBorder[1][1 ]   ] )
            }*/
            //listeIntersection.push([  intersectionBorder[1][0 ] , intersectionBorder[1][1 ]   ] )  ;
            //console.log("Toutes les intersections :" ,intersect , listPolyVisite,listeIntersection ,edgeLooked  );
            const listeVertexIntersection = [] ;
            for(let i = 0 ; i<listeIntersection.length ; i++){
                //calcule de l'endroite de l'intersection
                const inte =new DroiteGeo ( listeIntersection[i][0 ].pt , listeIntersection[i][1 ].pt ,this.graph ) ;
                const pointIntersection2 = this.getIntersection(inte);
                const vertexIntersection =  this.graph.insertInEdge( edgeLooked[i].start , edgeLooked[i].end ,pointIntersection2.x , pointIntersection2.y );
                //console.log("ve" ,vertexIntersection) ;
                listeVertexIntersection.push(vertexIntersection) ;

                //on ajoute le nouveau vertexe à la bordure regarde si on doit ajouter un nouveau vertex à la bordure
                const indexB1 = this.graph.borderVertex.indexOf(listeIntersection[i][0 ] ) ;
                const indexB2 = this.graph.borderVertex.indexOf(listeIntersection[i][1 ] ) ;
                if( indexB1 >= 0 &&  indexB2 >=0 && ( Math.floor((indexB2- indexB1)**2 ) === 1 ||  Math.floor((indexB2- indexB1)**2 ) === (this.graph.borderVertex.length-1)**2 ) ){ //on ajoute le nouveau vertexe à la bordure

                    const posi = Math.max(indexB1,indexB2 ) ;
                    //console.log(indexB1 ,indexB2 ,posi) ;
                    if( (indexB1 === 0 && indexB2 ===this.graph.borderVertex.length-  1) || (indexB1 === this.graph.borderVertex.length -1 && indexB2 ===0  ) ){
                        this.graph.borderVertex.push(vertexIntersection) ;
                    }
                    else {
                       // console.log("avant splice:", graph.borderVertex) ;
                        this.graph.borderVertex.splice(posi, 0, vertexIntersection) ;
                        //console.log("apres splice:" ,graph.borderVertex );
                    }

                }

            }
            //on trie notre liste d'intersection pour les placer dans le bonne ordre
            listeVertexIntersection.sort(function(a, b){return b.pt.x - a.pt.x}); //magouille qui ne marche que si l'utilisateur ne fait pas de dro
            for(let i = 1 ; i<listeVertexIntersection.length ; i++){
                this.graph.connectVertex( listeVertexIntersection[i-1 ],listeVertexIntersection[i] );
            }


        }
        getIntersection( _otherDroite){
            //console.log(_otherDroite.a ,_otherDroite.b , this.a ,this.b  );
            const  x =-1* (_otherDroite.b - this.b ) / (_otherDroite.a - this.a );
            const y = this.a * x + this.b ;
            //print("intersection :" , x,y );
            return new PointGeo( x ,y );



        }

        draw(p5){
            const extrem1 = new PointGeo( DroiteGeo.maxX , DroiteGeo.maxX* this.coef + this.b );
            const extrem2 = new PointGeo( DroiteGeo.minX , DroiteGeo.minX* this.coef + this.b );
            p5.strokeWeight(1);
            p5.line(extrem2.x, extrem2.y, extrem1.x, extrem1.y);
            p5.strokeWeight(1);

        }


    }

    //class which represent a polygone
class PolyGeo {
        static nbPoly = 0 ;
        static factorGraph = 1
        constructor(_listePoint , _listeVertex ) {
            this.listePoint = _listePoint;
            this.listeVertex = _listeVertex ;
           // console.log(this.listeVertex)
            this.id = PolyGeo.nbPoly ;
            PolyGeo.nbPoly++ ;
            //console.log( _listePoint);
            if(this.listePoint.length > 2 ){
                this.ears = this.trianguler(_listePoint);
                //this.ears = [ new TriangleGeo( this.listePoint[0] , this.listePoint[1] ,this.listePoint[2] )   ]
            }
            else{
                this.ears = []
            }
            //console.log("fin triangulation") ;
        }

        draw( value ,p5 ){
            //p5.fill(value , 0 ,0) ;
            this.ears.forEach( e => {
                e.draw(p5)
            });
            p5.noFill() ;


        }
        trianguler(polygone) {
            //polygone will be simple so we dont need do triangulate such as homework
            const  poly = [...polygone ];
            const  listeTriangle = [] ;
            while( poly.length >= 3 ){
                const t = new TriangleGeo(poly[0]  , poly[1] , poly[2]);
                listeTriangle.push(t );
                //console.log(t);
                //we supress middle point
                poly.splice(1, 1);

            }
            return listeTriangle

        }

        getNodeObject(){

            //we compute a center of the polygone
            let x= 0 ;
            let y = 0 ;
            this.listeVertex.forEach(
                e => {
                    x += e.pt.x ;
                    y += e.pt.y ;

                });

            x =(x*PolyGeo.factorGraph)   /this.listeVertex.length ;
            y =(y* PolyGeo.factorGraph)  /this.listeVertex.length ;
            return {
                "name": this.id.toString(),
                "label": this.id.toString(),
                "x": x.toString(),
                "y": y.toString(),
                "size": "1",
            }

        }




    }


    //class which represent an edge  structure
class Edges {
        static distaceMax = 10 ;
        constructor( _v1 ,_v2 , _color) {
            this.start = _v1 ;
            this.end = _v2 ;
            this.distace = Math.sqrt(  ( this.start.pt.x - this.end.pt.x )**2 + ( this.start.pt.y - this.end.pt.y )**2   );
            this.calculated = false ; //variable when i look at every cell to memorized all edge which are allready in a polygone
            this.polyGoneAssocie =null;
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            this.color = _color ;
        }

        draw(p5){
            p5.stroke(this.color);
            p5.strokeWeight(4) ;
            p5.line(this.start.pt.x  , this.start.pt.y, this.end.pt.x, this.end.pt.y);

        }

        //check if the mouse is on this edge
        ifClicked( _x ,_y ){
            const d1 =  Math.sqrt(  ( this.start.pt.x - _x )**2 + ( this.start.pt.y - _y )**2   );
            const d2 =  Math.sqrt(  ( this.end.pt.x - _x )**2 + ( this.end.pt.y - _y )**2   );
            //console.log(   d1 ,d2,this.distace ,(d1 + d2 - this.distace) < Edges.distaceMax ) ;
            return (d1 + d2 - this.distace) < Edges.distaceMax


        }


        /*fonction l'edge qui est connecté le plus à droite de ce drenier.*/
        nextEdge(){
            let min =null  ;
            let NextEdge =this.end.listEdges[0] ;
            this.end.listEdges.forEach( e => {


                if(e.start === this.end  && !e.calculated ){  //on prends les vertex qui continue le sens du polygone
                    const ori =  TriangleGeo.orientation( this.start.pt , this.end.pt , e.end.pt );
                    //console.log(ori);
                    if(ori < min || min === null  ){
                        min = ori ;
                        NextEdge = e ;
                    }

                }
            });
            return NextEdge

        }


        nextEdgeReverse(){
            let min =null  ;
            let NextEdge =this.end.listEdges[0] ;
            this.end.listEdges.forEach( e => {


                if(e.start === this.end  && !e.calculated ){  //on prends les vertex qui continue le sens du polygone
                    const ori =  TriangleGeo.orientation( this.start.pt , this.end.pt , e.end.pt );
                    //console.log(ori);
                    if(ori > min || min === null  ){
                        min = ori ;
                        NextEdge = e ;
                    }

                }
            });
            return NextEdge

        }

        //return the polygone next to an edge.
        getNextPolygone(){
            return this.start.getEdge(this.end , this.start).polyGoneAssocie ;
        }

        getEdgeGraphObject(){
            const edgeJumeaux =  this.start.getEdge(this.end , this.start) ;
            const id= this.polyGoneAssocie.id.toString() +edgeJumeaux.polyGoneAssocie.id.toString();
            edgeJumeaux.calculated = true ;

            return {
                "id": id,
                "source": this.polyGoneAssocie.id.toString(),
                "target": edgeJumeaux.polyGoneAssocie.id.toString(),
                "color": this.color.toString()
            }
        }

        toJson(){
            //console.log( "info edges", this.start.id , this.end.id  );
            return{
                "start" : this.start.id,
                "end"   : this.end.id ,
                "color" : this.color,
            };

        }
    }

    //class which represent a vertex structure
class Vertex{
        static distanceMax = 4 ;
        static numberVertex = 0 ;
        constructor(_x ,_y ) {
            this.pt = new PointGeo( _x ,_y );
            this.listEdges= [];
            this.id = Vertex.numberVertex ;
            Vertex.numberVertex++ ;


        }
        //function which connect two vertex by creating two edge.
        static connectVertex(_v1 , _v2  ){
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const  e1 = new Edges(  _v1 ,_v2 , couleur1 ) ;
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const e2 = new Edges( _v2 , _v1  , couleur1) ;
            _v1.listEdges.push( e1 ) ;
            _v1.listEdges.push( e2 ) ;
            _v2.listEdges.push(  e1 );
            _v2.listEdges.push(  e2 );
            return [e1,e2]
        }

        draw(p5){
            this.pt.draw(p5)
        }

        //function which find an edge which is connected to this vertex
        getEdge(start ,end){
            for(let i =0 ; i < this.listEdges.length ; i++){
                if( this.listEdges[i].start === start &&  this.listEdges[i].end === end  ){
                    return this.listEdges[i];
                }
            }
            return null
        }

        //check if the mouse is on this vertex
        isClicked(_x,_y){
            const d =  Math.sqrt(  ( this.pt.x - _x )**2 + ( this.pt.y - _y )**2   );
            return d< Vertex.distanceMax
        }

        toJson(){

            return{
                "x" : this.pt.x,
                "y" : this.pt.y,
                "id": this.id ,

            };

        }


    }



    //class which represent the DCEL structure
class DCEL{
        static xMin = -2 ;
        static xMax = 802 ;
        static yMin = -2 ;
        static yMax =802 ;

        constructor() {
            this.listVertex = [];
            this.listEdge = [];
            this.listPolygone = [] ;


            //we add the border of plane vertex and edges
            const v1 = this.addVertex( DCEL.xMin,DCEL.yMax );
            const v2 = this.addVertex( DCEL.xMax,DCEL.yMax );
            const v3 = this.addVertex( DCEL.xMax,DCEL.yMin );
            const v4 = this.addVertex( DCEL.xMin,DCEL.yMin );
            this.border = [v1 , v2, v3 ,v4 ] ;
            this.borderVertex = [ v1 , v2, v3 ,v4 ] ;
            //console.log(DCEL.border) ;
            this.connectVertex( v1 ,v2);
            this.connectVertex( v2 , v3 );
            this.connectVertex( v3 ,v4) ;
            this.connectVertex( v4 ,v1) ;

            //var v5 = this.insertInEdge( v1 ,v2 , 301 ,401 );
            //var v6 = this.insertInEdge( v1 ,v4 ,20 , 300.01  );
            //this.connectVertex( v5 ,v6) ;


            //this.listPolygone.push(   this.getPolygone(v3.listEdges[0])[0]  ) ;
            //this.getAllpolygone();

        }

        //add a vertex to the graph
        addVertex(_x , _y){

            const v = new Vertex( _x , _y ) ;
            this.listVertex.push( v );
            return v
        }
        //connect two vertex with edges
        connectVertex( _v1 , _v2 ){
           const e =  Vertex.connectVertex(_v1 , _v2  );
           this.listEdge.push(e[0]) ;
           this.listEdge.push(e[1]) ;
           return [e[0] , e[1] ]

        }

        draw(p5){
            this.listVertex.forEach(element => element.draw(p5) );
            this.listEdge.forEach(element => element.draw(p5) );
            //console.log("getting all cell...");
            this.getAllpolygone();

            const partValue = 200 / this.listPolygone.length ;
            for( let i = 0 ; i < this.listPolygone.length ; i ++ ){
                this.listPolygone[i].draw( Math.floor( i *partValue ),p5 )  ;
            }



        }
        //check if the mouse is on a edge of the graph and return it
        EdgesClicked(_x ,_y ){
            for ( let i = 0 ; i < this.listEdge.length ;i++){
                if (this.listEdge[i].ifClicked(_x ,_y) )
                {
                    //console.log(this.listEdge[i] , "clicked");
                    return this.listEdge[i];
                }
            }
            return null
        }

        //check if the mouse is on a vertex of the graph and return it
        VertexClicked(_x ,_y ){
            for ( let i = 0 ; i < this.listVertex.length ;i++){
                if (this.listVertex[i].isClicked(_x ,_y) )
                {
                    //console.log(this.listEdge[i] , "clicked");
                    return this.listVertex[i];
                }
            }
            return null
        }

        //delete an egde to the graph
        deleteEdge(e ){
            let index = this.listEdge.indexOf(e);
            if (index !== -1) {
                this.listEdge.splice(index, 1);
            }

            index = e.start.listEdges.indexOf(e);
            if (index !== -1) {
                e.start.listEdges.splice(index, 1);
            }

            index=  e.end.listEdges.indexOf(e);
            if (index !== -1) {
                e.end.listEdges.splice(index, 1);
            }

        }

        insertInEdge( vertex1 , vertex2 , x, y ){
            //we look the to edge that we need to supresse
            const e1  = vertex1.getEdge(vertex1 ,vertex2  ) ;
            const e2  = vertex1.getEdge(vertex2 ,vertex1  ) ;
            const oldColor = e1.color ;
            //console.log(e1 ,e2);
            this.deleteEdge(e1 ) ;
            this.deleteEdge(e2 );
            const vertex = this.addVertex( x ,y ) ;
            const newEdges1 = this.connectVertex( vertex1 , vertex ) ;
            const newEdges2= this.connectVertex( vertex2 , vertex ) ;
            newEdges1[0].color = oldColor ;
            newEdges1[1].color = oldColor ;
            newEdges2[0].color = oldColor ;
            newEdges2[1].color = oldColor ;
            return vertex

        }

        isAnIntersection( edge ){  //complexity to find an intersection is O(n)

            for( let i = 0 ; i < this.listEdge.length ; i++) {
                //i select two segement
                //i look at for each point of a segment the orientation made with him and the other segement
                //it only have and intersection if oreintation of  (ACB) and (ADB) is different and (CAD) , (CDB) too
                const t1 = new TriangleGeo(edge.start.pt,this.listEdge[i].start.pt  , edge.end.pt  );
                const t2 = new TriangleGeo(edge.start.pt,this.listEdge[i].end.pt  , edge.end.pt  );
                if( t1.getOrientation() * t2.getOrientation() < 0 ){
                    const t3 = new TriangleGeo(this.listEdge[i].start.pt  ,edge.start.pt ,this.listEdge[i].end.pt) ;
                    const t4 = new TriangleGeo(this.listEdge[i].start.pt  ,edge.end.pt ,this.listEdge[i].end.pt) ;
                    if(t4.getOrientation() * t3.getOrientation() < 0 ){
                        return true
                    }


                }
            }
            return false ;
        }

        // determine ou le segment formé par deux coupe la bodure.
        isAnIntersectionOfBorder( p1 , p2  ){

            const borderCopy = [...this.borderVertex] ;
            borderCopy.push( this.borderVertex[0]) ;
            const listeVertexValide = [];

            function isInside(A ,B,VC, VD ){
                const t1 = new TriangleGeo(A ,VC.pt , B );
                const t2 = new TriangleGeo(A ,VD.pt , B  );
                //console.log("t1" ,t1.getOrientation() ,"t2" ,t2.getOrientation()) ;
                if( t1.getOrientation() * t2.getOrientation() < 0 ){
                    const t3 = new TriangleGeo(VC.pt  ,A ,VD.pt ) ;
                    const t4 = new TriangleGeo(VC.pt  ,B ,VD.pt ) ;
                    //console.log("t3" ,t3.getOrientation() ,"t4" , t4.getOrientation()) ;
                    if(t4.getOrientation() * t3.getOrientation() < 0 ){
                        return [true , [VC ,VD] ];

                    }


                }
                return [false , [] ]
            }

            for( let i = 0 ; i < this.border.length ; i++) {
                const e = isInside(  p1 , p2 ,borderCopy[i]  , borderCopy[i+1]  );
                if( e[0] === true ) {
                    listeVertexValide.push(e[1]);

                }


            }
            return listeVertexValide ;
        }

        //doesnt work curently.
        isAnIntersectionWithEdge(edgeStart  ,ptEloigne1,ptEloigne2 ){

            function isInside(A ,B,VC, VD ){
                const t1 = new TriangleGeo(A ,VC.pt , B );
                const t2 = new TriangleGeo(A ,VD.pt , B  );
                console.log("t1" ,t1.getOrientation() ,"t2" ,t2.getOrientation()) ;
                if( t1.getOrientation() * t2.getOrientation() < 0 ){
                    const t3 = new TriangleGeo(VC.pt  ,A ,VD.pt ) ;
                    const t4 = new TriangleGeo(VC.pt  ,B ,VD.pt ) ;
                    console.log("t3" ,t3.getOrientation() ,"t4" , t4.getOrientation()) ;
                    if(t4.getOrientation() * t3.getOrientation() < 0 ){
                        return [true , [VC ,VD] ];

                    }


                }
                return [false , [] ]
            }

            this.listEdge.forEach( e => {
                e.calculated = false ;
            }) ;

            let edgeActu = edgeStart ;
            let trouve = false ;
            const listeIntersect = [] ;
            while(!trouve){
                const e = isInside(ptEloigne1 ,ptEloigne2,edgeActu.start, edgeActu.end  ) ;
                edgeActu.draw();
                edgeActu.calculated =true ;
                if(e[0 ] ===true){
                    listeIntersect.push( e[1] ) ;
                    //on change de polygone
                    console.log("swap" ,edgeActu , edgeActu.polyGoneAssocie);
                    const ed = edgeActu.start.getEdge(edgeActu.end ,edgeActu.start) ;
                    console.log(ed === edgeActu);
                    edgeActu = edgeActu.start.getEdge(edgeActu.end ,edgeActu.start) ;

                }
                else{
                    console.log("nop");

                    edgeActu = edgeActu.nextEdge() ;

                }

                    //console.log(edgeActu , edgeActu.polyGoneAssocie)
                if(edgeActu.polyGoneAssocie === this.border){ //si je suis sur la bordure , j'arrete
                    trouve =true ;
                }




            }
            return listeIntersect
        }

        isAnInersectionWithAPolygone(polygone ,ptEloigne1 , ptEloigne2){
            function isInside(A ,B,VC, VD ){
                const t1 = new TriangleGeo(A ,VC.pt , B );
                const t2 = new TriangleGeo(A ,VD.pt , B  );
                //console.log("t1" ,t1.getOrientation() ,"t2" ,t2.getOrientation()) ;
                if( t1.getOrientation() * t2.getOrientation() < 0 ){
                    const t3 = new TriangleGeo(VC.pt  ,A ,VD.pt ) ;
                    const t4 = new TriangleGeo(VC.pt  ,B ,VD.pt ) ;
                    //console.log("t3" ,t3.getOrientation() ,"t4" , t4.getOrientation()) ;
                    if(t4.getOrientation() * t3.getOrientation() < 0 ){
                        //console.log("ok");
                        return [true , [VC ,VD] ];

                    }


                }
                return [false , [] ]
            }
            //console.log("poly edege start :",polygone.id );
            const listeVertexPoly = [...polygone.listeVertex];
            listeVertexPoly.push(listeVertexPoly[0]);
            const res = [];
            for( let i = 0 ; i < polygone.listeVertex.length ; i++) {
                const e = isInside(  ptEloigne1 , ptEloigne2 ,listeVertexPoly[i] ,listeVertexPoly[i+1]  );
                if( e[0] === true ) {
                    res.push(e[1]);
                }
            }
            //console.log("res :" ,res);
            return res ;


        }




        //retourne the polygonr were an edge is
        getPolygone(_edgeDepart ){
            //on va generer tout les edges suivant jussqu'a ce qu'on forme un boucle
            let suivant = _edgeDepart.nextEdge() ;
            let poly = [_edgeDepart.start.pt ,  suivant.start.pt] ;
            let edges = [_edgeDepart ,suivant ] ;
            let vertex = [_edgeDepart.start , suivant.start] ;
            let index = -1 ;
            while(index < 0  ){ //on regarde si on detecte une boucle
                //console.log(suivant);
                suivant = suivant.nextEdge() ;
                index = edges.indexOf(suivant) ;
                edges.push(suivant);
                poly.push(suivant.start.pt);
                vertex.push(suivant.start) ;

               // console.log(edges ,index , suivant ) ;
            }
            //console.log("polygone found !!", poly.length  ,poly , index);

                edges = edges.slice(index, edges.length-1);
                poly = poly.slice(index, poly.length);
                vertex = vertex.slice(index , vertex.length);
                //console.log("apres cut" , poly ,index) ;



            //console.log("polygone found !!", poly.length );
            return [new PolyGeo(poly , vertex) ,edges ,vertex ]

        }

        //get all the cell of an arengement.
        getAllpolygone(){
            //on creer tous les polygone possible avec les egdes que l'on possede
            const polygones = [];
            const egdes = [...this.listEdge];

            //set up all edge
            egdes.forEach( e => {
                e.calculated = false ;
            }) ;
            PolyGeo.nbPoly = 0 ;
            const maxLengthPoly = 0;
            const indexMaxLengthPoly = 0;
            const edgesMax = [] ;
            let i = 0 ;
            let edgesValide = 0 ;

            const bd = this.getBordure() ;
            edgesValide = bd.length ;
            //console.log(bd) ;
            while ( egdes.length > edgesValide){
                //console.log(edgesValide ,egdes.length ) ;
                if(egdes[i].calculated === false ){
                    const polygoneTrouve = this.getPolygone(egdes[i]);
                    //console.log("taille poly trouve:", polygoneTrouve[1].length ,polygoneTrouve[1] );
                    polygoneTrouve[1].forEach( e =>{
                        edgesValide++;
                        e.calculated = true;
                        e.polyGoneAssocie = polygoneTrouve[0] ;


                    });
                    if( egdes[i].calculated  ){
                       i++;
                    }

                    polygones.push(polygoneTrouve[0])


                }
                else{
                    i++;
                }
                //console.log(edgesValide ,egdes.length ) ;


            }
            //console.log("condo boucle :",egdes.length , edgesValide ,egdes.length >= edgesValide) ;

            //console.log( "nuber of cell:",polygones.length , polygones );
            this.border = bd ;
            //.log(bd);


            this.listPolygone = polygones ;





        }

        getBordure(){
            //console.log("vertex bordure :" , this.borderVertex)
            const copyBordureVertex = [...this.borderVertex];
            copyBordureVertex.push(copyBordureVertex[0]);
            const listePt = [] ;
            this.borderVertex.forEach(e =>{
                listePt.push( e.pt)
            });

            const polyBordure = new PolyGeo(listePt , this.borderVertex ) ;
            //console.log("----border id :",polyBordure.id);

            const egdeBordure =[] ;
            for(let i = 0 ; i < this.borderVertex.length ; i++){
                //console.log("edge bordure" ,copyBordureVertex[i+1] ,copyBordureVertex[i]);
              const e =  copyBordureVertex[i].getEdge(copyBordureVertex[i+1] , copyBordureVertex[i]) ;
              e.calculated = true ;
              e.polyGoneAssocie = polyBordure;
                egdeBordure.push(e) ;
            }
            //console.log( "billy :" ,egdeBordure) ;
            return egdeBordure


        }

    toJson(){
        console.log("=============debut toJson =================") ;
        const vertexJson = [] ;
        this.listVertex.forEach( v => {
            vertexJson.push(v.toJson())
        });
        const edgesJson = [] ;
        this.listEdge.forEach( e => {
            edgesJson.push( e.toJson())
        });

        const borderVertexJson = [];
        this.borderVertex.forEach( bd =>{
            borderVertexJson.push(bd.toJson() );

        });

        const borderEdges = [] ;
        this.border.forEach(b=>{
                borderEdges.push(b.toJson() );
            });
        console.log("compa ",this.border ,borderEdges  ) ;


        return {
            "vertex" : vertexJson,
            "edges"  : edgesJson,
            "border" : borderVertexJson,
            "borderEdges" : borderEdges,
        };


    }


}



export let graphPoly1  ;
export let actualisePoly1 = false ;
export let pointMemoPoly1 = null ;
export let couleur1 = 'blue' ;
console.log( "script loaded !");
export function setup(p5) {
        //console.log("set up !!");
        p5.createCanvas(800, 800);

        //p5.fill("black");
        //p5.background(200);
        p5.strokeWeight(4) ;
        graphPoly1 = new DCEL() ;
        p5.background(200);


      }

export function draw(p5 ) {


        if(actualisePoly1) {
            console.log('draw en cours ');
            //p5.fill("black");
            p5.background(200);
            p5.strokeWeight(4);
            graphPoly1.draw(p5);
            console.log( "graph durant le draw :", graphPoly1 ) ;
            p5.stroke('purple');
            if(pointMemoPoly1 != null ){
                pointMemoPoly1.draw(p5) ;
            }

            p5.stroke('black');

            actualisePoly1 = false ;
        }
        return graphPoly1 ;
      }

export function mousePressed(p5Poly) {
    //console.log("souris :" ,p5Poly.mouseX ,p5Poly.mouseY) ;
        if(p5Poly.mouseX < 800 && p5Poly.mouseY< 800   &&  p5Poly.mouseX > 0 && p5Poly.mouseY> 0 ) { //on verrifie que l'in est bien dans la fenetre
            //console.log(graph) ;
            //console.log("pls click on the graph to put a line");
            const p = new PointGeo(p5Poly.mouseX, p5Poly.mouseY);
            if (pointMemoPoly1 === null) { // on as aucun point
                //console.log("First point put , pls click a second time");
                pointMemoPoly1 = p;
                actualisePoly1 = true;
            } else { //on possede deja un point
                //console.log("second point put , we will ad a line");
                const droite = new DroiteGeo(pointMemoPoly1, p, graphPoly1);
                droite.getIntersectionWithBorder();
                actualisePoly1 = true;
                pointMemoPoly1 = null;

            }

        }




      }

export function chageColor( _color ){
          couleur1 = _color ;
          console.log("------:" ,couleur1) ;
      }

export function reset(p5){
        pointMemoPoly1 =null ;
        actualisePoly1 =true ;
        graphPoly1 =  new DCEL() ;

      }

export function getGraph(){
    //on charge les polygones pour obtire le graph
    const polygone = graphPoly1.listPolygone ;
    const edges = graphPoly1.listEdge ;

    edges.forEach( e =>{
        e.calculated =false
    });
    /*const polygoneObj = [{
        "name": "0",
        "label": "infinie",
        "x": "0",
        "y": "0",
        "size": "1",
    }];*/
    const polygoneObj = [];

    polygone.forEach( e =>{
        polygoneObj.push(e.getNodeObject() )
    });
    const EdgeObj = [] ;


    function isInEdgeObj(obj ){
        for(let i = 0 ; i<EdgeObj.length ; i++) {
            if( (EdgeObj[i].source === obj.source && EdgeObj[i].target === obj.target )|| (EdgeObj[i].target === obj.source && EdgeObj[i].source === obj.target )  ){
                return true;
            }
        }
        return false ;
    }

    edges.forEach( e =>{
       // console.log(e.calculated) ;
        if(!e.calculated){
           // console.log("we get this a edgeObject") ;
            const obj = e.getEdgeGraphObject() ;
            if(!isInEdgeObj(obj) && obj.target !== "0" && obj.source !== "0"){
                EdgeObj.push(obj) ;
            }

            e.calculated = true ;
            //e.start.getEdge(e.end , e.start).calculated = true ;
        }
    });
    return {
        "nodes": polygoneObj ,
        "edges": EdgeObj ,
    };
}
export function getJson(){
    return graphPoly1.toJson();
}

class GraphEdge {
    constructor(_obj) {
        this.name = _obj.id ;
        this.listNoeuds = [];
        this.color = _obj.color ;
    }


}

class GraphNodes{
    constructor(_obj ) {
        this.name = _obj.name ;
        this.x = parseInt(_obj.x) ;
        this.y = parseInt(_obj.y) ;
        this.listEdge = [];
    }
}


class Path {
    constructor(_noeuds , _noeusPasse , _colorPasse  ) {

        this.noeudsActu = _noeuds ;
        this.noeusPasse = [..._noeusPasse] ;
        this.noeusPasse.push(this.noeudsActu) ;
        //console.log("noeuds " , this) ;
        this.colorPasse = [..._colorPasse] ;
        this.lastColor =  this.colorPasse[ this.colorPasse.length -1 ] ;

    }
        getNextPath(){
            function dejaVu(noeud , passage ) {
                let value = false ;
                passage.forEach(  n =>{
                    //console.log( n ,noeud ) ;
                    if( n.name === noeud.name ){
                       // console.log("true") ;
                        value  = true ;
                    }
                });
                //console.log("fin") ;
                return value ;
            }

            function differentColor( edge , obj ) {
                return edge.color !== obj.lastColor ;

            }


            const nextPath = [];
            //on recupere les chemenin suivant
            this.noeudsActu.listEdge.forEach( e => {
                e.listNoeuds.forEach( n => {
                    //console.log("le noueds teste :" ,n);
                    if(  !dejaVu(n , this.noeusPasse)  && differentColor( e , this)){
                        //console.log("new path");
                        const couleurPasseMaj = [...this.colorPasse] ;
                        couleurPasseMaj.push(e.color) ;
                        nextPath.push( new Path (n , [...this.noeusPasse] , couleurPasseMaj ))
                    }

                });

            });
            return nextPath ;
        }
        getLongeur(){
            return this.noeusPasse.length
        }
        draw(p5){
        p5.strokeWeight(2);
        p5.textSize(30);
        p5.stroke('green');
        for(let i = 0 ; i<this.noeusPasse.length -1; i++ ){
            p5.stroke(this.colorPasse[i]);
            p5.line(this.noeusPasse[i].x , this.noeusPasse[i].y ,this.noeusPasse[i+1].x , this.noeusPasse[i+1 ].y   );
            p5.stroke('black');
            p5.text( (i+1).toString() ,    this.noeusPasse[i].x +5 ,this.noeusPasse[i].y    );
        }
            p5.stroke('black');
            p5.text( (this.noeusPasse.length).toString() ,    this.noeusPasse[this.noeusPasse.length-1].x  ,this.noeusPasse[this.noeusPasse.length-1].y    );
        }
}

//class mais ave des egdes
//DEPRECIED
class Path2 {
    constructor(egde , egdesPasse ) {

        this.egdesActu = egde ;
        this.egdesPasse = [...egdesPasse] ;
        //this.egdesPasse.push(this.egdesActu) ;
        //console.log("noeuds " , this) ;

    }
    getNextPath(){
        function dejaVu(edge , passage ) {
            let value = false ;
            passage.forEach(  e =>{
                //console.log( n ,noeud ) ;
                if( e.name === edge.name ){
                    // console.log("true") ;
                    value  = true ;
                }
            });
            //console.log("fin") ;
            return value ;
        }

        function sommetCommun(  edge1 ,passage  ) {
            if(passage.length < 2 ){
                return true;
            }

            const edge2 = passage[passage.length -1 ] ;
            const edge3 = passage[passage.length -2 ] ;
            //console.log(edge1 , edge2 , edge3 ) ;
            let value = true ;
            edge1.listNoeuds.forEach( n1 => {
                edge2.listNoeuds.forEach( n2 => {
                    edge3.listNoeuds.forEach( n3 => {
                        //console.log(n1,n2,n3 )
                        if( n1.name === n2.name && n1.name === n3.name && n2.name ===n3.name ){
                            value = false
                            //console.log("bad one");
                        }
                    });
                });
            });
            return value ;
        }


        const nextPath = [];
        //on recupere les chemenin suivant
        //console.log(this.egdesActu) ;
        this.egdesActu.listNoeuds.forEach( n => {
            n.listEdge.forEach( e => {
                //console.log("le noueds teste :" ,n);
                if(  !dejaVu(e , this.egdesPasse)  && sommetCommun(this.egdesActu ,this.egdesPasse  )){
                    //console.log("new path");
                    const p = [...this.egdesPasse] ;
                    p.push(this.egdesActu ) ;
                    nextPath.push( new Path2 (e , p) ) ;
                }

            });

        });
        return nextPath ;
    }
    getLongeur(){
        return this.egdesPasse.length
    }
    draw(p5){//listNoeuds
        p5.strokeWeight(2);
        p5.stroke('green');
        for(let i = 0 ; i<this.egdesPasse.length ; i++ ){
            p5.line(this.egdesPasse[i].listNoeuds[0].x , this.egdesPasse[i].listNoeuds[0].y ,this.egdesPasse[i].listNoeuds[1].x , this.egdesPasse[i ].listNoeuds[1].y   )
            p5.text( (i+1).toString() ,    (this.egdesPasse[i].listNoeuds[0].x + this.egdesPasse[i].listNoeuds[1].x )/2  ,(this.egdesPasse[i].listNoeuds[0].y + this.egdesPasse[i].listNoeuds[1].y )/2   )
        }
    }
}

export class Graph {
        constructor( ) {
            this.allEdge = [] ;
            this.allNodes = [] ;
            this.nodes = {};
            this.edges = {};
            const graphObject = JSON.parse( JSON.stringify(  getGraph() ) );
            console.log( "graph :" ,this );
            graphObject.nodes.forEach( 
                node => {
                    const noeuds = new GraphNodes(node) ;
                    this.nodes[ node.name] =noeuds ;
                    this.allNodes.push(noeuds)
                }
            ) ;

            graphObject.edges.forEach(
                edge =>{
                    const e =  new GraphEdge(edge) ;
                    this.allEdge.push(e)  ;
                    this.edges[edge.id] =   e ;
                    this.connectEges(edge ,  e) ;
                }

            );
        }

        connectEges(edge  , e ){
            this.nodes[edge.source].listEdge.push(e) ;
            this.nodes[edge.target].listEdge.push(e) ;
            e.listNoeuds.push(this.nodes[edge.source]  ) ;
            e.listNoeuds.push(this.nodes[edge.target]  ) ;

        }

        getSmallPath(){

            //initialiser la pile
            const pile = [] ;
            /*this.allEdge.forEach(  n =>{
                pile.push( new Path2( n , [] ));
            });*/
            this.allNodes.forEach( n => {
                pile.push(( new  Path( n , [ ] , [])))
            }) ;



            let maxLongeur = 0 ;
            let longPath = null ;
            while (pile.length !== 0){
                const pathActu = pile.pop();
                const newpath = pathActu.getNextPath() ;
                //console.log("new path:" , newpath  , newpath.length) ;
                if(newpath.length === 0  ){
                    if(pathActu.getLongeur() > maxLongeur ){
                        maxLongeur = pathActu.getLongeur() ;
                        longPath = pathActu
                    }
                }
                else{
                    newpath.forEach( p =>{
                        pile.push(p)
                    });
                }
                // eslint-disable-next-line no-debugger
                //debugger;
            }
            console.log(maxLongeur);
            return longPath


        }

        draw( p5 ,drawName  ){
        this.allNodes.forEach(n =>{

            p5.strokeWeight(2);
            p5.stroke('blue');
            n.listEdge.forEach(e => {
                p5.stroke(e.color);
                p5.line(e.listNoeuds[0].x ,e.listNoeuds[0].y  , e.listNoeuds[1].x ,e.listNoeuds[1].y ) ;
            });

            p5.strokeWeight(5);
            p5.stroke('red');
            p5.point( n.x , n.y );
            if( drawName) {
                p5.textSize(30);
                p5.stroke('black');
                p5.text(n.name, n.x, n.y);
            }

        });

    }




    
}

export let graphePoly1 = null ;
export function buildGraph(p5 ){
    graphePoly1 = new Graph() ;
    console.log( graphePoly1 ) ;
    graphePoly1.draw( p5 , true) ;
    //console.log( graph.getSmallPath() ) ;
}

export function GetSmallPath( p5 ) {
    const path =  graphePoly1.getSmallPath(p5) ;
    console.log(path) ;
    p5.background(200);
    graphPoly1.draw(p5) ;
    graphPoly1.draw(p5 , false) ;
    path.draw(p5) ;
}








