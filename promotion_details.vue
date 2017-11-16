<template>
    <div>
  <div class="row page_container" v-if="currentPromo">
    <div class="large-6 columns">
      <div>
        <h1>{{currentPromo.name}}</h1>
        <p><router-link :to="{ name: 'storeDetails', params: { id: currentPromo.store.slug }}">{{currentPromo.store.name}}</router-link> | {{currentPromo.start_date | moment("MMM D", timezone)}} - {{currentPromo.end_date | moment("MMM D", timezone)}}</p>
        <p>{{currentPromo.description}}</p>
        <img :src="currentPromo.image_url">
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
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("promo-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentPromo: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentPromo = vm.findPromoBySlug(to.params.id);
          if (vm.currentPromo === null || vm.currentPromo === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentPromo = this.findPromoBySlug(to.params.id);
        if (this.currentPromo === null || this.currentPromo === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      computed: {
        findPromoBySlug () {
          return this.$store.getters.findPromoBySlug;
        },
        timezone() {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        },
      }
    });
  });
</script>
