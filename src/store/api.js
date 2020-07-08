import axios from 'axios'
import { resolveImageUrl } from '@/utils'

export function getShopList({ currentPage, pageSize }) {
  return axios.get('/api/shop/recommend', {
    params: {
      currentPage,
      pageSize,
    },
  }).then(({ data }) => {
    if (data.code !== 0) throw new Error('获取数据失败')
    const result = data.data.map(({ restaurant, foods }) => {
      return {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        recentOrderNum: restaurant.recent_order_num,
        floatMinimumOrderAmount: restaurant.float_minimum_order_amount,
        floatDeliveryFee: restaurant.float_delivery_fee,
        distance: restaurant.distance,
        orderLeadTime: restaurant.order_lead_time,
        recommendReasons: restaurant.recommend_reasons.map(({ reason }) => reason),
        supportTags: restaurant.support_tags.map(item => ({
          color: item.color,
          border: item.border,
          text: item.text,
          background: item.background ? {
            rgbFrom: item.background.rgb_from,
            rgbTo: item.background.rgb_to,
          } : null,
        })),
        imagePath: resolveImageUrl(restaurant.image_path),
        activities: restaurant.activities.map(item => ({
          description: item.description,
          iconColor: item.icon_color,
          iconName: item.icon_name,
          id: item.id,
        })),
        foods: foods.map((food) => ({
          id: food.id,
          name: food.name,
          price: food.price,
          imagePath: resolveImageUrl(food.image_path),
        })),
      }
    })
    return result
  })
}

function topMenu(menu, restaurant) {
  restaurant.menu.unshift({
    id: menu.id,
    name: menu.name,
    iconUrl: menu.icon_url ? resolveImageUrl(menu.icon_url) : '',
    count: 0,
    foods: menu.foods.map((food) => {
      const m = restaurant.menu.find(item => item.id === food.category_id)
      return m.foods.find(item => item.id === food.item_id)
    }),
  })
}

export function getRestaurant(id) {
  return axios.get('/api/shop/detail', {
    params: {
      id,
    },
  }).then(({ data }) => {
    if (data.code !== 0) throw new Error('获取数据失败')
    const { rst, redpack, menu } = data.data
    const hot = -1
    const cheap = -2
    let hotMenu = null
    let cheapMenu = null
    let index = menu.findIndex(item => item.id === hot)
    if (index !== -1) hotMenu = menu.splice(index, 1)[0]
    index = menu.findIndex(item => item.id === cheap)
    if (index !== -1) cheapMenu = menu.splice(index, 1)[0]
    const restaurant = {
      id: rst.id,
      name: rst.name,
      rating: rst.rating, // 评分
      floatDeliveryFee: rst.float_delivery_fee, // 配送费
      floatMinimumOrderAmount: rst.float_minimum_order_amount, // 最低起送价
      recentOrderNum: rst.recent_order_num, // 月销量
      orderLeadTime: rst.order_lead_time, // 配送时间
      notice: rst.promotion_info, // 公告
      imagePath: resolveImageUrl(rst.image_path),
      bgImagePath: resolveImageUrl(rst.shop_sign.image_hash),
      redpack: redpack.map(item => ({
        value: item.value,
        title: item.title,
      })),
      tags: rst.activity_tags.map(item => ({
        border: item.border,
        color: item.color,
        text: item.text,
      })),
      activities: rst.activities.map(item => ({
        id: item.id,
        border: item.border,
        color: item.text_color,
        description: item.description,
        iconName: item.icon_name,
      })),
      supports: rst.supports.map(item => ({
        id: item.id,
        border: item.border,
        description: item.description,
        color: item.text_color,
        name: item.name,
      })),
      menu: menu.map(item => ({
        id: item.id,
        name: item.name,
        iconUrl: item.icon_url ? resolveImageUrl(item.icon_url) : '',
        count: 0, // 该菜单选购的商品数量
        foods: item.foods.map(food => ({
          id: food.item_id,
          categoryId: food.category_id,
          name: food.name,
          sell: food.month_sales,
          originPrice: food.origin_price,
          price: food.price,
          rating: food.satisfy_rate,
          description: food.description.trim(),
          discountRate: food.discount_rate, // 折扣
          imagePath: resolveImageUrl(food.image_path),
          count: 0, // 该商品选购数量
        })),
      })),
      shopCar: [],
    }
    if (hotMenu) topMenu(hotMenu, restaurant)
    if (cheapMenu) topMenu(cheapMenu, restaurant)
    return restaurant
  })
}
