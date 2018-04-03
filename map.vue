<template>
    <div class="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="">
            <!--<div class="col-md-12">-->
            <!--    <div class="alpha_list ">-->
            <!--        <a @click="filterStores('7')" id="all_stores_a">All</a>-->
            <!--        <a @click="filterStores('#')">#</a>-->
            <!--        <a @click="filterStores('A')">A</a>-->
            <!--        <a @click="filterStores('B')">B</a>-->
            <!--        <a @click="filterStores('C')">C</a>-->
            <!--        <a @click="filterStores('D')">D</a>-->
            <!--        <a @click="filterStores('E')">E</a>-->
            <!--        <a @click="filterStores('F')">F</a>-->
            <!--        <a @click="filterStores('G')">G</a>-->
            <!--        <a @click="filterStores('H')">H</a>-->
            <!--        <a @click="filterStores('I')">I</a>-->
            <!--        <a @click="filterStores('J')">J</a>-->
            <!--        <a @click="filterStores('K')">K</a>-->
            <!--        <a @click="filterStores('L')">L</a>-->
            <!--        <a @click="filterStores('M')">M</a>-->
            <!--        <a @click="filterStores('N')">N</a>-->
            <!--        <a @click="filterStores('O')">O</a>-->
            <!--        <a @click="filterStores('P')">P</a>-->
            <!--        <a @click="filterStores('Q')">Q</a>-->
            <!--        <a @click="filterStores('R')">R</a>-->
            <!--        <a @click="filterStores('S')">S</a>-->
            <!--        <a @click="filterStores('T')">T</a>-->
            <!--        <a @click="filterStores('U')">U</a>-->
            <!--        <a @click="filterStores('V')">V</a>-->
            <!--        <a @click="filterStores('W')">W</a>-->
            <!--        <a @click="filterStores('X')">X</a>-->
            <!--        <a @click="filterStores('Y')">Y</a>-->
            <!--        <a @click="filterStores('Z')">Z</a>-->
            <!--    </div>-->
            <!--</div>-->
            <div class="stores_container">
                <!--<div class="col-md-4 col-sm-4">-->
                    <!--<div class="search_container hidden_phone">-->
                    <!--    <search-component :list="processedStores" placeholder="Find Your Store" :suggestion-attribute="suggestionAttribute" v-model="storeSearch" @select="onOptionSelect">-->
                    <!--        <template slot="item" scope="option">-->
                    <!--            <article class="media">-->
                    <!--                <p>-->
                    <!--                    <strong>{{ option.data.name }}</strong>-->
                    <!--                </p>-->
                    <!--            </article>-->
                    <!--        </template>-->
                    <!--    </search-component>-->
                    <!--</div>-->
                    <!--<div class="search_container ">-->
                    <!--    <search-component :list="processedStores" placeholder="Search Stores" :suggestion-attribute="suggestionAttribute" v-model="storeSearch" @select="onOptionSelectPhone">-->
                    <!--        <template slot="item" scope="option">-->
                    <!--            <article class="media">-->
                    <!--                <p>-->
                    <!--                    <strong>{{ option.data.name }}</strong>-->
                    <!--                </p>-->
                    <!--            </article>-->
                    <!--        </template>-->
                    <!--    </search-component>-->
                    <!--</div>-->
                    
                <!--</div>-->
                <div class="col-sm-12">
                    <!--<div class="store_list_container">-->
                    <!--    <div class="store-section hidden_phone" v-for="store in filteredStores">-->
                    <!--        <a @click="dropPin(store)">{{store.name}}</a>-->
                    <!--    </div>-->
                    <!--    <div class="store-section visible_phone" v-for="store in filteredStores">-->
                    <!--        <a @click="onOptionSelectPhone(store)">{{store.name}}</a>-->
                    <!--    </div>-->
                    <!--   <div class="store-section" v-if="filteredStores.length <= 0">-->
                    <!--        No stores avalaible.-->
                    <!--    </div>-->
                    <!--</div>-->
                    <div class="alphabet-dd visible_phone" >
					    <v-select :options="filteredStores" label="name" :searchable="false" :on-change="dropPin" id="mobile_alpha_list" :placeholder="Select Store"></v-select>
				    </div>
                    <div class="map_container full_border">
                        <mapplic-map ref="mapplic_ref" :height="740" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :maxscale= "5" :storelist="processedStores" :floorlist="floorList" :svgWidth="2000" :svgHeight="2000" tooltiplabel="Info"></mapplic-map>
                    </div>
                </div>
            </div>
        </div>
        <subscription-box class="hidden_phone"></subscription-box>
    </div>
</template>

<script>
    define(["Vue", "vuex","vue!mapplic-map","vue!search-component"], function(Vue, Vuex, MapplicComponent, SearchComponent) {
        return Vue.component("map-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical",
                    suggestionAttribute: 'name',
                    storeSearch : "",
                    filteredStores : [],
                    map : null
                }
            },
            created (){
                this.filteredStores = this.processedStores;
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
                    // return "https://www.mallmaverick.com" + this.property.svgmap_url.split("?")[0];
                    return "https://www.mallmaverick.com/system/site_images/photos/000/037/217/original/Canyon_Crest_-_Map_-_Mar-02-2018_-_Presentation_Attributes.svg";
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                },
                floorList () {
                    var floor_list = [];
                    
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Level One";
                    floor_1.map = this.getSVGurl;//"//www.mallmaverick.com/system/site_images/photos/000/037/183/original/Canyon_Crest_-_Map_-_Mar-01-2018.svg";
                    // floor_1.minimap = "//codecloud.cdn.speedyrails.net/sites/5a4bb6d36e6f6473fa0a0000/image/png/1513365138000/NorthPark - Dec-15-2017 - Floor 1.png";
                    floor_1.z_index = 1;
                    floor_1.show = true;
                    floor_list.push(floor_1);
                    return floor_list;
                }
            },
            methods: {
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    this.dropPin(option);
                    // this.processedStores = this.allStores;
                    
                },
                onOptionSelectPhone(option) {
                    console.log('Selected option:', option);
                    // this.dropPin(option);
                    this.$router.push("/stores/"+option.slug);
                    
                },
                dropPin(store) {
                    this.$refs.mapplic_ref.showLocation(store.svgmap_region);
                },
                filterStores (letter) {
                    if(letter == "#"){
                        this.filteredStores = _.filter(this.processedStores, function(o) { return _.inRange(_.toNumber(o.name[0]), -1, 10); });
                    }
                    else if (letter == "7") {
                        this.filteredStores = this.processedStores ;
                    }
                    else {
                        this.filteredStores = _.filter(this.processedStores, function(o) { return _.lowerCase(o.name[0]) == _.lowerCase(letter); });
                    }
                    // console.log(this.processedStores);
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "categories")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            },
        });
    });
</script>
