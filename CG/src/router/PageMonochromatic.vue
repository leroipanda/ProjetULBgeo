<template>
    <div class="page">
        <h1><u>Cell-paths in monochromatic line arrangements in the plane</u></h1>
        We are looking for the longest cell-paths in a Arrangement of lines.
        <h2> What is a Arrangement of lines ?</h2>
        <p>An arrangement of lines is a set of convex plane formed by the intersection of lines.
            We called those planes: "cell" and there are delimited by the segment formed with line's intersection.
            More familiarly a cell is a polygon formed by line's intersection with no polygon inside.
        </p>
        <v-row justify="space-around">
        <v-card elevation="7"  outlined width="800" >

            <v-img max-height="800"  aspect-ratio="1.77" src="../../src/assets/arrengementOfLine.png" position="center"></v-img>
            <v-card-title>Illustration of an Arrangement of line</v-card-title>

        </v-card>
        </v-row>
        <h2>The longest cell-paths</h2>
        <p>The The longest cell-paths in a monochromatic line arrangements is longest path such as every consecutive cell share an edge and we only go once in a cell.
            <br> Here the is a interactive tool where you can draw an arrangements of line and find the longest.</p>
        <p5script></p5script>
        <h1><u>How do we find this path ?</u></h1>
        In the next plain we will explain to you how to we find the longest monochromatic cell-paths
        <h2>how did we build an arrangement of line ?</h2>
        <p>To build an arrangement of line we have to let the user draw some lines on a plane and then detect all the cell in the plane.
            The first part, letting user draw some lines on a plane is quite easy, user just draw two point and we calculate the equation of the line (y = ax+ b).<br>
            The second part determining all the cell of the plane is more interesting. First of all we will introduce a new data structure called Doubly Connected Edge List(DCEL)</p>
        <h3>Doubly Connected Edge List</h3>
        <p>A Doubly Connected Edge List is a  data structure which represent a oriented planar graph where each connected node are connected by two edges, one in each direction.<br> This structure is very useful in computational geometry to handle polygonal subdivisions, That's why we use it because determine all the cell in our plan corresponding to determining all polygonal subdivisions of our plan  </p>
        <v-row justify="space-around">
            <v-card elevation="7"  outlined width="400" >

                <v-img max-height="400"  aspect-ratio="1.2" src="../../src/assets/DCEL.png" position="center"></v-img>
                <v-card-title>Illustration of a Doubly Connected Edge List</v-card-title>

            </v-card>
        </v-row>
        <h3>How do we found all the cell ? </h3>
        To find our cell we will build in have to build the corresponding Doubly Connected Edge List of our plane where each node is an intersection.
        <P>An interaction is connected to every consecutive intersection when we follow one of the line which compose the intersection.<br>And now we have our DCEL,we can easily finding a cell by following edges which go in the same direction until we saw an that that we already followed. </p>

        <v-row justify="space-around">
            <v-card elevation="7"  outlined width="800" >

                <v-img max-height="800"  aspect-ratio="1.2" src="../../src/assets/algoDetect.png" position="center"></v-img>
                <v-card-title>Illustration of cell Detection algorithm </v-card-title>

            </v-card>
        </v-row>

        Now than we have found one cell, we can detect all other cell by following all edges not associated to a polygon.

        <h3>Algorithm implementation for detecting cells</h3>

        <p>
            The algorithm is not really implemented as it's written above. Indeed each time an user draw a line we update our DCEL and compute all cell.
            <br> To work well we need what we called a border polygon, this polygon is not visible for the user and surrounding our plane. He allow us to detect with our DCEL each polygon inside.
            <br> And when we draw a line we only compute the intersection of our line between all possible polygon in the line path.
            <br> For each new intersection, update the Doubly Connected Edge List to corresponding to the plane. and we compute all the cells.

        </p>
        <v-row justify="space-around">
            <v-card elevation="7"  outlined width="600"  max-height="800" vertical-delimiters>
                <v-carousel hide-delimiters>
                    <v-carousel-item v-for="(item) in items" :key="item.src">
                        <v-sheet>
                            <v-row >
                                <v-col>
                                    <v-row>>
                                        <img :src="item.src" style="width:600px;height:auto;" :alt="item.src"/>
                                    </v-row>
                                    <v-row align="center" justify="center">
                                        {{item.titre}}
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-row>
        <h2>How do we find the longest path ?</h2>
        <p>For finding the longest path in our arrangement of lines, We get the dual graph of the plane and then we find the longest path.
            <br> To get the dual graph of our plane we just create a graph where every cell is a node of the graph and two cell are connected if they touch each other.
        </p>
        <v-row justify="space-around">
            <v-card elevation="7"  outlined width="800" >

                <v-img max-height="800"  aspect-ratio="1.2" src="../../src/assets/dualGraph.jpg" position="center"></v-img>
                <v-card-title>Illustration of the dual graph </v-card-title>

            </v-card>
        </v-row>

        <p> And we find the longest path by testing all the path and just keep the longest path.</p>
        <v-row justify="space-around">
            <v-card elevation="7"  outlined width="800" >

                <v-img max-height="900"  aspect-ratio="1" src="../../src/assets/longestPath.png" position="center"></v-img>
                <v-card-title>Longest path of an arrangement of lines </v-card-title>

            </v-card>
        </v-row>

    </div>




</template>

<script>

    import arragement from "../components/Arrangement.vue"

    export default {
        name: "PageMonochromatic",
        components: {
            "p5script": arragement
        },
        data () {
            return {
                items: [
                    {
                        src: 'https://zupimages.net/up/20/51/153b.png',
                        titre : "initialisation : create the border "
                    },
                    {
                        src: 'https://zupimages.net/up/20/51/31ac.png',
                        titre : "user draw a line"
                    },
                    {
                        src: 'https://zupimages.net/up/20/51/vv65.png',
                        titre : "we detect each intersection"
                    },
                    {
                        src: "https://zupimages.net/up/20/51/82vp.png",
                        titre :" we update the Doubly Connected Edge List"
                    },
                    {
                        src: 'https://zupimages.net/up/20/51/xo74.png',
                        titre :" we compute cells"
                    },
                    {
                        src: 'https://zupimages.net/up/20/51/ge37.png',
                        titre :"user draw a second line"
                    },
                    {
                        src: 'https://zupimages.net/up/20/51/zx3z.png',
                        titre : "we detect each intersection"
                    },
                    {
                        src: "https://zupimages.net/up/20/51/vxq0.png",
                        titre :" we update the Doubly Connected Edge List"
                    },
                    {
                        src: 'https://zupimages.net/up/20/51/bdav.png',
                        titre :" we cumpute cells"
                    },
                ],
            }
        }
    }
</script>

<style scoped>
    .page {
        text-align: center;
        text-justify: inter-word;
    }

</style>