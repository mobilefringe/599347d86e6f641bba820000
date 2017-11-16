require.config({
    paths: {
        'Vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.1/vue',
        'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.7.0/vue-router.min',
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min',
        'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
        'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min',
        'moment-timezone': 'https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min',
        'vue2-filters': 'https://cdn.jsdelivr.net/vue2-filters/0.1.8/vue2-filters.min',
        'vue': 'https://mmvue.codecloudapp.com/require-vuejs.min',
        'vuex': 'https://cdnjs.cloudflare.com/ajax/libs/vuex/2.3.1/vuex.min',
        'vue-i18n': 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/6.1.1/vue-i18n.min',
        'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'json': 'https://unpkg.com/requirejs-plugins-current@1.0.3/src/json',
        'js-cookie': 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min',
        'vue-meta': 'https://unpkg.com/vue-meta@1.0.4/lib/vue-meta.min',
        'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
        'store': 'https://mmvue.codecloudapp.com/store',
        'vue-moment': 'https://mmvue.codecloudapp.com/vue-moment',
        'Raphael': 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min', //'http://mallmaverick.com/javascripts/mapsvg/raphael',
        'mousewheel': 'https://mallmaverick.com/javascripts/mapsvg/jquery.mousewheel',
        'mapsvg': 'https://mallmaverick.com/javascripts/mapsvg/mapsvg',
        'mm_mapsvg': 'https://mmvue.codecloudapp.com/mallmaverick_svgmap',
    'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
        'today_hours': 'https://mmvue.codecloudapp.com/today_hours.vue?noext', //append a dummy query string so requireJS doesn't auto-append .js to the end of the url
        'search-component': 'https://mmvue.codecloudapp.com/search-component.vue?noext',
        'svg-map': 'https://599347d86e6f641bba820000.codecloudapp.com/svg_map.vue?noext'
    }
});

require(['Vue', 'vue2-filters', 'vue_router', 'routes', 'store', 'vue-i18n', 'locales', 'moment', "vue-meta", 'vue!search-component','vue-moment','jquery'], function (Vue, Vue2Filters, VueRouter, appRoutes, store, VueI18n, messages, moment, Meta, SearchComponent, vueMoment, $) {
    Vue.use(Meta);
    Vue.use(VueRouter);
    Vue.use(Vue2Filters);
    Vue.use(VueI18n);

    /* initialize router */
    const router = new VueRouter({
        mode: 'history',
        routes: appRoutes
    });

    /* initialize i18n */
    const i18n = new VueI18n({
        locale: 'en-ca',
        fallbackLocale: 'en-ca',
        messages,
    });
    
    /* bootstrap app */
    const vm = new Vue({
        el: '#app',
        data: function () {
            return {
                dataLoaded: false,
                showBigBanner: true,
                windowWidth : 0,
                menu_items: [
                    {
                        name: "Stores",
                        id: "stores",
                        class_list: "all_caps menu_btn_label",
                        href: "/stores"
                    },
                    {
                        name: "Promotions",
                        id: "promotions",
                        class_list: "all_caps menu_btn_label",
                        href: "/promotions"
                    },
                    {
                        name: "Events",
                        id: "map",
                        class_list: "all_caps menu_btn_label",
                        href: "/events"
                    },
                    {
                        name: "Contact Us",
                        id: "contact_us",
                        class_list: "all_caps menu_btn_label",
                        href: "/contact_us"
                    }
                ],
                show_hero_banner : false,
                suggestionAttribute: 'name',
                bannerSearch : "",
                search : ""
            }
        },
        created() {
            // make an async call to the data store to initialize the locale (i.e. it will check if there is a locale value saved in cookie, otherwise it will default to EN)
          
            this.$store.dispatch('INITIALIZE_LOCALE');
          
            this.$store.dispatch('LOAD_META_DATA');
    
            // make an async call to load mall data
            this.$store.dispatch('LOAD_MALL_DATA', {url:"https://www.mallmaverick.com/api/v4/twinpines/all.json"}).then(response => {
                this.dataLoaded = true;
            }, error => {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
            });
            this.$on('switchBanner', function(value){
                console.log("in parent on banner emit",value);
            });
        },
        mounted () {
            this.$nextTick(function() {
              window.addEventListener('resize', this.getWindowWidth);
                console.log(this.$route,this.$router);
              //Init
              this.getWindowWidth();
            });
            
        },
        watch: {
            // watcher to update vue-i18n when the locale has been changed by the user
            locale: function (val, oldVal) {
                this.$i18n.locale = val;
                moment.locale(val);
                // console.log(moment().format('LLLL'));
                // console.log(this.$store.getters.getTodayHours);
            },
            windowWidth : function () {
                if(this.windowWidth > 1200) {
                    // console.log(this.windowWidth,this.showBigBanner)
                   this.showBigBanner = true;
                }
                else {
                    // console.log(this.windowWidth,this.showBigBanner)
                   this.showBigBanner = false;
                }
            }
        },
        computed: {
        // computed property for locale which returns locale value from data store and also updates the data store with new locale information
            locale: {
                get () {
                    return this.$store.state.locale
                },
                set (value) {
                    this.$store.commit('SET_LOCALE', { lang: value })
                }
            },
            getBanners () {
                console.log(this.$store.state.results.banners);
                return this.$store.state.results.banners;
            },
            getMainBanner () {
                console.log( _.filter(this.getBanners, { 'position': 1})[0]);
                return  _.filter(this.getBanners, { 'position': 1})[0];
            },
            copyright_year() {
                return moment().year();
            },
            property(){
                return this.$store.getters.getProperty;
            },
            hours(){
                var hours = 
                _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                console.log(hours);
                return hours;
            },
            todays_hours () {
                return this.$store.getters.getTodayHours;
            },
            timezone () {
                return this.$store.getters.getTimezone;
            },
            allStores() {
                return this.$store.getters.processedStores;
            }
        },
        methods: {
            // utility method to allow user to change locale value
            changeLocale: function(val) {
                this.locale = val; // this will update the data store, which in turn will trigger the watcher to update the locale in the system
            },
            getWindowWidth(event) {
                this.windowWidth = window.innerWidth;
            },
            day_of_the_week(val_day){
                weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                return weekday[val_day];
            },
            //this function helps home Page show and hide menu using the prop showMenu
            
            onOptionSelect(option) {
                console.log('Selected option:', option);
                // var counted_stores = _.countBy(this.allStores,'name');
                
                // // console.log("counted_stores is",counted_stores[option.name]);
                // if(option.type==="click") {
                //     console.log($(".input").val());
                // }
                
                // else {
                //     if( counted_stores[option.name] >1) {
                //         var route = '/map/' + option.name;
                //         console.log(route);
                //         this.$router.push(route);
                //     }
                //     else {
                //         var route = '/stores/' + option.slug;
                //         console.log(route);
                //         this.$router.push(route);
                //     }
                // }
                this.$router.push("/stores/"+option.slug);
                $(".search-component .options-list").hide();
            },
            show_search_list () {
                $(".search-component .options-list").show();
            },
            toggleBanner (payload) {
                console.log("received emit");
                this.show_hero_banner = payload[0];
            }
        },
        router: router,
        store,
        i18n
    });
});
