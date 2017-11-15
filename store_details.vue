<style>
   .demo_1.map3 {
        position: relative;
        max-width: 100% !important;
        max-height: 150px !important;
    }
</style>


<template>
    <div class="page_container">
        <div class="row" v-if="currentStore">
            <div class="col-md-3">
                <img :src="currentStore.store_front_url_abs" class="" alt="">
                {{currentStore.name}}
                {{currentStore.category_name}}
            </div>
            <div class="col-md-6">
                <div class="map_container">
                    <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl" ></svg-map>
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
            mounted () {
                
            },
            computed: {
                findStoreBySlug () {
                    return this.$store.getters.findStoreBySlug;
                },
                property (){
                    return this.$store.getters.getProperty;
                },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            },
            methods: {
                updateSVGMap (map) {
                    this.map = map;
                    console.log(this.svgMapRef);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentStore,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentStore)
                }
                
            }
        });
    });
</script>
