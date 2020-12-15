<template>
    <div>
        <h1>Simple game</h1>
        <p> To illustrate how difficult could be the task of finding a the longest cell-path, we have developed a game that illustrate that.
            <br> The player has to found the longest path for Arrangement of line made by other player
            <br> To play you just have to select a level and click on  cell that compose your path.
        </p>

        <jeu></jeu>
        <h1>Export your level</h1>
        <p>You can create an arrangement of line and allow other player to play with it </p>
        <exportable></exportable>
        <h1>Back end Implementation</h1>
        <p>To run the game there is a backend server coded in nodeJS which implement a RESTfull api.
        <br>This api allow user to export and import arrangement of line and the longest path currently found
        <br>The data are stored in a mondgoDB data base to be permanent</p>
    </div>


</template>

<script>
    import jeu from "../components/jeu.vue"
    import exportable from "../components/arrangementPolyExportable.vue"
    export default {
        name: "PageJeu",
        components:{
            jeu,
            exportable,
        }
    }
</script>

<style scoped>

</style>