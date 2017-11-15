<template>
    <div class="page_container">
        <div class="row">
            <div class="col-md-3">
                {{currentStore.store_front_url_abs}}
                {{currentStore.name}}
                {{currentStore.category_name}}
            </div>
            <div class="col-md-6">
                <div class="map_container">
                    <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl"></svg-map>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
        <div class="row" v-if="currentStore">
            <div class="large-6 columns">
              <div>
                <h1>{{currentStore.name}}</h1>
                <p>{{currentStore.description}}</p>
                <a v-bind:href="currentStore.website">{{currentStore.website}}</a>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "jquery", "Raphael", "mm_mapsvg","mousewheel","vue!search-component","vue!svg-map"], function(Vue, $, Raphael, mapSvg,mousewheel,SearchComponent,SVGMapComponent) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    currentStore: null
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentStore = vm.findStoreBySlug(to.params.id);
                    if (vm.currentStore === null || vm.currentStore === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentStore = this.findStoreBySlug(to.params.id);
                if (this.currentStore === null || this.currentStore === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            computed: {
                findStoreBySlug () {
                    return this.$store.getters.findStoreBySlug;
                }
            },
            methods: {
                updateSVGMap (map) {
                    this.map = map;
                },
            }
        });
    });
</script>
