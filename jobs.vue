<template>
    <div><!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="page_container"> 
            <div class="page_title"> Jobs </div>
            <div class="row">
                <div class="col-sm-3" v-for="promo in jobs">
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
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vue!vue-slick'], function(Vue, Vuex, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("jobs-component", {
            template: template, // the variable template will be injected
            data() {
                return {
                    slickOptions: {
                        dots: false,
                        arrows: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        responsive: [
                            {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                              }
                            },
                        ]
                    }
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
                    'processedJobs'
                ]),
                jobs() {
                    var vm = this;
                    var temp_promo = [];
                    _.forEach(this.processedJobs, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.show_on_web_date).tz(vm.timezone)
                        console.log("compare",today.format('MM DD YYYY'), "to", webDate.format('MM DD YYYY'), (today.format('MM DD YYYY') >= webDate.format('MM DD YYYY')))
                        if (today.format('DMY') >= webDate.format('DMY')) {
                            value.description_short = _.truncate(value.description, {
                                'length': 150
                            });
                            value.description_short_2 = _.truncate(value.description_2, {
                                'length': 150
                            });
                            if (value.store != null && value.store != undefined && _.includes(value.store.store_front_url_abs, 'missing')) {
                                value.store.store_front_url_abs = vm.operty.default_logo_url;
                            }
                            else if (value.store == null || value.store == undefined) {
                                value.store = {};
                                value.store.store_front_url_abs =  vm.property.default_logo_url;
                            }
                            temp_promo.push(value);
                        }
                    });
                    _.sortBy(temp_promo, [function(o) { return o.start_date; }]);
                    return temp_promo;
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "jobs")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>