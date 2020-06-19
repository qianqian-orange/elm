<template>
  <div class="address-container">
    <elm-header
      to="/"
      @jump="ensure(previous)"
    >
      <div class="search-container">
        <router-link
          to="/address/city"
          class="link"
        >{{ location.city }}</router-link>
        <search-list
          :adcode="location.adcode"
          @ensure="ensure"
        />
      </div>
    </elm-header>
    <p class="title">当前位置</p>
    <p class="content">
      <span @click="ensure(current)"><i class="icon iconfont icon-location" />{{ location.address }}</span>
      <span
        class="locate"
        @click="locate"
      >重新定位</span>
    </p>
    <p class="title">附近地址</p>
    <div class="scroll-wrapper">
      <list
        :loading="loading"
        :data-source="pois"
        @ensure="ensure"
      />
    </div>
    <transition name="elm">
      <router-view />
    </transition>
  </div>
</template>

<script>
import locateMixin from '@/mixins/locate'
import ElmHeader from '@/components/elmHeader/index.vue'
import List from './list.vue'
import SearchList from './searchList'
import { UPDATE_LOCATION } from '@/store/modules/global/mutation-types'

export default {
  name: 'Address',
  components: {
    ElmHeader,
    List,
    SearchList,
  },
  mixins: [locateMixin],
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
    }
  },
  mounted() {
    if (this.location.initial) this.preserve(this.previous)
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
        })
        .finally(() => {
          this.loading = false
        })
    },
    ensure(poi) {
      this[UPDATE_LOCATION]({
        initial: true,
        city: poi.city,
        adcode: poi.adcode,
        longitude: poi.longitude,
        latitude: poi.latitude,
        address: poi.name || poi.address,
      })
      this.$router.push('/home')
    },
  },
}
</script>

<style lang="scss" scoped>
  .address-container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: px2rem($headerHeight);
  }
  .search-container {
    position: relative;
    box-sizing: border-box;
    border-radius: px2rem(48);
    overflow: hidden;
    flex: 1;
    height: px2rem(60);
    padding-left: px2rem(140);
    margin-right: px2rem(20);
    background-color: #fff;
  }
  .link {
    top: 50%;
    left: px2rem(30);
    transform: translateY(-50%);
    width: px2rem(90);
    padding-right: px2rem(20);
    font-size: px2rem(28);

    @include single-line-overflow();
    @include border-right-1px();
    position: absolute;
  }
  .title {
    box-sizing: border-box;
    width: 100%;
    height: px2rem(72);
    padding-left: px2rem(30);
    font-size: px2rem(28);
    line-height: px2rem(72);
    color: $secondaryTextColor;
    background-color: #f1f1f1;

    @include border-bottom-1px();
  }
  .content {
    box-sizing: border-box;
    width: 100%;
    height: px2rem(84);
    padding: 0 px2rem(30);
    font-size: px2rem(28);
    font-weight: 700;
    line-height: px2rem(84);
    color: $primaryTextColor;
  }
  .icon {
    margin-right: px2rem(12);
    font-size: px2rem(28);
    color: $themeColor;
  }
  .locate {
    float: right;
    font-weight: 400;
    color: $themeColor;
  }
  .scroll-wrapper {
    width: 100%;
    height: calc(100% - #{px2rem(228)});
    overflow: hidden;
  }
</style>
