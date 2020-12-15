<template>
    <v-card >

        <v-app-bar color="deep-purple" dark fixed app>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>Computational geometry </v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" fixed temporary class="scrollable">
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item>
                        <v-list-item-title><router-link to="/">Arrangement of Monochromatic line</router-link></v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><router-link to="/bichromatic">Arrangement of bichromatic line</router-link></v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><router-link to="/jeu">Jeu</router-link></v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><router-link to="/bibliography">bibliography</router-link></v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <div class="pageContent">
            <slot />
        </div>
    </v-card>


</template>

<script>
    export default {
        name: "barreTop",
        data: () => ({
            drawer: false,
            group: null,
        }),
    }
</script>

<style scoped>
    .scrollable{
    height:100%;
    overflow:auto;
}
    .pageContent{
        margin-top: 80px;
    }



</style>