<template>
    <div class="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="">
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
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex","jquery", "Raphael", "mm_mapsvg","mousewheel","vue!search-component","vue!svg-map"], function(Vue, Vuex, $, Raphael, mapSvg,mousewheel,SearchComponent,SVGMapComponent) {
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
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'processedCategories',
                    'storesByAlphaIndex',
                    'storesByCategoryName',
                    'findCategoryById',
                    'findCategoryByName',

                ]),
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            },
            methods: {
                changeMode (mode) {
                  this.listMode = mode;
                },
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
        });
    });
</script>
