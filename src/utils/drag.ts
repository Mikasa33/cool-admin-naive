/**
 * @param {Element} eleBar 拖拽触发元素
 * @param {Object} options 可选参数
 * @returns
 */

const startDrag = function (eleBar: any, options: any) {
  if (!eleBar)
    return

  // 默认数据
  const defaults: any = {
    target: eleBar,
    bounding: window,
    edgeLock: true,
    onMove() {},
    onEnd() {},
  }

  options = options || {}

  const params: any = {}
  for (const key in defaults) {
    if (typeof options[key] != 'undefined')
      params[key] = options[key]

    else
      params[key] = defaults[key]
  }

  // 拖拽元素
  const eleTarget = params.target
  // 限制范围
  const bounding = params.bounding
  let objBounding = bounding

  // 事件类型处理
  let objEventType = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup',
  }

  if ('ontouchstart' in document) {
    objEventType = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
    }
  }

  // 坐标存储数据
  const store: any = {}
  eleBar.addEventListener(objEventType.start, (event: any) => {
    // IE 拖拽可能拖不动的处理
    if (!window.WeakMap || typeof (document as any).msHidden != 'undefined')
      event.preventDefault()

    // 兼顾移动端
    if (event.touches && event.touches.length)
      event = event.touches[0]

    store.y = event.pageY
    store.x = event.pageX
    store.isMoving = true
    store.top = Number.parseFloat(getComputedStyle(eleTarget).top) || 0
    store.left = Number.parseFloat(getComputedStyle(eleTarget).left) || 0

    if (params.edgeLock === true && bounding) {
      if (bounding === window) {
        objBounding = {
          left: 0,
          top: 0,
          bottom: innerHeight,
          right: Math.min(innerWidth, document.documentElement.clientWidth),
        }
      }
      else if (bounding.tagName) {
        objBounding = bounding.getBoundingClientRect()
      }

      // 拖拽元素的 bounding 位置
      const objBoundingTarget = eleTarget.getBoundingClientRect()

      // 可移动范围
      store.range = {
        y: [objBounding.top - objBoundingTarget.top, objBounding.bottom - objBoundingTarget.bottom],
        x: [objBounding.left - objBoundingTarget.left, objBounding.right - objBoundingTarget.right],
      }
    }
  })
  document.addEventListener(
    objEventType.move,
    (event: any) => {
      if (store.isMoving) {
        event.preventDefault()
        // 兼顾移动端
        if (event.touches && event.touches.length)
          event = event.touches[0]

        let distanceY = event.pageY - store.y
        let distanceX = event.pageX - store.x

        // 边界的判断与chuli
        if (params.edgeLock === true && bounding) {
          const minX = Math.min.apply(null, store.range.x)
          const maxX = Math.max.apply(null, store.range.x)
          const minY = Math.min.apply(null, store.range.y)
          const maxY = Math.max.apply(null, store.range.y)

          if (distanceX < minX)
            distanceX = minX

          else if (distanceX > maxX)
            distanceX = maxX

          if (distanceY < minY)
            distanceY = minY

          else if (distanceY > maxY)
            distanceY = maxY
        }

        const top = store.top + distanceY
        const left = store.left + distanceX

        eleTarget.style.top = `${top}px`
        eleTarget.style.left = `${left}px`

        // 回调
        params.onMove(left, top)
      }
    },
    {
      passive: false,
    },
  )
  document.addEventListener(objEventType.end, () => {
    if (store.isMoving) {
      store.isMoving = false

      params.onEnd()
    }
  })
}

export default startDrag
