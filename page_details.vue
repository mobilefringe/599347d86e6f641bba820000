<template>
    <div>
         <div class="page_container padding_30" v-if="currentEvent">
            <div class="page_title" v-html="currentPage.title">  </div>
            <div class="row">
                <div class="col-md-4 ">
                    <div class="promo_img_container">
                        <img :src="currentEvent.image_url" class="promo_img">
                    </div>
                </div>
                <div class="col-md-8 text_left promo_text_container">
                    <div class="col-md-9">
                        <p class="title all_caps" v-if="currentEvent.store">
                            <router-link :to="{ name: 'storeDetails', params: { id: currentEvent.store.slug }}">{{currentEvent.store.name}}</router-link>
                        </p>
                        <p class="title all_caps" v-else>
                           {{property.name}}
                        </p>
                        <p class="title">{{currentEvent.name}}</p>
                        <br/>
                        <p class="promo_dates"> {{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
                        <br/>
                    </div>
                    <div class="col-md-3" v-if="currentEvent.store">
                        <img :src="currentEvent.store.store_front_url_abs" class="promo_store_logo" alt="">
                    </div>
                    <div class="col-md-12">
                        <p class="description_text"> {{currentEvent.description}}</p>
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
    return Vue.component("page-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentEvent: null,
          success_subscribe : false,
          currentPage: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          
            vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/"+ to.params.id +".json"}).then(response => {
                
                vm.currentPage = response.data;
                console.log(vm.currentPage);
            }, error => {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
                vm.$router.replace({ name: '404'});
            });
            // vm.currentEvent = vm.findEventBySlug(to.params.id);
            // if (vm.currentEvent === null || vm.currentEvent === undefined){
                
            // }
        })
      },
      beforeRouteUpdate (to, from, next) {
            this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/"+ to.params.id +".json"}).then(response => {
                // this.dataLoaded = true;
                this.currentPage = response.data;
                console.log(this.currentPage);
            }, error => {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
                this.$router.replace({ name: '404'});
            });
        // this.currentEvent = this.findEventBySlug(to.params.id);
        // if (this.currentEvent === null || this.currentEvent === undefined){
        //   this.$router.replace({ name: '404'});
        // }
      },
      computed: {
        findEventBySlug () {
          return this.$store.getters.findEventBySlug;
        },
        timezone() {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        }
      }
    });
  });
</script>
