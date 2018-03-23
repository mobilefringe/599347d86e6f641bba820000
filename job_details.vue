<template>
    <div>
         <div class="page_container padding_tb_30" v-if="currentJob">
            <div class="row">
                <div class="col-md-4 ">
                    <div class="promo_img_container">
                        <!--<img :src="currentJob.image_url" class="promo_img">-->
                        <img :src="currentJob.store.store_front_url_abs" class="promo_list_img image">
                    </div>
                </div>
                <div class="col-md-8 text_left promo_text_container">
                    <div class="col-md-9">
                        <p class="title all_caps" v-if="currentJob.store">
                            <router-link :to="{ name: 'storeDetails', params: { id: currentJob.store.slug }}">{{currentJob.store.name}}</router-link>
                        </p>
                        <p class="title all_caps" v-else>
                           {{property.name}}
                        </p>
                        <p class="title">{{currentJob.name}}</p>
                        <br/>
                        <p class="promo_dates"> {{currentJob.start_date | moment("MMM D", timezone)}} - {{currentJob.end_date | moment("MMM D", timezone)}}</p>
                        <br/>
                    </div>
                    <!--<div class="col-md-3" v-if="currentJob.store">-->
                    <!--    <img :src="currentJob.store.store_front_url_abs" class="promo_store_logo" alt="">-->
                    <!--</div>-->
                    <div class="col-md-12">
                        <p class="description_text"> {{currentJob.description}}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("job-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentJob: null,
                    success_subscribe: false
                }
            },
            props: ['id'],
            beforeRouteUpdate(to, from, next) {
                next();
                this.updatecurrentJob(to.params.id);
            },
            created() {
                this.loadData().then(response => {
                    this.updatecurrentJob(this.id);
                   
                    this.events = this.event;
                });
            },
            watch: {
                currentJob: function() {
                    if (this.currentJob != null) {
                        console.log(this.currentJob.store);
                        if (this.currentJob.store != null && this.currentJob.store != undefined && _.includes(this.currentJob.store.image_url, 'missing')) {
                            this.currentJob.store.image_url = this.property.default_logo_url;
                        } else if (this.currentJob.store == null || this.currentJob.store == undefined) {
                            this.currentJob.store = {};
                            this.currentJob.store.image_url = this.property.default_logo_url;
                        }
                        var vm = this;
                        var temp_event = [];
                        var current_id = _.toNumber(this.currentJob.id);
                        _.forEach(this.currentJob.store.event, function(value, key) {
                            if (_.toNumber(value) != current_id) {
                                var current_event = vm.findEventById(value);
                                current_event.description_short = _.truncate(current_event.description, {
                                    'length': 70
                                });
                                temp_event.push(current_event);
                            }
                        });
                        this.storeEvents = temp_event;
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedJobs',
                    'findJobBySlug',
                    'findJobById',
                    'timezone'
                ]),
            },
            methods: {
                updatecurrentJob(id) {
                    this.currentJob = this.findJobBySlug(id);
                    if (this.currentJob === null || this.currentJob === undefined) {
                        // this.$router.replace('/');
                    }
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "jobs"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>
