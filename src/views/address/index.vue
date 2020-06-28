<template>
  <div class="address-container">
    <elm-header
      to="/"
      @jump="ensure(previous)"
    >
      <div class="search-container">
        <router-link
          to="/city"
          class="border-1px border-right-1px link"
        >{{ city }}</router-link>
        <router-link
          to="/address/search"
        >
          <p class="placeholder">
            <span class="icon">
              <elm-icon
                name="search"
                color="#999"
                :font-size="36"
              />
            </span>请输入小区、写字楼、学校名称</p>
        </router-link>
      </div>
    </elm-header>
    <p class="title">当前位置</p>
    <p class="content">
      <span @click.stop="ensure(current)">
        <elm-icon
          class="icon"
          name="location"
          :font-size="28"
          :color="variable.themeColor"
        />{{ location.address }}</span>
      <span
        class="locate"
        @click.stop="locate"
      >重新定位</span>
    </p>
    <p class="title">附近地址</p>
    <div class="scroll-wrapper">
      <list
        :loading="loading"
        :finish="!loading"
        :data-source="pois"
        @ensure="ensure"
      />
    </div>
  </div>
</template>

<script>
import locateMixin from '@/mixins/locate'
import transitionMixin from '@/mixins/transition'
import addressMixin from './mixin'
import { get, set } from '@/utils/sessionStorage'
import { sessionStorageKey, transition } from '@/config'
import { routes } from '@/config/router'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import variable from '@/scss/var.scss'
import ElmHeader from '@/components/header/index.vue'
import List from './list.vue'

export default {
  name: 'Address',
  components: {
    ElmHeader,
    List,
  },
  mixins: [locateMixin, transitionMixin, addressMixin],
  beforeRouteLeave(to, from, next) {
    const {
      home,
      city,
      address,
    } = routes
    const search = address.children.search
    switch (to.name) {
      case home.name:
        this[UPDATE_TRANSITION](transition.slideRight)
        break
      case city.name:
      case search.name:
        this[UPDATE_TRANSITION](transition.slideLeft)
        break
    }
    next()
  },
  data() {
    return {
      current: {
        city: '',
        longitude: '',
        latitude: '',
        address: '',
        adcode: '',
      },
      previous: {
        city: '',
        longitude: '',
        latitude: '',
        address: '',
        adcode: '',
      },
      loading: false,
      pois: [],
      city: '',
    }
  },
  computed: {
    variable() {
      return variable
    },
  },
  mounted() {
    if (this.location.initial) this.preserve(this.previous)
    const data = get(sessionStorageKey.city)
    if (data) this.city = data.city
    this.locate()
  },
  methods: {
    preserve(target) {
      target.city = this.location.city
      target.address = this.location.address
      target.adcode = this.location.adcode
      target.longitude = this.location.longitude
      target.latitude = this.location.latitude
    },
    locate() {
      if (this.loading) return
      this.loading = true
      this.locateCore(this.location.initial)
        .then((data) => {
          this.pois = data.regeocode.pois.map((poi) => {
            const [longitude, latitude] = poi.location.split(',')
            return {
              id: poi.id,
              name: poi.name,
              city: this.location.city,
              address: poi.address,
              adcode: this.location.adcode,
              longitude,
              latitude,
            }
          })
          if (!this.location.initial) this.preserve(this.previous)
          this.preserve(this.current)
          if (!get(sessionStorageKey.city)) {
            this.city = this.location.city
            set(sessionStorageKey.city, {
              city: this.location.city,
              adcode: this.location.adcode,
              longitude: this.location.longitude,
              latitude: this.location.latitude,
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  .address-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: px2rem($headerHeight);
  }

  .search-container {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    flex: 1;
    height: px2rem(60);
    padding-left: px2rem(140);
    margin-right: px2rem(20);
    background-color: #fff;
    border-radius: px2rem(48);

    .link {
      @include single-line-overflow();
      position: absolute;
      top: 50%;
      left: px2rem(30);
      transform: translateY(-50%);
      width: px2rem(90);
      padding-right: px2rem(20);
      font-size: px2rem(28);
    }
  }

  .placeholder {
    position: relative;
    padding: 0 px2rem(60);
    color: #999;
    font-size: px2rem(28);
    line-height: px2rem(60);

    .icon {
      position: absolute;
      top: 50%;
      left: px2rem(16);
      transform: translateY(-50%);
    }
  }

  .title {
    @include border-bottom-1px();
    box-sizing: border-box;
    width: 100%;
    height: px2rem(72);
    padding-left: px2rem(30);
    color: $secondaryTextColor;
    font-size: px2rem(28);
    line-height: px2rem(72);
    background-color: #f1f1f1;
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    height: px2rem(84);
    padding: 0 px2rem(30);
    color: $primaryTextColor;
    font-size: px2rem(28);
    font-weight: 700;
    line-height: px2rem(84);
  }

  .icon {
    margin-right: px2rem(12);
  }

  .locate {
    float: right;
    color: $themeColor;
    font-weight: 400;
  }

  .scroll-wrapper {
    overflow: hidden;
    width: 100%;
    height: calc(100% - #{px2rem(228)});
  }
</style>
