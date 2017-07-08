<template>
    <section>
        <i class="fa fa-microphone annyang-on" :class="micClassObject" aria-hidden="true"></i>
        <table class="keypad">
            <i class="fa fa-times" aria-hidden="true" @click="closeKeypad"></i>
            <tr>
                <td class="display-area" colspan="3">{{shownPass}}</td>
            </tr>
            <tr>
                <td @click="numberClicked">1</td>
                <td @click="numberClicked">2</td>
                <td @click="numberClicked">3</td>
            </tr>
            <tr>
                <td @click="numberClicked">4</td>
                <td @click="numberClicked">5</td>
                <td @click="numberClicked">6</td>
            </tr>
            <tr>
                <td @click="numberClicked">7</td>
                <td @click="numberClicked">8</td>
                <td @click="numberClicked">9</td>
            </tr>
            <tr>
                <td @click.stop="eraseClicked">
                    <i class="fa fa-eraser" aria-hidden="true"></i>
                </td>
                <td @click="numberClicked">0</td>
                <td @click="confirmClicked">
                    <i class="fa fa-check" aria-hidden="true"></i>
                </td>
            </tr>
        </table>
    </section>
</template>

<<script>
export default {
  name: 'code-keypad',
  props: ['kidPass'],
    data() {
    return {
        insertedPass: '',
        passSymbol: '*',
        maxPassLength: 5,
        isPassCorrect: false,
        voiceCommands: {
            'one': () => this.numberSpoken(1),
            'two': () => this.numberSpoken(2),
            'three': () => this.numberSpoken(3),
            'four': () => this.numberSpoken(4),
            'five': () => this.numberSpoken(5),
            'six': () => this.numberSpoken(6),
            'seven': () => this.numberSpoken(7),
            'eight': () => this.numberSpoken(8),
            'nine': () => this.numberSpoken(9),
            'zero': () => this.numberSpoken(0),
            'yes': () => this.confirmClicked(),
            'delete': () => this.eraseClicked(),
            'exit': () => this.closeKeypad(),
        }
    }
  },
  computed: {
      shownPass() {
        return this.passSymbol.repeat(this.insertedPass.length)
      },
        micClassObject() {
        return {
            'annyang-on': annyang.isListening()
      }
  },
},
  created() {
        console.log('keypad created')
        annyang.addCommands(this.voiceCommands)
  },
  methods: {
      closeKeypad() {
          console.log('Closing Keypad')
          this.$emit('close-keypad', this.isPassCorrect)
      },
      numberClicked(event) {
          console.log(event.target.innerText, 'clicked')
          if (this.insertedPass.length < this.maxPassLength) this.insertedPass += event.target.innerText;
      },
      numberSpoken(val) {
          if (this.insertedPass.length < this.maxPassLength) this.insertedPass += val;          
      },
      eraseClicked() {
          if (this.insertedPass) this.insertedPass = this.insertedPass.slice(0, this.insertedPass.length - 1)
          console.log('erase clicked')
      },
      confirmClicked() {
          console.log('confirm clicked')
          if(this.insertedPass === this.kidPass) {              
              this.isPassCorrect = true; //for some reason the first command is ignored
                                        //but the second works. For now this is a makeshift fix.
              this.isPassCorrect = true;
              this.closeKeypad();
          } else {
              this.$message.error("Incorrect Code")
              this.insertedPass ='';
          }
      }
  }
}

</script>

<style lang="scss" scoped>
.keypad {
    background-color: #96C0D2;
    color: white;
    font-size: 2em;
    border-collapse: collapse;
    border: 2px solid white;

    td:not(.display-area) {
        padding: 0.75em;
        width: 2em;
        border: 4px solid #376283;
        cursor: pointer;
    }
    .display-area {
        text-align: center;
        padding: 0;
        border: 4px solid #376283;
        height: 1.8em;
    }
    .fa-eraser {
        color: blue;
    }
    .fa-check {
        color: green;
    }
}

.fa-times {
    position: absolute;
    top: 0.2em;
    left: 0.2em;
    cursor: pointer;
}

.fa-microphone {
    display: none;
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    font-size: 3em;
    &.annyang-on {
        display: block;
        animation: 3s blink infinite;
    }
}

@keyframes blink {
    50% {
        color: goldenrod;
    }
}
</style>


