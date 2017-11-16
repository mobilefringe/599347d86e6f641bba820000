<template>
    <div class="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="page_title"> Promotions </div>
        <div class="row"></div>
            <div class="col-md-3" v-for="promo in promotions">
                <div class="">
                    <div class="card-divider">
                        <a :href="promo.image_url" target="_blank"><img :src="promo.image_url"></a>
                        {{ promo.name }}
                        
                    </div>
                     <div class="">
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
  define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("promos-component", {
      template: template, // the variable template will be injected
      computed: {
        promotions() {
          return this.$store.getters.processedPromos;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        }
      }
    });
  });
</script>
