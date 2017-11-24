<template>
    <div class="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="col-md-12">
            <div class="alpha_list ">
                <!--<a @click="filterStores('7" id="all_stores_a">all</a>-->
                <a @click="filterStores('#')">#</a>
                <a @click="filterStores('A')">A</a>
                <a @click="filterStores('B')">B</a>
                <a @click="filterStores('C')">C</a>
                <a @click="filterStores('D')">D</a>
                <a @click="filterStores('E')">E</a>
                <a @click="filterStores('F')">F</a>
                <a @click="filterStores('G')">G</a>
                <a @click="filterStores('H')">H</a>
                <a @click="filterStores('I')">I</a>
                <a @click="filterStores('J')">J</a>
                <a @click="filterStores('K')">K</a>
                <a @click="filterStores('L')">L</a>
                <a @click="filterStores('M')">M</a>
                <a @click="filterStores('N')">N</a>
                <a @click="filterStores('O')">O</a>
                <a @click="filterStores('P')">P</a>
                <a @click="filterStores('Q')">Q</a>
                <a @click="filterStores('R')">R</a>
                <a @click="filterStores('S')">S</a>
                <a @click="filterStores('T')">T</a>
                <a @click="filterStores('U')">U</a>
                <a @click="filterStores('V')">V</a>
                <a @click="filterStores('W')">W</a>
                <a @click="filterStores('X')">X</a>
                <a @click="filterStores('Y')">Y</a>
                <a @click="filterStores('Z')">Z</a>
            </div>
        </div>
        <div class="stores_container">
            <div class="col-md-4 col-sm-4">
                <div class="search_container">
                    <search-component :list="allStores" placeholder="Find Your Store" :suggestion-attribute="suggestionAttribute" v-model="storeSearch" @select="onOptionSelect"><template slot="item" scope="option">
                        <article class="media">
                            <p>
                                <strong>{{ option.data.name }}</strong>
                            </p>
                        </article>
                    </template>
                </search-component>
                   
                </div>
                <div class="store_list_container">
                    <div class="store-section" v-for="store in processedStores">
                        <a @click="dropPin(store)">{{store.name}}</a>
                    </div>
                    <div v-if="processedStores.length <= 0">
                        No stores avalaible.
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-sm-8">
                <div class="map_container full_border">
                    <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl"></svg-map>
                </div>
            </div>
        </div>
    <!--<ul class="menu">-->
    <!--  <li><a v-on:click="changeMode('alphabetical')">Alphabetical</a></li>-->
    <!--  <li><a v-on:click="changeMode('category')">Category</a></li>-->
    <!--</ul>-->
    <!--<hr/>-->
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

<script>
    define(["Vue","jquery", "Raphael", "mm_mapsvg","mousewheel","vue!search-component","vue!svg-map"], function(Vue, $, Raphael, mapSvg,mousewheel,SearchComponent,SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical",
                    suggestionAttribute: 'name',
                    storeSearch : "",
                    processedStores : [],
                    map : null
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            mounted () {
                this.processedStores = this.allStores;
            },
            methods: {
                changeMode (mode) {
                  this.listMode = mode;
                },
            //     init_map(){
            //         reg = {};
            // 		$.each( stores , function( key, val ) {
            //             if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
            //                 obj = {};
            //                 obj["tooltip"] = "<label class='store_name_map'> "+val.name +"</label>"
            //                 obj["attr"] = {}
            //                 obj["attr"]["href"] = '/stores/'+val.slug 
            //                 reg[val.svgmap_region] = obj
            //             }
            //         });
            //         map = $('#map').mapSvg({
            //             source: getSVGMapURL(),//'//mallmaverick.com/' + property.svgmap_url,    // Path to SVG map
            //             colors: {stroke: '#cccccc', selected: -20, hover: "#cccccc"},
            //             height:600,
            //             width:1140,
            //             viewBox:[0, 0, 1174, 724],
            //             regions: reg,
            //             tooltipsMode:'custom',
            //             zoom: true,
            //             pan:true,
            //             cursor:'pointer',
            //             responsive:true,
            //             zoomLimit: [0,10]
            //         });
            //     },
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    this.dropPin(option);
                    this.processedStores = this.allStores;
                    
                },
                updateSVGMap (map) {
                    this.map = map;
                },
                dropPin(store) {
                    this.svgMapRef.hideMarkers();
                    console.log(store);
                    this.svgMapRef.addMarker(store,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(store)
                },
                filterStores (letter) {
                    if(letter == "#"){
                        this.processedStores = _.filter(this.allStores, function(o) { return _.inRange(_.toNumber(o.name[0]), -1, 10); });
                    }
                    else {
                        this.processedStores = _.filter(this.allStores, function(o) { return _.lowerCase(o.name[0]) == _.lowerCase(letter); });
                    }
                    // console.log(this.processedStores);
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
                allStores() {
                    return this.$store.getters.processedStores;
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            }
        });
    });
</script>
