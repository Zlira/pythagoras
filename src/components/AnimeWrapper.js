import anime from 'animejs'


export default class AnimeWrapper {
    constructor(transConfig, transTarget) {
      this.transConfig = transConfig
      this.transTarget = transTarget
      this.running = false
    }

    getTimeline() {
      return anime.timeline({
        autoplay: false,
        begin: () => {this.running = true},
        complete: () => {this.running = false},
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

    _run(direction) {
      this.setInitState(direction)
      const timeline = this.getTimeline()
      for (const tr of this.getTransitions(direction)) {
          timeline.add(tr)
      }
      timeline.play()
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