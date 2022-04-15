class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
      work: root.querySelector(".work"),
      shortbreak: root.querySelector(".sb"),
      longbreak: root.querySelector(".lb")
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.work.addEventListener("click", () =>{
      if(this.interval === null) {
        this.interval = 25 * 1000;
        this.start();
      } else{
        this.stop;
      }
    })

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--music");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
        const music = new Audio('Rick Astley - Never Gonna Give You Up (Official Music Video).mp3');
        music.play();
        // while (music.play() = true) {
        //   this.el.control.innerHTML = `<button type="button" class="timer__btn timer__btn--music"> Stop Music </button>`;
        // }

        
        // setTimeout(function(){
        //   music.pause();
        //   player.currentTime = 0;
        // });
        // music.pause();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
        <div class="button">
          <button type="button" class="work">Work</button>
          <button type="button" class="sb">Short Break</button>
          <button type="button" class="lb">Long Break</button>
        </div>
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        <button type="button" class="timer__btn timer__btn--control timer__btn--start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">timer</span>
        </button>
      
			
		`;
  }
}

new Timer(
	document.querySelector(".timer")
);