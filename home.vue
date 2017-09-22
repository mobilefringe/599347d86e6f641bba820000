<template>
<div class="home_page_container">
  <div class="row page_container">
      <div class="col-md-4 home_shortcut">
          <img :src="feature_items[0].image_url" class="" alt="">
          <div class="hover_see_more_btn">
                <h5 class="hover_text">View Full Design </h5>
            </div>
      </div>
      <div class="col-md-4 home_shortcut">
          <img :src="feature_items[1].image_url" class="" alt="">
          <div class="hover_see_more_btn">
                <h5 class="hover_text">View Full Design </h5>
            </div>
      </div>
      <div class="col-md-4 home_shortcut">
          <img :src="feature_items[2].image_url" class="" alt="">
          <div class="hover_see_more_btn">
                <h5 class="hover_text">View Full Design </h5>
            </div>
      </div>
  </div>
  <hr/>
    <div class="newsletter_subscription">
    <h3 class="subscribe_heading all_caps"></h3>
        <p class="subscribe_text all_caps">
        Subscribe to {{property.name}} newsletter
        </p>
        <div class="newsletter_div">
            <form action="//mobilefringe.createsend.com/t/d/s/ithdul/" method="post" id="newsletter_form">
                <input name="cm-ithdul-ithdul" type="text" placeholder="Your Email" class="newsletter_control" required />
                <button class="newsletter_btn animated_btn">{{$t("message.submit")}}</button>
                <p class="hidden_now" id="success_subscribe">
                    {{$t("message.thankYouMessage")}}
                </p>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
  define(["Vue", "vue!today_hours", "vue!search-component"], function(Vue, TodayHoursComponent, SearchComponent) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          suggestionAttribute: 'name',
          search: ''
        }
      },
      mounted () {
          this.feature_items;
      },
      computed: {
        property(){
          return this.$store.getters.getProperty;
        },
        processedStores() {
          return this.$store.getters.processedStores;
        },
        feature_items(){
            
            console.log(this.$store.state.results);
            return this.$store.state.results.feature_items;
        }
      },
      methods: {
        onOptionSelect(option) {
          console.log('Selected option:', option)
        }
      }
    })
  })
</script>
