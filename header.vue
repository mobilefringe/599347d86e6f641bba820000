<template>
    <div>
        <div>
    		<div class="menu page_container" id="menu_bar">
    			<router-link class="store_logo pull-left" to="/" >{{property.name}}</router-link>
    			<ul class="menu_list pull-right hidden_phone" >
    				<li v-for="item in menu_items">
    					<router-link :to="item.href" active-class="active" exact :id="item.name">
    						{{ item.name }}
    					</router-link>
    				</li>
    			</ul>
    		</div>
    		<hr class="hr_bold"/>
    		<div class="sub_menu_bar page_container relative">
    			<div class="today_hour">
    				OPEN TODAY
    				{{getTodayHours.open_time | moment("h:mmA", timezone)}} - {{getTodayHours.close_time | moment("h:mmA", timezone)}}
    			</div>
    			<div class="social_links pull-right hidden_phone">
    			    <social-links></social-links>
    			</div>
    			<div class="search pull-right hidden_phone">
    				<search-component :list="processedStores" placeholder="Search For Stores" :suggestion-attribute="suggestionAttribute" v-model="search" @select="onOptionSelect" :key="02">
    					<template slot="item" scope="option">
    						<article class="media">
    							<p>
    								<strong>{{ option.data.name }}</strong>
    							</p>
    						</article>
    					</template>
    				</search-component>
    			</div>
    			<img @click="show_menu = !show_menu ; " src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498507078000/menu Button 2x.png" class="open_menu visible_phone menu-icon" alt="open menu" id="menu-icon">
    		</div>
    		<hr/>
    	</div>
    	<div id="menu_page" v-if="show_menu" class="visible_phone">
    		<div class="menu_page_content">
    			<div class="menu_btn_holder">
    				<div v-for="item in menu_items" class="relative menu_btns">
    					<router-link tag="li" :to="item.href" active-class="active" class="menu_btn" exact>
    						<a>
    						<label :class="item.class_list" @click="show_menu = !show_menu" :id="item.name">{{ item.name }}</label>
    						</a>
    					</router-link>
    					<hr class="menu_hover"/>
    				</div>
    			</div>
    			<div class="search">
    				<search-component :list="processedStores" placeholder="Find Your Store" :suggestion-attribute="suggestionAttribute" v-model="menuSearch" @select="onOptionSelect" class="large">
    					<template slot="item" scope="option">
    						<article class="media">
    							<p>
    								<strong>{{ option.data.name }}</strong>
    							</p>
    						</article>
    					</template>
    				</search-component>
    			</div>
    			<div class="mobile_contact">
    				<p class="menu_content text_center "> <i class="fa fa-phone" aria-hidden="true"></i> {{property.contact_phone}}</p>
    			</div>
    			<div class="social_links">
    			    <social-links></social-links>
    			</div>
    		</div>
    	</div>
	</div>
</template>

<script>
    define(["Vue", "vuex", 'vue!social_links.vue',  'json!menu_items.json'], function (Vue, Vuex, SocialLinks, MenuItems) {
        return Vue.component("header-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    dataLoaded: false,
                    show_mobile_menu: false,
                    property_logo: "//codecloud.cdn.speedyrails.net/sites/5a9714046e6f644dc3160000/image/png/1520457420000/whitelogo1@2x.png",
                    menu_items: MenuItems,
                    suggestionAttribute: 'name',
                    search : "",
                    menuSearch : "",
                    show_menu: false,
                }
            },
            watch: {
                $route: function() {
                    // hide dropdown when route changes
                    _.forEach(this.menu_items, function(value, key) {
                        value.show_sub_menu = false;
                    });
                    this.show_menu = false; //close menu when navigating to new page
                    
                },
                show_menu : function () {
                    this.$emit('update_showmenu');
                    if(this.show_menu === true){
                            document.body.classList.add("no-scroll");
                    } else if (this.show_menu === false) {
                        document.body.classList.remove("no-scroll");
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getTodayHours',
                    'processedStores'
                ]),
                todays_hours() {
                    return this.getTodayHours;
                }
            },
            methods: {
                onOptionSelect(option) {
                    console.log('Selected option:', option);
                    this.$router.push("/stores/"+option.slug);
                    $(".bannerSearch .options-list").hide();
                    this.$nextTick(function() {
                        //clear search when changing routes
                        this.search = "";
                        this.menuSearch = "";
                    });
                },
            }
            
        });
    });
</script>