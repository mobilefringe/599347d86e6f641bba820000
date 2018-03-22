<template>
    <div>
         <div class="page_container padding_30" v-if="currentPromo">
            <div class="row">
                <div class="col-md-4 ">
                    <div class="promo_img_container">
                        <img :src="currentPromo.image_url" class="promo_img">
                    </div>
                </div>
                <div class="col-md-8 text_left promo_text_container">
                    <div class="col-md-9">
                        <p class="title all_caps">
                            <router-link :to="{ name: 'storeDetails', params: { id: currentPromo.store.slug }}">{{currentPromo.store.name}}</router-link>
                        </p>
                        <p class="title">{{currentPromo.name}}</p>
                        <br/>
                        <p class="promo_dates"> {{currentPromo.start_date | moment("MMM D", timezone)}} - {{currentPromo.end_date | moment("MMM D", timezone)}}</p>
                        <br/>
                    </div>
                    <div class="col-md-3">
                        <img :src="currentPromo.store.store_front_url_abs" class="promo_store_logo" alt="">
                    </div>
                    <div class="col-md-12">
                        <p class="description_text"> {{currentPromo.description}}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        <hr/>
        <div class="page_container">
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
        </div>
        <hr/>
        <div style="padding:20px 0;"></div>
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("promo-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentPromo: null,
          success_subscribe : false
        }
      },
      watch: {
                currentPromo : function (){
                    if(this.currentPromo != null) {
                        console.log(this.currentPromo.store);
                        if (this.currentPromo.store != null && this.currentPromo.store != undefined && _.includes(this.currentPromo.store.image_url, 'missing')) {
                            this.currentPromo.store.image_url = this.property.default_logo_url;
                        }
                        else if (this.currentPromo.store == null || this.currentPromo.store == undefined) {
                            this.currentPromo.store = {};
                            this.currentPromo.store.image_url = this.property.default_logo_url;
                        }
                        var vm = this;
                        var temp_promo = [];
                        var current_id =_.toNumber(this.currentPromo.id);
                        _.forEach(this.currentPromo.store.promotions, function(value, key) {
                            if(_.toNumber(value) != current_id){
                                var current_promo = vm.findPromoById(value);
                                current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                                temp_promo.push(current_promo);
                            }
                        });
                        this.storePromos = temp_promo;
                    }
                    if(this.currentPromo.store) {
                        var storeHours = [];
                        var vm = this;
                        _.forEach(this.currentPromo.store.store_hours, function (value, key) {
                            var hour = vm.findHourById(value);
                            if(hour.day_of_week === 0){
                                hour.order = 7;
                            }
                            else {
                                hour.order = hour.day_of_week;
                            }
                            storeHours.push();
                        });
                        this.storeHours = _.sortBy(storeHours, [function(o) { return o.order; }]);
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
                updateCurrentPromo (id) {
                    this.currentPromo = this.findPromoBySlug(id);
                    if (this.currentPromo === null || this.currentPromo === undefined){
                        this.$router.replace('/');
                    }
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "promotions"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                shareURL(slug){
                    var share_url = "http://bramaleacitycentre.com/promotions/" + slug;
                    return share_url;
                },
            }
    });
  });
</script>
