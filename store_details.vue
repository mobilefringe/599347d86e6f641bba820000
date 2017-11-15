<template>
    <div class="page_container" id="store_detail_container">
        <div class="row is-table-row padding_tb_50" v-if="currentStore">
            <div class="col-md-3">
                <img :src="currentStore.store_front_url_abs" class="store_logo" alt="">
                <p class="title">{{currentStore.name}}</p>
                <p class="sub_title">{{currentStore.category_name}}</p>
                
                
            </div>
            <div class="col-md-6">
                <div class="map_container ">
                    <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl" ></svg-map>
                </div>
            </div>
            <div class="col-md-3">
                <p class="title">{{currentStore.phone}}</p>
                <p class="sub_title">{{currentStore.website}}</p>
                <p class="sub_title">{{currentStore.email}}</p>
                
            </div>
        </div>
        <hr/>
        <div class="row is-table-row padding_tb_50" v-if="currentStore && currentStore.description">
            <div class="col-md-7" style="vertical-align:top;">
                <p class="title text_left">About us</p>
                <p class="description_text text_left">{{currentStore.description}}</p>
            </div>
            <div class="col-md-5">
                <img src="//via.placeholder.com/458x276" class="" alt="">
            </div>
            
        </div>
        <hr/>
        <div class="row is-table-row padding_tb_50" v-if="currentStore && currentStore.total_published_promos > 0">
            <div class="col-md-6" style="vertical-align:top;" v-for="promo in promotions" v-if="promotions">
                <div class="col-md-6"> <img :src="promo.promo_image_url_abs" class="store_logo" alt=""> </div>
                <div class="col-md-6"><p class="title">{{promo.title}}</p>  <p class="description_text text_left">{{promo.description}}</p> </div>
                
                
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
                    currentStore: null,
                    map: null,
                    promotions : []
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
                console.log(this);
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
            watch : {
                map : function (){
                    setTimeout(function () {
                        console.log(this);
                        this.dropPin();
                      }, 500);
                },
                currentStore : function (){
                    console.log("currentStore promo",this.currentStore.promotions );
                    var vm = this;
                    var temp = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        console.log(vm);
                        temp.push(vm.findPromoById(value));
                    });
                    this.promotions = temp;
                    console.log("promos",this.promotions);
                }
            },
            computed: {
                findStoreBySlug () {
                    return this.$store.getters.findStoreBySlug;
                },
                findPromoById () {
                    return this.$store.getters.findPromoById;
                },
                property (){
                    return this.$store.getters.getProperty;
                },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef () {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            },
            methods: {
                updateSVGMap (map) {
                    this.map = map;
                    console.log("this",this);
                },
                dropPin () {
                    console.log(this.currentStore.svgmap_region);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentStore,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentStore)
                }   
            }
        });
    });
</script>
