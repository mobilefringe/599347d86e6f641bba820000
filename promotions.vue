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
                        <p class="sub_title">{{ promo.store.name }}</p>
                        <p>{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                        <p class="description_text">{{ promo.name }}</p>
                         <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}" class="newsletter_btn animated_btn text_center">Read More</router-link>
                    
                </div>
            </div>
        </div> 
        <hr/>
        <div class="new_stores page_container">
            <div class="row">
                <div class="col-md-2">
                    <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506100892000/Peoples.png" class="" alt="">
                </div>
                <div class="col-md-2">
                    <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506100902000/Roots.png" class="" alt="">
                </div>
                <div class="col-md-2">
                    <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506100908000/AA.png" class="" alt="">
                </div>
                <div class="col-md-2">
                    <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506100918000/UNQ.png" class="" alt="">
                </div>
                <div class="col-md-2">
                    <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506100932000/Best Buy.png" class="" alt="">
                </div>
                <div class="col-md-2">
                    <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506100952000/Indigo.png" class="" alt="">
                </div>
            </div>
        </div>
        <hr/>
        <div class="row go_to_directory text_center">
            <button class="newsletter_btn animated_btn all_caps ">Store Directory</button>
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
