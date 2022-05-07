// components/score.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      '../../icons/no-star.png',
      '../../icons/no-star.png',
      '../../icons/no-star.png',
      '../../icons/no-star.png',
      '../../icons/no-star.png',
    ],
    number: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scoring: function (e) {   
      let idx = e.target.dataset.index
      let list = [
        '../../icons/no-star.png',
        '../../icons/no-star.png',
        '../../icons/no-star.png',
        '../../icons/no-star.png',
        '../../icons/no-star.png',
      ]
      for (let i = 0; i <= idx; i++) {
        list[i] = '../../icons/full-star.png'
      }
      this.setData({
        list,
        number: idx + 1
      })
      this.triggerEvent('scoring', {fraction: this.data.number})
    }
  }
})
