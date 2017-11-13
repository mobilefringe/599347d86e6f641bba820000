<template>
    <div class="container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="col-md-12">
            <div class="alpha_list">
                <!--<a href="#7" id="all_stores_a">all</a>-->
                <a href="#7">#</a>
                <a href="#A">A</a>
                <a href="#B">B</a>
                <a href="#C">C</a>
                <a href="#D">D</a>
                <a href="#E">E</a>
                <a href="#F">F</a>
                <a href="#G">G</a>
                <a href="#H">H</a>
                <a href="#I">I</a>
                <a href="#J">J</a>
                <a href="#K">K</a>
                <a href="#L">L</a>
                <a href="#M">M</a>
                <a href="#N">N</a>
                <a href="#O">O</a>
                <a href="#P">P</a>
                <a href="#Q">Q</a>
                <a href="#R">R</a>
                <a href="#S">S</a>
                <a href="#T">T</a>
                <a href="#U">U</a>
                <a href="#V">V</a>
                <a href="#W">W</a>
                <a href="#X">X</a>
                <a href="#Y">Y</a>
                <a href="#Z">Z</a>
            </div>
        </div>
        <div class="stores_container">
            <div class="col-md-4 col-sm-4">
                <div class="search_container"></div>
                    <search-component placeholder="Find Your Store" :suggestion-attribute="suggestionAttribute" v-model="search" @select="onOptionSelect"></search-component>
                </div>
                <div class="store_list_container">
                    <div class="store-section" v-for="store in stores">
                        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
                    </div>
                </div>
                 
            </div>
            <div class="col-md-8 col-sm-8">
                <div class="map_container">
                    <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl"></svg-map>
                </div>
            </div>
        </div>
    <!--<ul class="menu">-->
    <!--  <li><a v-on:click="changeMode('alphabetical')">Alphabetical</a></li>-->
    <!--  <li><a v-on:click="changeMode('category')">Category</a></li>-->
    <!--</ul>-->
    <hr/>
    <!--<div class="columns large-12" v-for="(stores, index) in storesByAlphaIndex" v-if="listMode === 'alphabetical'">-->
    <!--  <div class="list_header">-->
    <!--    <b>{{index}}</b>-->
    <!--    <hr/>-->
    <!--  </div>-->
    <!--  <div class="store-section" v-for="store in stores">-->
    <!--    <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>-->
    <!--    <hr/>-->
    <!--  </div>-->
      <!-- <div class="card">
        <div class="card-divider">
          {{ store.name }}
        </div>
        <div class="card-section center">
          <a :href="store.image_url" target="_blank"><img :src="store.image_url"></a>
        </div>
        <div class="card-section">
          <div class="center">
            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">View Details</router-link>
          </div>
        </div>
      </div> -->
    <!--</div>-->
    <!--<div class="columns large-12" v-for="(stores, index) in storesByCategoryName" v-if="listMode === 'category'">-->
    <!--  <div class="list_header">-->
    <!--    <b>{{index}}</b>-->
    <!--    <hr/>-->
    <!--  </div>-->
    <!--  <div class="store-section" v-for="store in stores">-->
    <!--    <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>-->
    <!--    <hr/>-->
    <!--  </div>-->
    <!--</div>-->
    </div>
</template>

<style>
  .center{
    text-align: center
  }
  .store-section a{
    color: #708090;
  }
</style>

<script>
    define(["Vue","jquery", "Raphael", "mm_mapsvg","mousewheel","vue!search-component","vue!svg-map"], function(Vue, $, Raphael, mapSvg,mousewheel,SearchComponent,SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical",
                    suggestionAttribute: 'name',
                    search : ""
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            mounted () {
                //   this.feature_items;
                this.$emit('switchBanner',false);
            },
            methods: {
                changeMode (mode) {
                  this.listMode = mode;
                },
                init_map(){
                    reg = {};
            		$.each( stores , function( key, val ) {
                        if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                            obj = {};
                            obj["tooltip"] = "<label class='store_name_map'> "+val.name +"</label>"
                            obj["attr"] = {}
                            obj["attr"]["href"] = '/stores/'+val.slug 
                            reg[val.svgmap_region] = obj
                        }
                    });
                    map = $('#map').mapSvg({
                        source: getSVGMapURL(),//'//mallmaverick.com/' + property.svgmap_url,    // Path to SVG map
                        colors: {stroke: '#cccccc', selected: -20, hover: "#cccccc"},
                        height:600,
                        width:1140,
                        viewBox:[0, 0, 1174, 724],
                        regions: reg,
                        tooltipsMode:'custom',
                        zoom: true,
                        pan:true,
                        cursor:'pointer',
                        responsive:true,
                        zoomLimit: [0,10]
                    });
                },
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    // var counted_stores = _.countBy(this.allStores,'name');
                    
                    // // console.log("counted_stores is",counted_stores[option.name]);
                    // if(option.type==="click") {
                    //     console.log($(".input").val());
                    // }
                    
                    // else {
                    //     if( counted_stores[option.name] >1) {
                    //         var route = '/map/' + option.name;
                    //         console.log(route);
                    //         this.$router.push(route);
                    //     }
                    //     else {
                    //         var route = '/stores/' + option.slug;
                    //         console.log(route);
                    //         this.$router.push(route);
                    //     }
                    // }
                },
                updateSVGMap (map) {
                    this.map = map;
                }
            },
            computed: {
                property (){
                    return this.$store.getters.getProperty;
                },
                storesByAlphaIndex() {
                    return this.$store.getters.storesByAlphaIndex;
                },
                storesByCategoryName() {
                    return this.$store.getters.storesByCategoryName;
                },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
            }
        });
    });
</script>
