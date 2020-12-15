<template>
    <v-row>
        <v-col>
            <VueP5 @sketch="sketchPoly"  />
        </v-col>
        <v-col>
            <v-list dense rounded>
                <v-subheader>which levels ? </v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary" >
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-content>
                            <v-list-item-title v-text="i"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

            <v-btn color="orange" elevation="11" @click="back">    <v-icon dark>mdi-step-backward</v-icon>      previous     </v-btn>
            <v-btn color="red" elevation="11" @click="reset"> <v-icon dark>mdi-rotate-left </v-icon>  reset   </v-btn>
            <v-row>
                <v-col>
                longeur = {{longeur}}

                record : {{record }}
            </v-col>
        </v-row>
        </v-col>

    </v-row>
</template>

<script>
    import * as scriptArrangementJeu from "./p5/sketchJeu"
    import {Data}  from "./data"
    import VueP5 from 'vue-p5'
    import axios from 'axios';
    import * as scriptArrangement from "@/components/p5/sketchPoly1";

    export default {
        name: "jeu",
        components:{
            VueP5,

        },
        data: () => ({
            selectedItem: 0,
            items: [
                { _id : "0"  ,
                    record : 0   ,
                },

            ],
            longeur : 0 ,
            record : 0 ,

        }),
        methods: {
            sketchPoly(sk1) {
                    sk1.mouseClicked = () => {
                        // save clicks to array
                        //console.log("je te trooll");
                        scriptArrangementJeu.mousePressed(sk1);
                        this.longeur = scriptArrangementJeu.getPathLongeur()   ;
                        if( this.longeur > this.record ){
                            //on met à jours le record ;
                            axios
                                .post(
                                    "http://51.210.250.114:3000/graph/"+ this.items[this.selectedItem]._id,
                                    {"record" : this.longeur }
                                    ,
                                )
                                .then(r => console.log(r.status))
                                .catch(e => console.log(e));

                        }

                        this.actu = false ;
                    };

                    sk1.draw = () => {
                        //console.log(this.actu );
                        if(!this.actu ) {

                            console.log("mais oui ...");
                            const Graph  = scriptArrangementJeu.draw(sk1) ;
                            if(Graph.listPolygone.length > 1  ){
                                this.showDisplayGraph = true ;
                            }
                            this.actu = true ;
                        }

                    };
                    sk1.setup = () => {
                        scriptArrangementJeu.setup(sk1);

                        Data.p5Jeu = sk1 ;
                    };




                },
            getJson(){
                console.log(  JSON.stringify(scriptArrangementJeu.getJson() ) );
            },

            importJson(){
                scriptArrangementJeu.importJson( Data.exemple) ;
                console.log("draw import graph");
                scriptArrangementJeu.actualise() ;
                scriptArrangementJeu.draw(Data.p5Jeu);
                scriptArrangementJeu.actualise() ;
                scriptArrangementJeu.draw(Data.p5Jeu);

            },
            back(){
                scriptArrangementJeu.previous() ;
                this.longeur = scriptArrangementJeu.getPathLongeur()   ;
            },
            reset(){
                scriptArrangementJeu.resetJeu();
                this.longeur = scriptArrangementJeu.getPathLongeur()   ;
            }
            },
        mounted : function() {
            console.log( "monted ;");
            axios
                .get(
                    "http://51.210.250.114:3000/graph",

                )
                .then(r =>{
                    this.items = r.data ;
                    console.log(r.data);
                } )
                .catch(e => console.log(e));

        },

        render(h) {
            return h(VueP5, {on: this});
        },
        watch: {
            selectedItem : function (val) {

                scriptArrangementJeu.importJson( this.items[this.selectedItem].graph) ;
                this.record = this.items[this.selectedItem].record ;
                console.log( "ce que j'ai:" ,this.items[this.selectedItem]  , this.items[this.selectedItem].record ) ;
                console.log("draw import graph");
                scriptArrangementJeu.actualise() ;
                scriptArrangementJeu.draw(Data.p5Jeu);
                scriptArrangementJeu.actualise() ;
                scriptArrangementJeu.draw(Data.p5Jeu);
            }

        }

    }
</script>

<style scoped>

</style>