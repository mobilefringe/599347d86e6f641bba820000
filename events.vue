<template>
    <div><!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="page_container"> 
            <div class="page_title"> Events </div>
            <div class="row">
                <div class="col-md-3" v-for="promo in events">
                    <div class="promo_list_container">
                        <div class="promo_list_img_container">
                            <!--<a :href="promo.image_url" target="_blank">-->
                            <img :src="promo.store.store_front_url_abs" class="promo_list_img image">
                                
                            <!--</a>-->
                        </div>
                        <div class="promo_info_container">
                            <p class="sub_title">{{ promo.store.name }}</p>
                            <p>{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                            <p class="description_text">{{ promo.name }}</p>
                            
                        </div>
                           <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}" class="newsletter_btn animated_btn text_center">Read More</router-link>
                        
                    </div>
                </div>
            </div> 
            
        </div>
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
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    success_subscribe: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataloaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedEvents',
                    'findRepoByName',
                ]),
                events() {
                    // var promos = this.$store.getters.processedEvents;
                    // console.log(this.$store);
                    // _.forEach(promos, function (val) {
                    //     if(val.description.length >50) {
                    //       val.description = _.truncate(val.description, {'length':50,'separator': ' '})
                    //     }
                    // });
                    return this.processedEvents;
                },
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "events"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>
