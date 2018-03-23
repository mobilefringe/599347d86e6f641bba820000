<template>
    <div>
         <div class="page_container padding_30" v-if="currentPromo">
            <div class="row">
                <div class="col-sm-4 ">
                    <div class="promo_img_container">
                        <img :src="currentPromo.image_url" class="promo_img image">
                    </div>
                </div>
                <div class="col-sm-8 text_left promo_text_container">
                    <div class="col-sm-9">
                        <p class="title all_caps">
                            <router-link :to="{ name: 'storeDetails', params: { id: currentPromo.store.slug }}">{{currentPromo.store.name}}</router-link>
                        </p>
                        <p class="title">{{currentPromo.name}}</p>
                        <br/>
                        <p class="promo_dates"> {{currentPromo.start_date | moment("MMM D", timezone)}} - {{currentPromo.end_date | moment("MMM D", timezone)}}</p>
                        <br/>
                    </div>
                    <div class="col-sm-3">
                        <img :src="currentPromo.store.store_front_url_abs" class="promo_store_logo" alt="">
                    </div>
                    <div class="col-sm-12">
                        <p class="description_text"> {{currentPromo.description}}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        <div style="padding:20px 0;"></div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("promo-details-component", {
            template: template, // the variable template will be injected,
            props:['id'],
            data: function() {
                return {
                    currentPromo: null,
                    success_subscribe: false
                }
            },
            beforeRouteUpdate(to, from, next) {

                next();
                this.currentPromo = this.findPromoBySlug(to.params.id);
                if (this.currentPromo === null || this.currentPromo === undefined) {
                    this.$router.replace('/');
                }
            },
            created() {
                this.loadData().then(response => {
                    this.updateCurrentPromo(this.id);
                    this.promos = this.promotions;
                });
            },
            watch: {
                currentPromo: function() {
                    if (this.currentPromo != null) {
                        console.log(this.currentPromo.store);
                        if (this.currentPromo.store != null && this.currentPromo.store != undefined && _.includes(this.currentPromo.store.image_url, 'missing')) {
                            this.currentPromo.store.image_url = this.property.default_logo_url;
                        } else if (this.currentPromo.store == null || this.currentPromo.store == undefined) {
                            this.currentPromo.store = {};
                            this.currentPromo.store.image_url = this.property.default_logo_url;
                        }
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedPromos',
                    'findPromoBySlug',
                    'findPromoById',
                    'timezone',
                    'findRepoByName',
                    'findHourById'
                ]),
                allPromos() {
                    return this.processedPromos;
                },
            },
            methods: {
                updateCurrentPromo(id) {
                    this.currentPromo = this.findPromoBySlug(id);
                    if (this.currentPromo === null || this.currentPromo === undefined) {
                        this.$router.replace('/');
                    }
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "promotions")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                shareURL(slug) {
                    var share_url = "http://bramaleacitycentre.com/promotions/" + slug;
                    return share_url;
                },
            }
        });
    });
</script>