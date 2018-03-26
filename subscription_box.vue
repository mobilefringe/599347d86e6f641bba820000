<!--<div class="newsletter_subscription" v-if="show_subscription">-->
<!--                    <div class="row page_container">-->
<!--                        <div class="col-sm-8 text_left">-->
<!--                            <h3 class="subscribe_heading all_caps">Subscribe to {{property.name}} newsletter</h3>-->
<!--                            <p class="subscribe_text">-->
<!--                                For Events, Promotions and Shopping Centre News<br/>-->
<!--                                Disclaimer: You will receive Promotion E-mails.-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="col-sm-4 ">-->
<!--                            <div class="newsletter_div">-->
<!--                                <form action="//mobilefringe.createsend.com/t/d/s/ithdul/" method="post" id="newsletter_form" class="pull-right">-->
<!--                                    <input name="cm-ithdul-ithdul" type="text" placeholder="Enter E-mail Here" class="newsletter_control" required /><br/>-->
<!--                                    <button class="newsletter_btn animated_btn all_caps ">Submit</button>-->
<!--                                    <p v-show="success_subscribe" id="success_subscribe">-->
<!--                                        Thank you for subscribing.-->
<!--                                    </p>-->
<!--                                </form>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<template>
    <div>
        <a href="#" target="_blank"><i class="fa fa-facebook"></i></a>
	    <a href="#" target="_blank"><i class="fa fa-twitter"></i></a>
	    <a href="#" target="_blank"><i class="fa fa-pinterest"></i></a>
	    <a href="#" target="_blank"><i class="fa fa-instagram"></i></a>
        <a href="#" target="_blank"><i class="fa fa-google-plus"></i></a>
    </div>
    
</template>
<script>
    define(["Vue", "vuex", "lightbox"], function(Vue, Vuex, Lightbox) {
        Vue.use(Lightbox);
        return Vue.component("social-links", {
            template: template, // the variable template will be injected,
        });
    });
</script>