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
                    <button class="newsletter_btn animated_btn all_caps red_btn">Submit</button>
                    <p v-show="success_subscribe" id="success_subscribe">
                        Thank you for subscribing.
                    </p>
                </form>
            </div>
        </div>
        <hr/>
        <div class="row contact_info page_container">
            <div class="col-md-3">
            <p class="header text_center phone"><i class="fa fa-phone" aria-hidden="true"></i></p>
            <p class="header text_center ">{{property.contact_phone}}</p>
             <p class="content text_center ">Mall Security:</p>
             <p class="content text_center ">{{property.contact_phone}}</p>
            </div>
            <div class="col-md-1" style="margin: 10px auto;">
                <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506095721000/vertical_line_1x.png" class="" alt="">
            </div>
            <div class="col-md-3">
                <p class="header text_center"><i class="fa fa-location-arrow" aria-hidden="true"></i></p>
                <p class="header text_center">{{property.address1}}</p>
                <div class="content address">
                    <p class="content text_center">{{property.address1}} {{property.address2}}</p>
                    <p class="content text_center">{{property.city}}, {{property.province_state}} {{property.postal_code}}</p>
                    <p class="content text_center">{{property.country}}</p>
                </div>
            </div>
            <div class="col-md-1" style="margin: 10px auto;">
                <img src="http://assets.codecloudapp.com/sites/599347d86e6f641bba820000/image/png/1506095721000/vertical_line_1x.png" class="" alt="">
            </div>
            <div class="col-md-3">
            <p class="header text_center "><i class="fa fa-envelope-open" aria-hidden="true"></i></p>
            <p class="header text_center ">Email Contacts</p>
            <p class="content text_center ">{{property.contact_email}}</p>
                  
            </div>
        </div>
        <div class="home_map text_center">
            <iframe title="Map" width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  :src="'http://maps.google.nl/maps?q='+full_address  +'&amp;hl=en&amp;ie=UTF8&amp;t=v&amp;hnear='+full_address  +'&amp;z=13&amp;output=embed'">
                    Map
                </iframe>
                <div class="row get_directions">
                    <button class="newsletter_btn animated_btn all_caps red_btn">Submit</button>
                </div>
        </div>
        <hr/>
        <div class="new_storespage_container">
            
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
        },
        full_address() {
            return this.property.address1 +''+this.property.city +''+ this.property.country +''+this.property.province_state +''+this.property.province_state
            
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
