<template>
    <section>
        <div>
            <i class="fa fa-times" aria-hidden="true" @click.stop="closeModal"></i>
            <div class="camera-area"> </div>
            <div class="buttons-area">
                <h5 class="freeze-picture" v-if="!isFrozen" @click.stop="freezePicture">Freeze Picture</h5>
                <i class="fa fa-thumbs-up" v-if="isFrozen" @click.stop="acceptPicture" aria-hidden="true"></i>
                <i class="fa fa-thumbs-down" v-if="isFrozen" @click.stop="rejectPicture" aria-hidden="true"></i>
            </div>
        </div>
    
    </section>
</template>

<<script>
import Webcam from 'webcamjs'
export default {
    name: 'picture-modal',
    props: ['kid'],
    data() {
        return {
        isFrozen: false,
        localKid: Object.assign({}, this.kid),
        }
    },
    mounted() {
        Webcam.attach(`.camera-area`);
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        freezePicture() {
            this.isFrozen = true;
            Webcam.freeze()
        },
        acceptPicture() {
            console.log('saving picture')

            let capturedImgUrl = null;
            Webcam.snap(function (data_uri) {
                capturedImgUrl = data_uri;
            });
            let updatedKid = Object.assign({}, this.kid)
            updatedKid.imgUrl = capturedImgUrl
            this.$emit('picture', updatedKid)
            this.closeModal()
            Webcam.reset()
        },
        rejectPicture() {
            console.log('throwing image')
            Webcam.unfreeze()
            this.isFrozen = false
        }
    }
}
</script>

<style lang="scss" scoped>
.camera-area {
    position: relative;
    z-index: 5;
    background: gray;
    height: 400px; //temp
    width: 400px; //temp
}

.buttons-area {
    position: absolute;
    z-index: 10;
    font-size: 2em;
    .fa {
        margin: 0.25em;
        cursor: pointer;
    }
    .fa-thumbs-up {
        color: blue;
    }
    .fa-thumbs-down {
        color: darkred;
    }
}

.fa-times {
    position: absolute;
    z-index: 10;
    top: 0.3em;
    right: 0.3em;
    font-size: 1.5em;
    cursor: pointer;
}

.freeze-picture {
    position: absolute;
    left: 0.2em;
    bottom: -1.5em;
    z-index: 10;
    transform: translateX(50%);
    color: yellow;
    border: 5px solid white;
    cursor: pointer;
}
</style>

