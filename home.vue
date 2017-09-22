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
        <div class="row newsletter_subscription page_container">
            <div class="col-md-8 text_left">
                <h5 class="subscribe_heading all_caps">Subscribe to {{property.name}} newsletter</h5>
                <p class="subscribe_text">
                    For Events, Promotions and Shopping Centre News<br/>
                    Disclaimer: You will receive Promotion E-mails.
                </p>
            </div>
             <div class="newsletter_div col-md-4 ">
                <form action="//mobilefringe.createsend.com/t/d/s/ithdul/" method="post" id="newsletter_form">
                    <input name="cm-ithdul-ithdul" type="text" placeholder="Enter E-mail Here" class="newsletter_control" required /><br/>
                    <button class="newsletter_btn animated_btn all_caps">Submit</button>
                    <p v-show="success_subscribe" id="success_subscribe">
                        Thank you for subscribing.
                    </p>
                </form>
            </div>
        </div>
        <div class="row contact_info page_container">
            <div class="col-md-3">
            <p class="menu_header text_center phone"><i class="fa fa-phone" aria-hidden="true"></i></p>
            <p class="menu_header text_center ">{{property.contact_phone}}</p>
                                    
            </div>
            <div class="col-md-1">
                <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506095721000/vertical_line_1x.png" class="" alt="">
            </div>
            <div class="col-md-3">
                <p class="menu_header text_center"><i class="fa fa-location-arrow" aria-hidden="true"></i></p>
                <div class="address">
                    <p class="menu_content text_center">{{property.address1}}</p>
                    <p class="menu_content text_center">{{property.address2}}</p>
                    <p class="menu_content text_center">{{property.city}}, {{property.province_state}}</p>
                    <p class="menu_content text_center">{{property.postal_code}}</p>
                    <p class="menu_content text_center">{{property.country}}</p>
                </div>
                <!--<h5 class="subscribe_heading all_caps">Subscribe to {{property.name}} newsletter</h5>-->
                <!--<p class="subscribe_text">-->
                <!--    For Events, Promotions and Shopping Centre News<br/>-->
                <!--    Disclaimer: You will receive Promotion E-mails.-->
                <!--</p>-->
            </div>
            <div class="col-md-1">
                <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506095721000/vertical_line_1x.png" class="" alt="">
            </div>
            <div class="col-md-3">
            <p class="menu_header text_center "><i class="fa fa-envelope-open" aria-hidden="true"></i></p>
            <p class="menu_header text_center ">{{property.contact_phone}}</p>
                                    
                <!--<h5 class="subscribe_heading all_caps">Subscribe to {{property.name}} newsletter</h5>-->
                <!--<p class="subscribe_text">-->
                <!--    For Events, Promotions and Shopping Centre News<br/>-->
                <!--    Disclaimer: You will receive Promotion E-mails.-->
                <!--</p>-->
            </div>
        </div>
        <hr/>
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
          search: '',
          success_subscribe : false
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
