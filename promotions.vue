<template>
    <div class="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="page_title"> Promotions </div>
        <div class="row">
            <div class="col-md-3" v-for="promo in promotions">
                <div class="promo_list_container">
                    <div class="promo_list_img_container">
                        <!--<a :href="promo.image_url" target="_blank">-->
                        <img :src="promo.image_url" class="promo_list_img">
                            
                        <!--</a>-->
                    </div>
                        <p class="sub_title">{{ promo.store_name }}</p>
                        <p>{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                        <p class="description_text">{{ promo.name }}</p>
                         <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}" class="newsletter_btn animated_btn text_center">Read More</router-link>
                    
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
  define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("promos-component", {
      template: template, // the variable template will be injected
      computed: {
        promotions() {
            // var promos = this.$store.getters.processedPromos;
            // console.log(promos);
            // _.forEach(promos, function (val) {
            //     if(val.description.length >50) {
            //       val.description = _.truncate(val.description, {'length':50,'separator': ' '})
            //     }
            // });
          return this.$store.getters.processedPromos;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        }
      }
    });
  });
</script>
