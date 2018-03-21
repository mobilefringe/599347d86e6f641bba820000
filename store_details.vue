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
                    <mapplic-map ref="mapplic_ref" :height="300" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :maxscale= "5" :storelist="[currentStore]" :floorlist="floorList" :svgWidth="2000" :svgHeight="2000" tooltiplabel="Info" action="none" :showPin="true" @updateMap="updateMap" :key="currentStore.id"></mapplic-map>
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
                <div class="col-md-6">
                <p class="title ">{{promo.name}}</p> 
                <p class="sub_title ">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                <p class="description_text ">{{promo.description}}</p> 
                    <router-link class="newsletter_btn animated_btn all_caps text_center" :to="{ name: 'promotionDetails', params: { id: promo.slug }}">Read More</router-link>
                </div>
                
                
            </div>
            
        </div>
        <hr/>
        <div class="row  newsletter_subscription" style="margin:30px auto">
            <div class="col-md-8 text_left">
                <h3 class="subscribe_heading all_caps">Subscribe to {{property.name}} newsletter</h3>
                <p class="subscribe_text">
                    For Events, Promotions and Shopping Centre News<br/>
                    Disclaimer: You will receive Promotion E-mails.
                </p>
            </div>
             <div class="newsletter_div col-md-4 ">
                <form action="//mobilefringe.createsend.com/t/d/s/ithdul/" method="post" id="newsletter_form" class="pull-right">
                    <input name="cm-ithdul-ithdul" type="text" placeholder="Enter E-mail Here" class="newsletter_control" required /><br/>
                    <button class="newsletter_btn animated_btn all_caps ">Submit</button>
                    <p v-show="success_subscribe" id="success_subscribe">
                        Thank you for subscribing.
                    </p>
                </form>
            </div>
        </div>
        <hr/>
        <div class="padding_tb_30"></div>
    </div>
</template>

<script>
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    currentStore: null,
                    map: null,
                    promotions : [],
                    success_subscribe : false
                }
            },
            created (){
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.updateCurrentStore(this.id);
                });
            },
            watch : {
                $route : function () {
                    this.updateCurrentStore(this.$route.params.id);
                },
                currentStore : function (){
                    console.log("currentStore promo",this.currentStore );
                    var vm = this;
                    var temp = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        console.log(vm.findPromoById(value));
                        temp.push(vm.findPromoById(value));
                    });
                    this.promotions = temp;
                    console.log("promos",this.promotions);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'findStoreBySlug',
                    'findPromoById',
                    'findJobById',
                    'findHourById'
                ]),
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url.split("?")[0];
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData","promotions"), this.$store.dispatch("getData", "jobs")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentStore (id) {
                    this.currentStore = this.findStoreBySlug(id);
                    if (this.currentStore === null || this.currentStore === undefined){
                        this.$router.replace({ name: '404'});
                    }
                },
                updateMap () {
                    console.log("store details update", this.$refs.mapplic_ref);
                    this.$refs.mapplic_ref.showLocation(this.currentStore.svgmap_region);
                    this.$refs.mapplic_ref.addActiveClass(this.currentStore.svgmap_region);
                }
            }
        });
    });
</script>
