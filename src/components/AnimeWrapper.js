import anime from 'animejs'

import {bisect} from 'd3-array'


export default class AnimeWrapper {
    constructor(
      name, transConfig, transTarget,
      startTransition, endTransition,
      setCurrAnimation,
    ) {
      this.name = name
      this.transConfig = transConfig
      this.transTarget = transTarget
      this.running = false
      this.startTransition = startTransition
      this.endTransition = endTransition
      this.setCurrAnimation = setCurrAnimation

      this.getTimeline = this.getTimeline.bind(this)
      this.setInitState = this.setInitState.bind(this)
      this.getTransitions = this.getTransitions.bind(this)
      this._run = this._run.bind(this)
      this.runForward = this.runForward.bind(this)
      this.runBackward = this.runBackward.bind(this)
      this.getAnimatedProperty = this.getAnimatedProperty.bind(this)
      this.getTimelineChildOffsets = this.getTimelineChildOffsets.bind(this)
      this.clear = this.clear.bind(this)
    }

    getTimeline() {
      return anime.timeline({
        autoplay: false,
        begin: () => {
          this.startTransition(this.name)
          this.running = true
        },
        complete: () => {
          this.endTransition(this.name)
          this.running = false
        },
      })
    }

    setInitState(direction) {
      const progress = direction === 'backward'? 1 : 0
      for (const key of Object.keys(this.transTarget)) {
        this.transTarget[key] = progress
      }
    }

    getTransitions(direction) {
      const directedTrans = this.transConfig.map(
        tr => ({...tr.common, ...tr[direction]})
      )
      if (direction === 'backward') {
        directedTrans.reverse()
      }
      return directedTrans
    }

    getTimelineChildOffsets() {
      if (this.timelineChildOffsets) {
        return this.timelineChildOffsets
      }
      this.timelineChildOffsets = []
      for (const child of this.currTimeline.children) {
        // todo maybe try giving names to children
        // presume only one animation
        // also won't work if animating one attribute several times
        this.timelineChildOffsets.push({
          property: child.animations[0].property,
          offset: child.offset
        })
      }
      this.timelineChildOffsets.sort(
        (first, second) => first.offset <= second.offset? -1: 1
      )
      return this.timelineChildOffsets
    }

    getAnimatedProperty(time) {
      const offsets = this.getTimelineChildOffsets()
      const index = bisect(
        offsets.map(o => o.offset), time
      )
      const currAnimation = offsets[index - 1]
      if (currAnimation) {return currAnimation.property}
    }

    _run(direction) {
      if (this.running && this.currDirection !== direction) {
          this.currDirection = direction
          this.currTimeline.reverse()
          return
      }
      this.currDirection = direction
      this.timelineChildOffsets = undefined
      this.setInitState(direction)
      this.currTimeline = this.getTimeline()
      for (const tr of this.getTransitions(direction)) {
          this.currTimeline.add(tr)
      }
      this.currTimeline.update = (anim) => {
          this.setCurrAnimation(
            this.getAnimatedProperty(anim.currentTime)
          )
        }
      this.currTimeline.play()
    }

    runForward() {
      this._run('forward')
    }
    runBackward() {
      this._run('backward')
    }

    clear() {
      anime.remove(this.transTarget)
    }
}