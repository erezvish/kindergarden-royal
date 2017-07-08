<template>
    <section>
        <div class="">
            <table class="keypad">
                <i class="fa fa-times" aria-hidden="true" @click="closeKeypad"></i>
                <tr>
                    <td class="display-area" colspan="3">placeholder</td>
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
                    <td>
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>

<<script>
export default {
  name: 'code-keypad',
  methods: {
      closeKeypad() {
          console.log('Closing Keypad')
      },
      numberClicked(event) {
          console.log(event.target.innerText, 'clicked')
      },
      eraseClicked(event) {
          console.log('erase clicked')
      },
      confirmClicked(event) {
          console.log('confirm clicked')
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
    td {
        padding: 0.75em;
        width: 2em;
        border: 4px solid #376283;
    }
    td:not(.display-area) {
        cursor: pointer;
    }
    .fa-eraser {
        color: blue;
    }
    .fa-check {
        color: green;
    }
}

.display-area {
    text-align: center;
}

.fa-times {
    position: absolute;
    top: 0.2em;
    left: 0.2em;
    cursor: pointer;
}
</style>


