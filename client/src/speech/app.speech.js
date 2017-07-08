'use strict';
import annyang from 'annyang'
import speechkitt from '../../node_modules/speechkitt/dist/speechkitt.min'

export default {
  commands: {
    'hello': function () { alert('Hello world!'); },
    'hey': () => {
      debugger;
      this.$message('This is a message.')
    }
 
    
  }

}
