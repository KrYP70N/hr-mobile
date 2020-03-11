import * as FileSystem from 'expo-file-system'

export default class HRFs {

    static createFolder () {
        FileSystem.downloadAsync(
            'http://techslides.com/demos/sample-videos/small.mp4',
            FileSystem.documentDirectory + 'small.mp4'
          )
            .then(({ uri }) => {
              console.log('Finished downloading to ', uri);
            })
            .catch(error => {
              console.error(error);
            });
    }

}