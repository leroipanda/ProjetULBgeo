<template>
    <v-card elevation="7"  outlined>
             <v-row>
                <v-col>

                    <vue-p5 @sketch="sketch"  />

                </v-col>
                <v-col>
                    <v-col>
                        <div >please draw at least one line on the screen by drawing two point for get a plane arrangement </div>
                        <v-btn v-show="showDisplayGraph"   color="accent" elevation="11" @click="getPoly">Get Dual Graph    </v-btn>
                        <v-btn v-show="showGetPath"    color="accent" elevation="11" @click="getSmallPath">Get Smallest Path</v-btn>
                        <v-btn v-show="showGetPath"    color="error" elevation="11" @click="reset">Reset</v-btn>
                        <v-row justify="space-around" v-show="showDisplayGraph">
                        <v-card elevation="7"  outlined width="800"  >
                        <div >
                            <h3><u>What is a dual graph ?</u></h3>
                            <p> dual graph of the arrangement of lines is a graph that has a vertex for each face of this arrangement.</p>
                            <p> The dual graph has an edge whenever two faces of the arrangement of lines are separated from each other by a line. </p>
                            <p> Here we didnt consider the infinite vertex which is connected to all vertex</p>
                            <p> The longest cell-paths correspondind to the longest path in a the dual graph. </p>
                            <v-img class="center" max-height="285" max-width="500" aspect-ratio="0.8" position="center" src="../assets/dualGraph.png"> </v-img>
                        </div>
                        </v-card>
                        </v-row>
                    </v-col>
                </v-col>
            </v-row>

    </v-card>

</template>

<script>

    import VueP5 from 'vue-p5'
    import * as scriptArrangement from "./p5/sketch"

    import {Data}  from "./data"


    export default {
        name: "Arrangement",
        components: {
           "vue-p5": VueP5
        },
        data: () => ({
            actu: true ,
            affichageGraph: false ,
            showDisplayGraph: false ,
            showGetPath: false,

        }),

        methods: {
            sketch(sk) {
                sk.mouseClicked = () => {
                    // save clicks to array
                    console.log("je te trooll");
                    scriptArrangement.mousePressed(sk);
                    this.actu = false ;
                };

                sk.draw = () => {
                    //console.log(this.actu );
                    if(!this.actu ) {

                        console.log("mais oui ...");
                        const Graph  = scriptArrangement.draw(sk) ;
                        if(Graph.listPolygone.length > 1  ){
                            this.showDisplayGraph = true ;
                        }
                        this.actu = true ;
                    }

                };
                sk.setup = () => {
                    scriptArrangement.setup(sk);

                    Data.p5 = sk ;
                };




            },
            getPoly(){
                scriptArrangement.buildGraph(Data.p5) ;
                this.showGetPath = true ;

            },
            getSmallPath(){
                scriptArrangement.GetSmallPath(Data.p5);
            },
            reset(){
                scriptArrangement.reset();
                this.actu = false ;
                this.showDisplayGraph = false ;
                this.showGetPath = false ;
            }

        },

        render(h) {
            return h(VueP5, {on: this});
        }
    }
</script>

<style scoped>
.center{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
</style>