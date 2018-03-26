<template>
    <div class="newsletter_subscription" v-if="show_subscription">
        <div class="row page_container">
            <div class="col-sm-8 text_left">
                <h3 class="subscribe_heading all_caps">Subscribe to {{property.name}} newsletter</h3>
                <p class="subscribe_text">
                    For Events, Promotions and Shopping Centre News<br/>
                    Disclaimer: You will receive Promotion E-mails.
                </p>
            </div>
            <div class="col-sm-4 ">
                <div class="newsletter_div">
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
    </div>
</template>
<script>
    define(["Vue", "vuex"], function(Vue, Vuex) {
        return Vue.component("subscription-box", {
            template: template, // the variable template will be injected,
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                ])
            },
        });
    });
</script>