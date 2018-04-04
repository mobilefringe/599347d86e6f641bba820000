<template>
    <div>
         <div class="page_container padding_30" v-if="currentPage">
            <div class="page_title" v-html="currentPage.title">  </div>
            <div class="row">
                <div class="description_text text_left" v-html="currentPage.body">
                </div>
            </div>
        </div>
        <hr/>
        <div class="page_container">
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
        </div>
        <hr/>
        <div style="padding:20px 0;"></div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    vm.$store.dispatch('LOAD_PAGE_DATA', {
                        url: vm.property.mm_host + "/pages/" + to.params.id + ".json"
                    }).then(response => {

                        vm.currentPage = response.data;
                        console.log(vm.currentPage);
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({
                            name: '404'
                        });
                    });
                })
            },
            beforeRouteUpdate(to, from, next) {
                this.$store.dispatch('LOAD_PAGE_DATA', {
                    url: this.property.mm_host + "/pages/" + to.params.id + ".json"
                }).then(response => {
                    // this.dataLoaded = true;
                    this.currentPage = response.data;
                    console.log(this.currentPage);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({
                        name: '404'
                    });
                });
            },
            computed: {
                findEventBySlug() {
                    return this.$store.getters.findEventBySlug;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                property() {
                    return this.$store.getters.getProperty;
                }
            }
        });
    });
</script>
