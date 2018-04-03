<template>
    <div :class="{sticky : stickyMenu}">
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
				{{todays_hours.open_time | moment("h:mmA", timezone)}} - {{todays_hours.close_time | moment("h:mmA", timezone)}}
			</div>
			<div class="social_links pull-right hidden_phone">
			    <social-links></social-links>
			</div>
			<div class="search pull-right hidden_phone">
				<search-component :list="allStores" placeholder="Search For Stores" :suggestion-attribute="suggestionAttribute" v-model="search" @select="onOptionSelect" :key="02">
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
				<search-component :list="allStores" placeholder="Find Your Store" :suggestion-attribute="suggestionAttribute" v-model="menuSearch" @select="onOptionSelect" class="large">
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
</template>