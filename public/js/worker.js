const types = ['png', 'jpg']

function resolveImageUrl(imagePath) {
  let ext = imagePath.substr(-3)
  if (!types.includes(ext.toLowerCase())) ext = imagePath.substr(-4)
  return `https://cube.elemecdn.com/${imagePath[0]}/${imagePath[1]}${imagePath[2]}/${imagePath.substr(3)}.${ext}`
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

onmessage = function (e) {
  const { rst, redpack, menu } = e.data
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
  postMessage(restaurant)
}
