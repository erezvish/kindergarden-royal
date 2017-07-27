<template>
    <section class="modal" :class="{'list-view': isListView}">
        <i class="close-button fa fa-times" aria-hidden="true" @click.stop="closeModal"></i>
        <div class="camera-area"> </div>
        <div class="ctrl-icons">
            <i class="fa fa-camera capture" aria-hidden="true" v-if="!isFrozen" @click.stop="freezePicture" title="freeze picture"></i>
            <i class="fa fa-thumbs-up" v-if="isFrozen" @click.stop="acceptPicture" aria-hidden="true"></i>
            <i class="fa fa-thumbs-down" v-if="isFrozen" @click.stop="rejectPicture" aria-hidden="true"></i>
        </div>
    
    </section>
</template>

<<script>
import Webcam from 'webcamjs'
export default {
    name: 'picture-modal',
    props: ['kid', 'isListView'],
    data() {
        return {
        isFrozen: false,
        elCameraArea: document.querySelector('.modal')
        }
    },
    mounted() {
        Webcam.attach(`.camera-area`);
        Webcam.set({
		    dest_width: 300,
		    dest_height: 300,
	    });
    },
    methods: {
        closeModal() {
            Webcam.reset()
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
@import "../sass/main.scss";
* {
    // border: 1px solid red;
}
.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    background: linear-gradient(rgba(148, 192, 209, 1), white, rgba(148, 192, 209, 1));
    z-index: 1;
}
.camera-area {
    height: 50%;
    width: 100%;
}
.ctrl-icons {
    justify-content: space-between;
    .capture {
        position: absolute;
        left: 45%;
        bottom: -2em;
    }
}
.close-button {
    position: absolute;
    right: 0; // align-self: flex-end;
    font-size: 1.5em;
    color: white;
    cursor: pointer;
    z-index: 1;
}
.freeze-picture {
    cursor: pointer;
}
// >>>>>>>>>>>>>>>>>>>>> LIST VIEW <<<<<<<<<<<<<<<<<<<<<<
.list-view {
    align-items: flex-start;
    padding-top: 0;
    .camera-area {
        width: 20%;
        height: 100%;
    }
    .ctrl-icons {
        width: 20%;
        .capture {
            bottom: -1em;
            left: 0;
        }
    }
    .close-button {
        position: absolute;
        top: 0;
        left: 0;
        right: auto;
    }
    @media screen and (min-width: $lg) {
        .camera-area {
            width: 30%;
            height: 80%;
            margin-top: 0;
        }
        .ctrl-icons {
            width: 30%;
            .capture {
                left: 2%;
            }
        }
        .clear-style {
            margin: 0;
        }
    }
}
</style>
