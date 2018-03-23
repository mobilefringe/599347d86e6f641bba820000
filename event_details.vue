<template>
    <div>
         <div class="page_container padding_30" v-if="currentEvent">
            <div class="row">
                <div class="col-md-4 ">
                    <div class="promo_img_container">
                        <!--<img :src="currentEvent.image_url" class="promo_img">-->
                        <img src="//via.placeholder.com/250x250" class="promo_list_img" v-if="_.includes(currentEvent.image_url,'missing')">
                        <img :src="currentEvent.image_url" class="promo_list_img" v-else>
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
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("promo-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentEvent: null,
          success_subscribe : false
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentEvent = vm.findEventBySlug(to.params.id);
          if (vm.currentEvent === null || vm.currentEvent === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentEvent = this.findEventBySlug(to.params.id);
        if (this.currentEvent === null || this.currentEvent === undefined){
          this.$router.replace({ name: '404'});
        }
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
