<template>
    <v-card elevation="7"  outlined>

        <v-row>
            <v-col>
                <vue-p5 @sketch="sketchPoly1"  />
            </v-col>
            <v-col>
                <v-col>
                    <div >please draw at least one line on the screen by drawing two point for get a plane arrangement </div>
                    <v-btn v-show="showDisplayGraph"   color="accent" elevation="11" @click="getPoly">Get Dual Graph    </v-btn>
                    <v-btn v-show="showGetPath"    color="accent" elevation="11" @click="getSmallPath">Get Smallest Path</v-btn>
                    <v-btn v-show="showGetPath"    color="error" elevation="11" @click="reset">Reset</v-btn>
                    <v-btn  color="error" elevation="11" @click="exportGraph">save graph</v-btn>
                    <v-row justify="space-around" v-show="showDisplayGraph">
                    </v-row>

                    <v-list dense rounded>
                        <v-subheader>Color </v-subheader>
                        <v-list-item-group v-model="selectedItem" color="primary" >
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"/>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>


                </v-col>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>


    import VueP5 from 'vue-p5'
    import * as scriptArrangement from "./p5/sketchPoly1"
    import axios from 'axios';
    import {Data}  from "./data"


    export default {
        name: "arrangementPolyExportable",
        components: {
            "vue-p5": VueP5
        },
        data: () => ({
            actu: true ,
            affichageGraph: false ,
            showDisplayGraph: false ,
            showGetPath: false,
            selectedItem: 0,
            items: [
                { text: 'Blue' },
                { text: 'Red'  },
            ],

        }),

        methods: {
            sketchPoly1(sk2) {
                sk2.mouseClicked = () => {
                    // save clicks to array
                    //console.log("je te trooll");
                    scriptArrangement.mousePressed(sk2);
                    this.actu = false ;
                };

                sk2.draw = () => {
                    //console.log(this.actu );
                    if(!this.actu ) {

                        console.log("mais oui ...");
                        const Graph  = scriptArrangement.draw(sk2) ;
                        if(Graph.listPolygone.length > 1  ){
                            this.showDisplayGraph = true ;
                        }
                        this.actu = true ;

                    }

                };
                sk2.setup = () => {
                    scriptArrangement.setup(sk2);

                    Data.p5Poly = sk2 ;
                };




            },
            getPoly(){
                scriptArrangement.buildGraph(Data.p5Poly) ;
                this.showGetPath = true ;

            },
            getSmallPath(){
                scriptArrangement.GetSmallPath(Data.p5Poly);
            },
            reset(){
                scriptArrangement.reset();
                this.actu = false ;
                this.showDisplayGraph = false ;
                this.showGetPath = false ;
            },
            getJson(){
                console.log(  JSON.stringify(scriptArrangement.getJson() ) );
            },

            exportGraph(){
                axios
                    .put(
                        "http://51.210.250.114:3000/graph",
                        { "graph" : scriptArrangement.getJson() ,
                                "record" : 0,
                        },
                    )
                    .then(r => {
                        console.log(r.status);
                        history.go(0) ;
                    })
                    .catch(e => console.log(e));

            },



        },

        watch: {
            selectedItem : function (val) {
                scriptArrangement.chageColor(this.items[this.selectedItem].text)
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


<style scoped>

</style>